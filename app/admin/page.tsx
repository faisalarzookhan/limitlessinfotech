"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Server,
  Shield,
  Activity,
  Settings,
  Database,
  ArrowLeft,
  TrendingUp,
  CheckCircle,
  Eye,
  Lock,
  Unlock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SystemMetric {
  label: string
  value: string
  change: string
  trend: "up" | "down" | "stable"
  icon: any
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  lastLogin: string
}

interface SecurityEvent {
  id: string
  type: "login" | "failed_login" | "permission_change" | "data_access"
  user: string
  timestamp: string
  details: string
  severity: "low" | "medium" | "high"
}

const systemMetrics: SystemMetric[] = [
  {
    label: "Total Users",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Active Sessions",
    value: "89",
    change: "+5%",
    trend: "up",
    icon: Activity,
  },
  {
    label: "Server Uptime",
    value: "99.9%",
    change: "Stable",
    trend: "stable",
    icon: Server,
  },
  {
    label: "Security Score",
    value: "98/100",
    change: "+2",
    trend: "up",
    icon: Shield,
  },
]

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@limitless.com",
    role: "Admin",
    status: "active",
    lastLogin: "2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@limitless.com",
    role: "Developer",
    status: "active",
    lastLogin: "1 day ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@limitless.com",
    role: "User",
    status: "inactive",
    lastLogin: "1 week ago",
  },
]

const securityEvents: SecurityEvent[] = [
  {
    id: "1",
    type: "login",
    user: "john@limitless.com",
    timestamp: "2 minutes ago",
    details: "Successful login from IP 192.168.1.100",
    severity: "low",
  },
  {
    id: "2",
    type: "failed_login",
    user: "unknown@example.com",
    timestamp: "15 minutes ago",
    details: "Failed login attempt from IP 203.0.113.1",
    severity: "medium",
  },
  {
    id: "3",
    type: "permission_change",
    user: "admin@limitless.com",
    timestamp: "1 hour ago",
    details: "User permissions updated for jane@limitless.com",
    severity: "high",
  },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [selectedTab, setSelectedTab] = useState("dashboard")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple demo authentication
    if (loginForm.username === "admin" && loginForm.password === "limitless2024") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials. Use admin/limitless2024")
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
                  <h1 className="text-xl font-bold">LIMITLESS ADMIN</h1>
                  <p className="text-xs text-blue-300">Secure Access Portal</p>
                </div>
              </div>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Admin Login</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
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
                  <Unlock className="w-4 h-4 mr-2" />
                  Secure Login
                </Button>
              </form>
              <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm text-blue-300">
                  <strong>Demo Credentials:</strong>
                  <br />
                  Username: admin
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
              <h1 className="text-2xl font-bold">Limitless Admin Panel</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <CheckCircle className="w-3 h-3 mr-1" />
              System Healthy
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
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 bg-white/5 border-white/10">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-500/20">
              <Activity className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-500/20">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-500/20">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-blue-500/20">
              <Server className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-blue-500/20">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <metric.icon className="w-8 h-8 text-blue-400" />
                        <Badge
                          className={`${
                            metric.trend === "up"
                              ? "bg-green-500/20 text-green-300"
                              : metric.trend === "down"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-gray-500/20 text-gray-300"
                          }`}
                        >
                          {metric.change}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                      <p className="text-gray-400 text-sm">{metric.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            event.severity === "high"
                              ? "bg-red-500"
                              : event.severity === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{event.details}</p>
                          <p className="text-xs text-gray-400">{event.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPU Usage</span>
                      <span className="text-sm font-medium">23%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "23%" }} />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "67%" }} />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Storage Usage</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "45%" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>User Management</span>
                  </span>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">Add User</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={`${
                            user.status === "active" ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"
                          }`}
                        >
                          {user.status}
                        </Badge>
                        <span className="text-sm text-gray-400">{user.role}</span>
                        <span className="text-sm text-gray-400">{user.lastLogin}</span>
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div
                        className={`w-3 h-3 rounded-full mt-2 ${
                          event.severity === "high"
                            ? "bg-red-500"
                            : event.severity === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium capitalize">{event.type.replace("_", " ")}</h3>
                          <Badge
                            className={`${
                              event.severity === "high"
                                ? "bg-red-500/20 text-red-300"
                                : event.severity === "medium"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-green-500/20 text-green-300"
                            }`}
                          >
                            {event.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mb-1">{event.details}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span>User: {event.user}</span>
                          <span>Time: {event.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Server className="w-5 h-5" />
                    <span>System Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Web Server</span>
                    <Badge className="bg-green-500/20 text-green-300">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Database</span>
                    <Badge className="bg-green-500/20 text-green-300">Connected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mail Server</span>
                    <Badge className="bg-green-500/20 text-green-300">Running</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Backup Service</span>
                    <Badge className="bg-yellow-500/20 text-yellow-300">Scheduled</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>Database Info</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Records</span>
                    <span className="font-medium">1,247,892</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Database Size</span>
                    <span className="font-medium">2.3 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Backup</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Query Performance</span>
                    <span className="font-medium text-green-400">Excellent</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>System Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">General Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">System Name</label>
                        <Input defaultValue="Limitless Infotech System" className="bg-white/5 border-white/10" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Admin Email</label>
                        <Input defaultValue="admin@limitless.com" className="bg-white/5 border-white/10" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Two-Factor Authentication</span>
                        <Badge className="bg-green-500/20 text-green-300">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Session Timeout</span>
                        <span className="text-sm">30 minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Password Policy</span>
                        <Badge className="bg-blue-500/20 text-blue-300">Strong</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
