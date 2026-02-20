import type { GameState } from '../game';
import type { Bot } from './Bot';

export const botMove = (state: GameState): number | null => {
    const bot: Bot = () => {};

    return bot(state);
};
