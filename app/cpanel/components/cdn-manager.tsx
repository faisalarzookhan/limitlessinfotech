"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Zap,
  BarChart3,
  Settings,
  RefreshCw,
  Plus,
  Trash2,
  MapPin,
  Clock,
  TrendingUp,
  Gauge,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface CDNZone {
  id: string
  domain: string
  status: "active" | "pending" | "disabled"
  origin: string
  cacheHitRatio: number
  bandwidth: string
  requests: number
  created: string
}

interface CDNStats {
  timestamp: string
  requests: number
  bandwidth: number
  cacheHit: number
  latency: number
}

interface EdgeLocation {
  id: string
  city: string
  country: string
  region: string
  status: "online" | "offline" | "maintenance"
  latency: number
  requests: number
}

const mockZones: CDNZone[] = [
  {
    id: "1",
    domain: "limitless.com",
    status: "active",
    origin: "203.0.113.1",
    cacheHitRatio: 94.5,
    bandwidth: "2.4 TB",
    requests: 1250000,
    created: "2024-01-01",
  },
  {
    id: "2",
    domain: "api.limitless.com",
    status: "active",
    origin: "203.0.113.2",
    cacheHitRatio: 87.2,
    bandwidth: "890 GB",
    requests: 850000,
    created: "2024-01-05",
  },
  {
    id: "3",
    domain: "cdn.limitless.com",
    status: "active",
    origin: "203.0.113.3",
    cacheHitRatio: 96.8,
    bandwidth: "5.1 TB",
    requests: 2100000,
    created: "2024-01-03",
  },
]

const mockStats: CDNStats[] = [
  { timestamp: "00:00", requests: 12500, bandwidth: 450, cacheHit: 94, latency: 45 },
  { timestamp: "04:00", requests: 8200, bandwidth: 320, cacheHit: 92, latency: 48 },
  { timestamp: "08:00", requests: 18900, bandwidth: 680, cacheHit: 95, latency: 42 },
  { timestamp: "12:00", requests: 25400, bandwidth: 920, cacheHit: 96, latency: 38 },
  { timestamp: "16:00", requests: 22100, bandwidth: 810, cacheHit: 94, latency: 41 },
  { timestamp: "20:00", requests: 19800, bandwidth: 720, cacheHit: 93, latency: 44 },
]

const mockEdgeLocations: EdgeLocation[] = [
  {
    id: "1",
    city: "New York",
    country: "USA",
    region: "North America",
    status: "online",
    latency: 12,
    requests: 450000,
  },
  { id: "2", city: "London", country: "UK", region: "Europe", status: "online", latency: 8, requests: 380000 },
  { id: "3", city: "Tokyo", country: "Japan", region: "Asia", status: "online", latency: 15, requests: 320000 },
  { id: "4", city: "Sydney", country: "Australia", region: "Oceania", status: "online", latency: 22, requests: 180000 },
  {
    id: "5",
    city: "São Paulo",
    country: "Brazil",
    region: "South America",
    status: "online",
    latency: 28,
    requests: 150000,
  },
  { id: "6", city: "Mumbai", country: "India", region: "Asia", status: "maintenance", latency: 35, requests: 0 },
  { id: "7", city: "Frankfurt", country: "Germany", region: "Europe", status: "online", latency: 6, requests: 420000 },
  { id: "8", city: "Singapore", country: "Singapore", region: "Asia", status: "online", latency: 18, requests: 280000 },
]

const cacheTypeData = [
  { name: "Static Assets", value: 65, color: "#3B82F6" },
  { name: "API Responses", value: 20, color: "#10B981" },
  { name: "Images", value: 10, color: "#F59E0B" },
  { name: "Other", value: 5, color: "#8B5CF6" },
]

