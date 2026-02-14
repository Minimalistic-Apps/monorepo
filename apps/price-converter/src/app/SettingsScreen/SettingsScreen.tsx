import { Column } from '@minimalist-apps/components';
import type { BackupMnemonicDep, RestoreMnemonicDep } from '@minimalist-apps/module-evolu-settings';
import type { FC } from 'react';
import type { DebugSettingsDep } from './DebugSettings';
import type { ThemeSettingsDep } from './ThemeSettings';

type SettingsScreenDeps = ThemeSettingsDep &
    DebugSettingsDep &
    BackupMnemonicDep &
    RestoreMnemonicDep;

export type SettingsScreenDep = { SettingsScreen: FC };

export const SettingsScreenPure = (deps: SettingsScreenDeps) => (
    <Column gap={12}>
        <deps.ThemeSettings />
        <deps.BackupMnemonic />
        <deps.RestoreMnemonic />
        <deps.DebugSettings />
    </Column>
);
