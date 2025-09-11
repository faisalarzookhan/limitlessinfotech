import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * A React hook that detects if the user is on a mobile-sized screen.
 * It uses the `window.matchMedia` API to listen for changes in screen width.
 * The breakpoint is defined by `MOBILE_BREAKPOINT`.
 *
 * @returns {boolean} `true` if the screen width is less than the mobile breakpoint, otherwise `false`.
 * Initially returns `false` on the server and during the first client-side render.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    // Set the initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
