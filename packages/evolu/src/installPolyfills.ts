// cspell:ignore disposablestack
import 'disposablestack/auto';

// cspell:ignore okikio
import SharedWorkerPolyfill from '@okikio/sharedworker';

// @ts-expect-error Runtime polyfill package has no TypeScript declarations.
import promiseTry from 'promise.try';

export const installPolyfills = (): void => {
    if (typeof globalThis.SharedWorker === 'undefined') {
        globalThis.SharedWorker = SharedWorkerPolyfill as typeof globalThis.SharedWorker;
    }

    promiseTry.shim();
};
