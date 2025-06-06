import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { DatabaseService } from "./database"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: "admin" | "employee" | "client"
  employee_code?: string
  client_id?: string
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static generateToken(user: AuthUser): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        employee_code: user.employee_code,
        client_id: user.client_id,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    )
  }

  static verifyToken(token: string): AuthUser | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      return {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        employee_code: decoded.employee_code,
        client_id: decoded.client_id,
      }
    } catch (error) {
      return null
    }
  }

  static async login(email: string, password: string): Promise<{ user: AuthUser; token: string } | null> {
    try {
      const user = await DatabaseService.getUserByEmail(email)
      if (!user || !user.is_active) {
        return null
      }

      const isValidPassword = await this.verifyPassword(password, user.password_hash)
      if (!isValidPassword) {
        return null
      }

      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        employee_code: user.employee_code,
        client_id: user.client_id,
      }

      const token = this.generateToken(authUser)

      // Update last login
      await DatabaseService.updateUser(user.id, { last_login: new Date().toISOString() })

      return { user: authUser, token }
    } catch (error) {
      console.error("Login error:", error)
      return null
    }
  }

  static async register(userData: {
    email: string
    password: string
    name: string
    role: "admin" | "employee" | "client"
    employee_code?: string
    client_id?: string
    department?: string
  }): Promise<{ user: AuthUser; token: string } | null> {
    try {
      const existingUser = await DatabaseService.getUserByEmail(userData.email)
      if (existingUser) {
        throw new Error("User already exists")
      }

      const hashedPassword = await this.hashPassword(userData.password)

      const newUser = await DatabaseService.createUser({
        ...userData,
        password_hash: hashedPassword,
      })

      const authUser: AuthUser = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        employee_code: newUser.employee_code,
        client_id: newUser.client_id,
      }

      const token = this.generateToken(authUser)

      return { user: authUser, token }
    } catch (error) {
      console.error("Registration error:", error)
      return null
    }
  }

  static async getCurrentUser(token: string): Promise<AuthUser | null> {
    try {
      const decoded = this.verifyToken(token)
      if (!decoded) return null

      const user = await DatabaseService.getUserById(decoded.id)
      if (!user || !user.is_active) return null

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        employee_code: user.employee_code,
        client_id: user.client_id,
      }
    } catch (error) {
      console.error("Get current user error:", error)
      return null
    }
  }
}
