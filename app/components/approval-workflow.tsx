"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Send,
  Eye,
  GitBranch,
  Shield,
  ArrowRight,
  Zap,
  Star,
  Flag,
} from "lucide-react"

interface ApprovalRequest {
  id: string
  title: string
  description: string
  type: "design" | "code" | "content" | "deployment" | "feature" | "hotfix"
  priority: "low" | "medium" | "high" | "critical"
  status: "pending" | "in-review" | "approved" | "rejected" | "changes-requested"
  requestedBy: string
  requestedAt: string
  assignedTo: string[]
  dueDate: string
  projectId: string
  projectName: string
  files: string[]
  changes: string[]
  approvalSteps: ApprovalStep[]
  comments: ApprovalComment[]
  clientVisible: boolean
}

interface ApprovalStep {
  id: string
  stepNumber: number
  title: string
  description: string
  assignedTo: string
  status: "pending" | "approved" | "rejected" | "skipped"
  completedAt?: string
  comments?: string
  required: boolean
}

interface ApprovalComment {
  id: string
  author: string
  content: string
  timestamp: string
  type: "comment" | "approval" | "rejection" | "change-request"
  attachments?: string[]
}

const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: "approval1",
    title: "Homepage Design Updates",
    description: "Updated homepage design with new branding and improved user experience",
    type: "design",
    priority: "high",
    status: "in-review",
    requestedBy: "Sarah Smith",
    requestedAt: "2024-01-16 10:30",
    assignedTo: ["EMP003", "CLIENT001"],
    dueDate: "2024-01-18",
    projectId: "project1",
    projectName: "TechCorp Website",
    files: ["homepage-design-v3.fig", "style-guide.pdf"],
    changes: ["Updated color scheme", "Improved mobile layout", "Added new CTA buttons"],
    clientVisible: true,
    approvalSteps: [
      {
        id: "step1",
        stepNumber: 1,
        title: "Technical Review",
        description: "Review technical feasibility and implementation requirements",
        assignedTo: "EMP001",
        status: "approved",
        completedAt: "2024-01-16 14:30",
        comments: "Looks good from technical perspective. Ready for client review.",
        required: true,
      },
      {
        id: "step2",
        stepNumber: 2,
        title: "Project Manager Review",
        description: "Review project scope and timeline impact",
        assignedTo: "EMP003",
        status: "approved",
        completedAt: "2024-01-16 15:45",
        comments: "Approved. Timeline remains on track.",
        required: true,
      },
      {
        id: "step3",
        stepNumber: 3,
        title: "Client Approval",
        description: "Final client approval for design changes",
        assignedTo: "CLIENT001",
        status: "pending",
        required: true,
      },
    ],
    comments: [
      {
        id: "comment1",
        author: "John Doe",
        content: "The new design looks great! Mobile responsiveness is much improved.",
        timestamp: "2024-01-16 14:35",
        type: "comment",
      },
      {
        id: "comment2",
        author: "Mike Johnson",
        content: "Approved from project management perspective. Good work team!",
        timestamp: "2024-01-16 15:50",
        type: "approval",
      },
    ],
  },
  {
    id: "approval2",
    title: "Security Patch Deployment",
    description: "Critical security patch for user authentication system",
    type: "hotfix",
    priority: "critical",
    status: "pending",
    requestedBy: "John Doe",
    requestedAt: "2024-01-16 16:00",
    assignedTo: ["EMP003"],
    dueDate: "2024-01-16 18:00",
    projectId: "project1",
    projectName: "TechCorp Website",
    files: ["security-patch.zip", "deployment-guide.md"],
    changes: ["Fixed JWT token vulnerability", "Updated password encryption", "Added rate limiting"],
    clientVisible: false,
    approvalSteps: [
      {
        id: "step1",
        stepNumber: 1,
        title: "Security Review",
        description: "Review security implications and patch effectiveness",
        assignedTo: "EMP003",
        status: "pending",
        required: true,
      },
      {
        id: "step2",
        stepNumber: 2,
        title: "Emergency Deployment",
        description: "Deploy to production immediately after approval",
        assignedTo: "EMP001",
        status: "pending",
        required: true,
      },
    ],
    comments: [],
  },
  {
    id: "approval3",
    title: "New Feature: User Dashboard",
    description: "Implementation of new user dashboard with analytics and reporting",
    type: "feature",
    priority: "medium",
    status: "changes-requested",
    requestedBy: "Sarah Smith",
    requestedAt: "2024-01-15 09:00",
    assignedTo: ["EMP003", "CLIENT001"],
    dueDate: "2024-01-20",
    projectId: "project1",
    projectName: "TechCorp Website",
    files: ["dashboard-mockups.fig", "feature-specs.pdf"],
    changes: ["Added user analytics", "Created reporting system", "Implemented data visualization"],
    clientVisible: true,
    approvalSteps: [
      {
        id: "step1",
        stepNumber: 1,
        title: "Design Review",
        description: "Review UI/UX design and user experience",
        assignedTo: "EMP002",
        status: "approved",
        completedAt: "2024-01-15 11:30",
        comments: "Design looks good. Minor adjustments needed for mobile view.",
        required: true,
      },
      {
        id: "step2",
        stepNumber: 2,
        title: "Technical Review",
        description: "Review technical implementation and architecture",
        assignedTo: "EMP001",
        status: "rejected",
        completedAt: "2024-01-15 14:20",
        comments: "Need to optimize database queries for better performance. Please revise.",
        required: true,
      },
    ],
    comments: [
      {
        id: "comment1",
        author: "John Doe",
        content: "Database optimization is crucial for this feature. Let's implement caching and query optimization.",
        timestamp: "2024-01-15 14:25",
        type: "change-request",
      },
    ],
  },
]

