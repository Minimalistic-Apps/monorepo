import { Card as AntCard } from 'antd';
import type { ReactNode } from 'react';

interface CardProps {
    readonly children?: ReactNode;
    readonly title?: ReactNode;
}

export const Card = ({ children, title }: CardProps) => (
    <AntCard title={title}>{children}</AntCard>
);
