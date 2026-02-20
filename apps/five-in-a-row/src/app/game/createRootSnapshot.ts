import type { GameBoard, GameState } from './game';

interface CreateEmptyBoardProps {
    readonly size: number;
}

export const createEmptyBoard = ({ size }: CreateEmptyBoardProps): GameBoard =>
    Array.from({ length: size * size }, () => null);

interface CreateSnapshotProps {
    readonly boardSize: number;
}

export const createRootSnapshot = ({ boardSize }: CreateSnapshotProps): GameState => ({
    boardSize,
    board: createEmptyBoard({ size: boardSize }),
    currentPlayer: 'ring',
    winner: null,
    moveCount: 0,
    lastMoveIndex: null,
});
