"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Code,
  Key,
  Trash2,
  Edit,
  Copy,
  Eye,
  EyeOff,
  Activity,
  BarChart3,
  Globe,
  Zap,
  CheckCircle,
  RefreshCw,
  Download,
} from "lucide-react"

interface APIKey {
  id: string
  name: string
  key: string
  permissions: string[]
  rateLimit: number
  enabled: boolean
  created: string
  lastUsed: string
  usage: number
  environment: "development" | "staging" | "production"
}

interface APIEndpoint {
  id: string
  path: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  description: string
  enabled: boolean
  rateLimit: number
  authentication: boolean
  cached: boolean
  responseTime: number
  successRate: number
}

interface APILog {
  id: string
  timestamp: string
  method: string
  endpoint: string
  statusCode: number
  responseTime: number
  ip: string
  userAgent: string
  apiKey?: string
}

const mockAPIKeys: APIKey[] = [
  {
    id: "1",
    name: "Production API",
    key: "lmt_prod_1234567890abcdef",
    permissions: ["read", "write", "admin"],
    rateLimit: 1000,
    enabled: true,
    created: "2024-01-10",
    lastUsed: "2024-01-15 14:30",
    usage: 8547,
    environment: "production",
  },
  {
    id: "2",
    name: "Development API",
    key: "lmt_dev_abcdef1234567890",
    permissions: ["read", "write"],
    rateLimit: 500,
    enabled: true,
    created: "2024-01-12",
    lastUsed: "2024-01-15 12:15",
    usage: 2341,
    environment: "development",
  },
  {
    id: "3",
    name: "Mobile App API",
    key: "lmt_mobile_567890abcdef1234",
    permissions: ["read"],
    rateLimit: 2000,
    enabled: false,
    created: "2024-01-08",
    lastUsed: "2024-01-14 09:45",
    usage: 15623,
    environment: "production",
  },
]

const mockEndpoints: APIEndpoint[] = [
  {
    id: "1",
    path: "/api/v1/users",
    method: "GET",
    description: "Get all users",
    enabled: true,
    rateLimit: 100,
    authentication: true,
    cached: true,
    responseTime: 145,
    successRate: 99.8,
  },
  {
    id: "2",
    path: "/api/v1/projects",
    method: "POST",
    description: "Create new project",
    enabled: true,
    rateLimit: 50,
    authentication: true,
    cached: false,
    responseTime: 320,
    successRate: 98.5,
  },
  {
    id: "3",
    path: "/api/v1/files",
    method: "GET",
    description: "List files",
    enabled: true,
    rateLimit: 200,
    authentication: true,
    cached: true,
    responseTime: 89,
    successRate: 99.9,
  },
]

const mockLogs: APILog[] = [
  {
    id: "1",
    timestamp: "2024-01-15 14:30:22",
    method: "GET",
    endpoint: "/api/v1/users",
    statusCode: 200,
    responseTime: 145,
    ip: "192.168.1.100",
    userAgent: "Mozilla/5.0...",
    apiKey: "lmt_prod_****",
  },
  {
    id: "2",
    timestamp: "2024-01-15 14:29:18",
    method: "POST",
    endpoint: "/api/v1/projects",
    statusCode: 201,
    responseTime: 320,
    ip: "203.0.113.45",
    userAgent: "PostmanRuntime/7.32.3",
    apiKey: "lmt_dev_****",
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:28:55",
    method: "GET",
    endpoint: "/api/v1/files",
    statusCode: 404,
    responseTime: 89,
    ip: "198.51.100.23",
    userAgent: "curl/7.68.0",
  },
]

