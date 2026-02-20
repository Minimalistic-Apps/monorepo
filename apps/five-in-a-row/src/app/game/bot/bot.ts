import { findWinner, type GameBoard, type GameState, getNextPlayer, isBoardFull } from '../game';
import type { BotFeature } from './botType';
import { placeStoneNearOpponent } from './features/placeStoneNearOpponent';

const features: ReadonlyArray<BotFeature> = [placeStoneNearOpponent];

const buildFallbackMove = (board: GameBoard): number | null => board.indexOf(null);

interface ApplyMoveProps {
    readonly state: GameState;
    readonly index: number;
}

const applyMove = ({ state, index }: ApplyMoveProps): GameState => {
    if (state.winner !== null || state.board[index] !== null) {
        return state;
    }

    const nextBoard: GameBoard = [...state.board];
    nextBoard[index] = state.currentPlayer;

    const nextWinner = findWinner({
        board: nextBoard,
        size: state.boardSize,
        lastMoveIndex: index,
    });

    if (nextWinner !== null) {
        return {
            ...state,
            board: nextBoard,
            winner: nextWinner,
            lastMoveIndex: index,
        };
    }

    if (isBoardFull({ board: nextBoard })) {
        return {
            ...state,
            board: nextBoard,
            moveCount: state.moveCount + 1,
            lastMoveIndex: index,
        };
    }

    return {
        ...state,
        board: nextBoard,
        moveCount: state.moveCount + 1,
        currentPlayer: getNextPlayer({ player: state.currentPlayer }),
        lastMoveIndex: index,
    };
};

export const botMove = (state: GameState): GameState => {
    const featureMove = features
        .map(feature => feature(state))
        .find(index => index !== null && index !== -1);

    const index = featureMove ?? buildFallbackMove(state.board);

    if (index === null || index === -1) {
        return state;
    }

    return applyMove({ state, index });
};
