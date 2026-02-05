## Pure components
Always prefer to write pure components.

## Component as Dependency
- If you need to access external dependency (global state, fetch, ...) in a component, do not use context & hooks. Instead, make component a service.

Example:

```tsx
type ComplexComponentDeps = StoreDep;

type ComplexComponent = React.FC;

export type ComplexComponentDep = { 
    ComplexComponent: ComplexComponent
};

export const createComplexComponent =
    (deps: ComplexComponentDeps): ComplexComponent =>
    (props) => {
        const onClick = () =>
            deps.store.setState({ clicked: true });

        return (
            <PureComponent {...props} onClick={onClick} />
        );
    };
```

## Hooks
Do not use React hooks at all. Never. They are anti-pattern. They hide external dependencies and make code harder to test.

