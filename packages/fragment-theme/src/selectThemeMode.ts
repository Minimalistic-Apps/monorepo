import type { Theme } from '@minimalist-apps/components';
import type { ThemeState } from './themeState';

export const selectThemeMode = <State extends ThemeState>(state: State): Theme => state.themeMode;
