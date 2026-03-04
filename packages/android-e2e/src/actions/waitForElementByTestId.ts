import { attachWebdriverIoBrowser } from './attachWebdriverIoBrowser.ts';
import { defaultTimeoutMs, pollIntervalMs } from './shared.ts';

interface WaitForElementByTestIdProps {
    readonly serverUrl: string;
    readonly sessionId: string;
    readonly testId: string;
    readonly timeoutMs?: number;
}

export const waitForElementByTestId = async ({
    serverUrl,
    sessionId,
    testId,
    timeoutMs = defaultTimeoutMs,
}: WaitForElementByTestIdProps): Promise<string> => {
    const browser = await attachWebdriverIoBrowser({
        serverUrl,
        sessionId,
    });

    const element = await browser.$(`[data-testid="${testId}"]`);

    await browser.waitUntil(async () => element.isExisting(), {
        interval: pollIntervalMs,
        timeout: timeoutMs,
        timeoutMsg: `Element not found for testId: ${testId}`,
    });

    return element.elementId;
};
