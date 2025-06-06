import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Linkedin,
  Twitter,
  Github,
  Mail,
  MapPin,
  Calendar,
  Award,
  Users,
  Code,
  Palette,
  BarChart3,
  Shield,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Our Team | Limitless Infotech Solution",
  description:
    "Meet the talented professionals behind Limitless Infotech Solution. Our diverse team of experts in technology, design, and business.",
}

const leadership = [
  {
    id: "john-doe",
    name: "John Doe",
    position: "CEO & Founder",
    department: "Leadership",
    image: "/images/team/john-doe.jpg",
    bio: "Visionary leader with 15+ years in technology and business development. Founded Limitless Infotech with a mission to democratize technology for businesses of all sizes.",
    experience: "15+ years",
    location: "San Francisco, CA",
    skills: ["Strategic Planning", "Business Development", "Technology Vision", "Team Leadership"],
    achievements: ["Founded 3 successful startups", "Led $50M+ in funding rounds", "Built teams of 100+ people"],
    social: {
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      email: "john@limitlessinfotech.com",
    },
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    position: "CTO",
    department: "Leadership",
    image: "/images/team/jane-smith.jpg",
    bio: "Technology expert with deep expertise in scalable systems and emerging technologies. Leads our technical vision and innovation initiatives.",
    experience: "12+ years",
    location: "Austin, TX",
    skills: ["System Architecture", "Cloud Computing", "AI/ML", "Technical Leadership"],
    achievements: [
      "Built systems serving 10M+ users",
      "Published 20+ technical papers",
      "Speaker at major tech conferences",
    ],
    social: {
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
      email: "jane@limitlessinfotech.com",
    },
  },
]

const teamMembers = [
  {
    id: "mike-johnson",
    name: "Mike Johnson",
    position: "Senior Full Stack Developer",
    department: "Engineering",
    image: "/images/team/mike-johnson.jpg",
    bio: "Full-stack developer specializing in React, Node.js, and cloud technologies. Passionate about creating scalable and maintainable applications.",
    experience: "8+ years",
    location: "Seattle, WA",
    skills: ["React", "Node.js", "AWS", "PostgreSQL"],
    social: {
      linkedin: "https://linkedin.com/in/mikejohnson",
      github: "https://github.com/mikejohnson",
      email: "mike@limitlessinfotech.com",
    },
  },
  {
    id: "sarah-wilson",
    name: "Sarah Wilson",
    position: "Lead UI/UX Designer",
    department: "Design",
    image: "/images/team/sarah-wilson.jpg",
    bio: "Creative designer with a passion for user-centered design. Specializes in creating intuitive and beautiful digital experiences.",
    experience: "6+ years",
    location: "New York, NY",
    skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
    social: {
      linkedin: "https://linkedin.com/in/sarahwilson",
      twitter: "https://twitter.com/sarahwilson",
      email: "sarah@limitlessinfotech.com",
    },
  },
  {
    id: "david-brown",
    name: "David Brown",
    position: "Mobile App Developer",
    department: "Engineering",
    image: "/images/team/david-brown.jpg",
    bio: "Mobile development expert with experience in both native and cross-platform development. Focuses on performance and user experience.",
    experience: "7+ years",
    location: "Los Angeles, CA",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    social: {
      linkedin: "https://linkedin.com/in/davidbrown",
      github: "https://github.com/davidbrown",
      email: "david@limitlessinfotech.com",
    },
  },
  {
    id: "emily-davis",
    name: "Emily Davis",
    position: "DevOps Engineer",
    department: "Engineering",
    image: "/images/team/emily-davis.jpg",
    bio: "DevOps specialist focused on automation, scalability, and reliability. Ensures our applications run smoothly in production.",
    experience: "5+ years",
    location: "Denver, CO",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    social: {
      linkedin: "https://linkedin.com/in/emilydavis",
      github: "https://github.com/emilydavis",
      email: "emily@limitlessinfotech.com",
    },
  },
  {
    id: "alex-martinez",
    name: "Alex Martinez",
    position: "Data Scientist",
    department: "AI/ML",
    image: "/images/team/alex-martinez.jpg",
    bio: "Data scientist and ML engineer with expertise in building intelligent systems. Passionate about using AI to solve real-world problems.",
    experience: "4+ years",
    location: "Boston, MA",
    skills: ["Python", "TensorFlow", "Machine Learning", "Data Analysis"],
    social: {
      linkedin: "https://linkedin.com/in/alexmartinez",
      github: "https://github.com/alexmartinez",
      email: "alex@limitlessinfotech.com",
    },
  },
  {
    id: "lisa-taylor",
    name: "Lisa Taylor",
    position: "Project Manager",
    department: "Operations",
    image: "/images/team/lisa-taylor.jpg",
    bio: "Experienced project manager with a track record of delivering complex projects on time and within budget. Expert in Agile methodologies.",
    experience: "9+ years",
    location: "Chicago, IL",
    skills: ["Project Management", "Agile", "Scrum", "Team Coordination"],
    social: {
      linkedin: "https://linkedin.com/in/lisataylor",
      email: "lisa@limitlessinfotech.com",
    },
  },
]

