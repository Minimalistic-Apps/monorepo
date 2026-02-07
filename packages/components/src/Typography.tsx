import { Typography } from 'antd';
import type { ReactNode } from 'react';

const { Text: AntText, Title: AntTitle, Paragraph: AntParagraph } = Typography;

interface TextProps {
    readonly children: ReactNode;
    readonly strong?: boolean;
    readonly nowrap?: boolean;
    readonly flexShrink?: number;
    readonly onClick?: () => void;
}

const buildTextStyle = (
    nowrap: boolean,
    flexShrink: number | undefined,
): Record<string, never> | { readonly style: React.CSSProperties } => {
    const style: React.CSSProperties = {
        ...(nowrap ? { whiteSpace: 'nowrap' } : {}),
        ...(flexShrink !== undefined ? { flexShrink } : {}),
    };

    return Object.keys(style).length > 0 ? { style } : {};
};

export const Text = ({
    children,
    strong = false,
    nowrap = false,
    flexShrink,
    onClick,
}: TextProps) => (
    <AntText
        strong={strong}
        onClick={onClick}
        {...buildTextStyle(nowrap, flexShrink)}
    >
        {children}
    </AntText>
);

interface TitleProps {
    readonly children: ReactNode;
    readonly level?: 1 | 2 | 3 | 4 | 5;
    readonly style?: React.CSSProperties;
    readonly onClick?: () => void;
}

export const Title = ({ children, level = 4, onClick }: TitleProps) => (
    <AntTitle level={level} style={{ margin: 0, padding: 0 }} onClick={onClick}>
        {children}
    </AntTitle>
);

interface ParagraphProps {
    readonly children: ReactNode;
    readonly code?: boolean;
    readonly copyable?: boolean;
    readonly onClick?: () => void;
    readonly style?: React.CSSProperties;
}

export const Paragraph = ({
    children,
    code = false,
    copyable = false,
    onClick,
    style,
}: ParagraphProps) => (
    <AntParagraph
        code={code}
        copyable={copyable}
        onClick={onClick}
        {...(style ? { style } : {})}
    >
        {children}
    </AntParagraph>
);
