import { botMove } from '../bot/bot';
import {
    createEmptyBoard,
    findWinner,
    type GameBoard,
    type GameState,
    getNextPlayer,
    isBoardFull,
    type Player,
} from '../game';

export const maxBotBoardSize = 15;

interface CreateSnapshotProps {
    readonly boardSize: number;
}

interface ClampBoardSizeProps {
    readonly size: number;
    readonly gameMode: 'human' | 'bot';
}

interface BuildSnapshotAfterMoveProps {
    readonly snapshot: GameState;
    readonly index: number;
    readonly gameMode: 'human' | 'bot';
    readonly botPlayer: Player;
}

interface BuildNextSnapshotProps {
    readonly snapshot: GameState;
    readonly index: number;
}

const buildNextSnapshot = ({ snapshot, index }: BuildNextSnapshotProps): GameState | null => {
    if (snapshot.winner !== null || snapshot.board[index] !== null) {
        return null;
    }

    const nextBoard: GameBoard = [...snapshot.board];
    nextBoard[index] = snapshot.currentPlayer;

    const nextWinner = findWinner({
        board: nextBoard,
        size: snapshot.boardSize,
        lastMoveIndex: index,
    });

    if (nextWinner !== null) {
        return {
            ...snapshot,
            board: nextBoard,
            winner: nextWinner,
            lastMoveIndex: index,
        };
    }

    if (isBoardFull({ board: nextBoard })) {
        return {
            ...snapshot,
            board: nextBoard,
            moveCount: snapshot.moveCount + 1,
            lastMoveIndex: index,
        };
    }

    return {
        ...snapshot,
        board: nextBoard,
        moveCount: snapshot.moveCount + 1,
        currentPlayer: getNextPlayer({ player: snapshot.currentPlayer }),
        lastMoveIndex: index,
    };
};

export const createSnapshot = ({ boardSize }: CreateSnapshotProps): GameState => ({
    boardSize,
    board: createEmptyBoard({ size: boardSize }),
    currentPlayer: 'ring',
    winner: null,
    moveCount: 0,
    lastMoveIndex: null,
});

export const clampBoardSize = ({ size, gameMode }: ClampBoardSizeProps): number => {
    if (gameMode === 'bot') {
        return size > maxBotBoardSize ? maxBotBoardSize : size;
    }

    return size;
};

export const buildSnapshotAfterMove = ({
    snapshot,
    index,
    gameMode,
    botPlayer,
}: BuildSnapshotAfterMoveProps): GameState | null => {
    const nextSnapshot = buildNextSnapshot({ snapshot, index });

    if (nextSnapshot === null) {
        return null;
    }

    const shouldPlayBot =
        gameMode === 'bot' &&
        nextSnapshot.winner === null &&
        !isBoardFull({ board: nextSnapshot.board }) &&
        nextSnapshot.currentPlayer === botPlayer;

    return shouldPlayBot ? botMove(nextSnapshot) : nextSnapshot;
};
