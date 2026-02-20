import { createUndoState } from '@minimalist-apps/undo';
import type { GameStore } from './createGameStore';
import { clampBoardSize, createSnapshot } from './gameStateTransforms';

export type SetBoardSize = (size: number) => void;

export type SetBoardSizeDeps = {
    readonly setBoardSize: SetBoardSize;
};

interface CreateSetBoardSizeDeps {
    readonly gameStore: GameStore;
}

export const createSetBoardSize =
    (deps: CreateSetBoardSizeDeps): SetBoardSize =>
    size => {
        const mode = deps.gameStore.getState().gameMode;
        const nextSize = clampBoardSize({ size, gameMode: mode });

        deps.gameStore.setState({
            history: createUndoState(createSnapshot({ boardSize: nextSize })),
        });
    };