export default function CDNManager() {
  const [zones, setZones] = useState<CDNZone[]>(mockZones)
  const [stats, setStats] = useState<CDNStats[]>(mockStats)
  const [edgeLocations, setEdgeLocations] = useState<EdgeLocation[]>(mockEdgeLocations)
  const [newZoneForm, setNewZoneForm] = useState({ domain: "", origin: "" })

  const createZone = () => {
    if (newZoneForm.domain.trim() && newZoneForm.origin.trim()) {
      const newZone: CDNZone = {
        id: Date.now().toString(),
        domain: newZoneForm.domain,
        status: "pending",
        origin: newZoneForm.origin,
        cacheHitRatio: 0,
        bandwidth: "0 GB",
        requests: 0,
        created: new Date().toISOString().split("T")[0],
      }
      setZones([...zones, newZone])
      setNewZoneForm({ domain: "", origin: "" })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "online":
        return "bg-green-500/20 text-green-300"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300"
      case "disabled":
      case "offline":
        return "bg-red-500/20 text-red-300"
      case "maintenance":
        return "bg-blue-500/20 text-blue-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const totalRequests = zones.reduce((sum, zone) => sum + zone.requests, 0)
  const totalBandwidth = zones.reduce((sum, zone) => sum + Number.parseFloat(zone.bandwidth.replace(/[^\d.]/g, "")), 0)
  const avgCacheHitRatio = zones.reduce((sum, zone) => sum + zone.cacheHitRatio, 0) / zones.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>CDN Manager</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/5 border-white/10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="zones">Zones</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="edge">Edge Locations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* CDN Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-blue-400">{zones.length}</h3>
                  <p className="text-gray-400 text-sm">Active Zones</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-green-400">{(totalRequests / 1000000).toFixed(1)}M</h3>
                  <p className="text-gray-400 text-sm">Total Requests</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-orange-400">{totalBandwidth.toFixed(1)} TB</h3>
                  <p className="text-gray-400 text-sm">Bandwidth Used</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <Gauge className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-purple-400">{avgCacheHitRatio.toFixed(1)}%</h3>
                  <p className="text-gray-400 text-sm">Cache Hit Ratio</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Request Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats}>
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
                    <Line type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={2} name="Requests" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Cache Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats}>
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
                    <Line type="monotone" dataKey="cacheHit" stroke="#10B981" strokeWidth={2} name="Cache Hit %" />
                    <Line type="monotone" dataKey="latency" stroke="#F59E0B" strokeWidth={2} name="Latency (ms)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Cache Distribution */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Cache Distribution by Content Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={cacheTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {cacheTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-6">
          {/* Create Zone */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Create CDN Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Domain (e.g., example.com)"
                  value={newZoneForm.domain}
                  onChange={(e) => setNewZoneForm((prev) => ({ ...prev, domain: e.target.value }))}
                  className="bg-white/5 border-white/10"
                />
                <Input
                  placeholder="Origin server (IP or domain)"
                  value={newZoneForm.origin}
                  onChange={(e) => setNewZoneForm((prev) => ({ ...prev, origin: e.target.value }))}
                  className="bg-white/5 border-white/10"
                />
                <Button
                  onClick={createZone}
                  className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Zone
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Zones List */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>CDN Zones</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Domain</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Origin</th>
                      <th className="p-4 font-medium">Cache Hit Ratio</th>
                      <th className="p-4 font-medium">Bandwidth</th>
                      <th className="p-4 font-medium">Requests</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zones.map((zone, index) => (
                      <motion.tr
                        key={zone.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="p-4 font-medium">{zone.domain}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(zone.status)}>{zone.status}</Badge>
                        </td>
                        <td className="p-4 text-gray-400 font-mono text-sm">{zone.origin}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${zone.cacheHitRatio}%` }}
                              />
                            </div>
                            <span className="text-sm">{zone.cacheHitRatio}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">{zone.bandwidth}</td>
                        <td className="p-4 text-gray-400">{(zone.requests / 1000).toFixed(0)}K</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <RefreshCw className="w-4 h-4" />
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

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Bandwidth Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats}>
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
                    <Line type="monotone" dataKey="bandwidth" stroke="#8B5CF6" strokeWidth={2} name="Bandwidth (GB)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats}>
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
                    <Line type="monotone" dataKey="latency" stroke="#F59E0B" strokeWidth={2} name="Latency (ms)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="edge" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Edge Locations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Location</th>
                      <th className="p-4 font-medium">Region</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Latency</th>
                      <th className="p-4 font-medium">Requests</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {edgeLocations.map((location, index) => (
                      <motion.tr
                        key={location.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <span className="font-medium">
                              {location.city}, {location.country}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">{location.region}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(location.status)}>{location.status}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-green-400" />
                            <span>{location.latency}ms</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">{(location.requests / 1000).toFixed(0)}K</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <BarChart3 className="w-4 h-4" />
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

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>CDN Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Auto-purge cache</h3>
                  <p className="text-sm text-gray-400">Automatically purge cache when origin content changes</p>
                </div>
                <Button className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30">Enabled</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Gzip compression</h3>
                  <p className="text-sm text-gray-400">Compress content for faster delivery</p>
                </div>
                <Button className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30">Enabled</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Browser cache TTL</h3>
                  <p className="text-sm text-gray-400">How long browsers should cache content</p>
                </div>
                <Input defaultValue="86400" className="w-32 bg-white/5 border-white/10" placeholder="Seconds" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Edge cache TTL</h3>
                  <p className="text-sm text-gray-400">How long edge servers should cache content</p>
                </div>
                <Input defaultValue="604800" className="w-32 bg-white/5 border-white/10" placeholder="Seconds" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Security headers</h3>
                  <p className="text-sm text-gray-400">Add security headers to responses</p>
                </div>
                <Button className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30">Enabled</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
