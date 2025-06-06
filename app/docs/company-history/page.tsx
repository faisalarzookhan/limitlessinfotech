import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Globe } from "lucide-react"

const milestones = [
  {
    year: "2015",
    title: "Company Founded",
    description:
      "Limitless Infotech Solution was founded by a team of passionate developers with a vision to transform businesses through technology.",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    year: "2016",
    title: "First Major Client",
    description:
      "Secured our first enterprise client and delivered a comprehensive e-commerce platform that increased their sales by 300%.",
    icon: Award,
    color: "from-green-500 to-emerald-500",
  },
  {
    year: "2017",
    title: "Team Expansion",
    description:
      "Grew our team to 15 members and established our core development practices and quality assurance processes.",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2018",
    title: "International Expansion",
    description:
      "Expanded our services internationally, serving clients across 5 countries and establishing remote work capabilities.",
    icon: Globe,
    color: "from-orange-500 to-red-500",
  },
  {
    year: "2019",
    title: "Technology Innovation",
    description: "Pioneered AI integration services and launched our flagship CRM management platform.",
    icon: Award,
    color: "from-indigo-500 to-violet-500",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Helped 50+ businesses transition to digital-first operations during the global pandemic.",
    icon: Globe,
    color: "from-yellow-500 to-amber-500",
  },
  {
    year: "2021",
    title: "Industry Recognition",
    description:
      "Received multiple industry awards for innovation and client satisfaction, establishing ourselves as a leading tech solutions provider.",
    icon: Award,
    color: "from-pink-500 to-rose-500",
  },
  {
    year: "2022",
    title: "50+ Team Members",
    description: "Reached a milestone of 50+ team members across development, design, and project management.",
    icon: Users,
    color: "from-teal-500 to-cyan-500",
  },
  {
    year: "2023",
    title: "Advanced AI Solutions",
    description: "Launched advanced AI and machine learning solutions, helping businesses automate complex processes.",
    icon: Award,
    color: "from-violet-500 to-purple-500",
  },
  {
    year: "2024",
    title: "Global Presence",
    description:
      "Established presence in 15+ countries with 200+ successful projects and 98% client satisfaction rate.",
    icon: Globe,
    color: "from-emerald-500 to-green-500",
  },
]

export default function CompanyHistoryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6">Documentation</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Company History</h1>
            <p className="text-xl text-slate-300 mb-8">
              Our journey from a small startup to a leading technology solutions provider
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>

            <Card className="bg-slate-800/50 border-slate-700 mb-12">
              <CardContent className="p-8">
                <p className="text-lg text-slate-300 mb-6">
                  Limitless Infotech Solution Pvt. Ltd. was born from a simple yet powerful vision: to empower
                  businesses with technology that is secure, unique, and limitless. Founded in 2015 by a team of
                  passionate developers and technology enthusiasts, we set out to bridge the gap between innovative
                  technology and practical business solutions.
                </p>
                <p className="text-lg text-slate-300 mb-6">
                  What started as a small team of 5 developers working from a shared office space has grown into a
                  global technology solutions provider with 50+ team members serving clients across 15+ countries. Our
                  journey has been marked by continuous innovation, unwavering commitment to quality, and a relentless
                  focus on client success.
                </p>
                <p className="text-lg text-slate-300">
                  Today, we stand as architects of digital transformation, helping businesses of all sizes leverage
                  cutting-edge technology to achieve their goals and scale beyond their limits.
                </p>
              </CardContent>
            </Card>

            {/* Key Statistics */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">9+</div>
                <div className="text-slate-300">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">200+</div>
                <div className="text-slate-300">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-500 mb-2">15+</div>
                <div className="text-slate-300">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">50+</div>
                <div className="text-slate-300">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-16 text-center">Our Journey</h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative flex items-start">
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r ${milestone.color} border-4 border-slate-900`}
                    ></div>

                    {/* Content */}
                    <div className="ml-20">
                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <Badge className="mb-2">{milestone.year}</Badge>
                              <h3 className="text-xl font-semibold">{milestone.title}</h3>
                            </div>
                            <div
                              className={`w-12 h-12 rounded-lg bg-gradient-to-r ${milestone.color} flex items-center justify-center`}
                            >
                              <milestone.icon className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <p className="text-slate-300">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Vision */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Founding Vision</h2>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <blockquote className="text-xl text-slate-300 italic mb-6 text-center">
                  "We envisioned a world where technology doesn't just serve businesses—it transforms them. Where
                  innovation isn't just about the latest trends, but about creating lasting solutions that drive real
                  growth and success."
                </blockquote>
                <p className="text-center text-slate-400">— Founding Team, Limitless Infotech Solution</p>

                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">Excellence</h4>
                    <p className="text-sm text-slate-300">Commitment to delivering the highest quality solutions</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">Collaboration</h4>
                    <p className="text-sm text-slate-300">Working closely with clients as true partners</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">Innovation</h4>
                    <p className="text-sm text-slate-300">Continuously pushing the boundaries of what's possible</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
