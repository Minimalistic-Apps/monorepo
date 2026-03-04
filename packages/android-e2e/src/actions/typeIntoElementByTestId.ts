import { attachWebdriverIoBrowser } from './attachWebdriverIoBrowser.ts';
import { defaultTimeoutMs } from './shared.ts';

interface TypeIntoElementByTestIdProps {
    readonly serverUrl: string;
    readonly sessionId: string;
    readonly testId: string;
    readonly text: string;
}

export const typeIntoElementByTestId = async ({
    serverUrl,
    sessionId,
    testId,
    text,
}: TypeIntoElementByTestIdProps): Promise<void> => {
    const browser = await attachWebdriverIoBrowser({
        serverUrl,
        sessionId,
    });

    const element = await browser.$(`[data-testid="${testId}"]`);
    await element.waitForExist({ timeout: defaultTimeoutMs });
    await element.setValue(text);
};
