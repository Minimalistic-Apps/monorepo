import { createUndoState } from '@minimalist-apps/undo';
import { createRootSnapshot } from '../createRootSnapshot';
import { clampBoardSize, type GameStore } from './createGameStore';

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

        deps.gameStore.setState({
            history: createUndoState(createRootSnapshot({ boardSize: size })),
        });
    };
