import { Alert, BRAND_COLORS, Text } from '@minimalistic-apps/components';

interface StatusDisplayProps {
    readonly loading: boolean;
    readonly error?: string;
    readonly timeAgo?: string;
    readonly isWarning?: boolean;
}

export const StatusDisplay = ({
    loading,
    error,
    timeAgo,
    isWarning,
}: StatusDisplayProps) => (
    <>
        {loading && (
            <div
                style={{
                    height: 3,
                    background: `linear-gradient(90deg, ${BRAND_COLORS.primary} 0%, #0aa3b3 100%)`,
                    animation: 'loading 1s ease-in-out infinite',
                    marginBottom: 16,
                }}
            />
        )}
        {error && (
            <Alert message={error} type="error" style={{ marginBottom: 16 }} />
        )}
        {timeAgo && (
            <Text
                style={{
                    display: 'block',
                    textAlign: 'right',
                    fontSize: '0.875rem',
                    color: isWarning
                        ? BRAND_COLORS.error
                        : BRAND_COLORS.textSecondary,
                    marginBottom: 16,
                    fontWeight: 600,
                }}
            >
                {timeAgo}
            </Text>
        )}
    </>
);
