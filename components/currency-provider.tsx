"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

/**
 * Defines the shape of the currency context provided to children components.
 */
interface CurrencyContextType {
  /** The currently selected currency code (e.g., "USD"). */
  currency: string
  /** A record of exchange rates, with currency codes as keys and rates as values. */
  exchangeRates: Record<string, number>
  /** A function to set the active currency. */
  setCurrency: (currency: string) => void
  /**
   * Converts an amount from a source currency to a target currency.
   * @param amount - The amount to convert.
   * @param fromCurrency - The source currency code.
   * @param toCurrency - The target currency code.
   * @returns The converted amount.
   */
  convert: (amount: number, fromCurrency: string, toCurrency: string) => number
  /**
   * Formats a number as a currency string.
   * @param amount - The numerical amount.
   * @param currencyCode - The currency code to format for. Defaults to the active currency.
   * @returns A formatted currency string (e.g., "$1,234.56").
   */
  formatCurrency: (amount: number, currencyCode?: string) => string
  /** A boolean indicating if the exchange rates are currently being fetched. */
  isLoading: boolean
  /** An error message string if fetching rates failed, otherwise null. */
  error: string | null
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

/**
 * A provider component that supplies currency-related data and functions to its children.
 * It fetches exchange rates on mount and makes them available via the `useCurrency` hook.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered within the provider.
 */
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState("USD") // Default currency
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // In a real application, you would fetch from a reliable exchange rate API
        // For this mock, we'll use a simple API route
        const response = await fetch("/api/currency/latest")
        const data = await response.json()

        if (data.success && data.rates) {
          setExchangeRates(data.rates)
          toast({
            title: "Exchange Rates Loaded",
            description: "Latest currency exchange rates fetched successfully.",
            variant: "success",
          })
        } else {
          throw new Error(data.error || "Failed to fetch exchange rates.")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred."
        setError(errorMessage)
        toast({
          title: "Error Loading Exchange Rates",
          description: errorMessage,
          variant: "destructive",
        })
        console.error("Failed to fetch exchange rates:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExchangeRates()
  }, [])

  const convert = (amount: number, fromCurrency: string, toCurrency: string): number => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      console.warn(`Exchange rates for ${fromCurrency} or ${toCurrency} not available.`)
      return amount // Return original amount if rates are missing
    }

    // Convert to base currency (e.g., USD if all rates are relative to USD)
    // Assuming all rates are relative to USD (e.g., rates.EUR = USD_to_EUR)
    // So, to convert from EUR to USD: amount / rates.EUR
    // To convert from USD to EUR: amount * rates.EUR
    // To convert from EUR to GBP: (amount / rates.EUR) * rates.GBP

    const amountInUSD = amount / exchangeRates[fromCurrency]
    return amountInUSD * exchangeRates[toCurrency]
  }

  const formatCurrency = (amount: number, currencyCode: string = currency): string => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    } catch (e) {
      console.error("Error formatting currency:", e)
      return `${amount.toFixed(2)} ${currencyCode}` // Fallback
    }
  }

  const value = {
    currency,
    exchangeRates,
    setCurrency,
    convert,
    formatCurrency,
    isLoading,
    error,
  }

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

/**
 * A custom hook to access the currency context.
 * This must be used within a component tree wrapped by `CurrencyProvider`.
 * @returns The currency context, including the current currency, rates, and helper functions.
 * @throws An error if used outside of a `CurrencyProvider`.
 */
export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
