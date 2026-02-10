import { injectTemplateVars } from './injectTemplateVars';
import { readTemplate } from './readTemplate';

interface GenerateAppBuildGradleProps {
    readonly appId: string;
}

/**
 * Generates the app-level build.gradle content.
 *
 * - Version name and version code are derived from ../../package.json at Gradle build time.
 * - Release APK filenames are suffixed with the version.
 * - App name and colors come from generated strings.xml and colors.xml (driven by config.ts).
 */
export const generateAppBuildGradle = ({ appId }: GenerateAppBuildGradleProps): string =>
    injectTemplateVars(readTemplate('build.gradle'), { appId });
