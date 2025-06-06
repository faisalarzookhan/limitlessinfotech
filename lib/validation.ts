import { z } from "zod"

// User validation schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["admin", "employee", "client"]),
  employee_code: z.string().optional(),
  client_id: z.string().optional(),
  department: z.string().optional(),
})

// Project validation schemas
export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  client_id: z.string().uuid("Invalid client ID"),
  status: z.enum(["planning", "development", "review", "completed", "cancelled"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  budget: z.number().positive().optional(),
})

// Task validation schemas
export const taskSchema = z.object({
  project_id: z.string().uuid("Invalid project ID"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  assigned_to: z.array(z.string().uuid()),
  status: z.enum(["pending", "in-progress", "review", "completed", "cancelled"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  due_date: z.string().optional(),
  estimated_hours: z.number().positive().optional(),
})

// Approval validation schemas
export const approvalSchema = z.object({
  project_id: z.string().uuid("Invalid project ID"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["design", "code", "content", "deployment", "feature", "hotfix"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  assigned_to: z.array(z.string().uuid()),
  client_visible: z.boolean().default(false),
  due_date: z.string().optional(),
})

// File upload validation
export const fileUploadSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  description: z.string().optional(),
})

// Validation helper function
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => `${err.path.join(".")}: ${err.message}`),
      }
    }
    return { success: false, errors: ["Validation failed"] }
  }
}
