## Immutability

- **Favor immutability** - use `readonly` properties and `ReadonlyArray`/`NonEmptyReadonlyArray`

```ts
interface Example {
    readonly id: number;
    readonly items: ReadonlyArray<string>;
}
```