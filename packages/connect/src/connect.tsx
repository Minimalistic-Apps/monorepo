import type React from 'react';
import { useSyncExternalStore } from 'react';

type Listener = () => void;

export interface Subscribable<State> {
    readonly getState: () => State;
    readonly subscribe: (listener: Listener) => () => void;
}

type NoOwnProps = Record<string, never>;
export type Connected<OwnProps = NoOwnProps> = React.FC<OwnProps>;

export type Connect<State> = {
    <RenderProps, StateProps>(
        render: (props: RenderProps) => React.ReactNode,
        mapStateToProps: (state: State) => StateProps,
    ): React.FC<Omit<RenderProps, keyof StateProps>>;

    <Deps, RenderProps, StateProps>(
        render: (deps: Deps, props: RenderProps) => React.ReactNode,
        mapStateToProps: (state: State) => StateProps,
        deps: Deps,
    ): React.FC<Omit<RenderProps, keyof StateProps>>;
};

export const createConnect = <State,>(
    store: Subscribable<State>,
): Connect<State> => {
    const connect = (
        render: (...args: readonly unknown[]) => React.ReactNode,
        mapStateToProps: (state: State) => unknown,
        deps?: unknown,
    ): React.FC<unknown> => {
        const ConnectedComponent: React.FC<unknown> = ownProps => {
            const state = useSyncExternalStore(store.subscribe, store.getState);
            const stateProps = mapStateToProps(state);
            const props = {
                ...(stateProps as object),
                ...(ownProps as object),
            };

            if (deps !== undefined) {
                return render(deps, props);
            }

            return render(props);
        };

        return ConnectedComponent;
    };

    return connect as unknown as Connect<State>;
};
