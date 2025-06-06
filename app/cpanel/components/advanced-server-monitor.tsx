"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Zap,
  Thermometer,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  RefreshCw,
  Settings,
  Shield,
} from "lucide-react"

interface ServerMetrics {
  timestamp: string
  cpu: number
  memory: number
  disk: number
  network: number
  temperature: number
  load: number
}

interface ProcessInfo {
  pid: number
  name: string
  cpu: number
  memory: number
  status: "running" | "sleeping" | "stopped"
}

interface NetworkConnection {
  id: string
  protocol: string
  localAddress: string
  remoteAddress: string
  status: string
  process: string
}

const mockMetrics: ServerMetrics[] = [
  { timestamp: "00:00", cpu: 23, memory: 67, disk: 45, network: 78, temperature: 42, load: 1.2 },
  { timestamp: "00:05", cpu: 28, memory: 69, disk: 45, network: 82, temperature: 44, load: 1.4 },
  { timestamp: "00:10", cpu: 31, memory: 71, disk: 46, network: 75, temperature: 46, load: 1.6 },
  { timestamp: "00:15", cpu: 26, memory: 68, disk: 46, network: 88, temperature: 43, load: 1.3 },
  { timestamp: "00:20", cpu: 35, memory: 73, disk: 47, network: 92, temperature: 48, load: 1.8 },
  { timestamp: "00:25", cpu: 29, memory: 70, disk: 47, network: 85, temperature: 45, load: 1.5 },
]

const mockProcesses: ProcessInfo[] = [
  { pid: 1234, name: "nginx", cpu: 12.5, memory: 256, status: "running" },
  { pid: 1235, name: "mysql", cpu: 8.3, memory: 512, status: "running" },
  { pid: 1236, name: "php-fpm", cpu: 15.2, memory: 128, status: "running" },
  { pid: 1237, name: "redis", cpu: 3.1, memory: 64, status: "running" },
  { pid: 1238, name: "node", cpu: 22.8, memory: 384, status: "running" },
]

const mockConnections: NetworkConnection[] = [
  {
    id: "1",
    protocol: "TCP",
    localAddress: "0.0.0.0:80",
    remoteAddress: "192.168.1.100:54321",
    status: "ESTABLISHED",
    process: "nginx",
  },
  {
    id: "2",
    protocol: "TCP",
    localAddress: "0.0.0.0:443",
    remoteAddress: "10.0.0.50:43210",
    status: "ESTABLISHED",
    process: "nginx",
  },
  {
    id: "3",
    protocol: "TCP",
    localAddress: "127.0.0.1:3306",
    remoteAddress: "127.0.0.1:45678",
    status: "ESTABLISHED",
    process: "mysql",
  },
  {
    id: "4",
    protocol: "TCP",
    localAddress: "0.0.0.0:22",
    remoteAddress: "203.0.113.1:12345",
    status: "ESTABLISHED",
    process: "sshd",
  },
]

