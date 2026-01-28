import { Content, Layout } from '@minimalistic-apps/components';
import type { ReactNode } from 'react';

interface AppLayoutProps {
    readonly children: ReactNode;
    readonly header?: ReactNode;
}

export const AppLayout = ({ children, header }: AppLayoutProps) => (
    <Layout>
        {header}
        <Content>{children}</Content>
    </Layout>
);
