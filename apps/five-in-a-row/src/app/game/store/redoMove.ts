import { redo } from '@minimalist-apps/undo';
import type { GameStore } from './createGameStore';

export type RedoMove = () => void;

export type RedoMoveDeps = {
    readonly redoMove: RedoMove;
};

interface CreateRedoMoveDeps {
    readonly gameStore: GameStore;
}

export const createRedoMove =
    (deps: CreateRedoMoveDeps): RedoMove =>
    () => {
        const { history } = deps.gameStore.getState();

        deps.gameStore.setState({ history: redo({ state: history }) });
    };
