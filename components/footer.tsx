import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  services: [
    { title: "Consulting", href: "#" },
    { title: "Implementation", href: "#" },
    { title: "Support", href: "#" },
  ],
  resources: [
    { title: "Blog", href: "#" },
    { title: "Case Studies", href: "#" },
    { title: "Help Center", href: "#" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Careers", href: "/careers" },
    { title: "Contact", href: "/contact" },
  ],
  products: [
    { title: "Product A", href: "#" },
    { title: "Product B", href: "#" },
    { title: "Product C", href: "#" },
  ],
}

/**
 * The main footer component for the application.
 * It displays navigation links categorized into sections, the company logo,
 * and a copyright notice. The links are defined in the `footerLinks` object.
 * This component does not accept any props.
 */
export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="Limitless Infotech" width={32} height={32} />
              <span className="font-semibold text-lg">Limitless</span>
            </Link>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Limitless Infotech Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
