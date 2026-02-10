import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const templatesDir = resolve(dirname(fileURLToPath(import.meta.url)), 'templates');

/** Reads a template file from the `templates/` directory. */
export const readTemplate = (filename: string): string =>
    readFileSync(resolve(templatesDir, filename), 'utf-8');
