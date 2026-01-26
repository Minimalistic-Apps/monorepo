// Utility functions for formatting and calculations

// Format fiat with 3 decimal places and commas
export const formatFiatWithCommas = (value: string | number): string => {
    if (!value || Number.isNaN(Number(value))) return '0';

    const num = Number.parseFloat(String(value));
    if (num === 0) return '0';

    const str = num.toFixed(3);
    const [intPart, decPart] = str.split('.');

    // Add thousand separators to integer part
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Remove trailing zeros from decimal
    const formattedDec = decPart ? decPart.replace(/0+$/, '') : '';

    return formattedInt + (formattedDec ? `.${formattedDec}` : '');
};

// Parse formatted number back to float
export const parseFormattedNumber = (str: string): number => {
    if (!str) return 0;
    return Number.parseFloat(str.replace(/,/g, ''));
};

// Calculate time ago
export const getTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
};

// Check if time difference is longer than 1 hour
export const isLongerThan1Hour = (timestamp: number): boolean => {
    const now = Date.now();
    const diff = now - timestamp;
    return diff > 3600000; // 1 hour in milliseconds
};

// Save to localStorage
export const saveToLocalStorage = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

// Load from localStorage
export const loadFromLocalStorage = <T>(
    key: string,
    defaultValue: T | null = null,
): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
};
