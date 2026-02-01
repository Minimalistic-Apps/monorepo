import { Layout } from '@minimalistic-apps/components';
import type { ReactNode } from 'react';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
    readonly children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
    <Layout>
        <Layout.Header>
            <AppHeader />
        </Layout.Header>
        <Layout.Content>{children}</Layout.Content>
    </Layout>
);
