// Database connection and models
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface User {
  id: string
  email: string
  password_hash: string // Added for consistency with auth logic
  name: string
  role: "admin" | "employee" | "client"
  employee_code?: string
  client_id?: string
  department?: string
  avatar?: string
  is_active?: boolean // Added for consistency
  last_login?: string // Added for consistency
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  client_id: string
  status: "planning" | "development" | "review" | "completed" | "revision" // Added revision
  priority: "low" | "medium" | "high" | "critical"
  start_date: string
  end_date: string
  preview_url: string // Added for consistency with demo page
  mobile_url: string // Added for consistency with demo page
  tablet_url: string // Added for consistency with demo page
  desktop_url: string // Added for consistency with demo page
  last_updated: string // Added for consistency with demo page
  version: string // Added for consistency with demo page
  technologies: string[] // Added for consistency with demo page
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  project_id: string
  title: string
  description: string
  assigned_to: string[]
  assigned_by: string // Added for consistency
  status: "pending" | "in-progress" | "review" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  due_date: string
  created_at: string
  updated_at: string
  tags: string[] // Added for consistency
  attachments: string[] // Added for consistency
}

export interface ApprovalRequest {
  id: string
  project_id: string
  title: string
  description: string
  type: "design" | "code" | "content" | "deployment" | "feature" | "hotfix" // Extended types
  priority: "low" | "medium" | "high" | "critical" // Added priority
  status: "pending" | "in-review" | "approved" | "rejected" | "changes-requested" // Extended statuses
  requested_by: string
  requested_at: string // Added for consistency
  assigned_to: string[]
  due_date: string // Added for consistency
  client_visible: boolean
  approval_steps: ApprovalStep[] // Added for consistency
  comments: ApprovalComment[] // Added for consistency
  created_at: string
  updated_at: string
}

export interface ApprovalStep {
  id: string
  step_number: number
  title: string
  description: string
  assigned_to: string
  status: "pending" | "approved" | "rejected" | "skipped"
  completed_at?: string
  comments?: string
  required: boolean
}

export interface ApprovalComment {
  id: string
  author_id: string // Changed to author_id to link to users table
  content: string
  timestamp: string
  type: "comment" | "approval" | "rejection" | "change-request"
  attachments?: string[]
}

export interface Comment {
  id: string
  project_id: string
  author_id: string
  content: string
  timestamp: string
  type: "feedback" | "approval" | "revision" | "question"
  rating?: number
  resolved: boolean
}

export interface Notification {
  id: string
  user_id: string // The ID of the user who should receive the notification
  type: "task" | "meeting" | "message" | "system" | "approval"
  title: string
  message: string
  timestamp: string
  read: boolean
  action_url?: string
}

// Database Operations
export class DatabaseService {
  // User operations
  static async createUser(userData: Partial<User>) {
    const { data, error } = await supabase.from("users").insert(userData).select().single()

    if (error) throw error
    return data
  }

  static async getUserByEmail(email: string) {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error && error.code !== "PGRST116") throw error // PGRST116 is "No rows found"
    return data
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  static async getAllUsers() {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, role, employee_code, client_id, department, avatar, is_active, last_login")

    if (error) throw error
    return data as User[] // Cast to User[] as password_hash is omitted
  }

  /* ------------------------------------------------------------------ */
  /** Update a user – used by password-reset & profile forms */
  static async updateUser(id: string, updates: Partial<User>) {
    const { data, error } = await supabase.from("users").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  // Project operations
  static async createProject(projectData: Partial<Project>) {
    const { data, error } = await supabase.from("projects").insert(projectData).select().single()

    if (error) throw error
    return data
  }

  static async getProjectsByClientId(clientId: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async getAllProjects() {
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async getProjectById(id: string) {
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  static async updateProject(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  // Task operations
  static async createTask(taskData: Partial<Task>) {
    const { data, error } = await supabase.from("tasks").insert(taskData).select().single()

    if (error) throw error
    return data
  }

  static async getTasksByProjectId(projectId: string) {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async getAllTasks() {
    const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async getTasksByAssignedTo(userId: string) {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .contains("assigned_to", [userId]) // This works if assigned_to is a text[] column
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async updateTask(id: string, updates: Partial<Task>) {
    const { data, error } = await supabase.from("tasks").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  // Approval operations
  static async createApprovalRequest(approvalData: Partial<ApprovalRequest>) {
    const { data, error } = await supabase.from("approval_requests").insert(approvalData).select().single()

    if (error) throw error
    return data
  }

  static async getApprovalRequests(filters?: { status?: string; assigned_to?: string }) {
    let query = supabase.from("approval_requests").select("*")

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    if (filters?.assigned_to) {
      query = query.contains("assigned_to", [filters.assigned_to])
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data as ApprovalRequest[]
  }

  static async updateApprovalRequest(id: string, updates: Partial<ApprovalRequest>) {
    const { data, error } = await supabase.from("approval_requests").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  // Comment operations
  static async getCommentsByProjectId(projectId: string) {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("project_id", projectId)
      .order("timestamp", { ascending: false })

    if (error) throw error
    return data
  }

  static async addComment(commentData: Partial<Comment>) {
    const { data, error } = await supabase.from("comments").insert(commentData).select().single()

    if (error) throw error
    return data
  }

  // Notification operations
  static async createNotification(notificationData: Partial<Notification>) {
    const { data, error } = await supabase.from("notifications").insert(notificationData).select().single()

    if (error) throw error
    return data
  }

  static async getNotificationsByUserId(userId: string) {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("timestamp", { ascending: false })

    if (error) throw error
    return data as Notification[]
  }

  static async updateNotification(id: string, updates: Partial<Notification>) {
    const { data, error } = await supabase.from("notifications").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }
}
