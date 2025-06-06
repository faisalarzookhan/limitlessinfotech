"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { detectUserLocation, convertPrice, getCurrencyData, updateCurrencyRates } from "@/lib/currency"

interface CurrencyContextType {
  currency: string
  setCurrency: (currency: string) => void
  convertPrice: (priceUSD: number) => string
  currencySymbol: string
  isLoading: boolean
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState("USD")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function initializeCurrency() {
      try {
        // Update currency rates
        await updateCurrencyRates()

        // Check if user has a saved preference
        const savedCurrency = localStorage.getItem("preferred-currency")
        if (savedCurrency) {
          setCurrency(savedCurrency)
          setIsLoading(false)
          return
        }

        // Detect user location and set currency
        const location = await detectUserLocation()
        if (location) {
          setCurrency(location.currency)
          localStorage.setItem("preferred-currency", location.currency)
        }
      } catch (error) {
        console.error("Failed to initialize currency:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeCurrency()
  }, [])

  const handleSetCurrency = (newCurrency: string) => {
    setCurrency(newCurrency)
    localStorage.setItem("preferred-currency", newCurrency)
  }

  const handleConvertPrice = (priceUSD: number) => {
    return convertPrice(priceUSD, currency)
  }

  const currencyData = getCurrencyData(currency)

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        convertPrice: handleConvertPrice,
        currencySymbol: currencyData.symbol,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
