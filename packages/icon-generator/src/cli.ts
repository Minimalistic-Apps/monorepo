#!/usr/bin/env tsx

import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { generateIcons } from './generateIcons.ts';

interface AppConfig {
    readonly config: {
        readonly appIconEmoji: string;
    };
}

const appDir = process.cwd();
const configPath = resolve(appDir, 'config.ts');

if (!existsSync(configPath)) {
    console.error('No config.ts found in', appDir);
    process.exit(1);
}

const { config }: AppConfig = await import(pathToFileURL(configPath).href);

await generateIcons({
    emoji: config.appIconEmoji,
    webOutputDir: resolve(appDir, 'public'),
    androidResDir: existsSync(resolve(appDir, 'android/app/src/main/res'))
        ? resolve(appDir, 'android/app/src/main/res')
        : undefined,
});
