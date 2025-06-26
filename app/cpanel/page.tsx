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
import { Input } from "@/components/ui/input" // Import Input for login form
import { cn } from "@/lib/utils" // Import cn for conditional class names

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
      <div className="min-h-screen bg-dark-blue-900 text-foreground flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="custom-card p-6">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Image src="/images/logo.png" alt="Limitless" width={48} height={48} />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">LIMITLESS CPANEL</h1>
                  <p className="text-sm text-primary">Control Panel Access</p>
                </div>
              </div>
              <CardTitle className="flex items-center justify-center space-x-2 text-xl font-semibold">
                <Server className="w-6 h-6 text-primary" />
                <span>CPanel Login</span>
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
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
                <Button type="submit" className="w-full btn-gradient">
                  <Unlock className="w-4 h-4 mr-2" />
                  Access Control Panel
                </Button>
              </form>
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-primary">
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
                  className="text-primary hover:text-primary/80 text-sm flex items-center justify-center space-x-1"
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
    <div className="min-h-screen bg-dark-blue-900 text-foreground">
      {/* Header */}
      <header className="border-b border-dark-blue-700 p-4 bg-dark-blue-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary/80">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Image src="/images/logo.png" alt="Limitless" width={32} height={32} />
              <h1 className="text-2xl font-bold text-foreground">Limitless CPanel</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <CheckCircle className="w-3 h-3 mr-1" />
              Server Online
            </Badge>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Activity className="w-3 h-3 mr-1" />
              {systemStats.uptime}
            </Badge>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              size="sm"
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-13 bg-card border-border rounded-lg p-1 mb-6">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <FileText className="w-4 h-4 mr-2" />
              Files
            </TabsTrigger>
            <TabsTrigger
              value="databases"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Database className="w-4 h-4 mr-2" />
              Databases
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger
              value="domains"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Globe className="w-4 h-4 mr-2" />
              Domains
            </TabsTrigger>
            <TabsTrigger
              value="subdomains"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Globe className="w-4 h-4 mr-2" />
              Subdomains
            </TabsTrigger>
            <TabsTrigger
              value="advanced-email"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Tools
            </TabsTrigger>
            <TabsTrigger
              value="seo"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Search className="w-4 h-4 mr-2" />
              SEO
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="backups"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Download className="w-4 h-4 mr-2" />
              Backups
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Activity className="w-4 h-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger
              value="api"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Code className="w-4 h-4 mr-2" />
              API
            </TabsTrigger>
            <TabsTrigger
              value="backend"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <Terminal className="w-4 h-4 mr-2" />
              Backend
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="custom-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Cpu className="w-8 h-8 text-accent-blue" />
                    <Badge
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        systemStats.cpuUsage > 80
                          ? "bg-destructive/20 text-destructive"
                          : systemStats.cpuUsage > 60
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-accent-green/20 text-accent-green",
                      )}
                    >
                      {systemStats.cpuUsage}%
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-foreground">{systemStats.cpuUsage}%</h3>
                  <p className="text-muted-foreground text-sm">CPU Usage</p>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div
                      className={cn(
                        "h-2 rounded-full",
                        systemStats.cpuUsage > 80
                          ? "bg-destructive"
                          : systemStats.cpuUsage > 60
                            ? "bg-orange-500"
                            : "bg-accent-green",
                      )}
                      style={{ width: `${systemStats.cpuUsage}%` }}
                    />
                  </div>
                </CardContent>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="custom-card"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <MemoryStick className="w-8 h-8 text-accent-green" />
                    <Badge
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        systemStats.memoryUsage > 90
                          ? "bg-destructive/20 text-destructive"
                          : systemStats.memoryUsage > 70
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-accent-green/20 text-accent-green",
                      )}
                    >
                      {systemStats.memoryUsage}%
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-foreground">{systemStats.memoryUsage}%</h3>
                  <p className="text-muted-foreground text-sm">Memory Usage</p>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div
                      className={cn(
                        "h-2 rounded-full",
                        systemStats.memoryUsage > 90
                          ? "bg-destructive"
                          : systemStats.memoryUsage > 70
                            ? "bg-orange-500"
                            : "bg-accent-green",
                      )}
                      style={{ width: `${systemStats.memoryUsage}%` }}
                    />
                  </div>
                </CardContent>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="custom-card"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <HardDrive className="w-8 h-8 text-accent-orange" />
                    <Badge className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {systemStats.diskUsage}%
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-foreground">{systemStats.diskUsage}%</h3>
                  <p className="text-muted-foreground text-sm">Disk Usage</p>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-accent-orange h-2 rounded-full" style={{ width: `${systemStats.diskUsage}%` }} />
                  </div>
                </CardContent>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="custom-card"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Wifi className="w-8 h-8 text-accent-purple" />
                    <Badge className="bg-accent-purple/20 text-accent-purple px-3 py-1 rounded-full text-xs font-medium">
                      {systemStats.activeConnections}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-foreground">{systemStats.activeConnections}</h3>
                  <p className="text-muted-foreground text-sm">Active Connections</p>
                </CardContent>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card className="custom-card">
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-accent-blue mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-foreground">{quickStats.domains}</h3>
                  <p className="text-muted-foreground text-sm">Domains</p>
                </CardContent>
              </Card>

              <Card className="custom-card">
                <CardContent className="p-6 text-center">
                  <Database className="w-8 h-8 text-accent-green mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-foreground">{quickStats.databases}</h3>
                  <p className="text-muted-foreground text-sm">Databases</p>
                </CardContent>
              </Card>

              <Card className="custom-card">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-accent-orange mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-foreground">{quickStats.emailAccounts}</h3>
                  <p className="text-muted-foreground text-sm">Email Accounts</p>
                </CardContent>
              </Card>

              <Card className="custom-card">
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-accent-purple mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-foreground">{quickStats.files}</h3>
                  <p className="text-muted-foreground text-sm">Files</p>
                </CardContent>
              </Card>

              <Card className="custom-card">
                <CardContent className="p-6 text-center">
                  <Download className="w-8 h-8 text-accent-cyan mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-foreground">{quickStats.backups}</h3>
                  <p className="text-muted-foreground text-sm">Backups</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="custom-card">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setSelectedTab("files")}
                    className="bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    File Manager
                  </Button>
                  <Button
                    onClick={() => setSelectedTab("databases")}
                    className="bg-accent-green/20 hover:bg-accent-green/30 border border-accent-green/30 text-accent-green"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Create Database
                  </Button>
                  <Button
                    onClick={() => setSelectedTab("email")}
                    className="bg-accent-orange/20 hover:bg-accent-orange/30 border border-accent-orange/30 text-accent-orange"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Accounts
                  </Button>
                  <Button
                    onClick={() => setSelectedTab("backups")}
                    className="bg-accent-purple/20 hover:bg-accent-purple/30 border border-accent-purple/30 text-accent-purple"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="custom-card">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20 border border-border">
                    <CheckCircle className="w-5 h-5 text-accent-green" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Database backup completed</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20 border border-border">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    <div>
                      <p className="text-sm font-medium text-foreground">SSL certificate expires in 30 days</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20 border border-border">
                    <CheckCircle className="w-5 h-5 text-accent-green" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        New email account created: support@limitless.com
                      </p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20 border border-border">
                    <CheckCircle className="w-5 h-5 text-accent-green" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Domain limitless.com renewed</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
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
