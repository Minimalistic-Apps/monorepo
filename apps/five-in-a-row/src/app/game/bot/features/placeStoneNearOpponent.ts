import type { BotFeature } from '../botType';

const buildCenterIndex = (boardSize: number): number => {
    const middle = Math.floor(boardSize / 2);

    return middle * boardSize + middle;
};

const offsets: ReadonlyArray<readonly [number, number]> = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
];

export const placeStoneNearOpponent: BotFeature = state => {
    if (state.moveCount === 0 || state.lastMoveIndex === null) {
        const centerIndex = buildCenterIndex(state.boardSize);

        return state.board[centerIndex] === null ? centerIndex : null;
    }

    const x = state.lastMoveIndex % state.boardSize;
    const y = Math.floor(state.lastMoveIndex / state.boardSize);

    for (const [offsetX, offsetY] of offsets) {
        const nextX = x + offsetX;
        const nextY = y + offsetY;
        const isInsideBoard =
            nextX >= 0 && nextY >= 0 && nextX < state.boardSize && nextY < state.boardSize;

        if (!isInsideBoard) {
            continue;
        }

        const index = nextY * state.boardSize + nextX;

        if (state.board[index] === null) {
            return index;
        }
    }

    return null;
};
