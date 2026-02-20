import { describe, expect, test } from 'vitest';
import { createEmptyBoard, type GameState } from '../game';
import { botMove } from './bot';

interface CreateStateProps {
    readonly boardSize: number;
    readonly currentPlayer: 'ring' | 'cross';
    readonly moveCount: number;
    readonly lastMoveIndex: number | null;
    readonly board?: GameState['board'];
}

const createState = ({
    boardSize,
    currentPlayer,
    moveCount,
    lastMoveIndex,
    board,
}: CreateStateProps): GameState => ({
    boardSize,
    board: board ?? createEmptyBoard({ size: boardSize }),
    currentPlayer,
    winner: null,
    moveCount,
    lastMoveIndex,
});

describe(botMove.name, () => {
    test('plays in the middle when bot is first', () => {
        const state = createState({
            boardSize: 5,
            currentPlayer: 'cross',
            moveCount: 0,
            lastMoveIndex: null,
        });

        const nextState = botMove(state);

        expect(nextState.board[12]).toBe('cross');
    });

    test('plays next to opponent last move', () => {
        const board = createEmptyBoard({ size: 5 });
        board[6] = 'ring';

        const state = createState({
            boardSize: 5,
            currentPlayer: 'cross',
            moveCount: 1,
            lastMoveIndex: 6,
            board,
        });

        const nextState = botMove(state);

        expect(nextState.board[7]).toBe('cross');
    });
});
