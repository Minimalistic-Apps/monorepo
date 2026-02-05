
## Interface over type for Evolu Type objects

For Evolu Type objects created with `object()`, use interface with `InferType` instead of type alias. TypeScript displays the interface name instead of expanding all properties.

```ts
// Use interface for objects
const User = object({ name: String, age: Number });
export interface User extends InferType<typeof User> {}

// Avoid - TypeScript expands all properties in tooltips
const User = object({ name: String, age: Number });
export type User = typeof User.Type;
```