"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  FileText,
  GitBranch,
  Zap,
  Target,
  TrendingUp,
  Filter,
  Download,
  Share2,
} from "lucide-react"

interface TimelineTask {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  duration: number
  progress: number
  status: "not-started" | "in-progress" | "completed" | "delayed" | "on-hold"
  priority: "low" | "medium" | "high" | "critical"
  assignees: string[]
  dependencies: string[]
  milestones: string[]
  category: "design" | "development" | "testing" | "deployment" | "review"
}

interface ProjectMilestone {
  id: string
  title: string
  date: string
  status: "upcoming" | "current" | "completed" | "delayed"
  description: string
  tasks: string[]
}

interface ProjectPhase {
  id: string
  name: string
  startDate: string
  endDate: string
  progress: number
  tasks: string[]
  color: string
}

const mockTasks: TimelineTask[] = [
  {
    id: "task1",
    title: "Project Planning & Requirements",
    description: "Define project scope, requirements, and technical specifications",
    startDate: "2024-01-01",
    endDate: "2024-01-07",
    duration: 7,
    progress: 100,
    status: "completed",
    priority: "high",
    assignees: ["EMP003", "EMP001"],
    dependencies: [],
    milestones: ["milestone1"],
    category: "review",
  },
  {
    id: "task2",
    title: "UI/UX Design",
    description: "Create wireframes, mockups, and design system",
    startDate: "2024-01-08",
    endDate: "2024-01-20",
    duration: 13,
    progress: 85,
    status: "in-progress",
    priority: "high",
    assignees: ["EMP002"],
    dependencies: ["task1"],
    milestones: ["milestone2"],
    category: "design",
  },
  {
    id: "task3",
    title: "Frontend Development",
    description: "Implement React components and user interface",
    startDate: "2024-01-15",
    endDate: "2024-02-10",
    duration: 26,
    progress: 45,
    status: "in-progress",
    priority: "high",
    assignees: ["EMP001"],
    dependencies: ["task2"],
    milestones: ["milestone3"],
    category: "development",
  },
  {
    id: "task4",
    title: "Backend API Development",
    description: "Build REST APIs and database integration",
    startDate: "2024-01-22",
    endDate: "2024-02-15",
    duration: 24,
    progress: 30,
    status: "in-progress",
    priority: "high",
    assignees: ["EMP001"],
    dependencies: ["task1"],
    milestones: ["milestone3"],
    category: "development",
  },
  {
    id: "task5",
    title: "Testing & QA",
    description: "Comprehensive testing and quality assurance",
    startDate: "2024-02-11",
    endDate: "2024-02-25",
    duration: 14,
    progress: 0,
    status: "not-started",
    priority: "medium",
    assignees: ["EMP002", "EMP003"],
    dependencies: ["task3", "task4"],
    milestones: ["milestone4"],
    category: "testing",
  },
  {
    id: "task6",
    title: "Deployment & Launch",
    description: "Deploy to production and go live",
    startDate: "2024-02-26",
    endDate: "2024-03-05",
    duration: 8,
    progress: 0,
    status: "not-started",
    priority: "critical",
    assignees: ["EMP001", "EMP003"],
    dependencies: ["task5"],
    milestones: ["milestone5"],
    category: "deployment",
  },
]

const mockMilestones: ProjectMilestone[] = [
  {
    id: "milestone1",
    title: "Project Kickoff",
    date: "2024-01-07",
    status: "completed",
    description: "Project requirements and scope finalized",
    tasks: ["task1"],
  },
  {
    id: "milestone2",
    title: "Design Approval",
    date: "2024-01-20",
    status: "current",
    description: "UI/UX designs approved by client",
    tasks: ["task2"],
  },
  {
    id: "milestone3",
    title: "Development Complete",
    date: "2024-02-15",
    status: "upcoming",
    description: "Frontend and backend development finished",
    tasks: ["task3", "task4"],
  },
  {
    id: "milestone4",
    title: "Testing Complete",
    date: "2024-02-25",
    status: "upcoming",
    description: "All testing and QA completed",
    tasks: ["task5"],
  },
  {
    id: "milestone5",
    title: "Project Launch",
    date: "2024-03-05",
    status: "upcoming",
    description: "Project deployed and launched",
    tasks: ["task6"],
  },
]

