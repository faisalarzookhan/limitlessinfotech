"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    submenu: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "Mobile App Development", href: "/services/mobile-app-development" },
      { name: "Custom Software", href: "/services/custom-software" },
      { name: "CRM Solutions", href: "/services/crm-solutions" },
    ],
  },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  {
    name: "Documentation",
    href: "/docs",
    submenu: [
      { name: "Company History", href: "/docs/company-history" },
      { name: "Mission & Values", href: "/docs/mission-values" },
      { name: "Operational Procedures", href: "/docs/operational-procedures" },
    ],
  },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleSubmenu = (name: string) => {
    if (openSubmenu === name) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(name)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="Limitless Infotech" width={40} height={40} className="w-10 h-10" />
              <div>
                <p className="text-lg font-bold leading-none">LIMITLESS INFOTECH</p>
                <p className="text-xs text-muted-foreground">SOLUTION'S PVT LTD</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={cn(
                      "flex items-center text-sm font-medium transition-colors hover:text-primary",
                      pathname.startsWith(item.href) ? "text-primary" : "text-foreground",
                    )}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                )}

                {item.submenu && openSubmenu === item.name && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className={cn(
                            "block px-4 py-2 text-sm hover:bg-muted",
                            pathname === subitem.href ? "text-primary" : "text-foreground",
                          )}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex">
              <Link href="/contact">Get in Touch</Link>
            </Button>

            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => toggleSubmenu(item.name)}
                            className="flex items-center justify-between w-full text-lg font-medium py-2"
                          >
                            {item.name}
                            <ChevronDown
                              className={cn("h-5 w-5 transition-transform", openSubmenu === item.name && "rotate-180")}
                            />
                          </button>
                          {openSubmenu === item.name && (
                            <div className="ml-4 mt-2 flex flex-col space-y-2">
                              {item.submenu.map((subitem) => (
                                <Link
                                  key={subitem.name}
                                  href={subitem.href}
                                  className={cn(
                                    "text-sm hover:text-primary py-1",
                                    pathname === subitem.href ? "text-primary font-medium" : "text-muted-foreground",
                                  )}
                                >
                                  {subitem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "text-lg font-medium py-2 hover:text-primary",
                            pathname === item.href ? "text-primary" : "text-foreground",
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <Button asChild className="mt-4">
                    <Link href="/contact">Get in Touch</Link>
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
