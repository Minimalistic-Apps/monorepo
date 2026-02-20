import { botMove } from './bot/botMove';
import { isBoardFull } from './game';
import type { GameStoreDep } from './store/createGameStore';
import type { PlayMoveDep } from './store/playMove';

export type PlayerMoveParams = {
    readonly index: number;
};

export type PlayerMove = (params: PlayerMoveParams) => void;

export type PlayerMoveDep = {
    readonly playerMove: PlayerMove;
};

type PlayerMoveDeps = GameStoreDep & PlayMoveDep;

export const createPlayerMove =
    (deps: PlayerMoveDeps): PlayerMove =>
    ({ index }) => {
        deps.playMove({ index });

        const state = deps.gameStore.getState();
        const snapshot = state.history.present;
        const shouldPlayBot =
            state.gameMode === 'bot' &&
            snapshot.winner === null &&
            !isBoardFull({ board: snapshot.board }) &&
            snapshot.currentPlayer === state.botPlayer;

        if (!shouldPlayBot) {
            return;
        }

        const botIndex = botMove(snapshot);

        if (botIndex !== null && botIndex !== -1) {
            deps.playMove({ index: botIndex });
        }
    };
