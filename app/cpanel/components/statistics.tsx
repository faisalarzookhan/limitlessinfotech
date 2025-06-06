"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, Users, Eye, Clock, Wifi, HardDrive, Cpu, MemoryStick } from "lucide-react"

interface TrafficData {
  date: string
  visitors: number
  pageViews: number
  bandwidth: number
}

interface TopPage {
  path: string
  views: number
  percentage: number
}

interface Visitor {
  country: string
  visitors: number
  percentage: number
  flag: string
}

const mockTrafficData: TrafficData[] = [
  { date: "2024-01-08", visitors: 1247, pageViews: 3891, bandwidth: 2.3 },
  { date: "2024-01-09", visitors: 1356, pageViews: 4102, bandwidth: 2.8 },
  { date: "2024-01-10", visitors: 1189, pageViews: 3654, bandwidth: 2.1 },
  { date: "2024-01-11", visitors: 1423, pageViews: 4387, bandwidth: 3.2 },
  { date: "2024-01-12", visitors: 1567, pageViews: 4892, bandwidth: 3.7 },
  { date: "2024-01-13", visitors: 1334, pageViews: 4156, bandwidth: 2.9 },
  { date: "2024-01-14", visitors: 1678, pageViews: 5234, bandwidth: 4.1 },
  { date: "2024-01-15", visitors: 1789, pageViews: 5567, bandwidth: 4.5 },
]

const mockTopPages: TopPage[] = [
  { path: "/", views: 12847, percentage: 35.2 },
  { path: "/services", views: 8934, percentage: 24.5 },
  { path: "/about", views: 5672, percentage: 15.6 },
  { path: "/contact", views: 4123, percentage: 11.3 },
  { path: "/blog", views: 3456, percentage: 9.5 },
  { path: "/portfolio", views: 1456, percentage: 4.0 },
]

const mockVisitors: Visitor[] = [
  { country: "United States", visitors: 4567, percentage: 42.3, flag: "🇺🇸" },
  { country: "India", visitors: 2134, percentage: 19.8, flag: "🇮🇳" },
  { country: "United Kingdom", visitors: 1456, percentage: 13.5, flag: "🇬🇧" },
  { country: "Canada", visitors: 987, percentage: 9.1, flag: "🇨🇦" },
  { country: "Germany", visitors: 765, percentage: 7.1, flag: "🇩🇪" },
  { country: "Australia", visitors: 543, percentage: 5.0, flag: "🇦🇺" },
  { country: "Others", visitors: 345, percentage: 3.2, flag: "🌍" },
]

export default function Statistics() {
  const [currentStats, setCurrentStats] = useState({
    totalVisitors: 15789,
    totalPageViews: 48567,
    bounceRate: 34.2,
    avgSessionDuration: "3:45",
    onlineUsers: 142,
  })

  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 23,
    memoryUsage: 67,
    diskUsage: 45,
    networkIn: 2.3,
    networkOut: 1.8,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats((prev) => ({
        ...prev,
        onlineUsers: Math.max(50, Math.min(200, prev.onlineUsers + Math.floor((Math.random() - 0.5) * 20))),
      }))

      setSystemMetrics((prev) => ({
        ...prev,
        cpuUsage: Math.max(10, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(20, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        networkIn: Math.max(0.1, Math.min(10, prev.networkIn + (Math.random() - 0.5) * 1)),
        networkOut: Math.max(0.1, Math.min(10, prev.networkOut + (Math.random() - 0.5) * 1)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getChangePercentage = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1)
  }

  const latestData = mockTrafficData[mockTrafficData.length - 1]
  const previousData = mockTrafficData[mockTrafficData.length - 2]

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-blue-400" />
                <Badge className="bg-green-500/20 text-green-300">
                  +{getChangePercentage(latestData.visitors, previousData.visitors)}%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{currentStats.totalVisitors.toLocaleString()}</h3>
              <p className="text-gray-400 text-sm">Total Visitors</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Eye className="w-8 h-8 text-green-400" />
                <Badge className="bg-green-500/20 text-green-300">
                  +{getChangePercentage(latestData.pageViews, previousData.pageViews)}%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{currentStats.totalPageViews.toLocaleString()}</h3>
              <p className="text-gray-400 text-sm">Page Views</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingDown className="w-8 h-8 text-orange-400" />
                <Badge className="bg-red-500/20 text-red-300">+2.1%</Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{currentStats.bounceRate}%</h3>
              <p className="text-gray-400 text-sm">Bounce Rate</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-purple-400" />
                <Badge className="bg-green-500/20 text-green-300">+12.3%</Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{currentStats.avgSessionDuration}</h3>
              <p className="text-gray-400 text-sm">Avg. Session</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Wifi className="w-8 h-8 text-cyan-400" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{currentStats.onlineUsers}</h3>
              <p className="text-gray-400 text-sm">Online Now</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Traffic Chart */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Traffic Overview (Last 7 Days)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTrafficData.slice(-7).map((data, index) => (
              <motion.div
                key={data.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium w-20">{data.date.split("-").slice(1).join("/")}</div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{data.visitors.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{data.pageViews.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HardDrive className="w-4 h-4 text-orange-400" />
                      <span className="text-sm">{data.bandwidth} GB</span>
                    </div>
                  </div>
                </div>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(data.visitors / Math.max(...mockTrafficData.map((d) => d.visitors))) * 100}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Pages and Visitors */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopPages.map((page, index) => (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded flex items-center justify-center text-xs font-bold text-blue-300">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{page.path}</div>
                      <div className="text-sm text-gray-400">{page.views.toLocaleString()} views</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{page.percentage}%</div>
                    <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                      <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${page.percentage}%` }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Visitors by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVisitors.map((visitor, index) => (
                <motion.div
                  key={visitor.country}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{visitor.flag}</span>
                    <div>
                      <div className="font-medium">{visitor.country}</div>
                      <div className="text-sm text-gray-400">{visitor.visitors.toLocaleString()} visitors</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{visitor.percentage}%</div>
                    <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                      <div className="bg-green-500 h-1 rounded-full" style={{ width: `${visitor.percentage}%` }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Performance */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>System Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <Cpu className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{systemMetrics.cpuUsage.toFixed(1)}%</div>
              <div className="text-gray-400 text-sm">CPU Usage</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${systemMetrics.cpuUsage}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <MemoryStick className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{systemMetrics.memoryUsage}%</div>
              <div className="text-gray-400 text-sm">Memory</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${systemMetrics.memoryUsage}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <HardDrive className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{systemMetrics.diskUsage}%</div>
              <div className="text-gray-400 text-sm">Disk Usage</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${systemMetrics.diskUsage}%` }} />
              </div>
            </div>

            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{systemMetrics.networkIn.toFixed(1)}</div>
              <div className="text-gray-400 text-sm">Network In (MB/s)</div>
            </div>

            <div className="text-center">
              <TrendingDown className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{systemMetrics.networkOut.toFixed(1)}</div>
              <div className="text-gray-400 text-sm">Network Out (MB/s)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
