"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Terminal,
  Zap,
  Play,
  Square,
  RefreshCw,
  Download,
  Settings,
  Monitor,
  Activity,
  FileText,
  Package,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
} from "lucide-react"

interface CronJob {
  id: string
  name: string
  command: string
  schedule: string
  enabled: boolean
  lastRun: string
  nextRun: string
  output: string
}

interface Service {
  id: string
  name: string
  status: "running" | "stopped" | "error"
  port: number
  memory: string
  cpu: string
  uptime: string
  autoStart: boolean
}

interface LogFile {
  id: string
  name: string
  path: string
  size: string
  modified: string
  lines: number
}

const mockCronJobs: CronJob[] = [
  {
    id: "1",
    name: "Database Backup",
    command: "/usr/local/bin/backup-db.sh",
    schedule: "0 2 * * *",
    enabled: true,
    lastRun: "2024-01-15 02:00:00",
    nextRun: "2024-01-16 02:00:00",
    output: "Backup completed successfully",
  },
  {
    id: "2",
    name: "Log Cleanup",
    command: "/usr/local/bin/cleanup-logs.sh",
    schedule: "0 0 * * 0",
    enabled: true,
    lastRun: "2024-01-14 00:00:00",
    nextRun: "2024-01-21 00:00:00",
    output: "Cleaned 245 MB of old logs",
  },
  {
    id: "3",
    name: "SSL Certificate Check",
    command: "/usr/local/bin/check-ssl.sh",
    schedule: "0 6 * * *",
    enabled: false,
    lastRun: "2024-01-10 06:00:00",
    nextRun: "Disabled",
    output: "All certificates valid",
  },
]

const mockServices: Service[] = [
  {
    id: "1",
    name: "Apache HTTP Server",
    status: "running",
    port: 80,
    memory: "245 MB",
    cpu: "12%",
    uptime: "15 days",
    autoStart: true,
  },
  {
    id: "2",
    name: "MySQL Database",
    status: "running",
    port: 3306,
    memory: "512 MB",
    cpu: "8%",
    uptime: "15 days",
    autoStart: true,
  },
  {
    id: "3",
    name: "Redis Cache",
    status: "running",
    port: 6379,
    memory: "128 MB",
    cpu: "3%",
    uptime: "15 days",
    autoStart: true,
  },
  {
    id: "4",
    name: "Node.js App",
    status: "stopped",
    port: 3000,
    memory: "0 MB",
    cpu: "0%",
    uptime: "0 days",
    autoStart: false,
  },
]

const mockLogFiles: LogFile[] = [
  {
    id: "1",
    name: "access.log",
    path: "/var/log/apache2/access.log",
    size: "45.2 MB",
    modified: "2024-01-15 14:30:22",
    lines: 125430,
  },
  {
    id: "2",
    name: "error.log",
    path: "/var/log/apache2/error.log",
    size: "2.1 MB",
    modified: "2024-01-15 14:25:18",
    lines: 8920,
  },
  {
    id: "3",
    name: "mysql.log",
    path: "/var/log/mysql/mysql.log",
    size: "12.8 MB",
    modified: "2024-01-15 14:28:45",
    lines: 45230,
  },
]

