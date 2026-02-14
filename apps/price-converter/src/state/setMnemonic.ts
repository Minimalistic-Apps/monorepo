import type { Mnemonic } from '@evolu/common';
import type { StoreDep } from './createStore';

export type SetMnemonic = (mnemonic: Mnemonic) => void;

export interface SetMnemonicDep {
    readonly setMnemonic: SetMnemonic;
}

export const createSetMnemonic =
    (deps: StoreDep): SetMnemonic =>
    mnemonic =>
        deps.store.setState({ evoluMnemonic: mnemonic });
