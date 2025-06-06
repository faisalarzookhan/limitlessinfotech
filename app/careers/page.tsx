import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, DollarSign, Users, Heart, Coffee, Laptop, Plane, Search, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers | Join Our Team at Limitless Infotech Solution",
  description:
    "Join our team of talented professionals. Explore career opportunities in web development, mobile apps, AI, and more at Limitless Infotech Solution.",
}

const jobOpenings = [
  {
    id: "senior-fullstack-developer",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    experience: "5+ years",
    salary: "$120,000 - $160,000",
    posted: "2 days ago",
    description:
      "We're looking for a senior full stack developer to join our engineering team and help build scalable web applications.",
    requirements: [
      "5+ years of experience with React and Node.js",
      "Strong knowledge of TypeScript and modern JavaScript",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Familiarity with microservices architecture",
      "Experience with databases (PostgreSQL, MongoDB)",
    ],
    responsibilities: [
      "Design and develop scalable web applications",
      "Collaborate with cross-functional teams",
      "Mentor junior developers",
      "Participate in code reviews and technical discussions",
      "Contribute to architectural decisions",
    ],
    benefits: ["Health insurance", "401(k) matching", "Flexible PTO", "Remote work", "Learning budget"],
  },
  {
    id: "mobile-app-developer",
    title: "Mobile App Developer",
    department: "Engineering",
    location: "Austin, TX / Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "$90,000 - $130,000",
    posted: "1 week ago",
    description: "Join our mobile team to create amazing iOS and Android applications using React Native and Flutter.",
    requirements: [
      "3+ years of mobile app development experience",
      "Proficiency in React Native or Flutter",
      "Experience with native iOS/Android development",
      "Knowledge of mobile app deployment processes",
      "Understanding of mobile UI/UX principles",
    ],
    responsibilities: [
      "Develop cross-platform mobile applications",
      "Optimize app performance and user experience",
      "Collaborate with designers and backend developers",
      "Implement new features and maintain existing code",
      "Ensure apps meet platform guidelines",
    ],
    benefits: ["Health insurance", "Stock options", "Flexible hours", "Professional development", "Team events"],
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "New York, NY / Remote",
    type: "Full-time",
    experience: "4+ years",
    salary: "$85,000 - $120,000",
    posted: "3 days ago",
    description:
      "We're seeking a creative UI/UX designer to create beautiful and intuitive user experiences for our digital products.",
    requirements: [
      "4+ years of UI/UX design experience",
      "Proficiency in Figma, Sketch, or Adobe XD",
      "Strong portfolio showcasing web and mobile designs",
      "Experience with design systems and prototyping",
      "Understanding of user research and testing",
    ],
    responsibilities: [
      "Create user-centered designs for web and mobile",
      "Develop and maintain design systems",
      "Conduct user research and usability testing",
      "Collaborate with developers and product managers",
      "Present design concepts to stakeholders",
    ],
    benefits: ["Health insurance", "Creative tools budget", "Flexible PTO", "Design conferences", "Wellness program"],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Seattle, WA / Remote",
    type: "Full-time",
    experience: "4+ years",
    salary: "$110,000 - $150,000",
    posted: "5 days ago",
    description: "Help us build and maintain robust infrastructure and deployment pipelines for our applications.",
    requirements: [
      "4+ years of DevOps/Infrastructure experience",
      "Strong knowledge of AWS, Docker, and Kubernetes",
      "Experience with CI/CD pipelines and automation",
      "Proficiency in Infrastructure as Code (Terraform, CloudFormation)",
      "Knowledge of monitoring and logging tools",
    ],
    responsibilities: [
      "Design and maintain cloud infrastructure",
      "Implement CI/CD pipelines and automation",
      "Monitor system performance and reliability",
      "Ensure security and compliance standards",
      "Collaborate with development teams",
    ],
    benefits: ["Health insurance", "401(k) matching", "Learning budget", "Conference attendance", "Flexible schedule"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    department: "AI/ML",
    location: "Boston, MA / Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "$100,000 - $140,000",
    posted: "1 week ago",
    description: "Join our AI team to develop machine learning models and data-driven solutions for our clients.",
    requirements: [
      "3+ years of data science experience",
      "Strong knowledge of Python and ML libraries",
      "Experience with TensorFlow, PyTorch, or similar",
      "Statistical analysis and data visualization skills",
      "Experience with cloud ML platforms",
    ],
    responsibilities: [
      "Develop and deploy machine learning models",
      "Analyze large datasets to extract insights",
      "Collaborate with engineering teams on AI features",
      "Present findings to stakeholders",
      "Stay updated with latest ML research",
    ],
    benefits: ["Health insurance", "Research budget", "Conference attendance", "Flexible hours", "Stock options"],
  },
  {
    id: "project-manager",
    title: "Technical Project Manager",
    department: "Operations",
    location: "Chicago, IL / Remote",
    type: "Full-time",
    experience: "5+ years",
    salary: "$95,000 - $130,000",
    posted: "4 days ago",
    description: "Lead technical projects from conception to delivery while ensuring quality and timeline adherence.",
    requirements: [
      "5+ years of technical project management experience",
      "Strong knowledge of Agile/Scrum methodologies",
      "Experience managing software development projects",
      "Excellent communication and leadership skills",
      "PMP or similar certification preferred",
    ],
    responsibilities: [
      "Manage multiple technical projects simultaneously",
      "Coordinate with cross-functional teams",
      "Ensure project deliverables meet quality standards",
      "Communicate project status to stakeholders",
      "Identify and mitigate project risks",
    ],
    benefits: ["Health insurance", "401(k) matching", "Professional development", "Flexible PTO", "Team building"],
  },
]

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, dental, vision, and wellness programs",
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description: "Flexible hours, unlimited PTO, and remote work options",
  },
  {
    icon: Laptop,
    title: "Equipment & Tools",
    description: "Latest MacBook Pro, monitors, and all the tools you need to succeed",
  },
  {
    icon: Plane,
    title: "Learning & Growth",
    description: "Conference attendance, online courses, and professional development budget",
  },
]

