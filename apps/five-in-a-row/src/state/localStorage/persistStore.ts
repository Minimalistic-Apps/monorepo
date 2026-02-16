import type { LocalStorageDep } from '@minimalist-apps/local-storage';
import { type GameStore, selectBoardSize } from '../../app/gameStore';
import type { StoreDep } from '../createStore';
import { selectThemeMode } from '../State';
import { STORAGE_KEYS } from './storageKeys';

type Unsubscribe = () => void;

export type PersistStore = () => Unsubscribe;

export interface PersistStoreDep {
    readonly persistStore: PersistStore;
}

type PersistStoreDeps = StoreDep &
    LocalStorageDep & {
        readonly gameStore: GameStore;
    };

export const createPersistStore =
    (deps: PersistStoreDeps): PersistStore =>
    () => {
        const unsubscribeAppStore = deps.store.subscribe(() => {
            const themeMode = selectThemeMode(deps.store.getState());
            deps.localStorage.save(STORAGE_KEYS.THEME_MODE, themeMode);
        });

        const unsubscribeGameStore = deps.gameStore.subscribe(() => {
            const boardSize = selectBoardSize(deps.gameStore.getState());
            deps.localStorage.save(STORAGE_KEYS.BOARD_SIZE, boardSize);
        });

        return () => {
            unsubscribeAppStore();
            unsubscribeGameStore();
        };
    };
