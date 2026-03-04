import { attachWebdriverIoBrowser } from './attachWebdriverIoBrowser.ts';
import { defaultTimeoutMs, pollIntervalMs } from './shared.ts';

interface WaitForElementTextByTestIdContainsProps {
    readonly serverUrl: string;
    readonly sessionId: string;
    readonly testId: string;
    readonly text: string;
    readonly timeoutMs?: number;
}

export const waitForElementTextByTestIdContains = async ({
    serverUrl,
    sessionId,
    testId,
    text,
    timeoutMs = defaultTimeoutMs,
}: WaitForElementTextByTestIdContainsProps): Promise<void> => {
    const browser = await attachWebdriverIoBrowser({
        serverUrl,
        sessionId,
    });

    const element = await browser.$(`[data-testid="${testId}"]`);
    await element.waitForExist({ timeout: timeoutMs });

    await browser.waitUntil(
        async () => {
            const value = await element.getText();

            return value.includes(text);
        },
        {
            interval: pollIntervalMs,
            timeout: timeoutMs,
            timeoutMsg: `Element [data-testid="${testId}"] does not contain text: ${text}`,
        },
    );
};
