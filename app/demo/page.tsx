"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Monitor,
  MessageSquare,
  Star,
  Send,
  Eye,
  Clock,
  User,
  ArrowLeft,
  Smartphone,
  Tablet,
  Laptop,
  ExternalLink,
  ThumbsUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import RealTimeChat from "@/app/components/real-time-chat"

interface DemoProject {
  id: string
  clientId: string
  title: string
  description: string
  status: "development" | "review" | "approved" | "revision"
  previewUrl: string
  mobileUrl: string
  tabletUrl: string
  desktopUrl: string
  lastUpdated: string
  version: string
  technologies: string[]
}

interface Comment {
  id: string
  projectId: string
  author: string
  content: string
  timestamp: string
  type: "feedback" | "approval" | "revision" | "question"
  rating?: number
  resolved: boolean
}

interface ClientSession {
  clientId: string
  clientName: string
  company: string
  projects: string[]
}

const mockProjects: DemoProject[] = [
  {
    id: "1",
    clientId: "CLIENT001",
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with advanced features",
    status: "review",
    previewUrl: "https://demo.limitless.com/ecommerce",
    mobileUrl: "https://demo.limitless.com/ecommerce?view=mobile",
    tabletUrl: "https://demo.limitless.com/ecommerce?view=tablet",
    desktopUrl: "https://demo.limitless.com/ecommerce?view=desktop",
    lastUpdated: "2024-01-15 14:30",
    version: "v2.1",
    technologies: ["React", "Next.js", "Stripe", "MongoDB"],
  },
  {
    id: "2",
    clientId: "CLIENT001",
    title: "Corporate Website",
    description: "Professional corporate website with CMS",
    status: "approved",
    previewUrl: "https://demo.limitless.com/corporate",
    mobileUrl: "https://demo.limitless.com/corporate?view=mobile",
    tabletUrl: "https://demo.limitless.com/corporate?view=tablet",
    desktopUrl: "https://demo.limitless.com/corporate?view=desktop",
    lastUpdated: "2024-01-12 09:15",
    version: "v1.0",
    technologies: ["WordPress", "PHP", "MySQL"],
  },
]

const mockComments: Comment[] = [
  {
    id: "1",
    projectId: "1",
    author: "John Smith",
    content: "The checkout process looks great! Could we make the payment button more prominent?",
    timestamp: "2024-01-15 15:30",
    type: "feedback",
    rating: 4,
    resolved: false,
  },
  {
    id: "2",
    projectId: "1",
    author: "Sarah Johnson",
    content: "Love the mobile responsiveness. The design is exactly what we envisioned!",
    timestamp: "2024-01-15 14:45",
    type: "approval",
    rating: 5,
    resolved: true,
  },
  {
    id: "3",
    projectId: "1",
    author: "Mike Wilson",
    content: "Can we change the color scheme to match our brand colors? Blue instead of green.",
    timestamp: "2024-01-15 13:20",
    type: "revision",
    resolved: false,
  },
]

