"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Globe, Plus, Trash2, ExternalLink, CheckCircle, AlertTriangle, Settings, Copy, Zap } from "lucide-react"

interface Subdomain {
  id: string
  name: string
  domain: string
  documentRoot: string
  sslEnabled: boolean
  status: "active" | "pending" | "error"
  created: string
  lastModified: string
  traffic: number
  bandwidth: string
}

const mockSubdomains: Subdomain[] = [
  {
    id: "1",
    name: "api",
    domain: "limitless.com",
    documentRoot: "/public_html/api",
    sslEnabled: true,
    status: "active",
    created: "2024-01-10",
    lastModified: "2024-01-15",
    traffic: 15420,
    bandwidth: "2.3 GB",
  },
  {
    id: "2",
    name: "blog",
    domain: "limitless.com",
    documentRoot: "/public_html/blog",
    sslEnabled: true,
    status: "active",
    created: "2024-01-12",
    lastModified: "2024-01-14",
    traffic: 8930,
    bandwidth: "1.8 GB",
  },
  {
    id: "3",
    name: "staging",
    domain: "limitless.com",
    documentRoot: "/public_html/staging",
    sslEnabled: false,
    status: "pending",
    created: "2024-01-15",
    lastModified: "2024-01-15",
    traffic: 245,
    bandwidth: "45 MB",
  },
]

export default function SubdomainManager() {
  const [subdomains, setSubdomains] = useState<Subdomain[]>(mockSubdomains)
  const [newSubdomainForm, setNewSubdomainForm] = useState({
    name: "",
    domain: "limitless.com",
    documentRoot: "/public_html/",
    sslEnabled: true,
    template: "blank",
  })
  const [isCreating, setIsCreating] = useState(false)

  const createSubdomain = async () => {
    if (!newSubdomainForm.name.trim()) return

    setIsCreating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newSubdomain: Subdomain = {
      id: Date.now().toString(),
      name: newSubdomainForm.name,
      domain: newSubdomainForm.domain,
      documentRoot: newSubdomainForm.documentRoot + newSubdomainForm.name,
      sslEnabled: newSubdomainForm.sslEnabled,
      status: "pending",
      created: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      traffic: 0,
      bandwidth: "0 MB",
    }

    setSubdomains([...subdomains, newSubdomain])
    setNewSubdomainForm({
      name: "",
      domain: "limitless.com",
      documentRoot: "/public_html/",
      sslEnabled: true,
      template: "blank",
    })
    setIsCreating(false)
  }

  const deleteSubdomain = (id: string) => {
    setSubdomains(subdomains.filter((sub) => sub.id !== id))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300"
      case "error":
        return "bg-red-500/20 text-red-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Subdomain Manager</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="create">Create Subdomain</TabsTrigger>
              <TabsTrigger value="manage">Manage Subdomains</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Create New Subdomain</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Subdomain Name</label>
                      <Input
                        placeholder="api, blog, staging..."
                        value={newSubdomainForm.name}
                        onChange={(e) => setNewSubdomainForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-white/5 border-white/10"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Will create: {newSubdomainForm.name}.{newSubdomainForm.domain}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Domain</label>
                      <Select
                        value={newSubdomainForm.domain}
                        onValueChange={(value) => setNewSubdomainForm((prev) => ({ ...prev, domain: value }))}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="limitless.com">limitless.com</SelectItem>
                          <SelectItem value="limitlessinfotech.com">limitlessinfotech.com</SelectItem>
                          <SelectItem value="limitless.dev">limitless.dev</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Document Root</label>
                      <Input
                        placeholder="/public_html/subdomain"
                        value={newSubdomainForm.documentRoot}
                        onChange={(e) => setNewSubdomainForm((prev) => ({ ...prev, documentRoot: e.target.value }))}
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Template</label>
                      <Select
                        value={newSubdomainForm.template}
                        onValueChange={(value) => setNewSubdomainForm((prev) => ({ ...prev, template: value }))}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blank">Blank Directory</SelectItem>
                          <SelectItem value="wordpress">WordPress</SelectItem>
                          <SelectItem value="react">React App</SelectItem>
                          <SelectItem value="nextjs">Next.js App</SelectItem>
                          <SelectItem value="static">Static HTML</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="ssl"
                      checked={newSubdomainForm.sslEnabled}
                      onChange={(e) => setNewSubdomainForm((prev) => ({ ...prev, sslEnabled: e.target.checked }))}
                      className="rounded"
                    />
                    <label htmlFor="ssl" className="text-sm">
                      Enable SSL Certificate (Recommended)
                    </label>
                  </div>

                  <Button
                    onClick={createSubdomain}
                    disabled={!newSubdomainForm.name.trim() || isCreating}
                    className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                  >
                    {isCreating ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-spin" />
                        Creating Subdomain...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Subdomain
                      </>
                    )}
                  </Button>

                  {isCreating && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Creating subdomain...</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manage" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Existing Subdomains</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-white/10">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Subdomain</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium">SSL</th>
                          <th className="p-4 font-medium">Document Root</th>
                          <th className="p-4 font-medium">Traffic</th>
                          <th className="p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subdomains.map((subdomain, index) => (
                          <motion.tr
                            key={subdomain.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-white/5 hover:bg-white/5"
                          >
                            <td className="p-4">
                              <div>
                                <div className="font-medium text-blue-400">
                                  {subdomain.name}.{subdomain.domain}
                                </div>
                                <div className="text-xs text-gray-400">Created: {subdomain.created}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(subdomain.status)}
                                <Badge className={getStatusColor(subdomain.status)}>{subdomain.status}</Badge>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge
                                className={
                                  subdomain.sslEnabled ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                                }
                              >
                                {subdomain.sslEnabled ? "Enabled" : "Disabled"}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <code className="text-xs bg-white/10 px-2 py-1 rounded">{subdomain.documentRoot}</code>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">
                                <div>{subdomain.traffic.toLocaleString()} visits</div>
                                <div className="text-gray-400">{subdomain.bandwidth}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <Settings className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteSubdomain(subdomain.id)}
                                  className="hover:bg-red-500/10 text-red-400"
                                >
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

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">{subdomains.length}</h3>
                    <p className="text-gray-400 text-sm">Total Subdomains</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">{subdomains.filter((s) => s.status === "active").length}</h3>
                    <p className="text-gray-400 text-sm">Active Subdomains</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">
                      {subdomains.reduce((acc, s) => acc + s.traffic, 0).toLocaleString()}
                    </h3>
                    <p className="text-gray-400 text-sm">Total Traffic</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subdomains.map((subdomain) => (
                      <div key={subdomain.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium">
                            {subdomain.name}.{subdomain.domain}
                          </div>
                          <div className="text-sm text-gray-400">{subdomain.bandwidth} bandwidth</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{subdomain.traffic.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">visits</div>
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
