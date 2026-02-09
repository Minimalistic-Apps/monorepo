#!/usr/bin/env bash
set -euo pipefail

GRADLE_FILE="android/app/build.gradle"

if [[ ! -f "$GRADLE_FILE" ]]; then
    echo "No $GRADLE_FILE found — skipping configuration"
    exit 0
fi

NAMESPACE=$(grep 'namespace' "$GRADLE_FILE" | head -1 | sed 's/.*"\(.*\)"/\1/')

if [[ -z "$NAMESPACE" ]]; then
    echo "Could not read namespace from $GRADLE_FILE"
    exit 1
fi

echo "Configuring $GRADLE_FILE (namespace: $NAMESPACE)…"

cat > "$GRADLE_FILE" << 'GRADLE'
apply plugin: 'com.android.application'

import groovy.json.JsonSlurper
def packageJson = new JsonSlurper().parseText(file('../../package.json').text)
def appVersion = packageJson.version
def (major, minor, patch) = appVersion.tokenize('.').collect { it.toInteger() }
def computedVersionCode = major * 10000 + minor * 100 + patch

def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

// Passwords: accept via -P flags, or prompt interactively
def resolvePassword(String name, Properties props) {
    // 1. Gradle property (-PstorePassword=xxx)
    if (project.hasProperty(name)) return project.property(name)
    // 2. keystore.properties file
    if (props[name]) return props[name]
    // 3. Interactive prompt
    def console = System.console()
    if (console != null) {
        return new String(console.readPassword("\nEnter ${name}: "))
    }
    return null
}

android {
    namespace "__NAMESPACE__"
    compileSdk rootProject.ext.compileSdkVersion
    defaultConfig {
        applicationId "__NAMESPACE__"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode computedVersionCode
        versionName appVersion
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        aaptOptions {
             // Files and dirs to omit from the packaged assets dir, modified to accommodate modern web apps.
             // Default: https://android.googlesource.com/platform/frameworks/base/+/282e181b58cf72b6ca770dc7ca5f91f135444502/tools/aapt/AaptAssets.cpp#61
            ignoreAssetsPattern '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'
        }
    }
    if (keystorePropertiesFile.exists()) {
        signingConfigs {
            release {
                storeFile file(keystoreProperties['storeFile'])
                storePassword resolvePassword('storePassword', keystoreProperties)
                keyAlias keystoreProperties['keyAlias']
                keyPassword resolvePassword('keyPassword', keystoreProperties)
            }
        }
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            if (keystorePropertiesFile.exists()) {
                signingConfig signingConfigs.release
            }
        }
    }
    applicationVariants.all { variant ->
        if (variant.buildType.name == 'release') {
            variant.outputs.all {
                def appName = packageJson.name.split('/').last()
                outputFileName = "${appName}-${appVersion}.apk"
            }
        }
    }
}

repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
    }
}

dependencies {
    implementation fileTree(include: ['*.jar'], dir: 'libs')
    implementation "androidx.appcompat:appcompat:$androidxAppCompatVersion"
    implementation "androidx.coordinatorlayout:coordinatorlayout:$androidxCoordinatorLayoutVersion"
    implementation "androidx.core:core-splashscreen:$coreSplashScreenVersion"
    implementation project(':capacitor-android')
    testImplementation "junit:junit:$junitVersion"
    androidTestImplementation "androidx.test.ext:junit:$androidxJunitVersion"
    androidTestImplementation "androidx.test.espresso:espresso-core:$androidxEspressoCoreVersion"
    implementation project(':capacitor-cordova-android-plugins')
}

apply from: 'capacitor.build.gradle'

try {
    def servicesJSON = file('google-services.json')
    if (servicesJSON.text) {
        apply plugin: 'com.google.gms.google-services'
    }
} catch(Exception e) {
    logger.info("google-services.json not found, google-services plugin not applied. Push Notifications won't work")
}
GRADLE

sed -i "s/__NAMESPACE__/$NAMESPACE/g" "$GRADLE_FILE"

echo "  ✓ build.gradle configured"
