import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Apple, SmartphoneIcon as Android, Zap, Shield, Users, CheckCircle, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Mobile App Development Services | Limitless Infotech Solution",
  description:
    "Professional mobile app development for iOS and Android. Native and cross-platform solutions with React Native, Flutter, and more.",
}

const features = [
  {
    icon: Smartphone,
    title: "Cross-Platform Development",
    description: "Build once, deploy everywhere with React Native and Flutter",
  },
  {
    icon: Zap,
    title: "Native Performance",
    description: "Optimized for speed and smooth user experience",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security and data protection",
  },
  {
    icon: Users,
    title: "User-Centric Design",
    description: "Intuitive interfaces designed for maximum engagement",
  },
  {
    icon: Apple,
    title: "iOS Development",
    description: "Native iOS apps with Swift and Objective-C",
  },
  {
    icon: Android,
    title: "Android Development",
    description: "Native Android apps with Kotlin and Java",
  },
]

const platforms = [
  {
    name: "React Native",
    description: "Cross-platform development with native performance",
    pros: ["Single codebase", "Fast development", "Native modules", "Hot reloading"],
    bestFor: "Startups and businesses wanting quick time-to-market",
  },
  {
    name: "Flutter",
    description: "Google's UI toolkit for beautiful, natively compiled applications",
    pros: ["Beautiful UI", "Fast performance", "Single codebase", "Growing ecosystem"],
    bestFor: "Apps requiring custom UI and animations",
  },
  {
    name: "Native iOS",
    description: "Platform-specific development for optimal performance",
    pros: ["Best performance", "Platform features", "App Store optimization", "Latest iOS features"],
    bestFor: "iOS-first strategy and performance-critical apps",
  },
  {
    name: "Native Android",
    description: "Platform-specific development for Android ecosystem",
    pros: ["Best performance", "Material Design", "Google Play optimization", "Android features"],
    bestFor: "Android-first strategy and Google ecosystem integration",
  },
]

const packages = [
  {
    name: "Starter App",
    price: "$4,999",
    description: "Perfect for simple mobile applications",
    features: [
      "Single platform (iOS or Android)",
      "Up to 5 screens",
      "Basic UI/UX design",
      "API integration",
      "App store submission",
      "1 month support",
    ],
    popular: false,
  },
  {
    name: "Professional App",
    price: "$9,999",
    description: "Ideal for business applications",
    features: [
      "Cross-platform (iOS & Android)",
      "Up to 15 screens",
      "Custom UI/UX design",
      "Backend integration",
      "Push notifications",
      "Analytics integration",
      "App store optimization",
      "3 months support",
    ],
    popular: true,
  },
  {
    name: "Enterprise App",
    price: "$19,999",
    description: "For complex enterprise solutions",
    features: [
      "Cross-platform with native modules",
      "Unlimited screens",
      "Advanced UI/UX design",
      "Custom backend development",
      "Real-time features",
      "Advanced security",
      "Third-party integrations",
      "Admin dashboard",
      "6 months support",
      "Maintenance included",
    ],
    popular: false,
  },
]

const appTypes = [
  {
    title: "E-commerce Apps",
    description: "Shopping apps with payment integration, product catalogs, and order management",
    icon: "🛒",
    features: ["Product catalog", "Shopping cart", "Payment gateway", "Order tracking"],
  },
  {
    title: "Social Media Apps",
    description: "Social networking platforms with real-time messaging and content sharing",
    icon: "📱",
    features: ["User profiles", "Real-time chat", "Content sharing", "Social features"],
  },
  {
    title: "Healthcare Apps",
    description: "Medical applications with appointment booking and health tracking",
    icon: "🏥",
    features: ["Appointment booking", "Health records", "Telemedicine", "HIPAA compliance"],
  },
  {
    title: "Fitness Apps",
    description: "Health and fitness tracking with workout plans and progress monitoring",
    icon: "💪",
    features: ["Workout tracking", "Progress analytics", "Social challenges", "Wearable integration"],
  },
  {
    title: "Education Apps",
    description: "Learning platforms with interactive content and progress tracking",
    icon: "📚",
    features: ["Course content", "Progress tracking", "Interactive quizzes", "Offline access"],
  },
  {
    title: "Business Apps",
    description: "Enterprise solutions for productivity and business management",
    icon: "💼",
    features: ["Team collaboration", "Project management", "Document sharing", "Analytics"],
  },
]

export default function MobileAppDevelopmentPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">Mobile App Development</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Mobile Apps That <span className="text-blue-400">Engage</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Create powerful mobile applications for iOS and Android that deliver exceptional user experiences and
                drive business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Start Your App Project</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                  asChild
                >
                  <Link href="/projects">View App Portfolio</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/mobile-app-hero.jpg"
                alt="Mobile App Development"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Mobile App Development?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We create mobile applications that users love and businesses rely on
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-blue-500" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* App Types Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Types of Apps We Build</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From simple utilities to complex enterprise solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Comparison */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Platform</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We'll help you select the best technology for your project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{platform.name}</CardTitle>
                  <CardDescription>{platform.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground">ADVANTAGES</h4>
                      <ul className="space-y-1">
                        {platform.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="flex items-center text-sm">
                            <Star className="h-3 w-3 text-yellow-500 mr-2 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground">BEST FOR</h4>
                      <p className="text-sm text-muted-foreground">{platform.bestFor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">App Development Packages</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing for every budget and requirement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? "border-blue-500 shadow-xl scale-105" : ""}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold text-blue-600 my-4">{pkg.price}</div>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={pkg.popular ? "default" : "outline"} asChild>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our App Development Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to app store, we guide you through every step
            </p>
          </div>

          <Tabs defaultValue="strategy" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="launch">Launch</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="strategy" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      1
                    </div>
                    Strategy & Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We start by understanding your business goals, target audience, and app requirements. This includes
                    market research, competitor analysis, and feature prioritization.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Market research and analysis
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      User persona development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Feature specification
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Technology stack selection
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="design" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      2
                    </div>
                    UI/UX Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our design team creates intuitive and engaging user interfaces that provide excellent user
                    experience across all devices and platforms.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      User journey mapping
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Wireframe creation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Visual design and branding
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Interactive prototypes
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="development" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      3
                    </div>
                    App Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our experienced developers build your app using the latest technologies and best practices, ensuring
                    high performance and scalability.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Frontend development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Backend API development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Database integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Third-party integrations
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testing" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      4
                    </div>
                    Quality Assurance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive testing ensures your app works flawlessly across all devices and scenarios before
                    launch.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Functional testing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Performance testing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Security testing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      User acceptance testing
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="launch" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      5
                    </div>
                    App Store Launch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We handle the entire app store submission process and help you launch successfully on both iOS App
                    Store and Google Play Store.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      App store optimization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Submission and approval
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Launch strategy
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Marketing support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      6
                    </div>
                    Ongoing Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Post-launch support ensures your app continues to perform well and stays updated with the latest
                    platform requirements.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Bug fixes and updates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Performance monitoring
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Feature enhancements
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Analytics and insights
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Mobile App?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create a mobile app that your users will love and your business will benefit from
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/projects">View App Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
