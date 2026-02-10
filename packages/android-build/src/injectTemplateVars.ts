import { typedObjectEntries } from '@minimalist-apps/type-utils';

/** Replaces `{{key}}` placeholders in a template string with the given values. */
export const injectTemplateVars = (
    template: string,
    vars: Readonly<Record<string, string>>,
): string =>
    typedObjectEntries(vars).reduce(
        (result, [key, value]) => result.replaceAll(`{{${key}}}`, value),
        template,
    );
