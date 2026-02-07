import type { CurrencyCode } from '@evolu/common';
import type { StoreDep } from './createStore';

export type SetFocusedCurrency = (code: CurrencyCode | 'BTC') => void;

export interface SetFocusedCurrencyDep {
    readonly setFocusedCurrency: SetFocusedCurrency;
}

export const createSetFocusedCurrency =
    (deps: StoreDep): SetFocusedCurrency =>
    code =>
        deps.store.setState({ focusedCurrency: code });
