import type { Requirement } from './requirements/Requirement';

interface FilterRequirementsByNameProps {
    readonly requirements: ReadonlyArray<Requirement>;
    readonly only: string | undefined;
}

export const filterRequirementsByName = ({
    requirements,
    only,
}: FilterRequirementsByNameProps): ReadonlyArray<Requirement> => {
    if (only === undefined) {
        return requirements;
    }

    return requirements.filter(requirement => requirement.name === only);
};