export default function DemoPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ clientId: "", accessCode: "" })
  const [currentClient, setCurrentClient] = useState<ClientSession | null>(null)
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null)
  const [projects, setProjects] = useState<DemoProject[]>(mockProjects)
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [commentType, setCommentType] = useState<"feedback" | "approval" | "revision" | "question">("feedback")
  const [rating, setRating] = useState(0)
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const { toast } = useToast()

  const [showChat, setShowChat] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo authentication
    if (loginForm.clientId === "CLIENT001" && loginForm.accessCode === "DEMO2024") {
      const clientSession: ClientSession = {
        clientId: "CLIENT001",
        clientName: "John Smith",
        company: "TechCorp Solutions",
        projects: ["1", "2"],
      }
      setCurrentClient(clientSession)
      setIsAuthenticated(true)
      setSelectedProject(projects[0])
      toast({
        title: "Welcome!",
        description: "Successfully logged into demo portal",
      })
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your Client ID and Access Code",
        variant: "destructive",
      })
    }
  }

  const addComment = () => {
    if (!newComment.trim() || !selectedProject) return

    const comment: Comment = {
      id: Date.now().toString(),
      projectId: selectedProject.id,
      author: currentClient?.clientName || "Anonymous",
      content: newComment,
      timestamp: new Date().toISOString(),
      type: commentType,
      rating: commentType === "approval" ? rating : undefined,
      resolved: false,
    }

    setComments([comment, ...comments])
    setNewComment("")
    setRating(0)

    toast({
      title: "Comment Added",
      description: "Your feedback has been submitted to the development team",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "development":
        return "bg-blue-500/20 text-blue-300"
      case "review":
        return "bg-yellow-500/20 text-yellow-300"
      case "approved":
        return "bg-green-500/20 text-green-300"
      case "revision":
        return "bg-orange-500/20 text-orange-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getCommentIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <ThumbsUp className="w-4 h-4 text-green-400" />
      case "revision":
        return <AlertCircle className="w-4 h-4 text-orange-400" />
      case "feedback":
        return <MessageSquare className="w-4 h-4 text-blue-400" />
      case "question":
        return <AlertCircle className="w-4 h-4 text-purple-400" />
      default:
        return <MessageSquare className="w-4 h-4 text-gray-400" />
    }
  }

  const getViewIcon = (view: string) => {
    switch (view) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      case "tablet":
        return <Tablet className="w-4 h-4" />
      case "desktop":
        return <Laptop className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Image src="/images/logo.png" alt="Limitless" width={40} height={40} />
                <div>
                  <h1 className="text-xl font-bold">CLIENT DEMO PORTAL</h1>
                  <p className="text-xs text-blue-300">Project Preview & Feedback</p>
                </div>
              </div>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Monitor className="w-5 h-5" />
                <span>Client Access</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Client ID"
                    value={loginForm.clientId}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, clientId: e.target.value }))}
                    className="bg-white/5 border-white/10 focus:border-blue-500/50"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Access Code"
                    value={loginForm.accessCode}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, accessCode: e.target.value }))}
                    className="bg-white/5 border-white/10 focus:border-blue-500/50"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Access Demo Portal
                </Button>
              </form>
              <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm text-blue-300">
                  <strong>Demo Credentials:</strong>
                  <br />
                  Client ID: CLIENT001
                  <br />
                  Access Code: DEMO2024
                </p>
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/"
                  className="text-blue-300 hover:text-blue-200 text-sm flex items-center justify-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const projectComments = comments.filter((comment) => comment.projectId === selectedProject?.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-blue-300 hover:text-blue-200">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Image src="/images/logo.png" alt="Limitless" width={32} height={32} />
              <h1 className="text-2xl font-bold">Demo Portal</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="font-medium">{currentClient?.clientName}</div>
              <div className="text-sm text-gray-400">{currentClient?.company}</div>
            </div>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <User className="w-3 h-3 mr-1" />
              {currentClient?.clientId}
            </Badge>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              size="sm"
              className="border-red-500/50 text-red-300 hover:bg-red-500/10"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Project Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects
                  .filter((project) => currentClient?.projects.includes(project.id))
                  .map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProject(project)}
                      className={`p-4 rounded-lg cursor-pointer border transition-all ${
                        selectedProject?.id === project.id
                          ? "bg-blue-500/20 border-blue-500/30"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{project.title}</h3>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{project.version}</span>
                        <span>{project.lastUpdated.split(" ")[0]}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.slice(0, 2).map((tech) => (
                          <Badge key={tech} className="bg-gray-500/20 text-gray-300 text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 2 && (
                          <Badge className="bg-gray-500/20 text-gray-300 text-xs">
                            +{project.technologies.length - 2}
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Preview Area */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-6">
            {selectedProject && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedProject.title}</CardTitle>
                      <p className="text-gray-400 mt-1">{selectedProject.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setViewMode("mobile")}
                        className={`${viewMode === "mobile" ? "bg-blue-500/20" : ""}`}
                      >
                        <Smartphone className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setViewMode("tablet")}
                        className={`${viewMode === "tablet" ? "bg-blue-500/20" : ""}`}
                      >
                        <Tablet className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setViewMode("desktop")}
                        className={`${viewMode === "desktop" ? "bg-blue-500/20" : ""}`}
                      >
                        <Laptop className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:bg-white/10">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                  <div className="h-full bg-gray-900 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-center h-full p-8">
                      <div
                        className={`bg-white rounded-lg shadow-2xl overflow-hidden ${
                          viewMode === "mobile"
                            ? "w-80 h-[600px]"
                            : viewMode === "tablet"
                              ? "w-[600px] h-[450px]"
                              : "w-full h-[500px]"
                        }`}
                      >
                        <div className="bg-gray-100 p-2 flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                          </div>
                          <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600">
                            {selectedProject.previewUrl}
                          </div>
                        </div>
                        <div className="h-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                          <div className="text-center text-gray-600">
                            <Monitor className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-xl font-semibold mb-2">{selectedProject.title}</h3>
                            <p className="text-sm">Live Preview ({viewMode})</p>
                            <div className="mt-4 space-y-2">
                              <div className="w-32 h-4 bg-gray-200 rounded mx-auto" />
                              <div className="w-24 h-4 bg-gray-200 rounded mx-auto" />
                              <div className="w-28 h-4 bg-gray-200 rounded mx-auto" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Comments & Feedback */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Feedback</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Comment */}
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <select
                      value={commentType}
                      onChange={(e) =>
                        setCommentType(e.target.value as "feedback" | "approval" | "revision" | "question")
                      }
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white text-sm"
                    >
                      <option value="feedback" className="bg-slate-800">
                        💬 Feedback
                      </option>
                      <option value="approval" className="bg-slate-800">
                        👍 Approval
                      </option>
                      <option value="revision" className="bg-slate-800">
                        🔄 Revision
                      </option>
                      <option value="question" className="bg-slate-800">
                        ❓ Question
                      </option>
                    </select>
                  </div>

                  {commentType === "approval" && (
                    <div className="flex items-center space-x-1">
                      <span className="text-sm">Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`${star <= rating ? "text-yellow-400" : "text-gray-600"}`}
                        >
                          <Star className="w-4 h-4" fill={star <= rating ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  )}

                  <Textarea
                    placeholder="Share your feedback, suggestions, or questions..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="bg-white/5 border-white/10 resize-none"
                    rows={3}
                  />
                  <Button
                    onClick={addComment}
                    disabled={!newComment.trim()}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {projectComments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getCommentIcon(comment.type)}
                          <span className="text-sm font-medium">{comment.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {comment.rating && (
                            <div className="flex items-center space-x-1">
                              {[...Array(comment.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" />
                              ))}
                            </div>
                          )}
                          <Badge
                            className={
                              comment.resolved ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
                            }
                          >
                            {comment.resolved ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{comment.content}</p>
                      <div className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        {/* Real-time Chat */}
        <RealTimeChat
          currentUserId={currentClient?.clientId || ""}
          isMinimized={!showChat}
          onToggleMinimize={() => setShowChat(!showChat)}
        />
      </div>
    </div>
  )
}
