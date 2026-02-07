export interface Territory {
    readonly flag: string;
    readonly name: string;
}

/**
 * Map of ISO 4217 currency codes to the territories where they are used.
 *
 * Data sources:
 *   - https://en.wikipedia.org/wiki/ISO_4217#Active_codes
 *   - https://en.wikipedia.org/wiki/List_of_circulating_currencies
 */
export const CURRENCY_TERRITORIES: Readonly<
    Record<string, ReadonlyArray<Territory>>
> = {
    AED: [{ flag: '🇦🇪', name: 'United Arab Emirates' }],
    AFN: [{ flag: '🇦🇫', name: 'Afghanistan' }],
    ALL: [{ flag: '🇦🇱', name: 'Albania' }],
    AMD: [{ flag: '🇦🇲', name: 'Armenia' }],
    ANG: [
        { flag: '🇨🇼', name: 'Curaçao' },
        { flag: '🇸🇽', name: 'Sint Maarten' },
    ],
    AOA: [{ flag: '🇦🇴', name: 'Angola' }],
    ARS: [{ flag: '🇦🇷', name: 'Argentine' }],
    AUD: [{ flag: '🇦🇷', name: 'Australia' }],
    AWG: [{ flag: '🇦🇼', name: 'Aruba' }],
    AZN: [{ flag: '🇦🇿', name: 'Azerbaijan' }],
    BAM: [{ flag: '🇧🇦', name: 'Bosnia and Herzegovina' }],
    BBD: [{ flag: '🇧🇧', name: 'Barbados' }],
    BDT: [{ flag: '🇧🇩', name: 'Bangladesh' }],
    BGN: [{ flag: '🇧🇬', name: 'Bulgaria' }],
    BHD: [{ flag: '🇧🇭', name: 'Bahrain' }],
    BIF: [{ flag: '🇧🇮', name: 'Burundi' }],
    BMD: [{ flag: '🇧🇲', name: 'Bermuda' }],
    BND: [{ flag: '🇧🇳', name: 'Brunei' }],
    BOB: [{ flag: '🇧🇴', name: 'Bolivia' }],
    BRL: [{ flag: '🇧🇷', name: 'Brazil' }],
    BSD: [{ flag: '🇧🇸', name: 'Bahamas' }],
    BTN: [{ flag: '🇧🇹', name: 'Bhutan' }],
    BWP: [{ flag: '🇧🇼', name: 'Botswana' }],
    BYN: [{ flag: '🇧🇾', name: 'Belarus' }],
    BZD: [{ flag: '🇧🇿', name: 'Belize' }],
    CAD: [{ flag: '🇨🇦', name: 'Canada' }],
    CDF: [{ flag: '🇨🇩', name: 'Democratic Republic of the Congo' }],
    CHF: [
        { flag: '🇨🇭', name: 'Switzerland' },
        { flag: '🇱🇮', name: 'Liechtenstein' },
    ],
    CLP: [{ flag: '🇨🇱', name: 'Chile' }],
    CNY: [{ flag: '🇨🇳', name: 'China' }],
    COP: [{ flag: '🇨🇴', name: 'Colombia' }],
    CRC: [{ flag: '🇨🇷', name: 'Costa Rica' }],
    CUC: [{ flag: '🇨🇺', name: 'Cuba' }],
    CUP: [{ flag: '🇨🇺', name: 'Cuba' }],
    CVE: [{ flag: '🇨🇻', name: 'Cabo Verde' }],
    CZK: [{ flag: '🇨🇿', name: 'Czechia' }],
    DJF: [{ flag: '🇩🇯', name: 'Djibouti' }],
    DKK: [
        { flag: '🇩🇰', name: 'Denmark' },
        { flag: '🇫🇴', name: 'Faroe Islands' },
        { flag: '🇬🇱', name: 'Greenland' },
    ],
    DOP: [{ flag: '🇩🇲', name: 'Dominican Republic' }],
    DZD: [{ flag: '🇩🇿', name: 'Algeria' }],
    EGP: [{ flag: '🇪🇬', name: 'Egypt' }],
    ERN: [{ flag: '🇪🇷', name: 'Eritrea' }],
    ETB: [{ flag: '🇪🇹', name: 'Ethiopia' }],
    EUR: [
        { flag: '🇪🇺', name: 'EU' },
        { flag: '🇦🇽', name: 'Åland Islands' },
        { flag: '🇦🇩', name: 'Andorra' },
        { flag: '🇦🇹', name: 'Austria' },
        { flag: '🇧🇪', name: 'Belgium' },
        { flag: '🇨🇾', name: 'Cyprus' },
        { flag: '🇪🇪', name: 'Estonia' },
        { flag: '🇫🇮', name: 'Finland' },
        { flag: '🇫🇷', name: 'France' },
        { flag: '🇩🇪', name: 'Germany' },
        { flag: '🇬🇷', name: 'Greece' },
        { flag: '🇬🇵', name: 'Guadeloupe' },
        { flag: '🇮🇪', name: 'Ireland' },
        { flag: '🇮🇹', name: 'Italy' },
        { flag: '🇱🇻', name: 'Latvia' },
        { flag: '🇱🇹', name: 'Lithuania' },
        { flag: '🇱🇺', name: 'Luxembourg' },
        { flag: '🇲🇹', name: 'Malta' },
        { flag: '🇬🇫', name: 'French Guiana' },
        { flag: '🇲🇶', name: 'Martinique' },
        { flag: '🇾🇹', name: 'Mayotte' },
        { flag: '🇲🇨', name: 'Monaco' },
        { flag: '🇲🇪', name: 'Montenegro' },
        { flag: '🇳🇱', name: 'Netherlands' },
        { flag: '🇵🇹', name: 'Portugal' },
        { flag: '🇷🇪', name: 'Réunion' },
        { flag: '🇧🇱', name: 'Saint Barthélemy' },
        { flag: '🇲🇫', name: 'Saint Martin' },
        { flag: '🇵🇲', name: 'Saint Pierre and Miquelon' },
        { flag: '🇸🇲', name: 'San Marino' },
        { flag: '🇸🇰', name: 'Slovakia' },
        { flag: '🇸🇮', name: 'Slovenia' },
        { flag: '🇪🇸', name: 'Spain' },
        { flag: '🇻🇦', name: 'Vatican City' },
    ],
    FJD: [{ flag: '🇫🇯', name: 'Fiji' }],
    FKP: [{ flag: '🇫🇰', name: 'Falkland Islands' }],
    GBP: [
        { flag: '🇬🇧', name: 'United Kingdom' },
        { flag: '🇮🇲', name: 'Isle of Man' },
        { flag: '🇯🇪', name: 'Jersey' },
        { flag: '🇬🇬', name: 'Guernsey' },
        { flag: '🇹🇦', name: 'Tristan da Cunha' },
    ],
    GEL: [{ flag: '🇬🇪', name: 'Georgia' }],
    GHS: [{ flag: '🇬🇭', name: 'Ghana' }],
    GIP: [{ flag: '🇬🇮', name: 'Gibraltar' }],
    GMD: [{ flag: '🇬🇲', name: 'Gambia' }],
    GNF: [{ flag: '🇬🇳', name: 'Guinea' }],
    GTQ: [{ flag: '🇬🇹', name: 'Guatemala' }],
    GYD: [{ flag: '🇬🇾', name: 'Guyana' }],
    HKD: [{ flag: '🇭🇰', name: 'Hong Kong' }],
    HNL: [{ flag: '🇭🇳', name: 'Honduras' }],
    HRK: [{ flag: '🇭🇷', name: 'Croatia' }],
    HTG: [{ flag: '🇭🇹', name: 'Haiti' }],
    HUF: [{ flag: '🇭🇺', name: 'Hungary' }],
    IDR: [{ flag: '🇮🇩', name: 'Indonesia' }],
    ILS: [{ flag: '🇮🇱', name: 'Israel' }],
    INR: [
        { flag: '🇮🇳', name: 'India' },
        { flag: '🇧🇹', name: 'Bhutan' },
    ],
    IQD: [{ flag: '🇮🇶', name: 'Iraq' }],
    IRR: [{ flag: '🇮🇷', name: 'Iran' }],
    ISK: [{ flag: '🇮🇸', name: 'Iceland' }],
    JMD: [{ flag: '🇯🇲', name: 'Jamaica' }],
    JOD: [{ flag: '🇯🇴', name: 'Jordan' }],
    JPY: [{ flag: '🇯🇵', name: 'Japan' }],
    KES: [{ flag: '🇰🇪', name: 'Kenya' }],
    KGS: [{ flag: '🇰🇬', name: 'Kyrgyzstan' }],
    KHR: [{ flag: '🇰🇭', name: 'Cambodia' }],
    KMF: [{ flag: '🇰🇲', name: 'Comoros' }],
    KPW: [{ flag: '🇰🇵', name: 'North Korea' }],
    KRW: [{ flag: '🇰🇷', name: 'South Korea' }],
    KWD: [{ flag: '🇰🇼', name: 'Kuwait' }],
    KYD: [{ flag: '🇰🇾', name: 'Cayman Islands' }],
    KZT: [{ flag: '🇰🇿', name: 'Kazakhstan' }],
    LAK: [{ flag: '🇱🇦', name: 'Laos' }],
    LBP: [{ flag: '🇱🇧', name: 'Lebanon' }],
    LKR: [{ flag: '🇱🇰', name: 'Sri Lanka' }],
    LRD: [{ flag: '🇱🇷', name: 'Liberia' }],
    LSL: [{ flag: '🇱🇸', name: 'Lesotho' }],
    LYD: [{ flag: '🇱🇾', name: 'Libya' }],
    MAD: [
        { flag: '🇲🇦', name: 'Marocco' },
        { flag: '🇪🇭', name: 'Western Sahara' },
    ],
    MDL: [{ flag: '🇲🇩', name: 'Moldova' }],
    MGA: [{ flag: '🇲🇬', name: 'Madagascar' }],
    MKD: [{ flag: '🇲🇰', name: 'North Macedonia' }],
    MMK: [{ flag: '🇲🇲', name: 'Myanmar' }],
    MNT: [{ flag: '🇲🇳', name: 'Mongolia' }],
    MOP: [{ flag: '🇲🇴', name: 'Macau' }],
    MRU: [{ flag: '🇲🇷', name: 'Mauritania' }],
    MUR: [{ flag: '🇲🇺', name: 'Mauritius' }],
    MVR: [{ flag: '🇲🇻', name: 'Maldives' }],
    MWK: [{ flag: '🇲🇼', name: 'Malawi' }],
    MXN: [{ flag: '🇲🇽', name: 'Mexico' }],
    MYR: [{ flag: '🇲🇾', name: 'Malaysia' }],
    MZN: [{ flag: '🇲🇿', name: 'Mozambique' }],
    NAD: [{ flag: '🇳🇦', name: 'Namibia' }],
    NGN: [{ flag: '🇳🇬', name: 'Nigeria' }],
    NIO: [{ flag: '🇳🇮', name: 'Nicaragua' }],
    NOK: [
        { flag: '🇳🇴', name: 'Norway' },
        { flag: '🇳🇴', name: 'Svalbard' },
    ],
    NPR: [{ flag: '🇳🇵', name: 'Nepal' }],
    NZD: [
        { flag: '🇳🇿', name: 'New Zealand' },
        { flag: '🇨🇰', name: 'Cook Islands' },
        { flag: '🇳🇺', name: 'Niue' },
        { flag: '🇵🇳', name: 'Pitcairn Islands' },
        { flag: '🇹🇰', name: 'Tokelau' },
    ],
    OMR: [{ flag: '🇴🇲', name: 'Oman' }],
    PAB: [{ flag: '🇵🇦', name: 'Panama' }],
    PEN: [{ flag: '🇵🇪', name: 'Peru' }],
    PGK: [{ flag: '🇵🇬', name: 'Papua New Guinean' }],
    PHP: [{ flag: '🇵🇭', name: 'Philippines' }],
    PKR: [{ flag: '🇵🇰', name: 'Pakistan' }],
    PLN: [{ flag: '🇵🇱', name: 'Poland' }],
    PYG: [{ flag: '🇵🇾', name: 'Paraguay' }],
    QAR: [{ flag: '🇶🇦', name: 'Qatar' }],
    RON: [{ flag: '🇷🇴', name: 'Romania' }],
    RSD: [{ flag: '🇷🇸', name: 'Serbia' }],
    RUB: [{ flag: '🇷🇺', name: 'Russia' }],
    RWF: [{ flag: '🇷🇼', name: 'Rwanda' }],
    SAR: [{ flag: '🇸🇦', name: 'Saudi Arabia' }],
    SBD: [{ flag: '🇸🇧', name: 'Solomon Islands' }],
    SCR: [{ flag: '🇸🇨', name: 'Seychelles' }],
    SDG: [{ flag: '🇸🇩', name: 'Sudan' }],
    SEK: [{ flag: '🇸🇪', name: 'Sweden' }],
    SGD: [{ flag: '🇸🇬', name: 'Singapore' }],
    SHP: [
        { flag: '🇸🇭', name: 'Saint Helena' },
        { flag: '🇦🇨', name: 'Ascension Island' },
    ],
    SLL: [{ flag: '🇸🇱', name: 'Sierra Leone' }],
    SOS: [{ flag: '🇸🇴', name: 'Somalia' }],
    SRD: [{ flag: '🇸🇷', name: 'Suriname' }],
    SSP: [{ flag: '🇸🇸', name: 'South Sudan' }],
    STN: [{ flag: '🇸🇹', name: 'São Tomé and Príncipe' }],
    SVC: [{ flag: '🇸🇻', name: 'El Salvador' }],
    SYP: [{ flag: '🇸🇾', name: 'Syria' }],
    SZL: [{ flag: '🇸🇿', name: 'Eswatini' }],
    THB: [{ flag: '🇹🇭', name: 'Thailand' }],
    TJS: [{ flag: '🇹🇯', name: 'Tajikistan' }],
    TMT: [{ flag: '🇹🇲', name: 'Turkmenistan' }],
    TND: [{ flag: '🇹🇳', name: 'Tunisia' }],
    TOP: [{ flag: '🇹🇴', name: 'Tonga' }],
    TRY: [{ flag: '🇹🇷', name: 'Turkey' }],
    TTD: [{ flag: '🇹🇹', name: 'Trinidad and Tobago' }],
    TWD: [{ flag: '🇹🇹', name: 'Taiwan' }],
    TZS: [{ flag: '🇹🇿', name: 'Tanzania' }],
    UAH: [{ flag: '🇺🇦', name: 'Ukraine' }],
    UGX: [{ flag: '🇺🇬', name: 'Uganda' }],
    USD: [
        { flag: '🇺🇸', name: 'United States' },
        { flag: '🇦🇸', name: 'American Samoa' },
        { flag: '🇮🇴', name: 'British Indian Ocean Territory' },
        { flag: '🇻🇬', name: 'British Virgin Islands' },
        { flag: '🇧🇶', name: 'Caribbean Netherlands' },
        { flag: '🇪🇨', name: 'Ecuador' },
        { flag: '🇸🇻', name: 'El Salvador' },
        { flag: '🇬🇺', name: 'Guam' },
        { flag: '🇲🇭', name: 'Marshall Islands' },
        { flag: '🇫🇲', name: 'Federated States of Micronesia' },
        { flag: '🇲🇵', name: 'Northern Mariana Islands' },
        { flag: '🇵🇼', name: 'Palau' },
        { flag: '🇵🇦', name: 'Panama' },
        { flag: '🇵🇷', name: 'Puerto Rico' },
        { flag: '🇹🇱', name: 'Timor-Leste' },
        { flag: '🇹🇨', name: 'Turks and Caicos Islands' },
        { flag: '🇻🇮', name: 'U.S. Virgin Islands' },
    ],
    UYU: [{ flag: '🇺🇾', name: 'Uruguay' }],
    UYW: [{ flag: '🇺🇾', name: 'Uruguay' }],
    UZS: [{ flag: '🇺🇿', name: 'Uzbekistan' }],
    VED: [{ flag: '🇻🇪', name: 'Venezuela' }],
    VES: [{ flag: '🇻🇪', name: 'Venezuela' }],
    VND: [{ flag: '🇻🇳', name: 'Vietnam' }],
    VUV: [{ flag: '🇻🇺', name: 'Vanuatu' }],
    WST: [{ flag: '🇼🇸', name: 'Samoa' }],
    XAF: [
        { flag: '🇨🇲', name: 'Cameroon' },
        { flag: '🇨🇫', name: 'Central African Republic' },
        { flag: '🇨🇬', name: 'Republic of the Congo' },
        { flag: '🇹🇩', name: 'Chad' },
        { flag: '🇬🇶', name: 'Equatorial Guinea' },
        { flag: '🇬🇦', name: 'Gabon' },
    ],
    XCD: [
        { flag: '🇦🇮', name: 'Anguilla' },
        { flag: '🇦🇬', name: 'Antigua and Barbuda' },
        { flag: '🇩🇲', name: 'Dominica' },
        { flag: '🇬🇩', name: 'Grenada' },
        { flag: '🇲🇸', name: 'Montserrat' },
        { flag: '🇰🇳', name: 'Saint Kitts and Nevis' },
        { flag: '🇱🇨', name: 'Saint Lucia' },
        { flag: '🇻🇨', name: 'Saint Vincent and the Grenadines' },
    ],
    XOF: [
        { flag: '🇧🇯', name: 'Benin' },
        { flag: '🇧🇫', name: 'Burkina Faso' },
        { flag: '🇨🇮', name: "Côte d'Ivoire" },
        { flag: '🇬🇼', name: 'Guinea-Bissau' },
        { flag: '🇲🇱', name: 'Mali' },
        { flag: '🇳🇪', name: 'Niger' },
        { flag: '🇸🇳', name: 'Senegal' },
        { flag: '🇹🇬', name: 'Togo' },
    ],
    XPF: [
        { flag: '🇵🇫', name: 'French Polynesia' },
        { flag: '🇳🇨', name: 'New Caledonia' },
        { flag: '🇼🇫', name: 'Wallis and Futuna' },
    ],
    YER: [{ flag: '🇾🇪', name: 'Yemen' }],
    ZAR: [
        { flag: '🇸🇿', name: 'Eswatini' },
        { flag: '🇱🇸', name: 'Lesotho' },
        { flag: '🇳🇦', name: 'Namibia' },
        { flag: '🇿🇦', name: 'South Africa' },
    ],
    ZMW: [{ flag: '🇿🇲', name: 'Zambia' }],
    ZWL: [{ flag: '🇿🇼', name: 'Zimbabwe' }],
};

/**
 * Get unique flag emojis for a currency code.
 */
export const getFlagsForCurrency = (
    currencyCode: string,
): ReadonlyArray<string> => {
    const territories = CURRENCY_TERRITORIES[currencyCode] as
        | ReadonlyArray<Territory>
        | undefined;

    if (!territories) {
        return [];
    }

    return [...new Set(territories.map(t => t.flag))];
};

/**
 * Get territory names for a currency code.
 */
export const getTerritoryNamesForCurrency = (
    currencyCode: string,
): ReadonlyArray<string> => {
    const territories = CURRENCY_TERRITORIES[currencyCode] as
        | ReadonlyArray<Territory>
        | undefined;

    if (!territories) {
        return [];
    }

    return territories.map(t => t.name);
};

/**
 * Check if any territory of a currency matches a search term.
 */
export const currencyMatchesTerritory = (
    currencyCode: string,
    searchTerm: string,
): boolean => {
    const territories = CURRENCY_TERRITORIES[currencyCode] as
        | ReadonlyArray<Territory>
        | undefined;

    if (!territories) {
        return false;
    }

    const term = searchTerm.toLowerCase();

    return territories.some(t => t.name.toLowerCase().includes(term));
};
