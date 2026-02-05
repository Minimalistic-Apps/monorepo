## Functions

- **Use arrow functions** - avoid the `function` keyword for consistency
- **Exception: function overloads** - TypeScript requires the `function` keyword for overloaded signatures

```ts
// Good - Function overloads (requires function keyword)
export function mapArray<T, U>(
    array: NonEmptyReadonlyArray<T>,
    mapper: (item: T) => U,
): NonEmptyReadonlyArray<U>;
export function mapArray<T, U>(array: ReadonlyArray<T>, mapper: (item: T) => U): ReadonlyArray<U>;
export function mapArray<T, U>(array: ReadonlyArray<T>, mapper: (item: T) => U): ReadonlyArray<U> {
    return array.map(mapper) as ReadonlyArray<U>;
}

// Avoid - function keyword without overloads
export function createUser(data: UserData): User {
    // implementation
}
```

### Factories

Use factory functions instead of classes for creating objects, typically named `createX`. Order function contents as follows:

1. Const setup & invariants (args + derived consts + assertions)
2. Mutable state
3. Owned resources
4. Side-effectful wiring
5. Shared helpers
6. Return object (public operations + disposal/closing)

### Function options

For functions with optional configuration, use inline types without `readonly` for single-use options and named interfaces with `readonly` for reusable options. Always destructure immediately.

```ts
// Good - inline type, single-use
export const race = (
    tasks: Tasks,
    {
        abortReason = raceLostError,
    }: {
        abortReason?: unknown;
    } = {},
): Task<T, E> => {
    // implementation
};

// Good - named interface, reusable
export interface RetryOptions {
    readonly maxAttempts?: number;
    readonly delay?: Duration;
}
```
