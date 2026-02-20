import { createUndoState } from '@minimalist-apps/undo';
import type { GameMode, GameStore } from './createGameStore';
import { clampBoardSize, createSnapshot } from './gameStateTransforms';

export type SetGameMode = (mode: GameMode) => void;

export type SetGameModeDeps = {
    readonly setGameMode: SetGameMode;
};

interface CreateSetGameModeDeps {
    readonly gameStore: GameStore;
}

export const createSetGameMode =
    (deps: CreateSetGameModeDeps): SetGameMode =>
    mode => {
        const state = deps.gameStore.getState();
        const size = clampBoardSize({
            size: state.history.present.boardSize,
            gameMode: mode,
        });

        deps.gameStore.setState({
            gameMode: mode,
            botPlayer: 'cross',
            history: createUndoState(createSnapshot({ boardSize: size })),
        });
    };