const mockPhases: ProjectPhase[] = [
  {
    id: "phase1",
    name: "Planning",
    startDate: "2024-01-01",
    endDate: "2024-01-07",
    progress: 100,
    tasks: ["task1"],
    color: "bg-blue-500",
  },
  {
    id: "phase2",
    name: "Design",
    startDate: "2024-01-08",
    endDate: "2024-01-20",
    progress: 85,
    tasks: ["task2"],
    color: "bg-purple-500",
  },
  {
    id: "phase3",
    name: "Development",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    progress: 37,
    tasks: ["task3", "task4"],
    color: "bg-green-500",
  },
  {
    id: "phase4",
    name: "Testing",
    startDate: "2024-02-11",
    endDate: "2024-02-25",
    progress: 0,
    tasks: ["task5"],
    color: "bg-orange-500",
  },
  {
    id: "phase5",
    name: "Deployment",
    startDate: "2024-02-26",
    endDate: "2024-03-05",
    progress: 0,
    tasks: ["task6"],
    color: "bg-red-500",
  },
]

export default function ProjectTimeline() {
  const [viewMode, setViewMode] = useState<"gantt" | "timeline" | "kanban">("gantt")
  const [selectedTask, setSelectedTask] = useState<TimelineTask | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300"
      case "in-progress":
        return "bg-blue-500/20 text-blue-300"
      case "delayed":
        return "bg-red-500/20 text-red-300"
      case "on-hold":
        return "bg-yellow-500/20 text-yellow-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "design":
        return <FileText className="w-4 h-4" />
      case "development":
        return <GitBranch className="w-4 h-4" />
      case "testing":
        return <CheckCircle className="w-4 h-4" />
      case "deployment":
        return <Zap className="w-4 h-4" />
      case "review":
        return <Target className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "current":
        return <Target className="w-5 h-5 text-blue-400" />
      case "delayed":
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const calculateProjectProgress = () => {
    const totalTasks = mockTasks.length
    const completedTasks = mockTasks.filter((task) => task.status === "completed").length
    return Math.round((completedTasks / totalTasks) * 100)
  }

  const filteredTasks =
    filterCategory === "all" ? mockTasks : mockTasks.filter((task) => task.category === filterCategory)

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Project Timeline</span>
              </CardTitle>
              <p className="text-gray-400 mt-1">Track project progress and milestones</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="hover:bg-white/10">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" variant="ghost" className="hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" variant="ghost" className="hover:bg-white/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{calculateProjectProgress()}%</div>
              <div className="text-sm text-gray-400">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {mockTasks.filter((t) => t.status === "completed").length}
              </div>
              <div className="text-sm text-gray-400">Completed Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {mockTasks.filter((t) => t.status === "in-progress").length}
              </div>
              <div className="text-sm text-gray-400">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{mockMilestones.length}</div>
              <div className="text-sm text-gray-400">Milestones</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">View:</span>
              <div className="flex rounded-lg bg-white/5 p-1">
                {["gantt", "timeline", "kanban"].map((mode) => (
                  <Button
                    key={mode}
                    size="sm"
                    variant="ghost"
                    onClick={() => setViewMode(mode as any)}
                    className={`${viewMode === mode ? "bg-blue-500/20 text-blue-300" : "hover:bg-white/10"}`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Category:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white text-sm"
              >
                <option value="all" className="bg-slate-800">
                  All Categories
                </option>
                <option value="design" className="bg-slate-800">
                  Design
                </option>
                <option value="development" className="bg-slate-800">
                  Development
                </option>
                <option value="testing" className="bg-slate-800">
                  Testing
                </option>
                <option value="deployment" className="bg-slate-800">
                  Deployment
                </option>
                <option value="review" className="bg-slate-800">
                  Review
                </option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Phases */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Project Phases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className={`w-4 h-4 rounded-full ${phase.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{phase.name}</h3>
                    <Badge className="bg-blue-500/20 text-blue-300">{phase.progress}%</Badge>
                  </div>
                  <Progress value={phase.progress} className="h-2 mb-2" />
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>
                      {phase.startDate} - {phase.endDate}
                    </span>
                    <span>{phase.tasks.length} tasks</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gantt Chart View */}
      {viewMode === "gantt" && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Gantt Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Timeline Header */}
                <div className="grid grid-cols-12 gap-2 mb-4 text-xs text-gray-400">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="text-center">
                      Week {i + 1}
                    </div>
                  ))}
                </div>

                {/* Tasks */}
                <div className="space-y-3">
                  {filteredTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-48 flex-shrink-0">
                        <div className="flex items-center space-x-2 mb-1">
                          {getCategoryIcon(task.category)}
                          <h4 className="font-medium text-sm">{task.title}</h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(task.status)} size="sm">
                            {task.status}
                          </Badge>
                          <Badge className={getPriorityColor(task.priority)} size="sm">
                            {task.priority}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex-1 relative">
                        <div className="grid grid-cols-12 gap-2 h-8">
                          {Array.from({ length: 12 }, (_, weekIndex) => {
                            const weekStart = new Date(2024, 0, 1 + weekIndex * 7)
                            const weekEnd = new Date(2024, 0, 8 + weekIndex * 7)
                            const taskStart = new Date(task.startDate)
                            const taskEnd = new Date(task.endDate)

                            const isTaskWeek = taskStart <= weekEnd && taskEnd >= weekStart
                            const isStartWeek = taskStart >= weekStart && taskStart <= weekEnd
                            const isEndWeek = taskEnd >= weekStart && taskEnd <= weekEnd

                            return (
                              <div key={weekIndex} className="relative">
                                {isTaskWeek && (
                                  <div
                                    className={`absolute inset-0 rounded ${
                                      task.status === "completed"
                                        ? "bg-green-500/30"
                                        : task.status === "in-progress"
                                          ? "bg-blue-500/30"
                                          : task.status === "delayed"
                                            ? "bg-red-500/30"
                                            : "bg-gray-500/30"
                                    } ${isStartWeek ? "rounded-l" : ""} ${isEndWeek ? "rounded-r" : ""}`}
                                  >
                                    {task.status === "in-progress" && (
                                      <div
                                        className="h-full bg-blue-500/50 rounded"
                                        style={{ width: `${task.progress}%` }}
                                      />
                                    )}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="w-16 text-right text-sm text-gray-400">{task.progress}%</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Timeline View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-500/30" />

              <div className="space-y-6">
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-start space-x-4"
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`relative z-10 w-4 h-4 rounded-full border-2 border-slate-800 ${
                        task.status === "completed"
                          ? "bg-green-500"
                          : task.status === "in-progress"
                            ? "bg-blue-500"
                            : task.status === "delayed"
                              ? "bg-red-500"
                              : "bg-gray-500"
                      }`}
                    />

                    {/* Task Card */}
                    <div className="flex-1 p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {task.startDate} - {task.endDate}
                            </span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{task.duration} days</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{task.assignees.length} assignees</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={task.progress} className="w-24 h-2" />
                          <span className="text-sm text-gray-400">{task.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestones */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Project Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-start space-x-3">
                  {getMilestoneIcon(milestone.status)}
                  <div className="flex-1">
                    <h3 className="font-medium">{milestone.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{milestone.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500">{milestone.date}</span>
                      <Badge
                        className={
                          milestone.status === "completed"
                            ? "bg-green-500/20 text-green-300"
                            : milestone.status === "current"
                              ? "bg-blue-500/20 text-blue-300"
                              : milestone.status === "delayed"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-gray-500/20 text-gray-300"
                        }
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
