"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Sun, Moon, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

/**
 * The main header component for the application.
 * It includes the company logo, desktop navigation links, a theme toggler,
 * a "Get Started" button, and a mobile menu (sheet) for smaller screens.
 * It is a client component that manages its own state for the mobile menu visibility.
 * This component does not accept any props.
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearchLoading, setIsSearchLoading] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
  ]

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearchLoading(true)
      const handler = setTimeout(async () => {
        try {
          const response = await fetch(`/api/search?query=${searchQuery}`)
          const data = await response.json()
          setSearchResults(data.results || [])
        } catch (error) {
          console.error("Search error:", error)
          setSearchResults([])
        } finally {
          setIsSearchLoading(false)
        }
      }, 500) // Debounce time

      return () => {
        clearTimeout(handler)
      }
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  return (
    <header className="fixed top-4 inset-x-0 max-w-6xl mx-auto z-50">
      <div className="bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/images/logo.png" alt="Limitless Infotech Solutions" width={32} height={32} />
            <span className="text-xl font-semibold text-foreground hidden sm:inline-block">
              Limitless Infotech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full rounded-md bg-background border shadow-lg z-10">
                {isSearchLoading ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
                ) : (
                  searchResults.map((result: any, index) => (
                    <div key={index} className="p-4 border-b last:border-b-0 hover:bg-muted/50">
                      <p className="font-semibold">{result.section}</p>
                      <p className="text-sm text-muted-foreground">{result.content}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Actions & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="hidden md:inline-flex bg-accent-green hover:bg-accent-green/90 text-white">
              <Link href="/contact">Get Started</Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted/20">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-foreground w-full sm:w-80 p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                    <Image src="/images/logo.png" alt="Limitless Infotech Solutions" width={32} height={32} />
                    <span className="text-xl font-bold text-foreground">Limitless Infotech</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:bg-muted/20"
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="mt-4 bg-accent-green hover:bg-accent-green/90 text-white">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
