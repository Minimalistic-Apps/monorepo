import {
    clickElementByTestId,
    getElementAttributeByTestId,
    typeIntoElementByTestId,
    waitForElementByTestId,
    waitForElementTextByTestIdContains,
} from '@minimalist-apps/android-e2e';

const EVOLU_ABANDON_TEST_SEED =
    'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';

const EVOLU_ABANDON_SEED_OWNER_ID = 'F0xh0HpiAx5shgCgtGENww';

type RestoreEvoluSeedStepProps = {
    readonly serverUrl: string;
    readonly sessionId: string;
};

const openSettings = async ({ serverUrl, sessionId }: RestoreEvoluSeedStepProps) => {
    await waitForElementByTestId({
        testId: 'open-settings-button',
        serverUrl,
        sessionId,
    });

    await clickElementByTestId({
        testId: 'open-settings-button',
        serverUrl,
        sessionId,
    });

    await waitForElementByTestId({
        testId: 'settings-back-button',
        serverUrl,
        sessionId,
    });
};

const restoreSeed = async ({ serverUrl, sessionId }: RestoreEvoluSeedStepProps) => {
    await clickElementByTestId({
        testId: 'restore-backup-button',
        serverUrl,
        sessionId,
    });

    await waitForElementByTestId({
        testId: 'restore-seed-input',
        serverUrl,
        sessionId,
    });

    await typeIntoElementByTestId({
        testId: 'restore-seed-input',
        serverUrl,
        sessionId,
        text: EVOLU_ABANDON_TEST_SEED,
    });

    await clickElementByTestId({
        testId: 'restore-modal-ok',
        serverUrl,
        sessionId,
    });
};

const enableDebug = async ({ serverUrl, sessionId }: RestoreEvoluSeedStepProps) => {
    await waitForElementByTestId({
        testId: 'debug-mode-switch',
        serverUrl,
        sessionId,
    });

    const isDebugEnabled =
        (await getElementAttributeByTestId({
            attribute: 'aria-checked',
            testId: 'debug-mode-switch',
            serverUrl,
            sessionId,
        })) === 'true';

    if (isDebugEnabled) {
        return;
    }

    await clickElementByTestId({
        testId: 'debug-mode-switch',
        serverUrl,
        sessionId,
    });
};

const assertDebugOwnerSuffix = async ({ serverUrl, sessionId }: RestoreEvoluSeedStepProps) => {
    await waitForElementTextByTestIdContains({
        testId: 'debug-owner-id',
        serverUrl,
        sessionId,
        text: EVOLU_ABANDON_SEED_OWNER_ID.slice(-6),
    });
};

const goBackFromSettings = async ({ serverUrl, sessionId }: RestoreEvoluSeedStepProps) => {
    await waitForElementByTestId({
        testId: 'settings-back-button',
        serverUrl,
        sessionId,
    });

    await clickElementByTestId({
        testId: 'settings-back-button',
        serverUrl,
        sessionId,
    });

    await waitForElementByTestId({
        testId: 'open-settings-button',
        serverUrl,
        sessionId,
    });
};

export const restoreEvoluSeedStep = async (props: RestoreEvoluSeedStepProps): Promise<void> => {
    await openSettings(props);

    await enableDebug(props);

    await restoreSeed(props);

    await goBackFromSettings(props);

    await assertDebugOwnerSuffix(props);
};
