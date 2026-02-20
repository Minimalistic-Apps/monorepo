import { isTheme, type Theme } from '@minimalist-apps/components';
import type { LocalStorageDep } from '@minimalist-apps/local-storage';
import { type GameMode, isGameMode, isValidBoardSize } from '../app/game/store/createGameStore';
import type { SetBoardSizeDeps } from '../app/game/store/setBoardSize';
import type { SetGameModeDeps } from '../app/game/store/setGameMode';
import type { AppStoreDep } from '../appStore/createAppStore';
import { STORAGE_KEYS } from './storageKeys';

export type LoadInitialState = () => void;

export interface LoadInitialStateDep {
    readonly loadInitialState: LoadInitialState;
}

type LoadInitialStateDeps = AppStoreDep & LocalStorageDep & SetBoardSizeDeps & SetGameModeDeps;

export const createLoadInitialState =
    (deps: LoadInitialStateDeps): LoadInitialState =>
    () => {
        const savedThemeResult = deps.localStorage.load<Theme>(STORAGE_KEYS.THEME_MODE);
        const savedBoardSizeResult = deps.localStorage.load<number>(STORAGE_KEYS.BOARD_SIZE);
        const savedGameModeResult = deps.localStorage.load<GameMode>(STORAGE_KEYS.GAME_MODE);

        if (savedThemeResult.ok && isTheme(savedThemeResult.value)) {
            deps.store.setState({ themeMode: savedThemeResult.value });
        }

        if (savedBoardSizeResult.ok && isValidBoardSize(savedBoardSizeResult.value)) {
            deps.setBoardSize(savedBoardSizeResult.value);
        }

        if (savedGameModeResult.ok && isGameMode(savedGameModeResult.value)) {
            deps.setGameMode(savedGameModeResult.value);
        }
    };
