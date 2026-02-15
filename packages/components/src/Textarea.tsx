import { Input } from 'antd';
import type { ChangeEvent } from 'react';

interface TextareaProps {
    readonly value: string;
    readonly onChange: (value: string) => void;
    readonly placeholder?: string;
    readonly rows?: number;
    readonly disabled?: boolean;
    readonly style?: React.CSSProperties;
}

export const Textarea = ({
    value,
    onChange,
    placeholder,
    rows = 4,
    disabled = false,
    style,
}: TextareaProps) => {
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };

    return (
        <Input.TextArea
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            style={{
                resize: 'vertical',
                ...style,
            }}
        />
    );
};
