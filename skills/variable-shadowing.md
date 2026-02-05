
## Variable shadowing

- **Shadowing is OK** - since we use `const` everywhere, shadowing avoids artificial names like `innerValue`, `newValue`, `result2`

```ts
// Good - Shadow in nested scopes
const value = getData();
items.map(value => process(value)); // shadowing is fine

const result = fetchUser();
if (result.ok) {
    const result = fetchProfile(result.value); // shadow in nested block
    if (result.ok) {
        // ...
    }
}
```
