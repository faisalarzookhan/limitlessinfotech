import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, ExternalLink, Download } from "lucide-react"

const projects = {
  "ecommerce-platform": {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    subtitle: "Comprehensive Online Marketplace",
    description:
      "A full-featured e-commerce platform with advanced vendor management, real-time analytics, and AI-powered recommendations",
    category: "Web Development",
    client: "RetailCorp",
    industry: "Retail & E-commerce",
    duration: "6 months",
    team: "8 members",
    budget: "$75,000",
    status: "Completed",
    launchDate: "March 2024",
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS", "Redis", "Docker"],
    images: {
      hero: "/images/projects/ecommerce-hero.jpg",
      gallery: [
        "/images/projects/ecommerce-1.jpg",
        "/images/projects/ecommerce-2.jpg",
        "/images/projects/ecommerce-3.jpg",
        "/images/projects/ecommerce-4.jpg",
      ],
    },
    challenge:
      "RetailCorp needed a scalable e-commerce platform that could handle multiple vendors, process thousands of transactions daily, and provide real-time analytics. The existing system was outdated and couldn't scale with their growing business needs.",
    solution:
      "We built a modern, microservices-based e-commerce platform with advanced features including vendor management, AI-powered product recommendations, real-time inventory tracking, and comprehensive analytics dashboard.",
    results: {
      users: "50,000+",
      revenue: "$2.5M+",
      performance: "99.9%",
      conversion: "+45%",
      loadTime: "1.2s",
      satisfaction: "4.8/5",
    },
    features: [
      "Multi-vendor marketplace",
      "AI-powered recommendations",
      "Real-time inventory management",
      "Advanced analytics dashboard",
      "Mobile-responsive design",
      "Secure payment processing",
      "Order tracking system",
      "Customer review system",
      "SEO optimization",
      "Admin panel",
    ],
    testimonial: {
      quote:
        "Limitless Infotech transformed our business with this incredible platform. Sales increased by 45% in the first quarter after launch.",
      author: "Sarah Johnson",
      position: "CEO, RetailCorp",
      avatar: "/images/testimonials/sarah-johnson.jpg",
    },
    timeline: [
      { phase: "Discovery & Planning", duration: "2 weeks", status: "completed" },
      { phase: "Design & Prototyping", duration: "3 weeks", status: "completed" },
      { phase: "Backend Development", duration: "8 weeks", status: "completed" },
      { phase: "Frontend Development", duration: "6 weeks", status: "completed" },
      { phase: "Testing & QA", duration: "3 weeks", status: "completed" },
      { phase: "Deployment & Launch", duration: "2 weeks", status: "completed" },
    ],
    techStack: {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express.js", "PostgreSQL", "Redis"],
      cloud: ["AWS EC2", "AWS S3", "AWS RDS", "CloudFront"],
      tools: ["Docker", "GitHub Actions", "Stripe API", "SendGrid"],
    },
    liveUrl: "https://retailcorp-demo.com",
    caseStudyUrl: "/case-studies/ecommerce-platform.pdf",
  },
  "healthcare-app": {
    id: "healthcare-app",
    title: "Healthcare Management System",
    subtitle: "Digital Health Platform",
    description:
      "Comprehensive healthcare platform connecting patients with providers through telemedicine, appointment scheduling, and health records management",
    category: "Mobile App",
    client: "MedTech Solutions",
    industry: "Healthcare",
    duration: "8 months",
    team: "10 members",
    budget: "$120,000",
    status: "Completed",
    launchDate: "January 2024",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB", "WebRTC", "AWS", "Stripe"],
    images: {
      hero: "/images/projects/healthcare-hero.jpg",
      gallery: [
        "/images/projects/healthcare-1.jpg",
        "/images/projects/healthcare-2.jpg",
        "/images/projects/healthcare-3.jpg",
        "/images/projects/healthcare-4.jpg",
      ],
    },
    challenge:
      "MedTech Solutions needed a comprehensive digital health platform that could facilitate telemedicine consultations, manage patient records securely, and streamline appointment scheduling while ensuring HIPAA compliance.",
    solution:
      "We developed a cross-platform mobile application with web portal that enables secure video consultations, electronic health records management, appointment scheduling, and prescription management with full HIPAA compliance.",
    results: {
      users: "25,000+",
      appointments: "100,000+",
      satisfaction: "4.8/5",
      efficiency: "+60%",
      costs: "-30%",
      retention: "85%",
    },
    features: [
      "Telemedicine video calls",
      "Electronic health records",
      "Appointment scheduling",
      "Prescription management",
      "Health monitoring",
      "Insurance integration",
      "Multi-language support",
      "HIPAA compliance",
      "Real-time notifications",
      "Analytics dashboard",
    ],
    testimonial: {
      quote:
        "This platform revolutionized how we deliver healthcare services. Patient satisfaction increased dramatically and our operational efficiency improved by 60%.",
      author: "Dr. Michael Chen",
      position: "Chief Medical Officer, MedTech Solutions",
      avatar: "/images/testimonials/michael-chen.jpg",
    },
    timeline: [
      { phase: "Requirements & Compliance", duration: "3 weeks", status: "completed" },
      { phase: "Architecture & Design", duration: "4 weeks", status: "completed" },
      { phase: "Core Development", duration: "12 weeks", status: "completed" },
      { phase: "Security Implementation", duration: "4 weeks", status: "completed" },
      { phase: "Testing & Compliance", duration: "4 weeks", status: "completed" },
      { phase: "Deployment & Training", duration: "3 weeks", status: "completed" },
    ],
    techStack: {
      mobile: ["React Native", "TypeScript", "Redux", "WebRTC"],
      backend: ["Node.js", "Express.js", "MongoDB", "Socket.io"],
      cloud: ["Firebase", "AWS", "Twilio Video", "SendGrid"],
      security: ["OAuth 2.0", "JWT", "AES Encryption", "HIPAA Compliance"],
    },
    liveUrl: "https://medtech-demo.com",
    caseStudyUrl: "/case-studies/healthcare-app.pdf",
  },
  // Add more projects...
}

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects[params.slug as keyof typeof projects]

  if (!project) {
    return {
      title: "Project Not Found | Limitless Infotech",
    }
  }

  return {
    title: `${project.title} - Case Study | Limitless Infotech`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects[params.slug as keyof typeof projects]

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">{project.category}</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</h1>
              <p className="text-xl text-blue-300 mb-6">{project.subtitle}</p>
              <p className="text-lg text-slate-300 mb-8">{project.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{project.duration}</div>
                  <div className="text-slate-300 text-sm">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{project.team}</div>
                  <div className="text-slate-300 text-sm">Team Size</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{project.industry}</div>
                  <div className="text-slate-300 text-sm">Industry</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{project.status}</div>
                  <div className="text-slate-300 text-sm">Status</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {project.liveUrl && (
                  <Button size="lg" asChild>
                    <Link href={project.liveUrl} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Project
                    </Link>
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                  asChild
                >
                  <Link href={project.caseStudyUrl}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Case Study
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src={project.images.hero || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="challenge">Challenge</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">{project.description}</p>

                      <h4 className="font-semibold mb-4">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Client</div>
                        <div className="font-medium">{project.client}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Industry</div>
                        <div className="font-medium">{project.industry}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-medium">{project.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Team Size</div>
                        <div className="font-medium">{project.team}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Launch Date</div>
                        <div className="font-medium">{project.launchDate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Technologies</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="challenge" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>The Challenge</CardTitle>
                  <CardDescription>Understanding the problem we needed to solve</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="solution" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Solution</CardTitle>
                  <CardDescription>How we approached and solved the challenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-8">{project.solution}</p>

                  <h4 className="font-semibold mb-4">Project Timeline</h4>
                  <div className="space-y-4">
                    {project.timeline.map((phase, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{phase.phase}</div>
                          <div className="text-sm text-muted-foreground">{phase.duration}</div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="mt-8">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Results</CardTitle>
                    <CardDescription>Measurable impact and success metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {Object.entries(project.results).map(([key, value], index) => (
                        <div key={index} className="text-center p-6 bg-muted/50 rounded-lg">
                          <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Client Testimonial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <Image
                        src={project.testimonial.avatar || "/placeholder.svg"}
                        alt={project.testimonial.author}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <blockquote className="text-lg italic mb-4">"{project.testimonial.quote}"</blockquote>
                        <div className="font-semibold">{project.testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{project.testimonial.position}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Technology Stack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Object.entries(project.techStack).map(([category, technologies]) => (
                        <div key={category}>
                          <h4 className="font-semibold mb-2 capitalize">{category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {technologies.map((tech, index) => (
                              <Badge key={index} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Architecture Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Microservices architecture for scalability</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Cloud-native deployment with auto-scaling</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Real-time data synchronization</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Advanced security and encryption</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Comprehensive monitoring and logging</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Gallery</h2>
            <p className="text-xl text-muted-foreground">Screenshots and visuals from the project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.gallery.map((image, index) => (
              <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Related Projects</h2>
            <p className="text-xl text-muted-foreground">Explore more of our work</p>
          </div>

          <div className="flex justify-center">
            <Button size="lg" asChild>
              <Link href="/projects">
                View All Projects
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
