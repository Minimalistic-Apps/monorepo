import type { ReactNode } from 'react';
import { Card, Column, Row, Text } from './index';

interface SettingsRowProps {
    readonly label: ReactNode;
    readonly children: ReactNode;
    readonly description?: ReactNode;
}

export const SettingsRow = ({
    label,
    children,
    description,
}: SettingsRowProps) => (
    <Card>
        <Row align="center" justify="space-between">
            <Column gap={4}>
                <Text>{label}</Text>
                {description && <Text>{description}</Text>}
            </Column>
            {children}
        </Row>
    </Card>
);