const departments = [
  { name: "All Departments", value: "all" },
  { name: "Engineering", value: "engineering" },
  { name: "Design", value: "design" },
  { name: "AI/ML", value: "ai-ml" },
  { name: "Operations", value: "operations" },
]

const locations = [
  { name: "All Locations", value: "all" },
  { name: "Remote", value: "remote" },
  { name: "San Francisco, CA", value: "san-francisco" },
  { name: "Austin, TX", value: "austin" },
  { name: "New York, NY", value: "new-york" },
  { name: "Seattle, WA", value: "seattle" },
  { name: "Boston, MA", value: "boston" },
  { name: "Chicago, IL", value: "chicago" },
]

const jobTypes = [
  { name: "All Types", value: "all" },
  { name: "Full-time", value: "full-time" },
  { name: "Part-time", value: "part-time" },
  { name: "Contract", value: "contract" },
  { name: "Internship", value: "internship" },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join Our <span className="text-blue-400">Team</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Be part of a team that's shaping the future of technology. We're looking for passionate individuals who
              want to make a difference.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">28</div>
                <div className="text-slate-300">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">5</div>
                <div className="text-slate-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">100%</div>
                <div className="text-slate-300">Remote Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">6</div>
                <div className="text-slate-300">Open Positions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We believe in creating an environment where our team can thrive and do their best work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-blue-500" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Job Search Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Find your next career opportunity with us</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-card rounded-lg border">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search jobs..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {job.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline">{job.experience}</Badge>
                      <span className="text-sm text-muted-foreground">{job.posted}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{job.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground">REQUIREMENTS</h4>
                      <ul className="space-y-1 text-sm">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                        {job.requirements.length > 3 && (
                          <li className="text-muted-foreground">+{job.requirements.length - 3} more requirements</li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground">BENEFITS</h4>
                      <div className="flex flex-wrap gap-1">
                        {job.benefits.map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="flex-1">
                      <Link href={`/careers/${job.id}`}>
                        View Details & Apply
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline">Save Job</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Culture</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We foster a collaborative, inclusive environment where innovation thrives. Our team is our greatest
                asset, and we invest in creating a workplace where everyone can grow and succeed.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Innovation First</h3>
                  <p className="text-muted-foreground">
                    We encourage experimentation and creative problem-solving. Every team member has the freedom to
                    propose new ideas and solutions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Continuous Learning</h3>
                  <p className="text-muted-foreground">
                    We provide opportunities for professional development through conferences, courses, and internal
                    knowledge sharing sessions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Work-Life Balance</h3>
                  <p className="text-muted-foreground">
                    We believe in sustainable work practices. Flexible schedules and remote work options help our team
                    maintain a healthy balance.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/team-culture.jpg"
                alt="Team Culture"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Hiring Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've designed our process to be transparent and efficient while ensuring the best fit for both sides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Application",
                description: "Submit your application with resume and cover letter",
              },
              {
                step: "02",
                title: "Phone Screen",
                description: "Initial conversation with our HR team about your background",
              },
              {
                step: "03",
                title: "Technical Interview",
                description: "Technical discussion and coding challenge with our engineers",
              },
              {
                step: "04",
                title: "Final Interview",
                description: "Meet the team and discuss culture fit and career goals",
              },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Team?</h2>
            <p className="text-xl mb-8 opacity-90">
              Don't see a position that fits? We're always looking for talented individuals. Send us your resume!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Send Your Resume</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/team">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
