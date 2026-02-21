import type { Theme } from '@minimalist-apps/components';
import type { ThemeState, ThemeStoreDep } from './themeState';

export type SetThemeMode = (themeMode: Theme) => void;

export type SetThemeModeDep = {
    readonly setThemeMode: SetThemeMode;
};

export const createSetThemeMode =
    <State extends ThemeState>(deps: ThemeStoreDep<State>): SetThemeMode =>
    (themeMode): void => {
        deps.store.setState({ themeMode } as Partial<State>);
    };
