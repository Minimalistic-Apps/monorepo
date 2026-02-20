import { undo } from '@minimalist-apps/undo';
import type { GameStore } from './createGameStore';

export type UndoMove = () => void;

export type UndoMoveDeps = {
    readonly undoMove: UndoMove;
};

interface CreateUndoMoveDeps {
    readonly gameStore: GameStore;
}

export const createUndoMove =
    (deps: CreateUndoMoveDeps): UndoMove =>
    () => {
        const { history } = deps.gameStore.getState();

        deps.gameStore.setState({ history: undo({ state: history }) });
    };