export default function APIManager() {
  const [apiKeys, setAPIKeys] = useState<APIKey[]>(mockAPIKeys)
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>(mockEndpoints)
  const [logs, setLogs] = useState<APILog[]>(mockLogs)
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({})
  const [newKeyForm, setNewKeyForm] = useState({
    name: "",
    permissions: [] as string[],
    rateLimit: 1000,
    environment: "development" as "development" | "staging" | "production",
  })

  const generateAPIKey = () => {
    if (!newKeyForm.name.trim()) return

    const environments = {
      development: "dev",
      staging: "stg",
      production: "prod",
    }

    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyForm.name,
      key: `lmt_${environments[newKeyForm.environment]}_${Math.random().toString(36).substring(2, 18)}`,
      permissions: newKeyForm.permissions,
      rateLimit: newKeyForm.rateLimit,
      enabled: true,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
      usage: 0,
      environment: newKeyForm.environment,
    }

    setAPIKeys([...apiKeys, newKey])
    setNewKeyForm({
      name: "",
      permissions: [],
      rateLimit: 1000,
      environment: "development",
    })
  }

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys((prev) => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return "text-green-400"
    if (code >= 400 && code < 500) return "text-yellow-400"
    if (code >= 500) return "text-red-400"
    return "text-gray-400"
  }

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case "production":
        return "bg-red-500/20 text-red-300"
      case "staging":
        return "bg-yellow-500/20 text-yellow-300"
      case "development":
        return "bg-green-500/20 text-green-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="w-5 h-5" />
            <span>API Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="keys" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="keys">API Keys</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="keys" className="space-y-6">
              {/* Create API Key */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Generate New API Key</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Key Name</label>
                      <Input
                        placeholder="Production API, Mobile App, etc."
                        value={newKeyForm.name}
                        onChange={(e) => setNewKeyForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Environment</label>
                      <Select
                        value={newKeyForm.environment}
                        onValueChange={(value: "development" | "staging" | "production") =>
                          setNewKeyForm((prev) => ({ ...prev, environment: value }))
                        }
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="staging">Staging</SelectItem>
                          <SelectItem value="production">Production</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Rate Limit (requests/hour)</label>
                      <Input
                        type="number"
                        placeholder="1000"
                        value={newKeyForm.rateLimit}
                        onChange={(e) => setNewKeyForm((prev) => ({ ...prev, rateLimit: Number(e.target.value) }))}
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Permissions</label>
                      <div className="flex flex-wrap gap-2">
                        {["read", "write", "admin", "delete"].map((permission) => (
                          <label key={permission} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={newKeyForm.permissions.includes(permission)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewKeyForm((prev) => ({
                                    ...prev,
                                    permissions: [...prev.permissions, permission],
                                  }))
                                } else {
                                  setNewKeyForm((prev) => ({
                                    ...prev,
                                    permissions: prev.permissions.filter((p) => p !== permission),
                                  }))
                                }
                              }}
                              className="rounded"
                            />
                            <span className="text-sm capitalize">{permission}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={generateAPIKey}
                    className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Generate API Key
                  </Button>
                </CardContent>
              </Card>

              {/* API Keys List */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-white/10">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Name</th>
                          <th className="p-4 font-medium">Key</th>
                          <th className="p-4 font-medium">Environment</th>
                          <th className="p-4 font-medium">Permissions</th>
                          <th className="p-4 font-medium">Usage</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiKeys.map((key, index) => (
                          <motion.tr
                            key={key.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-white/5 hover:bg-white/5"
                          >
                            <td className="p-4">
                              <div>
                                <div className="font-medium">{key.name}</div>
                                <div className="text-xs text-gray-400">Created: {key.created}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <code className="bg-white/10 px-2 py-1 rounded text-xs font-mono">
                                  {showKeys[key.id] ? key.key : key.key.replace(/(.{8}).*(.{4})/, "$1****$2")}
                                </code>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => toggleKeyVisibility(key.id)}
                                  className="hover:bg-white/10"
                                >
                                  {showKeys[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(key.key)}
                                  className="hover:bg-white/10"
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className={getEnvironmentColor(key.environment)}>{key.environment}</Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1">
                                {key.permissions.map((permission) => (
                                  <Badge key={permission} variant="outline" className="text-xs">
                                    {permission}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">
                                <div>{key.usage.toLocaleString()} requests</div>
                                <div className="text-gray-400">Limit: {key.rateLimit}/hour</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge
                                className={
                                  key.enabled ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                                }
                              >
                                {key.enabled ? "Active" : "Disabled"}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <BarChart3 className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400">
                                  <Trash2 className="w-4 h-4" />
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

            <TabsContent value="endpoints" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>API Endpoints</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-white/10">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Method</th>
                          <th className="p-4 font-medium">Endpoint</th>
                          <th className="p-4 font-medium">Description</th>
                          <th className="p-4 font-medium">Auth</th>
                          <th className="p-4 font-medium">Cache</th>
                          <th className="p-4 font-medium">Performance</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoints.map((endpoint, index) => (
                          <motion.tr
                            key={endpoint.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-white/5 hover:bg-white/5"
                          >
                            <td className="p-4">
                              <Badge
                                className={`${
                                  endpoint.method === "GET"
                                    ? "bg-green-500/20 text-green-300"
                                    : endpoint.method === "POST"
                                      ? "bg-blue-500/20 text-blue-300"
                                      : endpoint.method === "PUT"
                                        ? "bg-yellow-500/20 text-yellow-300"
                                        : "bg-red-500/20 text-red-300"
                                }`}
                              >
                                {endpoint.method}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <code className="text-sm font-mono">{endpoint.path}</code>
                            </td>
                            <td className="p-4 text-gray-400">{endpoint.description}</td>
                            <td className="p-4">
                              <Badge
                                className={
                                  endpoint.authentication
                                    ? "bg-red-500/20 text-red-300"
                                    : "bg-green-500/20 text-green-300"
                                }
                              >
                                {endpoint.authentication ? "Required" : "Public"}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Badge
                                className={
                                  endpoint.cached ? "bg-blue-500/20 text-blue-300" : "bg-gray-500/20 text-gray-300"
                                }
                              >
                                {endpoint.cached ? "Cached" : "No Cache"}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">
                                <div>{endpoint.responseTime}ms avg</div>
                                <div className="text-gray-400">{endpoint.successRate}% success</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge
                                className={
                                  endpoint.enabled ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                                }
                              >
                                {endpoint.enabled ? "Active" : "Disabled"}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <BarChart3 className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <Code className="w-4 h-4" />
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
                  <div className="flex items-center justify-between">
                    <CardTitle>API Request Logs</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-white/10">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Timestamp</th>
                          <th className="p-4 font-medium">Method</th>
                          <th className="p-4 font-medium">Endpoint</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium">Response Time</th>
                          <th className="p-4 font-medium">IP Address</th>
                          <th className="p-4 font-medium">API Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log, index) => (
                          <motion.tr
                            key={log.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-white/5 hover:bg-white/5"
                          >
                            <td className="p-4 text-gray-400 text-sm font-mono">{log.timestamp}</td>
                            <td className="p-4">
                              <Badge
                                className={`${
                                  log.method === "GET"
                                    ? "bg-green-500/20 text-green-300"
                                    : log.method === "POST"
                                      ? "bg-blue-500/20 text-blue-300"
                                      : "bg-yellow-500/20 text-yellow-300"
                                }`}
                              >
                                {log.method}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <code className="text-sm font-mono">{log.endpoint}</code>
                            </td>
                            <td className="p-4">
                              <span className={`font-mono text-sm ${getStatusColor(log.statusCode)}`}>
                                {log.statusCode}
                              </span>
                            </td>
                            <td className="p-4 text-gray-400 text-sm">{log.responseTime}ms</td>
                            <td className="p-4 text-gray-400 text-sm font-mono">{log.ip}</td>
                            <td className="p-4">
                              {log.apiKey ? (
                                <code className="text-xs bg-white/10 px-2 py-1 rounded">{log.apiKey}</code>
                              ) : (
                                <span className="text-gray-500">-</span>
                              )}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentation" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Quick Start</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="font-medium mb-2">1. Get API Key</h4>
                          <p className="text-sm text-gray-400">Generate an API key from the API Keys tab</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="font-medium mb-2">2. Authentication</h4>
                          <p className="text-sm text-gray-400">Include your API key in the Authorization header</p>
                          <code className="block mt-2 text-xs bg-black/20 p-2 rounded">
                            Authorization: Bearer your_api_key_here
                          </code>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="font-medium mb-2">3. Make Requests</h4>
                          <p className="text-sm text-gray-400">Send HTTP requests to our endpoints</p>
                          <code className="block mt-2 text-xs bg-black/20 p-2 rounded">
                            curl -H "Authorization: Bearer your_key" https://api.limitless.com/v1/users
                          </code>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Example Requests</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="font-medium mb-2 text-green-400">GET /api/v1/users</h4>
                          <p className="text-sm text-gray-400 mb-2">Retrieve all users</p>
                          <Textarea
                            readOnly
                            value={`curl -X GET "https://api.limitless.com/v1/users" \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json"`}
                            className="bg-black/20 border-white/10 text-xs font-mono"
                            rows={3}
                          />
                        </div>

                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="font-medium mb-2 text-blue-400">POST /api/v1/projects</h4>
                          <p className="text-sm text-gray-400 mb-2">Create a new project</p>
                          <Textarea
                            readOnly
                            value={`curl -X POST "https://api.limitless.com/v1/projects" \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"title": "New Project", "description": "Project description"}'`}
                            className="bg-black/20 border-white/10 text-xs font-mono"
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30">
                      <Globe className="w-4 h-4 mr-2" />
                      View Full Documentation
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download OpenAPI Spec
                    </Button>
                    <Button variant="outline">
                      <Code className="w-4 h-4 mr-2" />
                      SDK Downloads
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">26,511</h3>
                    <p className="text-gray-400 text-sm">Total Requests</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">99.2%</h3>
                    <p className="text-gray-400 text-sm">Success Rate</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">145ms</h3>
                    <p className="text-gray-400 text-sm">Avg Response Time</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <Key className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">{apiKeys.length}</h3>
                    <p className="text-gray-400 text-sm">Active API Keys</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>API Usage by Endpoint</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {endpoints.map((endpoint) => (
                      <div key={endpoint.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Badge
                            className={`${
                              endpoint.method === "GET"
                                ? "bg-green-500/20 text-green-300"
                                : endpoint.method === "POST"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-yellow-500/20 text-yellow-300"
                            }`}
                          >
                            {endpoint.method}
                          </Badge>
                          <div>
                            <div className="font-medium">{endpoint.path}</div>
                            <div className="text-sm text-gray-400">{endpoint.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{Math.floor(Math.random() * 5000)} requests</div>
                          <div className="text-sm text-gray-400">{endpoint.responseTime}ms avg</div>
                        </div>
                      </div>
                    ))}
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
