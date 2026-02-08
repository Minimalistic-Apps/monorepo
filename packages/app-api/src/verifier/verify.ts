#!/usr/bin/env tsx

import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { AppCheck } from './AppCheck';
import { hasConfigTs } from './checks/hasConfigTs';
import { hasGeneratedIcons } from './checks/hasGeneratedIcons';
import { hasRequiredScripts } from './checks/hasRequiredScripts';

// --- Checks ---

const checks: ReadonlyArray<AppCheck> = [
    hasConfigTs,
    hasRequiredScripts,
    hasGeneratedIcons,
];

// --- Helpers ---

const getAppDirs = ({
    appsDir,
}: {
    readonly appsDir: string;
}): ReadonlyArray<string> =>
    readdirSync(appsDir, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => join(appsDir, entry.name));

// --- Main ---

const workspaceRoot = resolve(process.cwd());
const appsDir = join(workspaceRoot, 'apps');
const appDirs = getAppDirs({ appsDir });

if (appDirs.length === 0) {
    console.error('No apps found in', appsDir);
    process.exit(1);
}

const errors: Array<string> = [];

for (const appDir of appDirs) {
    for (const check of checks) {
        const checkErrors = check.run({ appDir });

        for (const error of checkErrors) {
            errors.push(`${appDir} [${check.name}]: ${error}`);
        }
    }
}

if (errors.length > 0) {
    console.error('App standard verification failed:\n');

    for (const error of errors) {
        console.error(`  ✗ ${error}`);
    }

    console.error(`\n${errors.length} error(s) found.`);
    process.exit(1);
}

console.log(`✓ All ${appDirs.length} app(s) pass the standard checks.`);
