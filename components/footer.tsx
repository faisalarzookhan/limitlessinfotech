import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-dark-blue-900 border-t border-dark-blue-700 text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Image src="/images/logo.png" alt="Limitless Infotech" width={50} height={50} className="w-12 h-12" />
              <div>
                <p className="text-xl font-bold leading-none text-white">LIMITLESS INFOTECH</p>
                <p className="text-xs text-accent-blue">SOLUTION'S PVT LTD</p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6">
              Empowering businesses with technology that is secure, unique, and limitless.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-accent-blue transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/web-development"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mobile-app-development"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/custom-software"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Custom Software
                </Link>
              </li>
              <li>
                <Link
                  href="/services/crm-solutions"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  CRM Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/services/business-automation"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Business Automation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ai-integration"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  AI Integration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-accent-blue mr-3 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Tech Park, Silicon Valley
                  <br />
                  California, USA 94043
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-accent-blue mr-3" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-accent-blue mr-3" />
                <a
                  href="mailto:info@limitlessinfotech.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@limitlessinfotech.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-white mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <Input type="email" placeholder="Your email" className="rounded-r-none input-field" />
                <Button className="rounded-l-none btn-gradient">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-dark-blue-700 text-center md:flex md:justify-between md:text-left">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Limitless Infotech Solution Pvt. Ltd. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex justify-center md:justify-end space-x-6 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-muted-foreground hover:text-primary transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
