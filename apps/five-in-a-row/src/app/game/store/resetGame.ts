import { createUndoState } from '@minimalist-apps/undo';
import type { GameStore } from './createGameStore';
import { clampBoardSize, createSnapshot } from './gameStateTransforms';

export type ResetGame = () => void;

export type ResetGameDeps = {
    readonly resetGame: ResetGame;
};

interface CreateResetGameDeps {
    readonly gameStore: GameStore;
}

export const createResetGame =
    (deps: CreateResetGameDeps): ResetGame =>
    () => {
        const state = deps.gameStore.getState();
        const size = clampBoardSize({
            size: state.history.present.boardSize,
            gameMode: state.gameMode,
        });

        deps.gameStore.setState({ history: createUndoState(createSnapshot({ boardSize: size })) });
    };
