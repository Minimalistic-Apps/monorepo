import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { AppCheck } from '../AppCheck.ts';

const REQUIRED_ICONS = [
    'favicon.png',
    'icon-192x192.png',
    'icon-512x512.png',
] as const;

export const hasGeneratedIcons: AppCheck = {
    name: 'has generated icons',
    run: ({ appDir }) => {
        const publicDir = join(appDir, 'public');
        const errors: Array<string> = [];

        if (!existsSync(publicDir)) {
            return [`missing public/ folder — run "generate:icons" first`];
        }

        for (const icon of REQUIRED_ICONS) {
            if (!existsSync(join(publicDir, icon))) {
                errors.push(
                    `missing public/${icon} — run "generate:icons" first`,
                );
            }
        }

        return errors;
    },
};