export default function AdvancedServerMonitor() {
  const [metrics, setMetrics] = useState<ServerMetrics[]>(mockMetrics)
  const [processes, setProcesses] = useState<ProcessInfo[]>(mockProcesses)
  const [connections, setConnections] = useState<NetworkConnection[]>(mockConnections)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("1h")

  const currentMetrics = metrics[metrics.length - 1]

  const refreshData = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate new mock data
    const newMetric: ServerMetrics = {
      timestamp: new Date().toLocaleTimeString(),
      cpu: Math.max(10, Math.min(90, currentMetrics.cpu + (Math.random() - 0.5) * 10)),
      memory: Math.max(20, Math.min(95, currentMetrics.memory + (Math.random() - 0.5) * 5)),
      disk: Math.max(30, Math.min(80, currentMetrics.disk + (Math.random() - 0.5) * 2)),
      network: Math.max(50, Math.min(100, currentMetrics.network + (Math.random() - 0.5) * 15)),
      temperature: Math.max(35, Math.min(70, currentMetrics.temperature + (Math.random() - 0.5) * 3)),
      load: Math.max(0.5, Math.min(3.0, currentMetrics.load + (Math.random() - 0.5) * 0.3)),
    }

    setMetrics((prev) => [...prev.slice(-11), newMetric])
    setIsRefreshing(false)
  }

  useEffect(() => {
    const interval = setInterval(refreshData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return "text-red-400"
    if (value >= thresholds.warning) return "text-yellow-400"
    return "text-green-400"
  }

  const getStatusIcon = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return <AlertTriangle className="w-4 h-4 text-red-400" />
    if (value >= thresholds.warning) return <AlertTriangle className="w-4 h-4 text-yellow-400" />
    return <CheckCircle className="w-4 h-4 text-green-400" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Server className="w-5 h-5" />
              <span>Advanced Server Monitor</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                onClick={refreshData}
                disabled={isRefreshing}
                size="sm"
                className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button size="sm" className="bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/30">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/5 border-white/10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="processes">Processes</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Real-time Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Cpu className="w-8 h-8 text-blue-400" />
                    {getStatusIcon(currentMetrics.cpu, { warning: 70, critical: 85 })}
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-1 ${getStatusColor(currentMetrics.cpu, { warning: 70, critical: 85 })}`}
                  >
                    {currentMetrics.cpu}%
                  </h3>
                  <p className="text-gray-400 text-sm">CPU Usage</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        currentMetrics.cpu >= 85
                          ? "bg-red-500"
                          : currentMetrics.cpu >= 70
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${currentMetrics.cpu}%` }}
                    />
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Load: {currentMetrics.load}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <MemoryStick className="w-8 h-8 text-green-400" />
                    {getStatusIcon(currentMetrics.memory, { warning: 80, critical: 90 })}
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-1 ${getStatusColor(currentMetrics.memory, { warning: 80, critical: 90 })}`}
                  >
                    {currentMetrics.memory}%
                  </h3>
                  <p className="text-gray-400 text-sm">Memory Usage</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        currentMetrics.memory >= 90
                          ? "bg-red-500"
                          : currentMetrics.memory >= 80
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${currentMetrics.memory}%` }}
                    />
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <Activity className="w-3 h-3 mr-1" />
                    8.2 GB / 16 GB
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <HardDrive className="w-8 h-8 text-orange-400" />
                    {getStatusIcon(currentMetrics.disk, { warning: 80, critical: 90 })}
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-1 ${getStatusColor(currentMetrics.disk, { warning: 80, critical: 90 })}`}
                  >
                    {currentMetrics.disk}%
                  </h3>
                  <p className="text-gray-400 text-sm">Disk Usage</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        currentMetrics.disk >= 90
                          ? "bg-red-500"
                          : currentMetrics.disk >= 80
                            ? "bg-yellow-500"
                            : "bg-orange-500"
                      }`}
                      style={{ width: `${currentMetrics.disk}%` }}
                    />
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <HardDrive className="w-3 h-3 mr-1" />
                    450 GB / 1 TB
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Thermometer className="w-8 h-8 text-purple-400" />
                    {getStatusIcon(currentMetrics.temperature, { warning: 60, critical: 70 })}
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-1 ${getStatusColor(currentMetrics.temperature, { warning: 60, critical: 70 })}`}
                  >
                    {currentMetrics.temperature}°C
                  </h3>
                  <p className="text-gray-400 text-sm">Temperature</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        currentMetrics.temperature >= 70
                          ? "bg-red-500"
                          : currentMetrics.temperature >= 60
                            ? "bg-yellow-500"
                            : "bg-purple-500"
                      }`}
                      style={{ width: `${(currentMetrics.temperature / 80) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <Zap className="w-3 h-3 mr-1" />
                    Normal Range
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={metrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="timestamp" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="cpu" stroke="#3B82F6" strokeWidth={2} name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#10B981" strokeWidth={2} name="Memory %" />
                    <Line type="monotone" dataKey="disk" stroke="#F59E0B" strokeWidth={2} name="Disk %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Network Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={metrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="timestamp" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="network"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.3}
                      name="Network %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* System Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Server Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">OS:</span>
                  <span>Ubuntu 22.04 LTS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Kernel:</span>
                  <span>5.15.0-91-generic</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime:</span>
                  <span>15 days, 7 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Architecture:</span>
                  <span>x86_64</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Hardware</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">CPU:</span>
                  <span>Intel Xeon E5-2686 v4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cores:</span>
                  <span>8 cores / 16 threads</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">RAM:</span>
                  <span>16 GB DDR4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Storage:</span>
                  <span>1 TB NVMe SSD</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Network</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">IP Address:</span>
                  <span>203.0.113.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bandwidth:</span>
                  <span>1 Gbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Transfer:</span>
                  <span>2.4 TB / month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Connections:</span>
                  <span>{connections.length} active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="processes" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Running Processes</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 font-medium">PID</th>
                      <th className="p-4 font-medium">Process Name</th>
                      <th className="p-4 font-medium">CPU %</th>
                      <th className="p-4 font-medium">Memory (MB)</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processes.map((process, index) => (
                      <motion.tr
                        key={process.pid}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="p-4 font-mono">{process.pid}</td>
                        <td className="p-4 font-medium">{process.name}</td>
                        <td className="p-4">
                          <Badge
                            className={`${
                              process.cpu > 20
                                ? "bg-red-500/20 text-red-300"
                                : process.cpu > 10
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-green-500/20 text-green-300"
                            }`}
                          >
                            {process.cpu}%
                          </Badge>
                        </td>
                        <td className="p-4">{process.memory} MB</td>
                        <td className="p-4">
                          <Badge
                            className={`${
                              process.status === "running"
                                ? "bg-green-500/20 text-green-300"
                                : process.status === "sleeping"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {process.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Activity className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400">
                              <AlertTriangle className="w-4 h-4" />
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

        <TabsContent value="network" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Active Network Connections</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Protocol</th>
                      <th className="p-4 font-medium">Local Address</th>
                      <th className="p-4 font-medium">Remote Address</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Process</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {connections.map((connection, index) => (
                      <motion.tr
                        key={connection.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="p-4">
                          <Badge className="bg-blue-500/20 text-blue-300">{connection.protocol}</Badge>
                        </td>
                        <td className="p-4 font-mono text-sm">{connection.localAddress}</td>
                        <td className="p-4 font-mono text-sm">{connection.remoteAddress}</td>
                        <td className="p-4">
                          <Badge className="bg-green-500/20 text-green-300">{connection.status}</Badge>
                        </td>
                        <td className="p-4">{connection.process}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Activity className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400">
                              <AlertTriangle className="w-4 h-4" />
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

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Firewall Status</span>
                  <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>SSL Certificate</span>
                  <Badge className="bg-green-500/20 text-green-300">Valid</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>DDoS Protection</span>
                  <Badge className="bg-green-500/20 text-green-300">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Intrusion Detection</span>
                  <Badge className="bg-yellow-500/20 text-yellow-300">Monitoring</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Security Scan</span>
                  <span className="text-gray-400">2 hours ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm font-medium">Successful login from 203.0.113.50</p>
                    <p className="text-xs text-gray-400">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-sm font-medium">Failed login attempt blocked</p>
                    <p className="text-xs text-gray-400">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm font-medium">SSL certificate renewed</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
                <div className="text-green-400">[2024-01-15 14:30:25] INFO: Server started successfully</div>
                <div className="text-blue-400">[2024-01-15 14:30:26] DEBUG: Database connection established</div>
                <div className="text-yellow-400">[2024-01-15 14:31:15] WARN: High memory usage detected (85%)</div>
                <div className="text-green-400">[2024-01-15 14:32:00] INFO: Backup completed successfully</div>
                <div className="text-red-400">[2024-01-15 14:33:45] ERROR: Failed to connect to external API</div>
                <div className="text-blue-400">[2024-01-15 14:34:12] DEBUG: Cache cleared</div>
                <div className="text-green-400">[2024-01-15 14:35:30] INFO: SSL certificate validated</div>
                <div className="text-yellow-400">[2024-01-15 14:36:18] WARN: Disk usage above 80%</div>
                <div className="text-green-400">[2024-01-15 14:37:05] INFO: Security scan completed</div>
                <div className="text-blue-400">[2024-01-15 14:38:22] DEBUG: Performance optimization applied</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
