import { write } from '@minimalist-apps/undo';
import type { GameStore } from './createGameStore';
import { buildSnapshotAfterMove } from './gameStateTransforms';

export type PlayMove = (index: number) => void;

export type PlayMoveDeps = {
    readonly playMove: PlayMove;
};

interface CreatePlayMoveDeps {
    readonly gameStore: GameStore;
}

export const createPlayMove =
    (deps: CreatePlayMoveDeps): PlayMove =>
    index => {
        const state = deps.gameStore.getState();
        const nextSnapshot = buildSnapshotAfterMove({
            snapshot: state.history.present,
            index,
            gameMode: state.gameMode,
            botPlayer: state.botPlayer,
        });

        if (nextSnapshot === null) {
            return;
        }

        deps.gameStore.setState({
            history: write({
                state: state.history,
                next: nextSnapshot,
            }),
        });
    };
