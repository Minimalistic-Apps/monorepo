import { findWinner, type GameBoard, type GameState, getNextPlayer, isBoardFull } from './game';

interface BuildNextSnapshotProps {
    readonly snapshot: GameState;
    readonly index: number;
}

export const buildNextSnapshot = ({
    snapshot,
    index,
}: BuildNextSnapshotProps): GameState | null => {
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
