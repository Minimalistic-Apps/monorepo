import { tryAsync } from "@evolu/common";
import { FetchRates, CurrencyRate } from "./FetchRates.js";

interface BitpayRateItem {
  readonly code: string;
  readonly name: string;
  readonly rate: number;
}

interface BitpayResponse {
  readonly data: readonly BitpayRateItem[];
}

export interface FetchBitpayRatesDeps {
  readonly fetch: typeof globalThis.fetch;
  readonly corsProxy: string;
}

export const createFetchBitpayRates =
  (deps: FetchBitpayRatesDeps): FetchRates =>
  () =>
    tryAsync(
      async () => {
        const response = await deps.fetch(
          `${deps.corsProxy}https://bitpay.com/rates`,
        );
        if (!response.ok) throw new Error("Bitpay API failed");
        const data: BitpayResponse = await response.json();

        const rates: Record<string, CurrencyRate> = {};
        data.data.forEach((item) => {
          if (item.code !== "BTC") {
            rates[item.code] = {
              code: item.code,
              name: item.name,
              rate: 1 / item.rate,
            };
          }
        });
        return rates;
      },
      (error) => ({
        type: "FetchRatesError",
        source: "Bitpay",
        message: String(error),
      }),
    );
