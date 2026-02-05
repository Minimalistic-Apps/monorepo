## Code organization & imports

- **Use named imports only** - avoid default exports and namespace imports
- **Use unique exported members** - avoid namespaces, use descriptive names to prevent conflicts
- **Organize code top-down** - public interfaces first, then implementation, then implementation details. If a helper must be defined before the public export that uses it (due to JavaScript hoisting), place it immediately before that export.
- **Reference globals explicitly with `globalThis`** - when a name clashes with global APIs (e.g., `SharedWorker`, `Worker`), use `globalThis.SharedWorker` instead of aliasing imports

```ts
// Good
import { bar, baz } from 'Foo.ts';
export const ok = () => {};
export const trySync = () => {};

// Avoid
import Foo from 'Foo.ts';
export const Utils = { ok, trySync };

// Good - Avoid naming conflicts with globals
const nativeSharedWorker = new globalThis.SharedWorker(url);

// Avoid - Aliasing to work around global name clash
import { SharedWorker as SharedWorkerType } from './Worker.js';
```