const departments = [
  {
    name: "Engineering",
    icon: Code,
    count: 15,
    description: "Our engineering team builds robust, scalable solutions using cutting-edge technologies.",
  },
  {
    name: "Design",
    icon: Palette,
    count: 6,
    description: "Creative professionals focused on user experience and visual design excellence.",
  },
  {
    name: "Operations",
    icon: BarChart3,
    count: 4,
    description: "Project managers and business analysts ensuring smooth project delivery.",
  },
  {
    name: "Security",
    icon: Shield,
    count: 3,
    description: "Security experts protecting our clients' data and ensuring compliance.",
  },
]

const stats = [
  { label: "Team Members", value: "28" },
  { label: "Countries", value: "5" },
  { label: "Years Combined Experience", value: "200+" },
  { label: "Certifications", value: "50+" },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Meet Our <span className="text-blue-400">Team</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Talented professionals passionate about creating innovative technology solutions that drive business
              success
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

      {/* Leadership Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visionary leaders guiding our mission to empower businesses through technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader) => (
              <Card key={leader.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-2xl">{leader.name}</CardTitle>
                  <CardDescription className="text-lg font-medium text-blue-600">{leader.position}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">{leader.bio}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        {leader.experience}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                        {leader.location}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground">EXPERTISE</h4>
                      <div className="flex flex-wrap gap-2">
                        {leader.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground">KEY ACHIEVEMENTS</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {leader.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-3 w-3 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-center space-x-4 pt-4 border-t">
                      {leader.social.linkedin && (
                        <a
                          href={leader.social.linkedin}
                          className="text-muted-foreground hover:text-blue-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      )}
                      {leader.social.twitter && (
                        <a
                          href={leader.social.twitter}
                          className="text-muted-foreground hover:text-blue-400 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="h-5 w-5" />
                          <span className="sr-only">Twitter</span>
                        </a>
                      )}
                      {leader.social.github && (
                        <a
                          href={leader.social.github}
                          className="text-muted-foreground hover:text-gray-900 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-5 w-5" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      )}
                      <a
                        href={`mailto:${leader.social.email}`}
                        className="text-muted-foreground hover:text-green-600 transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Overview */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Departments</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized teams working together to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => {
              const IconComponent = dept.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-blue-500" />
                    </div>
                    <CardTitle className="text-xl">{dept.name}</CardTitle>
                    <div className="text-2xl font-bold text-blue-600">{dept.count}</div>
                    <div className="text-sm text-muted-foreground">Members</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{dept.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team Members</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the talented individuals who make our success possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-blue-600">{member.position}</CardDescription>
                  <Badge variant="outline" className="w-fit mx-auto">
                    {member.department}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                        {member.experience}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                        {member.location}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-xs text-muted-foreground">SKILLS</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center space-x-3 pt-3 border-t">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="text-muted-foreground hover:text-blue-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="text-muted-foreground hover:text-blue-400 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="h-4 w-4" />
                          <span className="sr-only">Twitter</span>
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          className="text-muted-foreground hover:text-gray-900 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      )}
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-muted-foreground hover:text-green-600 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Culture & Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define who we are
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle>Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in the power of teamwork and open communication to achieve extraordinary results.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                  <Code className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We strive for perfection in everything we do, from code quality to client satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Team</h2>
            <p className="text-xl mb-8 opacity-90">
              Ready to be part of something amazing? We're always looking for talented individuals to join our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/careers">View Open Positions</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
