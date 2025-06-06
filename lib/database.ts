// Database connection and models
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "employee" | "client"
  employee_code?: string
  client_id?: string
  department?: string
  avatar?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  client_id: string
  status: "planning" | "development" | "review" | "completed"
  priority: "low" | "medium" | "high" | "critical"
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  project_id: string
  title: string
  description: string
  assigned_to: string[]
  status: "pending" | "in-progress" | "review" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  due_date: string
  created_at: string
  updated_at: string
}

export interface ApprovalRequest {
  id: string
  project_id: string
  title: string
  description: string
  type: "design" | "code" | "content" | "deployment"
  status: "pending" | "approved" | "rejected" | "changes-requested"
  requested_by: string
  assigned_to: string[]
  client_visible: boolean
  created_at: string
  updated_at: string
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

    if (error && error.code !== "PGRST116") throw error
    return data
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

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
    return data
  }

  static async updateApprovalRequest(id: string, updates: Partial<ApprovalRequest>) {
    const { data, error } = await supabase.from("approval_requests").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }
}
