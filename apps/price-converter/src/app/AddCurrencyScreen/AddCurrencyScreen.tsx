import type { CurrencyCode } from '@evolu/common';
import {
    Button,
    List,
    Row,
    Screen,
    SearchInput,
    Text,
} from '@minimalistic-apps/components';
import {
    currencyMatchesTerritory,
    getFlagsForCurrency,
} from '@minimalistic-apps/fiat';
import { typedObjectValues } from '@minimalistic-apps/type-utils';
import type { FC } from 'react';
import { useState } from 'react';
import type { CurrencyEntity, CurrencyMap } from '../../rates/FetchRates';
import type { AddCurrencyDep } from '../../state/addCurrency';
import type { NavigateDep } from '../../state/navigate';

export type AddCurrencyScreenStateProps = {
    readonly rates: CurrencyMap;
    readonly selectedCurrencies: ReadonlyArray<CurrencyCode>;
};

type AddCurrencyScreenDeps = AddCurrencyDep & NavigateDep;

export type AddCurrencyScreenDep = {
    readonly AddCurrencyScreen: FC;
};

export const AddCurrencyScreenPure = (
    deps: AddCurrencyScreenDeps,
    { rates, selectedCurrencies }: AddCurrencyScreenStateProps,
) => {
    const [searchTerm, setSearchTerm] = useState('');

    const availableCurrencies = typedObjectValues(rates)
        .filter(
            (it): it is CurrencyEntity =>
                it !== undefined && !selectedCurrencies.includes(it.code),
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(it => ({ code: it.code, name: it.name }));

    const filteredCurrencies = !searchTerm
        ? availableCurrencies
        : availableCurrencies.filter(({ code, name }) => {
              const term = searchTerm.toLowerCase();
              const matchesCode = code.toLowerCase().includes(term);
              const matchesName = name.toLowerCase().includes(term);
              const matchesTerritory = currencyMatchesTerritory(code, term);

              return matchesCode || matchesName || matchesTerritory;
          });

    const handleSelect = (code: string) => {
        deps.addCurrency({ code: code as CurrencyCode });
        deps.navigate('Converter');
    };

    const handleBack = () => {
        deps.navigate('Converter');
    };

    const listItems = filteredCurrencies.map(item => ({
        key: item.code,
        ...item,
    }));

    return (
        <Screen gap={12}>
            <Button
                onClick={handleBack}
                variant="text"
                style={{ alignSelf: 'start' }}
            >
                ← Back
            </Button>
            <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search currencies..."
            />
            <div
                style={{
                    maxHeight: 'calc(100vh - 200px)',
                    overflow: 'auto',
                    paddingRight: '8px',
                }}
            >
                <List
                    items={listItems}
                    emptyText="No currencies found"
                    onItemClick={item => handleSelect(item.code)}
                    renderItem={item => (
                        <Row gap={8} justify="space-between">
                            <Row gap={8}>
                                <Text>
                                    {getFlagsForCurrency(item.code).join(' ')}
                                </Text>
                                <Text>{item.name}</Text>
                            </Row>
                            <Text strong>{item.code}</Text>
                        </Row>
                    )}
                />
            </div>
        </Screen>
    );
};
