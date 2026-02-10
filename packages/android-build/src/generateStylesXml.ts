import { readTemplate } from './readTemplate';

/**
 * Generates Android styles.xml with a plain-color splash screen.
 * The splash references @color/colorPrimary from colors.xml,
 * replacing the default Capacitor bitmap splash.
 */
export const generateStylesXml = (): string => readTemplate('styles.xml');
