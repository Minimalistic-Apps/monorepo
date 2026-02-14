import type { Connect } from '@minimalist-apps/connect';
import {
    type MnemonicSettingsDep,
    MnemonicSettingsPure,
    type MnemonicSettingsStateProps,
} from './MnemonicSettings.js';

interface EvoluSettingsStoreState {
    readonly evoluMnemonic: MnemonicSettingsStateProps['evoluMnemonic'];
}

interface EvoluSettingsStates {
    readonly store: EvoluSettingsStoreState;
}

export interface EvoluSettingsCompositionRootDeps {
    readonly connect: Connect<EvoluSettingsStates>;
}

export const createEvoluSettingsCompositionRoot = (
    deps: EvoluSettingsCompositionRootDeps,
): MnemonicSettingsDep => {
    const { connect } = deps;

    const MnemonicSettings = connect(MnemonicSettingsPure, ({ store }) => ({
        evoluMnemonic: store.evoluMnemonic,
    }));

    return { MnemonicSettings };
};