export default function BackendTools() {
  const [cronJobs, setCronJobs] = useState<CronJob[]>(mockCronJobs)
  const [services, setServices] = useState<Service[]>(mockServices)
  const [logFiles, setLogFiles] = useState<LogFile[]>(mockLogFiles)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Welcome to Limitless CPanel Terminal",
    "Type 'help' for available commands",
    "",
  ])
  const [terminalInput, setTerminalInput] = useState("")
  const [newCronForm, setNewCronForm] = useState({
    name: "",
    command: "",
    schedule: "",
  })

  const executeCommand = (command: string) => {
    const newOutput = [...terminalOutput, `$ ${command}`]

    // Simulate command execution
    switch (command.toLowerCase()) {
      case "help":
        newOutput.push("Available commands:")
        newOutput.push("  ls - List files")
        newOutput.push("  ps - Show running processes")
        newOutput.push("  top - Show system resources")
        newOutput.push("  df - Show disk usage")
        newOutput.push("  free - Show memory usage")
        newOutput.push("  clear - Clear terminal")
        break
      case "ls":
        newOutput.push("public_html  logs  mail  tmp  backup")
        break
      case "ps":
        newOutput.push("PID   COMMAND")
        newOutput.push("1234  apache2")
        newOutput.push("5678  mysqld")
        newOutput.push("9012  redis-server")
        break
      case "top":
        newOutput.push("CPU: 23%  Memory: 67%  Load: 1.2")
        break
      case "df":
        newOutput.push("Filesystem     Size  Used Avail Use%")
        newOutput.push("/dev/sda1      100G   45G   55G  45%")
        break
      case "free":
        newOutput.push("              total        used        free")
        newOutput.push("Mem:           8192        5472        2720")
        break
      case "clear":
        setTerminalOutput(["Terminal cleared", ""])
        setTerminalInput("")
        return
      default:
        newOutput.push(`Command not found: ${command}`)
    }

    newOutput.push("")
    setTerminalOutput(newOutput)
    setTerminalInput("")
  }

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (terminalInput.trim()) {
      executeCommand(terminalInput.trim())
    }
  }

  const toggleService = (serviceId: string) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? { ...service, status: service.status === "running" ? "stopped" : "running" }
          : service,
      ),
    )
  }

  const toggleCronJob = (jobId: string) => {
    setCronJobs(cronJobs.map((job) => (job.id === jobId ? { ...job, enabled: !job.enabled } : job)))
  }

  const createCronJob = () => {
    if (newCronForm.name && newCronForm.command && newCronForm.schedule) {
      const newJob: CronJob = {
        id: Date.now().toString(),
        ...newCronForm,
        enabled: true,
        lastRun: "Never",
        nextRun: "Calculating...",
        output: "Not executed yet",
      }
      setCronJobs([...cronJobs, newJob])
      setNewCronForm({ name: "", command: "", schedule: "" })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500/20 text-green-300"
      case "stopped":
        return "bg-red-500/20 text-red-300"
      case "error":
        return "bg-yellow-500/20 text-yellow-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Terminal className="w-5 h-5" />
            <span>Backend Tools & System Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="terminal" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="terminal">Terminal</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="cron">Cron Jobs</TabsTrigger>
              <TabsTrigger value="logs">Log Files</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
            </TabsList>

            <TabsContent value="terminal" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Web Terminal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg p-4 font-mono text-sm">
                    <div className="h-96 overflow-y-auto mb-4">
                      {terminalOutput.map((line, index) => (
                        <div key={index} className={line.startsWith("$") ? "text-green-400" : "text-gray-300"}>
                          {line}
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleTerminalSubmit} className="flex items-center space-x-2">
                      <span className="text-green-400">$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-white"
                        placeholder="Enter command..."
                        autoFocus
                      />
                    </form>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" onClick={() => executeCommand("ls")} variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      List Files
                    </Button>
                    <Button size="sm" onClick={() => executeCommand("ps")} variant="outline">
                      <Activity className="w-4 h-4 mr-2" />
                      Processes
                    </Button>
                    <Button size="sm" onClick={() => executeCommand("top")} variant="outline">
                      <Monitor className="w-4 h-4 mr-2" />
                      System Info
                    </Button>
                    <Button size="sm" onClick={() => executeCommand("clear")} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>System Services</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-white/10">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Service</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium">Port</th>
                          <th className="p-4 font-medium">Memory</th>
                          <th className="p-4 font-medium">CPU</th>
                          <th className="p-4 font-medium">Uptime</th>
                          <th className="p-4 font-medium">Auto Start</th>
                          <th className="p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service, index) => (
                          <motion.tr
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-white/5 hover:bg-white/5"
                          >
                            <td className="p-4 font-medium">{service.name}</td>
                            <td className="p-4">
                              <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                            </td>
                            <td className="p-4 text-gray-400">{service.port}</td>
                            <td className="p-4 text-gray-400">{service.memory}</td>
                            <td className="p-4 text-gray-400">{service.cpu}</td>
                            <td className="p-4 text-gray-400">{service.uptime}</td>
                            <td className="p-4">
                              <Switch checked={service.autoStart} />
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => toggleService(service.id)}
                                  className="hover:bg-white/10"
                                >
                                  {service.status === "running" ? (
                                    <Square className="w-4 h-4" />
                                  ) : (
                                    <Play className="w-4 h-4" />
                                  )}
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <RefreshCw className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <Settings className="w-4 h-4" />
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

            <TabsContent value="cron" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Create Cron Job</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Name</label>
                      <Input
                        placeholder="Database Backup"
                        value={newCronForm.name}
                        onChange={(e) => setNewCronForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Command</label>
                      <Input
                        placeholder="/usr/local/bin/backup.sh"
                        value={newCronForm.command}
                        onChange={(e) => setNewCronForm((prev) => ({ ...prev, command: e.target.value }))}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Schedule (Cron)</label>
                      <Input
                        placeholder="0 2 * * *"
                        value={newCronForm.schedule}
                        onChange={(e) => setNewCronForm((prev) => ({ ...prev, schedule: e.target.value }))}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={createCronJob}
                    className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Create Cron Job
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Scheduled Jobs</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-white/10">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Name</th>
                          <th className="p-4 font-medium">Command</th>
                          <th className="p-4 font-medium">Schedule</th>
                          <th className="p-4 font-medium">Last Run</th>
                          <th className="p-4 font-medium">Next Run</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cronJobs.map((job, index) => (
                          <motion.tr
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-white/5 hover:bg-white/5"
                          >
                            <td className="p-4 font-medium">{job.name}</td>
                            <td className="p-4">
                              <code className="text-xs bg-white/10 px-2 py-1 rounded">{job.command}</code>
                            </td>
                            <td className="p-4">
                              <code className="text-xs bg-white/10 px-2 py-1 rounded">{job.schedule}</code>
                            </td>
                            <td className="p-4 text-gray-400 text-sm">{job.lastRun}</td>
                            <td className="p-4 text-gray-400 text-sm">{job.nextRun}</td>
                            <td className="p-4">
                              <Badge
                                className={
                                  job.enabled ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                                }
                              >
                                {job.enabled ? "Enabled" : "Disabled"}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => toggleCronJob(job.id)}
                                  className="hover:bg-white/10"
                                >
                                  {job.enabled ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <FileText className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <Settings className="w-4 h-4" />
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

            <TabsContent value="logs" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>System Log Files</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-white/10">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Log File</th>
                          <th className="p-4 font-medium">Path</th>
                          <th className="p-4 font-medium">Size</th>
                          <th className="p-4 font-medium">Lines</th>
                          <th className="p-4 font-medium">Modified</th>
                          <th className="p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logFiles.map((log, index) => (
                          <motion.tr
                            key={log.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-white/5 hover:bg-white/5"
                          >
                            <td className="p-4 font-medium">{log.name}</td>
                            <td className="p-4">
                              <code className="text-xs bg-white/10 px-2 py-1 rounded">{log.path}</code>
                            </td>
                            <td className="p-4 text-gray-400">{log.size}</td>
                            <td className="p-4 text-gray-400">{log.lines.toLocaleString()}</td>
                            <td className="p-4 text-gray-400 text-sm">{log.modified}</td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <FileText className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <Download className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <RefreshCw className="w-4 h-4" />
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

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Live Log Viewer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg p-4 font-mono text-sm h-64 overflow-y-auto">
                    <div className="text-green-400">[2024-01-15 14:30:22] INFO: Server started successfully</div>
                    <div className="text-blue-400">[2024-01-15 14:30:23] DEBUG: Database connection established</div>
                    <div className="text-gray-300">[2024-01-15 14:30:24] INFO: User login: admin@limitless.com</div>
                    <div className="text-yellow-400">[2024-01-15 14:30:25] WARN: High memory usage detected</div>
                    <div className="text-gray-300">[2024-01-15 14:30:26] INFO: Backup process started</div>
                    <div className="text-green-400">[2024-01-15 14:30:27] INFO: SSL certificate renewed</div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Start Monitoring
                    </Button>
                    <Button size="sm" variant="outline">
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <Cpu className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">23%</h3>
                    <p className="text-gray-400 text-sm">CPU Usage</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <MemoryStick className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">67%</h3>
                    <p className="text-gray-400 text-sm">Memory Usage</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <HardDrive className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">45%</h3>
                    <p className="text-gray-400 text-sm">Disk Usage</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <Network className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">142</h3>
                    <p className="text-gray-400 text-sm">Connections</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Real-time System Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>CPU Load Average</span>
                      <span className="text-gray-400">1.2, 1.5, 1.8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Memory</span>
                      <span className="text-gray-400">5.4 GB / 8.0 GB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Disk I/O</span>
                      <span className="text-gray-400">Read: 45 MB/s, Write: 23 MB/s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Network</span>
                      <span className="text-gray-400">In: 125 Mbps, Out: 89 Mbps</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Uptime</span>
                      <span className="text-gray-400">15 days, 7 hours, 23 minutes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="packages" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Package Manager</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Input placeholder="Search packages..." className="bg-white/5 border-white/10" />
                    <Button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30">
                      <Package className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Node.js</h4>
                        <Badge className="bg-green-500/20 text-green-300">Installed</Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">JavaScript runtime built on Chrome's V8</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                        <Button size="sm" variant="outline">
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Python</h4>
                        <Badge className="bg-green-500/20 text-green-300">Installed</Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">High-level programming language</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                        <Button size="sm" variant="outline">
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Docker</h4>
                        <Badge className="bg-gray-500/20 text-gray-300">Available</Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Container platform for applications</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Install
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Git</h4>
                        <Badge className="bg-green-500/20 text-green-300">Installed</Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Distributed version control system</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                        <Button size="sm" variant="outline">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
