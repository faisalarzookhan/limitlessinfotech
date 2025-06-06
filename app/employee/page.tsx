"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  Calendar,
  Bell,
  FileText,
  CheckSquare,
  MessageSquare,
  Share2,
  Clock,
  User,
  ArrowLeft,
  Plus,
  Search,
  Download,
  Upload,
  TrendingUp,
  AlertCircle,
  Eye,
  Edit,
  Send,
  Paperclip,
  Shield,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import RealTimeChat from "@/app/components/real-time-chat"
import ProjectTimeline from "@/app/components/project-timeline"
import ApprovalWorkflow from "@/app/components/approval-workflow"

interface Employee {
  id: string
  employeeCode: string
  name: string
  email: string
  department: string
  role: string
  avatar: string
  status: "online" | "offline" | "busy"
  lastSeen: string
}

interface Task {
  id: string
  title: string
  description: string
  assignedTo: string[]
  assignedBy: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in-progress" | "review" | "completed"
  dueDate: string
  createdAt: string
  tags: string[]
  attachments: string[]
  comments: TaskComment[]
}

interface TaskComment {
  id: string
  author: string
  content: string
  timestamp: string
  attachments?: string[]
}

interface Meeting {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: string
  attendees: string[]
  organizer: string
  location: string
  type: "meeting" | "call" | "presentation" | "review"
  status: "scheduled" | "ongoing" | "completed" | "cancelled"
}

interface Notification {
  id: string
  type: "task" | "meeting" | "message" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

interface EmployeeSession {
  employeeId: string
  employeeCode: string
  name: string
  email: string
  department: string
  role: string
  avatar: string
}

const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    employeeCode: "LIS001",
    name: "John Doe",
    email: "john@limitless.com",
    department: "Development",
    role: "Senior Developer",
    avatar: "👨‍💻",
    status: "online",
    lastSeen: "Now",
  },
  {
    id: "EMP002",
    employeeCode: "LIS002",
    name: "Sarah Smith",
    email: "sarah@limitless.com",
    department: "Design",
    role: "UI/UX Designer",
    avatar: "👩‍🎨",
    status: "busy",
    lastSeen: "5 minutes ago",
  },
  {
    id: "EMP003",
    employeeCode: "LIS003",
    name: "Mike Johnson",
    email: "mike@limitless.com",
    department: "Project Management",
    role: "Project Manager",
    avatar: "👨‍💼",
    status: "online",
    lastSeen: "2 minutes ago",
  },
]

const mockTasks: Task[] = [
  {
    id: "TASK001",
    title: "Implement User Authentication",
    description: "Create secure login system with JWT tokens and password encryption",
    assignedTo: ["EMP001"],
    assignedBy: "EMP003",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-20",
    createdAt: "2024-01-15",
    tags: ["Backend", "Security", "Authentication"],
    attachments: ["auth-specs.pdf", "wireframes.png"],
    comments: [
      {
        id: "1",
        author: "John Doe",
        content: "Started working on the JWT implementation. Should be ready for review by tomorrow.",
        timestamp: "2024-01-16 14:30",
      },
    ],
  },
  {
    id: "TASK002",
    title: "Design Landing Page",
    description: "Create modern and responsive landing page design for the new product",
    assignedTo: ["EMP002"],
    assignedBy: "EMP003",
    priority: "medium",
    status: "review",
    dueDate: "2024-01-18",
    createdAt: "2024-01-12",
    tags: ["Design", "UI/UX", "Frontend"],
    attachments: ["design-mockups.fig"],
    comments: [
      {
        id: "2",
        author: "Sarah Smith",
        content: "Design is ready for review. Added mobile responsiveness and dark mode support.",
        timestamp: "2024-01-16 11:15",
      },
    ],
  },
]

const mockMeetings: Meeting[] = [
  {
    id: "MEET001",
    title: "Daily Standup",
    description: "Daily team sync to discuss progress and blockers",
    date: "2024-01-16",
    time: "09:00",
    duration: "30 minutes",
    attendees: ["EMP001", "EMP002", "EMP003"],
    organizer: "EMP003",
    location: "Conference Room A",
    type: "meeting",
    status: "scheduled",
  },
  {
    id: "MEET002",
    title: "Client Presentation",
    description: "Present project progress to TechCorp Solutions",
    date: "2024-01-17",
    time: "14:00",
    duration: "1 hour",
    attendees: ["EMP001", "EMP002", "EMP003"],
    organizer: "EMP003",
    location: "Virtual - Zoom",
    type: "presentation",
    status: "scheduled",
  },
]

