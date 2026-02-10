import { basename } from 'node:path';
import type { ProjectType, Requirement } from './requirements/Requirement';

export interface VerifyProjectsProps {
    readonly projectDirs: ReadonlyArray<string>;
    readonly projectType: ProjectType;
    readonly filteredRequirements: ReadonlyArray<Requirement>;
}

export const verifyProjects = ({
    projectDirs,
    projectType,
    filteredRequirements,
}: VerifyProjectsProps): ReadonlyArray<string> => {
    const errors: Array<string> = [];

    for (const dir of projectDirs) {
        const dirName = basename(dir);

        for (const requirement of filteredRequirements) {
            if (!requirement.applies({ projectType, dirName })) {
                continue;
            }

            const requirementErrors = requirement.verify({ appDir: dir });

            for (const error of requirementErrors) {
                errors.push(`${dir} [${requirement.name}]: ${error}`);
            }
        }
    }

    return errors;
};
