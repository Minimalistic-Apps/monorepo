import type { CurrencyCode, Result, TypeError } from '@evolu/common';

export interface CurrencyCodeError extends TypeError<'CurrencyCode'> {}

export interface CurrencyRate {
    readonly code: CurrencyCode;
    readonly name: string;
    readonly rate: number;
}

export type RatesMap = Readonly<Record<CurrencyCode, CurrencyRate>>;

export interface FetchRatesError {
    readonly type: 'FetchRatesError';
}

export const FetchRatesError = (): FetchRatesError => ({
    type: 'FetchRatesError' as const,
});

export type FetchRates = () => Promise<Result<RatesMap, FetchRatesError>>;
