import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Code,
  Smartphone,
  Database,
  Settings,
  Shield,
  Zap,
  Award,
  Rocket,
  Lightbulb,
  Users,
  Globe,
} from "lucide-react"
import ContactForm from "@/components/contact-form"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Responsive, high-performing, brand-aligned websites with unmatched speed, functionality, and SEO.",
    color: "from-accent-blue to-accent-cyan",
    href: "/services/web-development",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Seamless native and hybrid apps built for Android, iOS, and cross-platform environments.",
    color: "from-accent-purple to-pink-500",
    href: "/services/mobile-app-development",
  },
  {
    icon: Database,
    title: "Custom Software & Systems",
    description:
      "Tailor-made internal systems that digitize workflows, enhance productivity, and eliminate bottlenecks.",
    color: "from-accent-green to-emerald-500",
    href: "/services/custom-software",
  },
  {
    icon: Settings,
    title: "CRM & Task Management",
    description: "Intelligent suite with complete visibility over team tasks, performance, and timelines.",
    color: "from-accent-orange to-red-500",
    href: "/services/crm-solutions",
  },
]

const qualities = [
  {
    icon: Shield,
    title: "Total Security",
    description: "Enterprise-grade security protocols and encryption standards",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for performance and consistently reliable under pressure",
  },
  {
    icon: Award,
    title: "True Uniqueness",
    description: "Every project uniquely tailored to your brand's voice and needs",
  },
  {
    icon: Rocket,
    title: "Future-Ready",
    description: "Smart technologies with AI, automation, and cloud integration",
  },
]

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "/images/projects/ecommerce.jpg",
    href: "/projects/ecommerce-platform",
  },
  {
    title: "Healthcare Management System",
    category: "Custom Software",
    image: "/images/projects/healthcare.jpg",
    href: "/projects/healthcare-management",
  },
  {
    title: "Fitness Tracking App",
    category: "Mobile App",
    image: "/images/projects/fitness.jpg",
    href: "/projects/fitness-app",
  },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-1 rounded-full text-sm">
                🚀 Where Innovation Meets Execution
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text leading-tight">
                Empowering Businesses with Limitless Technology
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                That is <span className="text-accent-blue font-semibold">Secure</span>,{" "}
                <span className="text-accent-purple font-semibold">Unique</span>, and{" "}
                <span className="text-accent-cyan font-semibold">Scalable</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="btn-gradient animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Link href="/contact">
                    Launch Your Vision
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="btn-outline-primary animate-fade-in-up"
                  style={{ animationDelay: "0.6s" }}
                >
                  <Link href="/projects">View Our Work</Link>
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <div className="relative w-full h-96 flex items-center justify-center">
                <div className="w-64 h-64 animate-float">
                  <Image
                    src="/images/hero-graphic.png"
                    alt="Limitless Infotech"
                    width={256}
                    height={256}
                    className="drop-shadow-2xl animate-glow"
                  />
                </div>

                {/* Floating Elements */}
                <div
                  className="absolute top-1/4 left-1/4 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 text-sm border border-border animate-float"
                  style={{ animationDelay: "0.8s" }}
                >
                  <span className="mr-2">⚛️</span>
                  React
                </div>
                <div
                  className="absolute bottom-1/4 right-1/4 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 text-sm border border-border animate-float"
                  style={{ animationDelay: "1.2s" }}
                >
                  <span className="mr-2">▲</span>
                  Next.js
                </div>
                <div
                  className="absolute top-1/2 right-1/3 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 text-sm border border-border animate-float"
                  style={{ animationDelay: "1.6s" }}
                >
                  <span className="mr-2">🤖</span>
                  AI/ML
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-dark-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 px-3 py-1 rounded-full text-xs">
              Our Expertise
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Core Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge solutions designed to help businesses scale smartly, efficiently, and securely
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="service-card animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index + 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                      `bg-gradient-to-r ${service.color}`,
                    )}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link
                    href={service.href}
                    className="text-primary hover:text-primary/80 inline-flex items-center font-medium"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="btn-outline-primary">
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-dark-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 px-3 py-1 rounded-full text-xs">
                About Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Where Innovation Meets Execution</h2>
              <p className="text-muted-foreground mb-6">
                At Limitless Infotech Solutions, we are redefining how businesses build their digital identity. We're
                not just developers — we're architects of transformation. From code to concept, every solution we
                deliver is infused with precision, creativity, and futuristic thinking.
              </p>
              <p className="text-muted-foreground mb-6">
                Founded in 2015, our team of expert developers, designers, and strategists has helped over 200+
                businesses across 15+ countries transform their digital presence and operational efficiency.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <p className="text-4xl font-bold text-accent-blue">200+</p>
                  <p className="text-muted-foreground">Projects Completed</p>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <p className="text-4xl font-bold text-accent-blue">15+</p>
                  <p className="text-muted-foreground">Countries Served</p>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  <p className="text-4xl font-bold text-accent-blue">50+</p>
                  <p className="text-muted-foreground">Team Members</p>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                  <p className="text-4xl font-bold text-accent-blue">98%</p>
                  <p className="text-muted-foreground">Client Satisfaction</p>
                </div>
              </div>
              <Button asChild className="btn-gradient animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <Image
                src="/images/about-image.jpg"
                alt="Limitless Infotech Team"
                width={600}
                height={400}
                className="rounded-lg shadow-xl border border-border"
              />
              <div
                className="absolute -bottom-6 -left-6 bg-primary rounded-lg p-6 shadow-lg animate-fade-in-up"
                style={{ animationDelay: "0.9s" }}
              >
                <p className="text-2xl font-bold text-white">8+ Years</p>
                <p className="text-white/80">Of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualities Section */}
      <section className="py-20 bg-dark-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 px-3 py-1 rounded-full text-xs">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Core Qualities</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We deliver solutions that are built to last, scale, and drive real business results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualities.map((quality, index) => (
              <div
                key={quality.title}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index + 0.2}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full flex items-center justify-center shadow-md">
                  <quality.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{quality.title}</h3>
                <p className="text-muted-foreground">{quality.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-dark-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 px-3 py-1 rounded-full text-xs">
              Our Portfolio
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our recent work and see how we've helped businesses transform their digital presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link
                key={project.title}
                href={project.href}
                className="project-card group animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index + 0.2}s` }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="project-overlay absolute inset-0 flex flex-col justify-end p-6">
                    <Badge className="self-start mb-2 bg-primary/20 text-primary border-primary/30">
                      {project.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <div className="mt-2 flex items-center text-primary group-hover:text-primary/80">
                      <span>View Project</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="btn-outline-primary">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-20 bg-dark-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 px-3 py-1 rounded-full text-xs">
              Documentation
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Company Documentation</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive documentation to learn more about our company, processes, and values
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card
              className="custom-card hover:border-primary transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-6">
                <Lightbulb className="w-10 h-10 text-accent-blue mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-foreground">Company History</h3>
                <p className="text-muted-foreground mb-6">
                  Learn about our journey from a small startup to a leading technology solutions provider.
                </p>
                <Button asChild variant="outline" className="btn-outline-primary">
                  <Link href="/docs/company-history">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card
              className="custom-card hover:border-primary transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <CardContent className="p-6">
                <Users className="w-10 h-10 text-accent-green mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-foreground">Mission & Values</h3>
                <p className="text-muted-foreground mb-6">
                  Discover our core mission, vision, and the values that drive everything we do.
                </p>
                <Button asChild variant="outline" className="btn-outline-primary">
                  <Link href="/docs/mission-values">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card
              className="custom-card hover:border-primary transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <CardContent className="p-6">
                <Globe className="w-10 h-10 text-accent-purple mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-foreground">Operational Procedures</h3>
                <p className="text-muted-foreground mb-6">
                  Explore our methodologies, project management approaches, and quality assurance processes.
                </p>
                <Button asChild variant="outline" className="btn-outline-primary">
                  <Link href="/docs/operational-procedures">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="btn-gradient">
              <Link href="/docs">
                Browse All Documentation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 px-3 py-1 rounded-full text-xs">
                Get In Touch
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to Go Limitless?</h2>
              <p className="text-xl text-muted-foreground">
                Let's discuss your project requirements and build the future of your business together.
              </p>
            </div>

            <Card className="custom-card">
              <CardContent className="p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
