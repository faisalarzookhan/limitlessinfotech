import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Smartphone, Code, Database, Bot, Cog, ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Services | Limitless Infotech Solution",
  description:
    "Comprehensive technology services including web development, mobile apps, custom software, CRM solutions, and AI integration.",
}

const services = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies",
    icon: Globe,
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure"],
    technologies: ["React", "Next.js", "Node.js", "TypeScript"],
    startingPrice: "$2,999",
    href: "/services/web-development",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    icon: Smartphone,
    features: ["Cross-Platform", "Native Performance", "App Store Ready", "Push Notifications"],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
    startingPrice: "$4,999",
    href: "/services/mobile-app-development",
  },
  {
    id: "custom-software",
    title: "Custom Software",
    description: "Tailored software solutions designed specifically for your business needs",
    icon: Code,
    features: ["Scalable Architecture", "Custom Features", "Integration Ready", "Maintenance"],
    technologies: ["Python", "Java", ".NET", "Microservices"],
    startingPrice: "$7,999",
    href: "/services/custom-software",
  },
  {
    id: "crm-solutions",
    title: "CRM Solutions",
    description: "Customer relationship management systems to streamline your business",
    icon: Database,
    features: ["Lead Management", "Sales Pipeline", "Analytics", "Automation"],
    technologies: ["Salesforce", "HubSpot", "Custom CRM", "API Integration"],
    startingPrice: "$3,999",
    href: "/services/crm-solutions",
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description: "Artificial intelligence solutions to automate and enhance your operations",
    icon: Bot,
    features: ["Machine Learning", "Natural Language Processing", "Automation", "Analytics"],
    technologies: ["TensorFlow", "OpenAI", "Python", "Cloud AI"],
    startingPrice: "$9,999",
    href: "/services/ai-integration",
  },
  {
    id: "business-automation",
    title: "Business Automation",
    description: "Streamline workflows and processes with intelligent automation solutions",
    icon: Cog,
    features: ["Workflow Automation", "Process Optimization", "Integration", "Monitoring"],
    technologies: ["Zapier", "Microsoft Power Automate", "Custom APIs", "RPA"],
    startingPrice: "$2,499",
    href: "/services/business-automation",
  },
]

const stats = [
  { label: "Projects Completed", value: "500+" },
  { label: "Happy Clients", value: "200+" },
  { label: "Years Experience", value: "9+" },
  { label: "Team Members", value: "25+" },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-blue-400">Services</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Comprehensive technology solutions designed to transform your business and drive growth
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to deployment, we provide end-to-end technology solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={service.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500/50"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                        <IconComponent className="h-8 w-8 text-blue-500" />
                      </div>
                      <Badge variant="secondary" className="text-sm font-semibold">
                        From {service.startingPrice}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-muted-foreground">KEY FEATURES</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-muted-foreground">TECHNOLOGIES</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button asChild className="w-full group-hover:bg-blue-600 transition-colors">
                        <Link href={service.href}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Understanding your needs and requirements" },
              { step: "02", title: "Planning", description: "Creating detailed project roadmap and timeline" },
              { step: "03", title: "Development", description: "Building your solution with regular updates" },
              { step: "04", title: "Delivery", description: "Testing, deployment, and ongoing support" },
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {phase.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">Let's discuss your project and create something amazing together</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/projects">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
