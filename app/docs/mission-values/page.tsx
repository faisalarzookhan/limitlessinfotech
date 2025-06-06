import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Heart, Shield, Zap, Users, Globe, Award, Lightbulb } from "lucide-react"

const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We operate with complete transparency, honesty, and ethical standards in all our interactions.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for perfection in every project, continuously improving our skills and processes.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace cutting-edge technologies and creative solutions to solve complex challenges.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork, both within our organization and with our clients.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Heart,
    title: "Client-Centricity",
    description: "Our clients' success is our success. We go above and beyond to exceed expectations.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "Agility",
    description: "We adapt quickly to changing requirements and market conditions while maintaining quality.",
    color: "from-yellow-500 to-amber-500",
  },
]

const principles = [
  {
    title: "Security First",
    description: "Every solution we build is designed with security as a fundamental requirement, not an afterthought.",
  },
  {
    title: "Scalable Solutions",
    description: "We create systems that grow with your business, ensuring long-term value and sustainability.",
  },
  {
    title: "User Experience",
    description: "We prioritize intuitive, user-friendly interfaces that enhance productivity and satisfaction.",
  },
  {
    title: "Continuous Learning",
    description: "We invest in our team's growth and stay current with the latest technologies and best practices.",
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing and quality control processes ensure reliable, bug-free deliverables.",
  },
  {
    title: "Timely Delivery",
    description: "We respect deadlines and deliver projects on time without compromising on quality.",
  },
]

export default function MissionValuesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6">Documentation</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mission & Values</h1>
            <p className="text-xl text-slate-300 mb-8">
              The core principles and values that guide everything we do at Limitless Infotech
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <blockquote className="text-2xl font-medium text-center mb-6">
                    "To empower businesses worldwide with innovative, secure, and scalable technology solutions that
                    drive growth, enhance efficiency, and create lasting competitive advantages."
                  </blockquote>
                  <p className="text-lg text-slate-300 text-center">
                    We are committed to being the catalyst for digital transformation, helping organizations of all
                    sizes harness the power of technology to achieve their goals and exceed their potential.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-8">Our Vision</h2>
              <Card className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-green-500/30">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <blockquote className="text-2xl font-medium text-center mb-6">
                    "To be the global leader in innovative technology solutions, recognized for our commitment to
                    excellence, security, and client success."
                  </blockquote>
                  <p className="text-lg text-slate-300 text-center">
                    We envision a future where every business, regardless of size or industry, has access to world-class
                    technology solutions that enable them to compete and thrive in the digital economy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
              <p className="text-xl text-slate-300">
                The fundamental beliefs that shape our culture and guide our decisions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value) => (
                <Card
                  key={value.title}
                  className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${value.color} flex items-center justify-center mb-4`}
                    >
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-slate-300">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Operating Principles</h2>
              <p className="text-xl text-slate-300">
                The practical guidelines that inform our daily operations and decision-making
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((principle, index) => (
                <Card key={principle.title} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
                        <p className="text-slate-300">{principle.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
                <p className="text-lg text-slate-300 mb-6">
                  We are committed to upholding these values and principles in every project we undertake, every
                  relationship we build, and every solution we deliver. Our success is measured not just by the
                  technology we create, but by the positive impact we have on our clients' businesses and the
                  communities we serve.
                </p>
                <div className="flex justify-center space-x-8 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">98%</div>
                    <div className="text-slate-300">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">100%</div>
                    <div className="text-slate-300">On-Time Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500">24/7</div>
                    <div className="text-slate-300">Support Available</div>
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
