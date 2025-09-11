"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowUpRight, Code, Server, Shield, Lightbulb, TrendingUp } from "lucide-react"

const partners = [
  { name: "FintechPro", logo: "/placeholder.svg" },
  { name: "MediCare Inc.", logo: "/placeholder.svg" },
  { name: "TechPivot", logo: "/placeholder.svg" },
  { name: "EduWorks", logo: "/placeholder.svg" },
  { name: "LogixOne", logo: "/placeholder.svg" },
]

const testimonials = [
  {
    quote: "Outstanding solutions, seamless process.",
    name: "A. Verma",
    title: "CTO, FintechPro",
  },
  {
    quote: "Supportive, modern, and results-driven.",
    name: "B. Singh",
    title: "Operations, MediCare Inc.",
  },
  {
    quote: "Limitless helped us scale effectively.",
    name: "K. Mehta",
    title: "CEO, TechFloat",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 sm:py-32 md:py-40 text-center">
          <div className="container">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter max-w-3xl mx-auto">
              Limitless Infotech Solution.
              <br />
              <span className="text-muted-foreground">Professional. Scalable. Data-driven.</span>
            </h1>
          </div>
        </section>

        {/* Logo Animation Placeholder */}
        <section className="py-16">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-24 bg-muted rounded-lg mx-auto flex items-center justify-center"
            >
              <Image src="/images/logo.png" alt="Limitless Infotech Logo" width={96} height={96} />
            </motion.div>
          </div>
        </section>

        {/* Feature Sections */}
        <section className="py-16 sm:py-24">
          <div className="container grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Expert solutions, delivered.</h2>
              <p className="text-muted-foreground">
                From digital transformation to advanced automation, and custom software designed for global
                organizations.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Innovative products suite.</h2>
              <p className="text-muted-foreground">
                Seamless integration and future-ready modules for business and education.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Built</h2>
              <p className="text-muted-foreground">
                We specialize in secure infrastructures, multi-tenant architectures, and scalable platforms to
                accelerate your success.
              </p>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-16 sm:py-24">
          <div className="container grid md:grid-cols-3 gap-8 text-center">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
              <h3 className="text-5xl font-bold">120+</h3>
              <p className="text-muted-foreground">Projects Delivered</p>
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <h3 className="text-5xl font-bold">28K</h3>
              <p className="text-muted-foreground">Active Users</p>
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <h3 className="text-5xl font-bold">98%</h3>
              <p className="text-muted-foreground">Client Retention</p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-24 bg-muted/20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold">What clients say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-2 mb-12">Trusted partners worldwide.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="text-left">
                  <CardContent className="pt-6">
                    <p className="font-medium">&quot;{testimonial.quote}&quot;</p>
                    <p className="text-muted-foreground mt-4">
                      {testimonial.name}, <span className="italic">{testimonial.title}</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Limitless Infotech?
          </h2>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            We are committed to delivering excellence and driving real business value.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="flex flex-col items-center pb-4">
                <Shield className="w-12 h-12 text-primary mb-3" />
                <CardTitle className="text-xl font-semibold text-foreground">Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Building robust, secure, and scalable solutions that you can trust.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col items-center pb-4">
                <Lightbulb className="w-12 h-12 text-primary mb-3" />
                <CardTitle className="text-xl font-semibold text-foreground">Innovative Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Leveraging cutting-edge technologies to create future-proof applications.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col items-center pb-4">
                <TrendingUp className="w-12 h-12 text-primary mb-3" />
                <CardTitle className="text-xl font-semibold text-foreground">Results-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Focused on delivering measurable outcomes that contribute to your success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

        {/* Partners Section */}
        <section className="py-16">
          <div className="container">
            <div className="flex justify-around items-center flex-wrap gap-8">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Image src={partner.logo} alt={partner.name} width={24} height={24} />
                  <span className="font-semibold text-muted-foreground">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold">Ready to scale?</h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Request a demo or download our brochure.
            </p>
            <Button asChild>
              <Link href="/contact">
                Contact us <ArrowUpRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
