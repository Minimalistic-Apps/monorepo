## Assertions

- Use assertions for conditions logically guaranteed but not statically known by TypeScript
- **Never use assertions instead of proper type validation** - use Type system for runtime validation
- Use for catching developer mistakes eagerly (e.g., invalid configuration)

```ts
import { assert, assertNonEmptyArray } from './Assert.js';

const length = buffer.getLength();
assert(NonNegativeInt.is(length), 'buffer length should be non-negative');

assertNonEmptyArray(items, 'Expected items to process');
```

