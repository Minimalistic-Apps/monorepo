export type Theme = 'dark' | 'light';

interface ColorScheme {
    readonly primary: string;
    readonly background: string;
    readonly backgroundBase: string;
    readonly elevated: string;
    readonly textPrimary: string;
    readonly textSecondary: string;
    readonly border: string;
    readonly error: string;
    readonly fadedColor: string;
    readonly fadedColorLight: string;
    readonly halfFadedColor: string;
    readonly transparent: string;
}

/**
 * Minimalistic Apps brand colors from style guidelines.
 * @see https://github.com/Minimalistic-Apps/style-guidelines
 */
export const COLORS: Record<Theme, ColorScheme> = {
    dark: {
        primary: '#087d89',
        background: '#1e1e1e',
        backgroundBase: '#121212',
        elevated: '#2a2a2a',
        textPrimary: '#ffffff',
        textSecondary: '#999999',
        border: '#333333',
        error: '#ff4d4f',
        fadedColor: '#777777FF',
        fadedColorLight: '#999999FF',
        halfFadedColor: '#CCCCCCFF',
        transparent: '#FFFFFF5D',
    },
    light: {
        primary: '#087d89',
        background: '#ffffff',
        backgroundBase: '#f5f5f5',
        elevated: '#ffffff',
        textPrimary: '#1e1e1e',
        textSecondary: '#666666',
        border: '#e0e0e0',
        error: '#ff4d4f',
        fadedColor: '#cccccc',
        fadedColorLight: '#e0e0e0',
        halfFadedColor: '#f5f5f5',
        transparent: '#FFFFFF5D',
    },
} as const;

/**
 * Inject color variables as CSS custom properties into the document root.
 * This allows using colors in CSS files via var(--color-primary), var(--color-background), etc.
 */
export const injectColorVariables = (mode: Theme): void => {
    const colors = COLORS[mode];
    const root = document.documentElement;

    for (const [key, value] of Object.entries(colors)) {
        root.style.setProperty(`--color-${key}`, value);
    }
};
