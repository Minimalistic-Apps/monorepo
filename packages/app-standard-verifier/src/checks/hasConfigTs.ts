import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { AppCheck } from '../AppCheck.ts';

export const hasConfigTs: AppCheck = {
    name: 'has config.ts',
    run: ({ appDir }) => {
        const configPath = join(appDir, 'config.ts');

        if (!existsSync(configPath)) {
            return [`missing config.ts`];
        }

        return [];
    },
};
