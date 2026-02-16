import type { Theme } from '@minimalist-apps/components';
import type { LocalStorageDep } from '@minimalist-apps/local-storage';
import type { GameStore } from '../../app/gameStore';
import type { StoreDep } from '../createStore';
import { STORAGE_KEYS } from './storageKeys';

export type LoadInitialState = () => void;

export interface LoadInitialStateDep {
    readonly loadInitialState: LoadInitialState;
}

type LoadInitialStateDeps = StoreDep &
    LocalStorageDep & {
        readonly gameStore: GameStore;
    };

const isTheme = (value: unknown): value is Theme => value === 'dark' || value === 'light';

const isValidBoardSize = (value: unknown): value is number =>
    typeof value === 'number' && Number.isInteger(value) && value >= 3 && value <= 30;

export const createLoadInitialState =
    (deps: LoadInitialStateDeps): LoadInitialState =>
    () => {
        const savedThemeResult = deps.localStorage.load<Theme>(STORAGE_KEYS.THEME_MODE);
        const savedBoardSizeResult = deps.localStorage.load<number>(STORAGE_KEYS.BOARD_SIZE);

        if (savedThemeResult.ok && isTheme(savedThemeResult.value)) {
            deps.store.setState({ themeMode: savedThemeResult.value });
        }

        if (savedBoardSizeResult.ok && isValidBoardSize(savedBoardSizeResult.value)) {
            deps.gameStore.setBoardSize(savedBoardSizeResult.value);
        }
    };
