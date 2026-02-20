import type { GameState } from '../game';

export type Bot = (state: GameState) => number | null;
