## Error handling with Result

- Use `Result<T, E>` for business/domain errors in public APIs
- Keep implementation-specific errors internal to dependencies
- Use **plain objects** for domain errors, Error instances only for debugging

```ts
// Good - Domain error
interface ParseJsonError {
  readonly type: "ParseJsonError";
  readonly message: string;
}

const parseJson = (value: string): Result<unknown, ParseJsonError> =>
  trySync(
    () => JSON.parse(value) as unknown,
    (error) => ({ type: "ParseJsonError", message: String(error) }),
  );

// Good - Sequential operations with short-circuiting
const processData = (deps: DataDeps) => {
  const foo = doFoo(deps);
  if (!foo.ok) return foo;

  return doStep2(deps)(foo.value);
};

// Avoid - Implementation error in public API
export interface Storage {
  writeMessages: (...) => Result<boolean, SqliteError>;
}
```

### Result patterns

- Use `Result<void, E>` for operations that don't return values
- Use `trySync` for wrapping synchronous unsafe code
- Use `tryAsync` for wrapping asynchronous unsafe code
- Use `getOrThrow` only for critical startup code where failure should crash

```ts
// For lazy operations array
const operations: Lazy<Result<void, MyError>>[] = [() => doSomething(), () => doSomethingElse()];

for (const op of operations) {
    const result = op();
    if (!result.ok) return result;
}
```

### Avoid meaningless ok values

Don't use `ok("done")` or `ok("success")` - the `ok()` itself already communicates success. Use `ok()` for `Result<void, E>` or return a meaningful value.

```ts
// Good - ok() means success, no redundant string needed
const save = (): Result<void, SaveError> => {
    // ...
    return ok();
};

// Good - return a meaningful value
const parse = (): Result<User, ParseError> => {
    // ...
    return ok(user);
};

// Avoid - "done" and "success" add no information
return ok('done');
return ok('success');
```