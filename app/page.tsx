import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Smartphone, Database, Settings, Shield, Zap, Award, Rocket } from "lucide-react"
import ContactForm from "@/components/contact-form"

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Responsive, high-performing, brand-aligned websites with unmatched speed, functionality, and SEO.",
    color: "from-blue-500 to-cyan-500",
    href: "/services/web-development",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Seamless native and hybrid apps built for Android, iOS, and cross-platform environments.",
    color: "from-purple-500 to-pink-500",
    href: "/services/mobile-app-development",
  },
  {
    icon: Database,
    title: "Custom Software & Systems",
    description:
      "Tailor-made internal systems that digitize workflows, enhance productivity, and eliminate bottlenecks.",
    color: "from-green-500 to-emerald-500",
    href: "/services/custom-software",
  },
  {
    icon: Settings,
    title: "CRM & Task Management",
    description: "Intelligent suite with complete visibility over team tasks, performance, and timelines.",
    color: "from-orange-500 to-red-500",
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
      <section className="hero-bg pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                🚀 Where Innovation Meets Execution
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
                Empowering Businesses with Technology
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                That is <span className="text-blue-400 font-semibold">Secure</span>,{" "}
                <span className="text-purple-400 font-semibold">Unique</span>, and{" "}
                <span className="text-cyan-400 font-semibold">Limitless</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
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
                  className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                >
                  <Link href="/projects">View Our Work</Link>
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full h-96 flex items-center justify-center">
                <div className="w-64 h-64 animate-float">
                  <Image
                    src="/images/hero-graphic.png"
                    alt="Limitless Infotech"
                    width={256}
                    height={256}
                    className="drop-shadow-2xl"
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-1/4 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm animate-float">
                  <span className="mr-2">⚛️</span>
                  React
                </div>
                <div
                  className="absolute bottom-1/4 right-1/4 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <span className="mr-2">▲</span>
                  Next.js
                </div>
                <div
                  className="absolute top-1/2 right-1/3 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm animate-float"
                  style={{ animationDelay: "1.5s" }}
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
      <section id="services" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Expertise</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Services</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Cutting-edge solutions designed to help businesses scale smartly, efficiently, and securely
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card
                key={service.title}
                className="service-card bg-slate-800/50 border-slate-700 hover:border-blue-500/50"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-slate-300 mb-4">{service.description}</p>
                  <Link href={service.href} className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Where Innovation Meets Execution</h2>
              <p className="text-slate-300 mb-6">
                At Limitless Infotech Solutions, we are redefining how businesses build their digital identity. We're
                not just developers — we're architects of transformation. From code to concept, every solution we
                deliver is infused with precision, creativity, and futuristic thinking.
              </p>
              <p className="text-slate-300 mb-6">
                Founded in 2015, our team of expert developers, designers, and strategists has helped over 200+
                businesses across 15+ countries transform their digital presence and operational efficiency.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-4xl font-bold text-blue-500">200+</p>
                  <p className="text-slate-300">Projects Completed</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-500">15+</p>
                  <p className="text-slate-300">Countries Served</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-500">50+</p>
                  <p className="text-slate-300">Team Members</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-500">98%</p>
                  <p className="text-slate-300">Client Satisfaction</p>
                </div>
              </div>
              <Button asChild>
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/images/about-image.jpg"
                alt="Limitless Infotech Team"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-500 rounded-lg p-6 shadow-lg">
                <p className="text-2xl font-bold text-white">8+ Years</p>
                <p className="text-white/80">Of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualities Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Qualities</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We deliver solutions that are built to last, scale, and drive real business results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualities.map((quality) => (
              <div key={quality.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <quality.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{quality.title}</h3>
                <p className="text-slate-300">{quality.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Portfolio</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Explore our recent work and see how we've helped businesses transform their digital presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link key={project.title} href={project.href} className="project-card group">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="project-overlay absolute inset-0 bg-blue-900/80 flex flex-col justify-end p-6">
                    <Badge className="self-start mb-2">{project.category}</Badge>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <div className="mt-2 flex items-center text-blue-300">
                      <span>View Project</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Documentation</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Company Documentation</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Explore our comprehensive documentation to learn more about our company, processes, and values
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Company History</h3>
                <p className="text-slate-300 mb-6">
                  Learn about our journey from a small startup to a leading technology solutions provider.
                </p>
                <Button asChild variant="outline">
                  <Link href="/docs/company-history">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Mission & Values</h3>
                <p className="text-slate-300 mb-6">
                  Discover our core mission, vision, and the values that drive everything we do.
                </p>
                <Button asChild variant="outline">
                  <Link href="/docs/mission-values">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Operational Procedures</h3>
                <p className="text-slate-300 mb-6">
                  Explore our methodologies, project management approaches, and quality assurance processes.
                </p>
                <Button asChild variant="outline">
                  <Link href="/docs/operational-procedures">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/docs">
                Browse All Documentation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4">Get In Touch</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Go Limitless?</h2>
              <p className="text-xl text-slate-300">
                Let's discuss your project requirements and build the future of your business together.
              </p>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
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
