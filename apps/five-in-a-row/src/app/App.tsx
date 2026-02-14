import {
    AppHeader,
    Button,
    Card,
    Column,
    Input,
    Layout,
    Paragraph,
    Row,
    SettingOutlined,
    SettingsRow,
    Text,
    ThemeProvider,
} from '@minimalist-apps/components';
import { useMemo, useState } from 'react';
import { config } from '../../config';

type Player = 'X' | 'O';
type Cell = Player | null;

const MIN_GRID_SIZE = 3;
const MAX_GRID_SIZE = 30;
const DEFAULT_GRID_SIZE = 15;
const WIN_LENGTH = 5;

const createBoard = (gridSize: number): ReadonlyArray<Cell> =>
    Array.from({ length: gridSize * gridSize }, () => null);

const toRowColumn = (index: number, gridSize: number) => ({
    row: Math.floor(index / gridSize),
    column: index % gridSize,
});

const isInsideGrid = (row: number, column: number, gridSize: number) =>
    row >= 0 && row < gridSize && column >= 0 && column < gridSize;

const hasFiveInRow = (
    board: ReadonlyArray<Cell>,
    index: number,
    gridSize: number,
    player: Player,
): boolean => {
    const { row, column } = toRowColumn(index, gridSize);
    const directions = [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, -1],
    ] as const;

    for (const [rowDelta, columnDelta] of directions) {
        let count = 1;

        for (const direction of [1, -1] as const) {
            let currentRow = row + rowDelta * direction;
            let currentColumn = column + columnDelta * direction;

            while (isInsideGrid(currentRow, currentColumn, gridSize)) {
                const currentIndex = currentRow * gridSize + currentColumn;

                if (board[currentIndex] !== player) {
                    break;
                }

                count += 1;
                currentRow += rowDelta * direction;
                currentColumn += columnDelta * direction;
            }
        }

        if (count >= WIN_LENGTH) {
            return true;
        }
    }

    return false;
};

const clampGridSize = (size: number): number =>
    Math.max(MIN_GRID_SIZE, Math.min(MAX_GRID_SIZE, size));

const parseGridSize = (value: string): number | null => {
    const parsed = Number.parseInt(value, 10);

    if (!Number.isFinite(parsed)) {
        return null;
    }

    return clampGridSize(parsed);
};

export const App = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE);
    const [gridSizeInput, setGridSizeInput] = useState(String(DEFAULT_GRID_SIZE));
    const [board, setBoard] = useState<ReadonlyArray<Cell>>(() => createBoard(DEFAULT_GRID_SIZE));
    const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
    const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

    const statusText = useMemo(() => {
        if (winner === 'Draw') {
            return 'Draw';
        }

        if (winner != null) {
            return `Winner: ${winner}`;
        }

        return `Turn: ${currentPlayer}`;
    }, [currentPlayer, winner]);

    const resetGame = (nextGridSize: number = gridSize) => {
        setBoard(createBoard(nextGridSize));
        setCurrentPlayer('X');
        setWinner(null);
    };

    const applyGridSize = () => {
        const parsedSize = parseGridSize(gridSizeInput);

        if (parsedSize == null) {
            setGridSizeInput(String(gridSize));

            return;
        }

        setGridSize(parsedSize);
        setGridSizeInput(String(parsedSize));
        resetGame(parsedSize);
    };

    const handleCellClick = (index: number) => {
        if (winner != null || board[index] != null) {
            return;
        }

        const nextBoard = [...board];
        nextBoard[index] = currentPlayer;
        setBoard(nextBoard);

        if (hasFiveInRow(nextBoard, index, gridSize, currentPlayer)) {
            setWinner(currentPlayer);

            return;
        }

        if (nextBoard.every(cell => cell != null)) {
            setWinner('Draw');

            return;
        }

        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    return (
        <ThemeProvider>
            <Layout>
                <Layout.Header>
                    <AppHeader title={`${config.appIconEmoji} ${config.appShortName}`}>
                        <Button
                            variant="text"
                            icon={<SettingOutlined />}
                            onClick={() => setIsSettingsOpen(value => !value)}
                        />
                    </AppHeader>
                </Layout.Header>
                <Layout.Content>
                    <Column gap={12}>
                        {isSettingsOpen ? (
                            <SettingsRow
                                label="Grid Size"
                                description="Single board size (NxN), min 3, max 30"
                                direction="column"
                            >
                                <Column gap={8}>
                                    <Row gap={8}>
                                        <Input
                                            value={gridSizeInput}
                                            onChange={setGridSizeInput}
                                            inputMode="numeric"
                                            placeholder="15"
                                        />
                                        <Button onClick={applyGridSize}>Apply</Button>
                                    </Row>
                                    <Text secondary>
                                        Current: {gridSize}x{gridSize}
                                    </Text>
                                </Column>
                            </SettingsRow>
                        ) : null}

                        <Card>
                            <Row
                                justify="space-between"
                                align="center"
                                style={{ marginBottom: 12 }}
                            >
                                <Text strong>{statusText}</Text>
                                <Button onClick={() => resetGame()}>New Game</Button>
                            </Row>
                            <Paragraph style={{ marginBottom: 12 }}>
                                Place five symbols in a row to win.
                            </Paragraph>
                            <div style={{ overflowX: 'auto' }}>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: `repeat(${String(gridSize)}, minmax(28px, 1fr))`,
                                        gap: 4,
                                        minWidth: 'fit-content',
                                    }}
                                >
                                    {board.map((cell, index) => (
                                        <Button
                                            key={String(index)}
                                            onClick={() => handleCellClick(index)}
                                            disabled={cell != null || winner != null}
                                            style={{ width: 28, height: 28, padding: 0 }}
                                        >
                                            {cell ?? ''}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </Column>
                </Layout.Content>
            </Layout>
        </ThemeProvider>
    );
};
