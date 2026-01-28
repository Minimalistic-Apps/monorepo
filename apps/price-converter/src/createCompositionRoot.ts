import { createFetchAverageRates } from './rates/fetchAverageRates.js';
import { createFetchBitpayRates } from './rates/fetchBitpayRates.js';
import { createFetchBlockchainInfoRates } from './rates/fetchBlockchainInfoRates.js';
import { createFetchCoingeckoRates } from './rates/fetchCoingeckoRates.js';

export const createCompositionRoot = () => {
    const fetchDeps = {
        // Important to be wrapped to preserve the correct `this` context
        fetch: (input: RequestInfo | URL, init?: RequestInit) =>
            globalThis.fetch(input, init),
    };

    const fetchCoingeckoRates = createFetchCoingeckoRates(fetchDeps);
    const fetchBitpayRates = createFetchBitpayRates(fetchDeps);
    const fetchBlockchainInfoRates = createFetchBlockchainInfoRates(fetchDeps);

    const fetchAverageRates = createFetchAverageRates({
        fetchRates: [
            fetchCoingeckoRates,
            fetchBitpayRates,
            fetchBlockchainInfoRates,
        ],
    });

    return {
        fetchCoingeckoRates,
        fetchBitpayRates,
        fetchBlockchainInfoRates,
        fetchAverageRates,
    };
};
