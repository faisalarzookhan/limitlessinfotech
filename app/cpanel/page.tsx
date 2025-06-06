"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Server,
  Database,
  Mail,
  Globe,
  Shield,
  HardDrive,
  BarChart3,
  FileText,
  Download,
  Unlock,
  ArrowLeft,
  Activity,
  Cpu,
  MemoryStick,
  Wifi,
  CheckCircle,
  AlertTriangle,
  Search,
  Code,
  Terminal,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import FileManager from "./components/file-manager"
import DatabaseManager from "./components/database-manager"
import EmailManager from "./components/email-manager"
import DomainManager from "./components/domain-manager"
import SecurityCenter from "./components/security-center"
import BackupManager from "./components/backup-manager"
import Statistics from "./components/statistics"
import SubdomainManager from "./components/subdomain-manager"
import AdvancedEmailTools from "./components/advanced-email-tools"
import SEOTools from "./components/seo-tools"
import APIManager from "./components/api-manager"
import BackendTools from "./components/backend-tools"

interface SystemStats {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  bandwidth: number
  uptime: string
  activeConnections: number
}

interface QuickStats {
  domains: number
  databases: number
  emailAccounts: number
  files: number
  backups: number
}

export default function CPanelPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [systemStats, setSystemStats] = useState<SystemStats>({
    cpuUsage: 23,
    memoryUsage: 67,
    diskUsage: 45,
    bandwidth: 78,
    uptime: "15 days, 7 hours",
    activeConnections: 142,
  })
  const [quickStats, setQuickStats] = useState<QuickStats>({
    domains: 5,
    databases: 12,
    emailAccounts: 28,
    files: 1247,
    backups: 7,
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple demo authentication
    if (loginForm.username === "cpanel" && loginForm.password === "limitless2024") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials. Use cpanel/limitless2024")
    }
  }

  // Simulate real-time stats updates
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        setSystemStats((prev) => ({
          ...prev,
          cpuUsage: Math.max(10, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
          memoryUsage: Math.max(20, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 5)),
          activeConnections: Math.max(
            50,
            Math.min(200, prev.activeConnections + Math.floor((Math.random() - 0.5) * 20)),
          ),
        }))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Image src="/images/logo.png" alt="Limitless" width={40} height={40} />
                <div>
                  <h1 className="text-xl font-bold">LIMITLESS CPANEL</h1>
                  <p className="text-xs text-blue-300">Control Panel Access</p>
                </div>
              </div>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Server className="w-5 h-5" />
                <span>CPanel Login</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white placeholder-gray-400"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Access Control Panel
                </Button>
              </form>
              <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm text-blue-300">
                  <strong>Demo Credentials:</strong>
                  <br />
                  Username: cpanel
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
              <h1 className="text-2xl font-bold">Limitless CPanel</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <CheckCircle className="w-3 h-3 mr-1" />
              Server Online
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Activity className="w-3 h-3 mr-1" />
              {systemStats.uptime}
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
          <TabsList className="grid w-full grid-cols-13 bg-white/5 border-white/10">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-500/20">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-blue-500/20">
              <FileText className="w-4 h-4 mr-2" />
              Files
            </TabsTrigger>
            <TabsTrigger value="databases" className="data-[state=active]:bg-blue-500/20">
              <Database className="w-4 h-4 mr-2" />
              Databases
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-blue-500/20">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="domains" className="data-[state=active]:bg-blue-500/20">
              <Globe className="w-4 h-4 mr-2" />
              Domains
            </TabsTrigger>
            <TabsTrigger value="subdomains" className="data-[state=active]:bg-blue-500/20">
              <Globe className="w-4 h-4 mr-2" />
              Subdomains
            </TabsTrigger>
            <TabsTrigger value="advanced-email" className="data-[state=active]:bg-blue-500/20">
              <Mail className="w-4 h-4 mr-2" />
              Email Tools
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-blue-500/20">
              <Search className="w-4 h-4 mr-2" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-500/20">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="backups" className="data-[state=active]:bg-blue-500/20">
              <Download className="w-4 h-4 mr-2" />
              Backups
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-500/20">
              <Activity className="w-4 h-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-blue-500/20">
              <Code className="w-4 h-4 mr-2" />
              API
            </TabsTrigger>
            <TabsTrigger value="backend" className="data-[state=active]:bg-blue-500/20">
              <Terminal className="w-4 h-4 mr-2" />
              Backend
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Cpu className="w-8 h-8 text-blue-400" />
                      <Badge
                        className={`${systemStats.cpuUsage > 80 ? "bg-red-500/20 text-red-300" : systemStats.cpuUsage > 60 ? "bg-yellow-500/20 text-yellow-300" : "bg-green-500/20 text-green-300"}`}
                      >
                        {systemStats.cpuUsage}%
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{systemStats.cpuUsage}%</h3>
                    <p className="text-gray-400 text-sm">CPU Usage</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${systemStats.cpuUsage > 80 ? "bg-red-500" : systemStats.cpuUsage > 60 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${systemStats.cpuUsage}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <MemoryStick className="w-8 h-8 text-green-400" />
                      <Badge
                        className={`${systemStats.memoryUsage > 90 ? "bg-red-500/20 text-red-300" : systemStats.memoryUsage > 70 ? "bg-yellow-500/20 text-yellow-300" : "bg-green-500/20 text-green-300"}`}
                      >
                        {systemStats.memoryUsage}%
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{systemStats.memoryUsage}%</h3>
                    <p className="text-gray-400 text-sm">Memory Usage</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${systemStats.memoryUsage > 90 ? "bg-red-500" : systemStats.memoryUsage > 70 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${systemStats.memoryUsage}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <HardDrive className="w-8 h-8 text-orange-400" />
                      <Badge className="bg-blue-500/20 text-blue-300">{systemStats.diskUsage}%</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{systemStats.diskUsage}%</h3>
                    <p className="text-gray-400 text-sm">Disk Usage</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${systemStats.diskUsage}%` }} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Wifi className="w-8 h-8 text-purple-400" />
                      <Badge className="bg-purple-500/20 text-purple-300">{systemStats.activeConnections}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{systemStats.activeConnections}</h3>
                    <p className="text-gray-400 text-sm">Active Connections</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{quickStats.domains}</h3>
                  <p className="text-gray-400 text-sm">Domains</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <Database className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{quickStats.databases}</h3>
                  <p className="text-gray-400 text-sm">Databases</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{quickStats.emailAccounts}</h3>
                  <p className="text-gray-400 text-sm">Email Accounts</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{quickStats.files}</h3>
                  <p className="text-gray-400 text-sm">Files</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <Download className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{quickStats.backups}</h3>
                  <p className="text-gray-400 text-sm">Backups</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setSelectedTab("files")}
                    className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    File Manager
                  </Button>
                  <Button
                    onClick={() => setSelectedTab("databases")}
                    className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Create Database
                  </Button>
                  <Button
                    onClick={() => setSelectedTab("email")}
                    className="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Accounts
                  </Button>
                  <Button
                    onClick={() => setSelectedTab("backups")}
                    className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium">Database backup completed</p>
                      <p className="text-xs text-gray-400">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium">SSL certificate expires in 30 days</p>
                      <p className="text-xs text-gray-400">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium">New email account created: support@limitless.com</p>
                      <p className="text-xs text-gray-400">3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium">Domain limitless.com renewed</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files">
            <FileManager />
          </TabsContent>

          <TabsContent value="databases">
            <DatabaseManager />
          </TabsContent>

          <TabsContent value="email">
            <EmailManager />
          </TabsContent>

          <TabsContent value="domains">
            <DomainManager />
          </TabsContent>

          <TabsContent value="security">
            <SecurityCenter />
          </TabsContent>

          <TabsContent value="backups">
            <BackupManager />
          </TabsContent>

          <TabsContent value="stats">
            <Statistics />
          </TabsContent>

          <TabsContent value="subdomains">
            <SubdomainManager />
          </TabsContent>

          <TabsContent value="advanced-email">
            <AdvancedEmailTools />
          </TabsContent>

          <TabsContent value="seo">
            <SEOTools />
          </TabsContent>

          <TabsContent value="api">
            <APIManager />
          </TabsContent>

          <TabsContent value="backend">
            <BackendTools />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
