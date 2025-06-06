import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Calendar, Users, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Projects | Limitless Infotech Solution",
  description: "Explore our portfolio of successful web development, mobile app, and custom software projects.",
}

const projects = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A comprehensive online marketplace with advanced features for vendors and customers",
    category: "Web Development",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "/images/projects/ecommerce.jpg",
    client: "RetailCorp",
    duration: "6 months",
    team: "8 members",
    status: "Completed",
    featured: true,
    results: {
      users: "50K+",
      revenue: "$2M+",
      performance: "99.9%",
    },
  },
  {
    id: "healthcare-app",
    title: "Healthcare Management System",
    description: "Digital health platform connecting patients with healthcare providers",
    category: "Mobile App",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
    image: "/images/projects/healthcare.jpg",
    client: "MedTech Solutions",
    duration: "8 months",
    team: "10 members",
    status: "Completed",
    featured: true,
    results: {
      users: "25K+",
      appointments: "100K+",
      satisfaction: "4.8/5",
    },
  },
  {
    id: "fitness-tracker",
    title: "Fitness Tracking App",
    description: "AI-powered fitness companion with personalized workout plans",
    category: "Mobile App",
    technologies: ["Flutter", "Python", "TensorFlow", "AWS"],
    image: "/images/projects/fitness.jpg",
    client: "FitLife Inc",
    duration: "4 months",
    team: "6 members",
    status: "Completed",
    featured: false,
    results: {
      downloads: "100K+",
      retention: "85%",
      rating: "4.7/5",
    },
  },
  {
    id: "crm-system",
    title: "Custom CRM Solution",
    description: "Enterprise-grade customer relationship management system",
    category: "Custom Software",
    technologies: ["Vue.js", "Laravel", "MySQL", "Docker"],
    image: "/images/projects/crm.jpg",
    client: "SalesPro Ltd",
    duration: "10 months",
    team: "12 members",
    status: "Completed",
    featured: false,
    results: {
      efficiency: "+40%",
      leads: "10K+",
      conversion: "+25%",
    },
  },
  {
    id: "fintech-platform",
    title: "FinTech Payment Gateway",
    description: "Secure payment processing platform with multi-currency support",
    category: "Web Development",
    technologies: ["Next.js", "Express.js", "PostgreSQL", "Redis"],
    image: "/images/projects/fintech.jpg",
    client: "PaySecure",
    duration: "12 months",
    team: "15 members",
    status: "In Progress",
    featured: true,
    results: {
      transactions: "$50M+",
      uptime: "99.99%",
      countries: "25+",
    },
  },
  {
    id: "education-platform",
    title: "Online Learning Platform",
    description: "Interactive e-learning platform with video streaming and assessments",
    category: "Web Development",
    technologies: ["React", "Django", "PostgreSQL", "AWS"],
    image: "/images/projects/education.jpg",
    client: "EduTech Global",
    duration: "7 months",
    team: "9 members",
    status: "Completed",
    featured: false,
    results: {
      students: "15K+",
      courses: "500+",
      completion: "78%",
    },
  },
]

const categories = ["All", "Web Development", "Mobile App", "Custom Software", "AI Integration"]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-blue-400">Projects</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Discover how we've helped businesses transform their digital presence with innovative solutions
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">200+</div>
                <div className="text-slate-300">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">150+</div>
                <div className="text-slate-300">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">99%</div>
                <div className="text-slate-300">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">24/7</div>
                <div className="text-slate-300">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm" className="hover:bg-blue-500 hover:text-white">
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search projects..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcasing our most impactful and innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {projects
              .filter((project) => project.featured)
              .map((project) => (
                <Card key={project.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-500 text-white">{project.category}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant={project.status === "Completed" ? "default" : "secondary"}>{project.status}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </CardTitle>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <CardDescription className="text-base">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-muted-foreground mr-2" />
                          {project.team}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                          {project.duration}
                        </div>
                        <div className="text-muted-foreground">{project.client}</div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                        {Object.entries(project.results).map(([key, value], index) => (
                          <div key={index} className="text-center">
                            <div className="font-semibold text-blue-600">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      <Button asChild className="w-full">
                        <Link href={`/projects/${project.id}`}>View Case Study</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse through our complete portfolio of successful projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-500/90 text-white text-xs">{project.category}</Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{project.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{project.client}</span>
                      <span>{project.duration}</span>
                    </div>

                    <Button asChild size="sm" className="w-full">
                      <Link href={`/projects/${project.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create something amazing together. Get in touch to discuss your ideas.
            </p>
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
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
