"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

/**
 * A wrapper around `next-themes`'s `ThemeProvider` to provide theme functionality
 * (e.g., light/dark/system modes) to the application.
 * This component should be used to wrap the root layout of the application.
 *
 * @param {ThemeProviderProps} props - The props for the theme provider,
 * which are passed directly to `next-themes`.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @param {string} [props.attribute="class"] - The HTML attribute to modify (e.g., 'class' for `className`).
 * @param {string} [props.defaultTheme="system"] - The default theme to use.
 * @param {boolean} [props.enableSystem=true] - Whether to enable the system theme preference.
 * @returns A configured `NextThemesProvider` wrapping the children.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
