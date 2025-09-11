/**
 * Represents detailed information about a currency.
 */
interface CurrencyData {
  /** The ISO 4217 currency code (e.g., "USD"). */
  code: string
  /** The currency symbol (e.g., "$"). */
  symbol: string
  /** The full name of the currency (e.g., "US Dollar"). */
  name: string
  /** The exchange rate relative to a base currency (e.g., USD). */
  rate: number
}

/**
 * Represents location data derived from the user's context.
 */
interface LocationData {
  /** The ISO 3166-1 alpha-2 country code (e.g., "US"). */
  country: string
  /** The ISO 4217 currency code for the country. */
  currency: string
}

/**
 * A record of fallback currency exchange rates and data.
 * @internal
 */
const currencyRates: Record<string, CurrencyData> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rate: 0.85 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rate: 0.73 },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.12 },
  CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.35 },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.52 },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 149.5 },
  CNY: { code: "CNY", symbol: "¥", name: "Chinese Yuan", rate: 7.24 },
  BRL: { code: "BRL", symbol: "R$", name: "Brazilian Real", rate: 4.95 },
  MXN: { code: "MXN", symbol: "$", name: "Mexican Peso", rate: 17.12 },
}

/**
 * A mapping of country codes to their primary currency codes.
 * @internal
 */
const countryCurrencyMap: Record<string, string> = {
  US: "USD",
  CA: "CAD",
  GB: "GBP",
  IN: "INR",
  AU: "AUD",
  JP: "JPY",
  CN: "CNY",
  BR: "BRL",
  MX: "MXN",
  DE: "EUR", // Germany
  FR: "EUR", // France
  IT: "EUR", // Italy
  ES: "EUR", // Spain
  NL: "EUR", // Netherlands
  BE: "EUR", // Belgium
  AT: "EUR", // Austria
  PT: "EUR", // Portugal
  IE: "EUR", // Ireland
  FI: "EUR", // Finland
  GR: "EUR", // Greece
}

/**
 * Detects the user's location and preferred currency.
 * It first tries an IP geolocation service and falls back to the browser's locale.
 * @returns A promise that resolves to the user's location data, or a default if detection fails.
 */
export async function detectUserLocation(): Promise<LocationData | null> {
  try {
    // Try to get location from IP geolocation service
    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()

    if (data.country_code) {
      return {
        country: data.country_code,
        currency: countryCurrencyMap[data.country_code] || "USD",
      }
    }
  } catch (error) {
    console.error("Failed to detect location via IP API:", error)
  }

  // Fallback to browser language/locale
  try {
    const locale = typeof navigator !== "undefined" ? navigator.language : "en-US"
    const countryCode = locale.split("-")[1]?.toUpperCase()

    if (countryCode && countryCurrencyMap[countryCode]) {
      return {
        country: countryCode,
        currency: countryCurrencyMap[countryCode],
      }
    }
  } catch (error) {
    console.error("Failed to get locale from browser:", error)
  }

  // Final fallback
  return { country: "US", currency: "USD" }
}

/**
 * Converts a price from USD to a target currency and formats it as a string.
 * @param priceUSD - The price in US Dollars.
 * @param targetCurrency - The ISO 4217 code of the target currency.
 * @returns The formatted price string in the target currency (e.g., "€85").
 */
export function convertPrice(priceUSD: number, targetCurrency: string): string {
  const currency = currencyRates[targetCurrency] || currencyRates.USD
  const convertedPrice = priceUSD * currency.rate

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(convertedPrice)
}

/**
 * Retrieves the currency data for a given currency code.
 * @param currencyCode - The ISO 4217 currency code.
 * @returns The currency data object, or USD data as a fallback.
 */
export function getCurrencyData(currencyCode: string): CurrencyData {
  return currencyRates[currencyCode] || currencyRates.USD
}

/**
 * Fetches the latest currency exchange rates and updates the local rates.
 * This function fetches from a local API endpoint to avoid CORS issues.
 * It fails silently and uses fallback rates if the API call is unsuccessful.
 */
export async function updateCurrencyRates(): Promise<void> {
  try {
    // Fetch via our own API route to avoid CORS / network restrictions
    const response = await fetch("/api/currency/latest")
    if (!response.ok) throw new Error(`Status ${response.status}`)

    const data: { rates: Record<string, number> } = await response.json()

    Object.entries(data.rates).forEach(([code, rate]) => {
      if (currencyRates[code]) {
        currencyRates[code].rate = rate
      }
    })
  } catch (error) {
    // Don’t explode – just keep the baked-in fallback rates
    console.warn("Currency-rate update skipped – using fallback rates:", error)
  }
}
