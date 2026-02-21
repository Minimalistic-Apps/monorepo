import type { ThemeState } from '@minimalist-apps/fragment-theme';

export type Screen = 'Chat' | 'Settings';

export interface AppState extends ThemeState {
    readonly currentScreen: Screen;
}

export const selectCurrentScreen = (state: AppState): Screen => state.currentScreen;
