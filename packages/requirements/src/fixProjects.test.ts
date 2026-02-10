import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { fixProjects } from './fixProjects';
import type { Requirement } from './requirements/Requirement';

const createTempDir = (): string => mkdtempSync(join(tmpdir(), 'fix-'));

const createMockRequirement = ({
    name,
    applies = () => true,
    fix = async () => [],
}: Partial<Requirement> & { name: string }): Requirement => ({
    name,
    applies,
    fix,
    verify: () => [],
});

describe(fixProjects.name, () => {
    let appDir: string;

    beforeEach(() => {
        appDir = createTempDir();
    });

    afterEach(() => {
        rmSync(appDir, { recursive: true, force: true });
    });

    test('returns no errors when all requirements pass', async () => {
        const errors = await fixProjects({
            projectDirs: [appDir],
            projectType: 'app',
            filteredRequirements: [createMockRequirement({ name: 'passing-req' })],
        });

        expect(errors).toEqual([]);
    });

    test('returns errors from a failing requirement', async () => {
        const errors = await fixProjects({
            projectDirs: [appDir],
            projectType: 'app',
            filteredRequirements: [
                createMockRequirement({
                    name: 'failing-req',
                    fix: async () => ['could not fix'],
                }),
            ],
        });

        expect(errors).toEqual([`${appDir} [failing-req]: could not fix`]);
    });

    test('collects errors from multiple requirements', async () => {
        const errors = await fixProjects({
            projectDirs: [appDir],
            projectType: 'app',
            filteredRequirements: [
                createMockRequirement({
                    name: 'req-a',
                    fix: async () => ['error from a'],
                }),
                createMockRequirement({
                    name: 'req-b',
                    fix: async () => ['error from b'],
                }),
            ],
        });

        expect(errors).toEqual([
            `${appDir} [req-a]: error from a`,
            `${appDir} [req-b]: error from b`,
        ]);
    });

    test('collects errors across multiple project dirs', async () => {
        const secondDir = createTempDir();

        const errors = await fixProjects({
            projectDirs: [appDir, secondDir],
            projectType: 'app',
            filteredRequirements: [
                createMockRequirement({
                    name: 'req-a',
                    fix: async () => ['broken'],
                }),
            ],
        });

        expect(errors).toEqual([`${appDir} [req-a]: broken`, `${secondDir} [req-a]: broken`]);

        rmSync(secondDir, { recursive: true, force: true });
    });

    test('skips requirements that do not apply', async () => {
        const errors = await fixProjects({
            projectDirs: [appDir],
            projectType: 'app',
            filteredRequirements: [
                createMockRequirement({
                    name: 'skipped-req',
                    applies: () => false,
                    fix: async () => ['should not appear'],
                }),
            ],
        });

        expect(errors).toEqual([]);
    });

    test('applies is called with correct projectType and dirName', async () => {
        const appliesCalls: Array<{ projectType: string; dirName: string }> = [];

        await fixProjects({
            projectDirs: [appDir],
            projectType: 'package',
            filteredRequirements: [
                createMockRequirement({
                    name: 'spy-req',
                    applies: ({ projectType, dirName }) => {
                        appliesCalls.push({ projectType, dirName });

                        return false;
                    },
                }),
            ],
        });

        expect(appliesCalls).toHaveLength(1);
        expect(appliesCalls[0]?.projectType).toBe('package');
    });

    test('returns no errors when project dirs are empty', async () => {
        const errors = await fixProjects({
            projectDirs: [],
            projectType: 'app',
            filteredRequirements: [
                createMockRequirement({
                    name: 'req',
                    fix: async () => ['should not appear'],
                }),
            ],
        });

        expect(errors).toEqual([]);
    });

    test('collects multiple errors from a single requirement', async () => {
        const errors = await fixProjects({
            projectDirs: [appDir],
            projectType: 'app',
            filteredRequirements: [
                createMockRequirement({
                    name: 'multi-error-req',
                    fix: async () => ['first error', 'second error'],
                }),
            ],
        });

        expect(errors).toEqual([
            `${appDir} [multi-error-req]: first error`,
            `${appDir} [multi-error-req]: second error`,
        ]);
    });
});
