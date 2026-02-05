## Branded types

- **Use `Brand<"Name">`** for values callers cannot inspect or construct—only pass back to the creating API
- Useful for platform abstraction, handle types (timeout IDs, file handles), and type safety

```ts
type TimeoutId = Brand<'TimeoutId'>;
type NativeMessagePort = Brand<'NativeMessagePort'>;
```
