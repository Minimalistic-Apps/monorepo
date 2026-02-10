import { basename } from 'node:path';
import type { ProjectType, Requirement } from './requirements/Requirement';

export interface FixProjectsProps {
    readonly projectDirs: ReadonlyArray<string>;
    readonly projectType: ProjectType;
    readonly filteredRequirements: ReadonlyArray<Requirement>;
}

export const fixProjects = async ({
    projectDirs,
    projectType,
    filteredRequirements,
}: FixProjectsProps): Promise<ReadonlyArray<string>> => {
    const errors: Array<string> = [];

    for (const dir of projectDirs) {
        const dirName = basename(dir);
        console.log(`\nFixing ${dir}…`);

        for (const requirement of filteredRequirements) {
            if (!requirement.applies({ projectType, dirName })) {
                continue;
            }

            const requirementErrors = await requirement.fix({ appDir: dir });

            for (const error of requirementErrors) {
                errors.push(`${dir} [${requirement.name}]: ${error}`);
            }
        }
    }

    return errors;
};
