## Evolu Type

- **Use Type for validation/parsing** - leverage Evolu's Type system for runtime validation
- **Define typed errors** - use interfaces extending `TypeError<Name>`
- **Create Type factories** - use `brand`, `transform`, `array`, `object` etc.
- **Use Brand types** - for semantic distinctions and constraints

```ts
// Good - Define typed error
interface CurrencyCodeError extends TypeError<'CurrencyCode'> {}

// Good - Brand for semantic meaning and validation
const CurrencyCode = brand('CurrencyCode', String, value =>
    /^[A-Z]{3}$/.test(value) ? ok(value) : err<CurrencyCodeError>({ type: 'CurrencyCode', value }),
);

// Good - Type factory pattern
const minLength: <Min extends number>(
    min: Min,
) => BrandFactory<`MinLength${Min}`, { length: number }, MinLengthError<Min>> = min => parent =>
    brand(`MinLength${min}`, parent, value =>
        value.length >= min ? ok(value) : err({ type: 'MinLength', value, min }),
    );

// Good - Error formatter
const formatCurrencyCodeError = createTypeErrorFormatter<CurrencyCodeError>(
    error => `Invalid currency code: ${error.value}`,
);
```