export default function ApprovalWorkflow() {
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(mockApprovalRequests[0])
  const [requests, setRequests] = useState<ApprovalRequest[]>(mockApprovalRequests)
  const [newComment, setNewComment] = useState("")
  const [commentType, setCommentType] = useState<"comment" | "approval" | "rejection" | "change-request">("comment")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const { toast } = useToast()

  const addComment = () => {
    if (!newComment.trim() || !selectedRequest) return

    const comment: ApprovalComment = {
      id: Date.now().toString(),
      author: "Current User",
      content: newComment,
      timestamp: new Date().toISOString(),
      type: commentType,
    }

    const updatedRequest = {
      ...selectedRequest,
      comments: [...selectedRequest.comments, comment],
    }

    setRequests(requests.map((req) => (req.id === selectedRequest.id ? updatedRequest : req)))
    setSelectedRequest(updatedRequest)
    setNewComment("")

    toast({
      title: "Comment Added",
      description: "Your comment has been added to the approval request",
    })
  }

  const updateApprovalStep = (stepId: string, status: "approved" | "rejected", comments?: string) => {
    if (!selectedRequest) return

    const updatedSteps = selectedRequest.approvalSteps.map((step) =>
      step.id === stepId
        ? {
            ...step,
            status,
            completedAt: new Date().toISOString(),
            comments: comments || step.comments,
          }
        : step,
    )

    // Check if all required steps are completed
    const allRequiredCompleted = updatedSteps
      .filter((step) => step.required)
      .every((step) => step.status === "approved" || step.status === "rejected")

    const hasRejectedStep = updatedSteps.some((step) => step.status === "rejected" && step.required)

    let newStatus = selectedRequest.status
    if (allRequiredCompleted) {
      newStatus = hasRejectedStep ? "rejected" : "approved"
    }

    const updatedRequest = {
      ...selectedRequest,
      approvalSteps: updatedSteps,
      status: newStatus,
    }

    setRequests(requests.map((req) => (req.id === selectedRequest.id ? updatedRequest : req)))
    setSelectedRequest(updatedRequest)

    toast({
      title: status === "approved" ? "Step Approved" : "Step Rejected",
      description: `Approval step has been ${status}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-300"
      case "rejected":
        return "bg-red-500/20 text-red-300"
      case "in-review":
        return "bg-blue-500/20 text-blue-300"
      case "changes-requested":
        return "bg-orange-500/20 text-orange-300"
      case "pending":
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "design":
        return <FileText className="w-4 h-4" />
      case "code":
        return <GitBranch className="w-4 h-4" />
      case "deployment":
        return <Zap className="w-4 h-4" />
      case "hotfix":
        return <Shield className="w-4 h-4" />
      case "feature":
        return <Star className="w-4 h-4" />
      default:
        return <Flag className="w-4 h-4" />
    }
  }

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-400" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-400" />
      case "skipped":
        return <ArrowRight className="w-5 h-5 text-gray-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const filteredRequests = requests.filter((request) => {
    const matchesStatus = filterStatus === "all" || request.status === filterStatus
    const matchesPriority = filterPriority === "all" || request.priority === filterPriority
    return matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Approval Workflow Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Approval Workflow</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white text-sm"
              >
                <option value="all" className="bg-slate-800">
                  All Status
                </option>
                <option value="pending" className="bg-slate-800">
                  Pending
                </option>
                <option value="in-review" className="bg-slate-800">
                  In Review
                </option>
                <option value="approved" className="bg-slate-800">
                  Approved
                </option>
                <option value="rejected" className="bg-slate-800">
                  Rejected
                </option>
                <option value="changes-requested" className="bg-slate-800">
                  Changes Requested
                </option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white text-sm"
              >
                <option value="all" className="bg-slate-800">
                  All Priority
                </option>
                <option value="critical" className="bg-slate-800">
                  Critical
                </option>
                <option value="high" className="bg-slate-800">
                  High
                </option>
                <option value="medium" className="bg-slate-800">
                  Medium
                </option>
                <option value="low" className="bg-slate-800">
                  Low
                </option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {requests.filter((r) => r.status === "pending" || r.status === "in-review").length}
              </div>
              <div className="text-sm text-gray-400">Pending Approval</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {requests.filter((r) => r.status === "approved").length}
              </div>
              <div className="text-sm text-gray-400">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {requests.filter((r) => r.status === "rejected").length}
              </div>
              <div className="text-sm text-gray-400">Rejected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {requests.filter((r) => r.status === "changes-requested").length}
              </div>
              <div className="text-sm text-gray-400">Changes Requested</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Approval Requests List */}
        <div className="lg:col-span-4">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Approval Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRequest(request)}
                  className={`p-4 rounded-lg cursor-pointer border transition-all ${
                    selectedRequest?.id === request.id
                      ? "bg-blue-500/20 border-blue-500/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getTypeIcon(request.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-sm">{request.title}</h3>
                        {request.clientVisible && (
                          <Badge className="bg-purple-500/20 text-purple-300 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            Client
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{request.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(request.status)} size="sm">
                            {request.status}
                          </Badge>
                          <Badge className={getPriorityColor(request.priority)} size="sm">
                            {request.priority}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">
                          {request.approvalSteps.filter((s) => s.status === "approved").length}/
                          {request.approvalSteps.filter((s) => s.required).length}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <span>by {request.requestedBy}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(request.requestedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Approval Details */}
        <div className="lg:col-span-8">
          {selectedRequest && (
            <div className="space-y-6">
              {/* Request Details */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        {getTypeIcon(selectedRequest.type)}
                        <span>{selectedRequest.title}</span>
                      </CardTitle>
                      <p className="text-gray-400 mt-1">{selectedRequest.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(selectedRequest.status)}>{selectedRequest.status}</Badge>
                      <Badge className={getPriorityColor(selectedRequest.priority)}>{selectedRequest.priority}</Badge>
                      {selectedRequest.clientVisible && (
                        <Badge className="bg-purple-500/20 text-purple-300">
                          <Eye className="w-3 h-3 mr-1" />
                          Client Visible
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Request Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Requested by:</span>
                          <span>{selectedRequest.requestedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Project:</span>
                          <span>{selectedRequest.projectName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Due Date:</span>
                          <span>{new Date(selectedRequest.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span className="capitalize">{selectedRequest.type}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3">Changes</h3>
                      <ul className="space-y-1 text-sm">
                        {selectedRequest.changes.map((change, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {selectedRequest.files.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Attached Files</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRequest.files.map((file) => (
                          <Badge key={file} className="bg-blue-500/20 text-blue-300">
                            <FileText className="w-3 h-3 mr-1" />
                            {file}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Approval Steps */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Approval Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedRequest.approvalSteps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div className="flex-shrink-0">{getStepStatusIcon(step.status)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">
                              Step {step.stepNumber}: {step.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              {step.required && <Badge className="bg-red-500/20 text-red-300 text-xs">Required</Badge>}
                              <Badge className={getStatusColor(step.status)}>{step.status}</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">{step.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Assigned to: {step.assignedTo}</span>
                            {step.completedAt && (
                              <span className="text-xs text-gray-500">
                                Completed: {new Date(step.completedAt).toLocaleString()}
                              </span>
                            )}
                          </div>
                          {step.comments && (
                            <div className="mt-2 p-2 bg-white/5 rounded text-sm text-gray-300">{step.comments}</div>
                          )}
                          {step.status === "pending" && (
                            <div className="mt-3 flex items-center space-x-2">
                              <Button
                                size="sm"
                                onClick={() => updateApprovalStep(step.id, "approved")}
                                className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => updateApprovalStep(step.id, "rejected")}
                                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Comments & Discussion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {selectedRequest.comments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span className="font-medium text-sm">{comment.author}</span>
                            <Badge
                              className={
                                comment.type === "approval"
                                  ? "bg-green-500/20 text-green-300"
                                  : comment.type === "rejection"
                                    ? "bg-red-500/20 text-red-300"
                                    : comment.type === "change-request"
                                      ? "bg-orange-500/20 text-orange-300"
                                      : "bg-blue-500/20 text-blue-300"
                              }
                              size="sm"
                            >
                              {comment.type}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-300">{comment.content}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <select
                        value={commentType}
                        onChange={(e) => setCommentType(e.target.value as any)}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white text-sm"
                      >
                        <option value="comment" className="bg-slate-800">
                          💬 Comment
                        </option>
                        <option value="approval" className="bg-slate-800">
                          ✅ Approval
                        </option>
                        <option value="rejection" className="bg-slate-800">
                          ❌ Rejection
                        </option>
                        <option value="change-request" className="bg-slate-800">
                          🔄 Change Request
                        </option>
                      </select>
                    </div>
                    <Textarea
                      placeholder="Add your comment or feedback..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="bg-white/5 border-white/10 resize-none"
                      rows={3}
                    />
                    <Button
                      onClick={addComment}
                      disabled={!newComment.trim()}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Add Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
