import type { GameState } from '../game';

export type BotFeature = (state: GameState) => number | null;
