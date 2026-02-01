import type { AmountSats } from './types';

export const formatSats = (sats: AmountSats): string =>
    sats.toFixed(3).replace(/\.?0+$/, '');
