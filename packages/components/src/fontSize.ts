export type FontSize = 'tiny' | 'small' | 'medium' | 'large';

const fontSizeOrder: readonly FontSize[] = ['tiny', 'small', 'medium', 'large'];

export const fontSizeMap: Record<FontSize, string> = {
    tiny: '0.5rem',
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
};

export const decreaseFontSize = (fontSize: FontSize, steps: number): FontSize => {
    const index = fontSizeOrder.indexOf(fontSize);
    const nextIndex = Math.max(0, index - steps);

    return fontSizeOrder[nextIndex];
};
