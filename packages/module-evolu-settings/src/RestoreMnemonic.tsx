import { Banner, Button, Column, Modal, SettingsRow, Textarea } from '@minimalist-apps/components';
import type { FC } from 'react';
import { useState } from 'react';

export type RestoreMnemonicDep = {
    readonly RestoreMnemonic: FC;
};

export const RestoreMnemonic = () => {
    const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
    const [restoreSeed, setRestoreSeed] = useState('');

    return (
        <SettingsRow label="Restore">
            <Modal
                open={isRestoreModalOpen}
                title="Restore Backup"
                onCancel={() => setIsRestoreModalOpen(false)}
                onOk={() => setIsRestoreModalOpen(false)}
                okText="Restore"
                cancelText="Cancel"
            >
                <Column gap={16}>
                    <Banner showIcon={true} intent="warning">
                        Restoring from a backup will overwrite your current data. Make sure you have
                        a backup of your current mnemonic if you want to keep those data.
                    </Banner>

                    <Textarea
                        value={restoreSeed}
                        onChange={setRestoreSeed}
                        placeholder="Enter your backup phrase here"
                        rows={6}
                        style={{ width: '100%' }}
                    />
                </Column>
            </Modal>
            <Button onClick={() => setIsRestoreModalOpen(true)} intent="primary">
                Restore Backup
            </Button>
        </SettingsRow>
    );
};
