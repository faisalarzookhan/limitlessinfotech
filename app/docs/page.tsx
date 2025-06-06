import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, History, Target, Settings, Users, Shield, Code } from "lucide-react"

const documentationCategories = [
  {
    title: "Company History",
    description: "Learn about our journey from a small startup to a leading technology solutions provider.",
    icon: History,
    href: "/docs/company-history",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Mission & Values",
    description: "Discover our core mission, vision, and the values that drive everything we do.",
    icon: Target,
    href: "/docs/mission-values",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Operational Procedures",
    description: "Explore our methodologies, project management approaches, and quality assurance processes.",
    icon: Settings,
    href: "/docs/operational-procedures",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Team Structure",
    description: "Understand our organizational structure, roles, and responsibilities.",
    icon: Users,
    href: "/docs/team-structure",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Security Protocols",
    description: "Learn about our security measures, data protection policies, and compliance standards.",
    icon: Shield,
    href: "/docs/security-protocols",
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Technical Standards",
    description: "Explore our coding standards, technology stack, and development best practices.",
    icon: Code,
    href: "/docs/technical-standards",
    color: "from-yellow-500 to-amber-500",
  },
]

export default function DocumentationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6">Documentation</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Company Documentation</h1>
            <p className="text-xl text-slate-300 mb-8">
              Comprehensive information about our company, processes, and values
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="#documentation-categories">
                  Browse Documentation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section id="documentation-categories" className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Documentation Categories</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Explore our comprehensive documentation to learn more about Limitless Infotech
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documentationCategories.map((category) => (
              <Card
                key={category.title}
                className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}
                  >
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                  <p className="text-slate-300 mb-4">{category.description}</p>
                  <Button asChild variant="outline">
                    <Link href={category.href}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Latest Updates</Badge>
            <h2 className="text-3xl font-bold mb-6">Recently Updated Documentation</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Stay up-to-date with our latest documentation updates and additions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2">Updated 3 days ago</Badge>
                    <h3 className="text-xl font-semibold mb-2">Security Protocols</h3>
                    <p className="text-slate-300 mb-4">
                      Updated information about our GDPR compliance and data protection measures.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/docs/security-protocols">
                        Read Update
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Shield className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2">Updated 1 week ago</Badge>
                    <h3 className="text-xl font-semibold mb-2">Operational Procedures</h3>
                    <p className="text-slate-300 mb-4">
                      New agile development workflow and project management guidelines.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/docs/operational-procedures">
                        Read Update
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Settings className="w-8 h-8 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2">Updated 2 weeks ago</Badge>
                    <h3 className="text-xl font-semibold mb-2">Technical Standards</h3>
                    <p className="text-slate-300 mb-4">
                      Added new coding standards for React, Next.js, and TypeScript development.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/docs/technical-standards">
                        Read Update
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Code className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Quick Access</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">Frequently accessed documentation sections</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
              <Link href="/docs/company-history">
                <BookOpen className="w-8 h-8 mb-2" />
                <span>Company History</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
              <Link href="/docs/mission-values">
                <Target className="w-8 h-8 mb-2" />
                <span>Mission & Values</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
              <Link href="/docs/operational-procedures">
                <Settings className="w-8 h-8 mb-2" />
                <span>Procedures</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
              <Link href="/docs/security-protocols">
                <Shield className="w-8 h-8 mb-2" />
                <span>Security</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
