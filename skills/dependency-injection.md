## Dependency injection

Follow Evolu's convention-based DI approach without frameworks:

### Define dependencies 
```ts
type MyServiceDeps = TimeDep & OtherDep;
```

### Define service type (prefer interface)

```ts
type MyService = (eventTimestamp: number) => number;
```

### Define dependency interfaces

```ts
export type MyServiceDep = { myService: MyService }
```

### Use currying for functions with dependencies

```ts
const createMyService =
    (deps: MyServiceDeps): MyService =>
    ({ param1, param2 }): number => {
        const currentTime = deps.time.now();
        const eventTimestamp = depends.other.getEventTimestamp(param1, param2);

        return eventTimestamp - currentTime;
    };
```

### 3. Create factory functions

```ts
export const createTime = (): Time => ({
    now: () => Date.now(),
});
```

### 4. Composition root pattern
Dependency composition happens in the app's entry point (composition root)


```ts
export const createCompositionRoot = (): Deps => {
    const createTime = createTime();

    const myService = createMyService({
        time: createTime(),
        other: createOtherService({otherDep, someOtherDep}),
    });
}
```

