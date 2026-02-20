import { write } from '@minimalist-apps/undo';
import { buildNextSnapshot } from '../buildNextSnapshot';
import type { GameStore } from './createGameStore';

export type PlayMove = (params: { index: number }) => void;

export type PlayMoveDep = {
    readonly playMove: PlayMove;
};

interface PlayMoveDeps {
    readonly gameStore: GameStore;
}

export const createPlayMove =
    (deps: PlayMoveDeps): PlayMove =>
    ({ index }) => {
        const state = deps.gameStore.getState();

        const nextSnapshot = buildNextSnapshot({
            snapshot: state.history.present,
            index,
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