const mockNotifications: Notification[] = [
  {
    id: "NOTIF001",
    type: "task",
    title: "New Task Assigned",
    message: "You have been assigned to 'Implement User Authentication'",
    timestamp: "2024-01-16 09:30",
    read: false,
    actionUrl: "/employee?tab=tasks",
  },
  {
    id: "NOTIF002",
    type: "meeting",
    title: "Meeting Reminder",
    message: "Daily Standup starts in 15 minutes",
    timestamp: "2024-01-16 08:45",
    read: false,
    actionUrl: "/employee?tab=calendar",
  },
  {
    id: "NOTIF003",
    type: "message",
    title: "New Message",
    message: "Sarah Smith shared a file with you",
    timestamp: "2024-01-16 08:20",
    read: true,
  },
]

export default function EmployeePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ employeeCode: "", password: "" })
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeSession | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [showNotifications, setShowNotifications] = useState(false)
  const [newTaskForm, setNewTaskForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    dueDate: "",
    tags: "",
  })
  const { toast } = useToast()
  const [showChat, setShowChat] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo authentication
    if (loginForm.employeeCode === "LIS001" && loginForm.password === "limitless2024") {
      const employeeSession: EmployeeSession = {
        employeeId: "EMP001",
        employeeCode: "LIS001",
        name: "John Doe",
        email: "john@limitless.com",
        department: "Development",
        role: "Senior Developer",
        avatar: "👨‍💻",
      }
      setCurrentEmployee(employeeSession)
      setIsAuthenticated(true)
      toast({
        title: "Welcome back!",
        description: "Successfully logged into employee dashboard",
      })
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your Employee Code and Password",
        variant: "destructive",
      })
    }
  }

  const createTask = () => {
    if (!newTaskForm.title.trim() || !newTaskForm.assignedTo.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newTask: Task = {
      id: `TASK${Date.now()}`,
      title: newTaskForm.title,
      description: newTaskForm.description,
      assignedTo: [newTaskForm.assignedTo],
      assignedBy: currentEmployee?.employeeId || "",
      priority: newTaskForm.priority,
      status: "pending",
      dueDate: newTaskForm.dueDate,
      createdAt: new Date().toISOString().split("T")[0],
      tags: newTaskForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      attachments: [],
      comments: [],
    }

    setTasks([newTask, ...tasks])
    setNewTaskForm({
      title: "",
      description: "",
      assignedTo: "",
      priority: "medium",
      dueDate: "",
      tags: "",
    })

    toast({
      title: "Task Created",
      description: "New task has been assigned successfully",
    })
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(notifications.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
  }

  const unreadNotifications = notifications.filter((notif) => !notif.read)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-300"
      case "high":
        return "bg-orange-500/20 text-orange-300"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300"
      case "low":
        return "bg-green-500/20 text-green-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300"
      case "in-progress":
        return "bg-blue-500/20 text-blue-300"
      case "review":
        return "bg-purple-500/20 text-purple-300"
      case "pending":
        return "bg-gray-500/20 text-gray-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <div className="w-2 h-2 bg-green-500 rounded-full" />
      case "busy":
        return <div className="w-2 h-2 bg-red-500 rounded-full" />
      case "offline":
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />
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
                  <h1 className="text-xl font-bold">EMPLOYEE PORTAL</h1>
                  <p className="text-xs text-blue-300">Team Collaboration Hub</p>
                </div>
              </div>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Employee Login</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Employee Code"
                    value={loginForm.employeeCode}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, employeeCode: e.target.value }))}
                    className="bg-white/5 border-white/10 focus:border-blue-500/50"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="bg-white/5 border-white/10 focus:border-blue-500/50"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Access Employee Portal
                </Button>
              </form>
              <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm text-blue-300">
                  <strong>Demo Credentials:</strong>
                  <br />
                  Employee Code: LIS001
                  <br />
                  Password: limitless2024
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
              <h1 className="text-2xl font-bold">Employee Portal</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button
                onClick={() => setShowNotifications(!showNotifications)}
                variant="ghost"
                size="sm"
                className="relative hover:bg-white/10"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                    {unreadNotifications.length}
                  </Badge>
                )}
              </Button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-50"
                  >
                    <div className="p-4 border-b border-white/10">
                      <h3 className="font-medium">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markNotificationAsRead(notification.id)}
                          className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 ${
                            !notification.read ? "bg-blue-500/10" : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {notification.type === "task" && <CheckSquare className="w-4 h-4 text-blue-400" />}
                              {notification.type === "meeting" && <Calendar className="w-4 h-4 text-green-400" />}
                              {notification.type === "message" && <MessageSquare className="w-4 h-4 text-purple-400" />}
                              {notification.type === "system" && <AlertCircle className="w-4 h-4 text-orange-400" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{notification.title}</h4>
                              <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(notification.timestamp).toLocaleString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="font-medium">{currentEmployee?.name}</div>
                <div className="text-sm text-gray-400">{currentEmployee?.role}</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xl">
                {currentEmployee?.avatar}
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <User className="w-3 h-3 mr-1" />
                {currentEmployee?.employeeCode}
              </Badge>
            </div>

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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-8 bg-white/5 border-white/10">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-500/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-500/20">
              <CheckSquare className="w-4 h-4 mr-2" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-blue-500/20">
              <Calendar className="w-4 h-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="approvals" className="data-[state=active]:bg-blue-500/20">
              <Shield className="w-4 h-4 mr-2" />
              Approvals
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-blue-500/20">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-blue-500/20">
              <Users className="w-4 h-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-blue-500/20">
              <FileText className="w-4 h-4 mr-2" />
              Files
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-blue-500/20">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CheckSquare className="w-8 h-8 text-blue-400" />
                    <Badge className="bg-blue-500/20 text-blue-300">
                      {tasks.filter((task) => task.assignedTo.includes(currentEmployee?.employeeId || "")).length}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">
                    {tasks.filter((task) => task.assignedTo.includes(currentEmployee?.employeeId || "")).length}
                  </h3>
                  <p className="text-gray-400 text-sm">My Tasks</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="w-8 h-8 text-green-400" />
                    <Badge className="bg-green-500/20 text-green-300">{meetings.length}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{meetings.length}</h3>
                  <p className="text-gray-400 text-sm">Meetings Today</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <MessageSquare className="w-8 h-8 text-purple-400" />
                    <Badge className="bg-purple-500/20 text-purple-300">{unreadNotifications.length}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{unreadNotifications.length}</h3>
                  <p className="text-gray-400 text-sm">Unread Messages</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-orange-400" />
                    <Badge className="bg-orange-500/20 text-orange-300">
                      {employees.filter((emp) => emp.status === "online").length}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">
                    {employees.filter((emp) => emp.status === "online").length}
                  </h3>
                  <p className="text-gray-400 text-sm">Team Online</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Recent Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks
                      .filter((task) => task.assignedTo.includes(currentEmployee?.employeeId || ""))
                      .slice(0, 3)
                      .map((task) => (
                        <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                          <CheckSquare className="w-5 h-5 text-blue-400 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                              <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Upcoming Meetings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meetings.slice(0, 3).map((meeting) => (
                      <div key={meeting.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                        <Calendar className="w-5 h-5 text-green-400 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium">{meeting.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">{meeting.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>{meeting.date}</span>
                            <span>{meeting.time}</span>
                            <span>{meeting.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            {/* Create Task */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Create New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  <Input
                    placeholder="Task title"
                    value={newTaskForm.title}
                    onChange={(e) => setNewTaskForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                  <Input
                    placeholder="Description"
                    value={newTaskForm.description}
                    onChange={(e) => setNewTaskForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                  <select
                    value={newTaskForm.assignedTo}
                    onChange={(e) => setNewTaskForm((prev) => ({ ...prev, assignedTo: e.target.value }))}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white"
                  >
                    <option value="" className="bg-slate-800">
                      Assign to...
                    </option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id} className="bg-slate-800">
                        {emp.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={newTaskForm.priority}
                    onChange={(e) => setNewTaskForm((prev) => ({ ...prev, priority: e.target.value as any }))}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white"
                  >
                    <option value="low" className="bg-slate-800">
                      Low Priority
                    </option>
                    <option value="medium" className="bg-slate-800">
                      Medium Priority
                    </option>
                    <option value="high" className="bg-slate-800">
                      High Priority
                    </option>
                    <option value="urgent" className="bg-slate-800">
                      Urgent
                    </option>
                  </select>
                  <Input
                    type="date"
                    value={newTaskForm.dueDate}
                    onChange={(e) => setNewTaskForm((prev) => ({ ...prev, dueDate: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                  <Button
                    onClick={createTask}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Task
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tasks List */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>All Tasks</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/10">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Task</th>
                        <th className="p-4 font-medium">Assigned To</th>
                        <th className="p-4 font-medium">Priority</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Due Date</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <motion.tr
                          key={task.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-white/5 hover:bg-white/5"
                        >
                          <td className="p-4">
                            <div>
                              <h4 className="font-medium">{task.title}</h4>
                              <p className="text-sm text-gray-400">{task.description}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {task.tags.map((tag) => (
                                  <Badge key={tag} className="bg-gray-500/20 text-gray-300 text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {task.assignedTo.map((empId) => {
                                const emp = employees.find((e) => e.id === empId)
                                return emp ? (
                                  <div key={empId} className="flex items-center space-x-1">
                                    <span className="text-lg">{emp.avatar}</span>
                                    <span className="text-sm">{emp.name}</span>
                                  </div>
                                ) : null
                              })}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          </td>
                          <td className="p-4 text-gray-400">{task.dueDate}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <ProjectTimeline />
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <ApprovalWorkflow />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Calendar & Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Upcoming Meetings</h3>
                    {meetings.map((meeting) => (
                      <div key={meeting.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{meeting.title}</h4>
                          <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{meeting.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{meeting.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{meeting.time}</span>
                            </span>
                            <span>{meeting.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Attendees:</span>
                            <div className="flex items-center space-x-1">
                              {meeting.attendees.slice(0, 3).map((attendeeId) => {
                                const attendee = employees.find((emp) => emp.id === attendeeId)
                                return attendee ? (
                                  <span key={attendeeId} className="text-sm">
                                    {attendee.avatar}
                                  </span>
                                ) : null
                              })}
                              {meeting.attendees.length > 3 && (
                                <span className="text-xs text-gray-500">+{meeting.attendees.length - 3}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Calendar View</h3>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                          <div key={day} className="text-center text-sm font-medium text-gray-400 p-2">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 35 }, (_, i) => {
                          const day = i - 6 + 1
                          const isToday = day === 16
                          const hasMeeting = day === 16 || day === 17
                          return (
                            <div
                              key={i}
                              className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ${
                                day > 0 && day <= 31
                                  ? isToday
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                    : hasMeeting
                                      ? "bg-green-500/10 text-green-300 hover:bg-green-500/20"
                                      : "hover:bg-white/10"
                                  : "text-gray-600"
                              }`}
                            >
                              {day > 0 && day <= 31 ? day : ""}
                              {hasMeeting && day > 0 && day <= 31 && (
                                <div className="w-1 h-1 bg-green-500 rounded-full absolute mt-4" />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {employees.map((employee) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xl">
                          {employee.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{employee.name}</h3>
                          <p className="text-sm text-gray-400">{employee.role}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(employee.status)}
                          <span className="text-xs text-gray-500 capitalize">{employee.status}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Department:</span>
                          <span>{employee.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Employee Code:</span>
                          <Badge className="bg-blue-500/20 text-blue-300">{employee.employeeCode}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Seen:</span>
                          <span className="text-xs">{employee.lastSeen}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" variant="ghost" className="flex-1 hover:bg-white/10">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Shared Files</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-white/10">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Project Requirements.pdf",
                      size: "2.4 MB",
                      type: "PDF",
                      sharedBy: "Mike Johnson",
                      date: "2024-01-15",
                    },
                    {
                      name: "Design Mockups.fig",
                      size: "15.7 MB",
                      type: "Figma",
                      sharedBy: "Sarah Smith",
                      date: "2024-01-14",
                    },
                    {
                      name: "API Documentation.md",
                      size: "156 KB",
                      type: "Markdown",
                      sharedBy: "John Doe",
                      date: "2024-01-13",
                    },
                  ].map((file, index) => (
                    <motion.div
                      key={file.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">{file.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>{file.size}</span>
                            <span>Shared by {file.sharedBy}</span>
                            <span>{file.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Team Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-white/5">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                      👩‍🎨
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">Sarah Smith</h4>
                        <span className="text-xs text-gray-500">2 minutes ago</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Hey team! I've uploaded the latest design mockups. Please review and let me know your thoughts.
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-white/5">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xl">
                      👨‍💻
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">John Doe</h4>
                        <span className="text-xs text-gray-500">15 minutes ago</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Authentication module is complete. Ready for testing phase.
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xl">
                        {currentEmployee?.avatar}
                      </div>
                      <div className="flex-1 flex items-center space-x-2">
                        <Input placeholder="Type your message..." className="bg-white/5 border-white/10 flex-1" />
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Real-time Chat */}
        <RealTimeChat
          currentUserId={currentEmployee?.employeeId || ""}
          isMinimized={!showChat}
          onToggleMinimize={() => setShowChat(!showChat)}
        />
      </div>
    </div>
  )
}
