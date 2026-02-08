export interface AppCheck {
    readonly name: string;
    readonly run: ({
        appDir,
    }: {
        readonly appDir: string;
    }) => ReadonlyArray<string>;
}
