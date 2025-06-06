"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle, XCircle, Wifi, Settings, RefreshCw } from "lucide-react"

interface SecurityEvent {
  id: string
  type: "login" | "failed_login" | "file_change" | "malware" | "firewall"
  severity: "low" | "medium" | "high" | "critical"
  description: string
  timestamp: string
  ip: string
  status: "resolved" | "pending" | "investigating"
}

interface SSLCertificate {
  id: string
  domain: string
  issuer: string
  expires: string
  status: "valid" | "expired" | "expiring"
  autoRenew: boolean
}

interface FirewallRule {
  id: string
  name: string
  action: "allow" | "deny"
  source: string
  port: string
  protocol: "tcp" | "udp" | "icmp"
  enabled: boolean
}

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: "1",
    type: "failed_login",
    severity: "medium",
    description: "Multiple failed login attempts from suspicious IP",
    timestamp: "2024-01-15 14:30:22",
    ip: "203.0.113.1",
    status: "investigating",
  },
  {
    id: "2",
    type: "file_change",
    severity: "low",
    description: "Configuration file modified",
    timestamp: "2024-01-15 12:15:45",
    ip: "192.168.1.100",
    status: "resolved",
  },
  {
    id: "3",
    type: "firewall",
    severity: "high",
    description: "Blocked suspicious traffic from known botnet",
    timestamp: "2024-01-15 09:22:18",
    ip: "198.51.100.5",
    status: "resolved",
  },
]

const mockSSLCertificates: SSLCertificate[] = [
  {
    id: "1",
    domain: "limitless.com",
    issuer: "Let's Encrypt",
    expires: "2024-04-15",
    status: "valid",
    autoRenew: true,
  },
  {
    id: "2",
    domain: "*.limitless.com",
    issuer: "Let's Encrypt",
    expires: "2024-03-20",
    status: "expiring",
    autoRenew: true,
  },
  {
    id: "3",
    domain: "old.limitless.com",
    issuer: "Let's Encrypt",
    expires: "2024-01-10",
    status: "expired",
    autoRenew: false,
  },
]

const mockFirewallRules: FirewallRule[] = [
  {
    id: "1",
    name: "Allow HTTP",
    action: "allow",
    source: "0.0.0.0/0",
    port: "80",
    protocol: "tcp",
    enabled: true,
  },
  {
    id: "2",
    name: "Allow HTTPS",
    action: "allow",
    source: "0.0.0.0/0",
    port: "443",
    protocol: "tcp",
    enabled: true,
  },
  {
    id: "3",
    name: "Block Suspicious IPs",
    action: "deny",
    source: "203.0.113.0/24",
    port: "*",
    protocol: "tcp",
    enabled: true,
  },
]

export default function SecurityCenter() {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(mockSecurityEvents)
  const [sslCertificates, setSSLCertificates] = useState<SSLCertificate[]>(mockSSLCertificates)
  const [firewallRules, setFirewallRules] = useState<FirewallRule[]>(mockFirewallRules)
  const [activeTab, setActiveTab] = useState<"overview" | "events" | "ssl" | "firewall">("overview")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-300"
      case "high":
        return "bg-orange-500/20 text-orange-300"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300"
      case "low":
        return "bg-green-500/20 text-green-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
      case "resolved":
        return "bg-green-500/20 text-green-300"
      case "expiring":
      case "investigating":
        return "bg-yellow-500/20 text-yellow-300"
      case "expired":
      case "pending":
        return "bg-red-500/20 text-red-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "expiring":
      case "investigating":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "expired":
      case "pending":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Security Center Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Security Center</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <Shield className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              onClick={() => setActiveTab("events")}
              className={`${
                activeTab === "events" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Security Events
            </Button>
            <Button
              onClick={() => setActiveTab("ssl")}
              className={`${activeTab === "ssl" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"}`}
            >
              <Lock className="w-4 h-4 mr-2" />
              SSL Certificates
            </Button>
            <Button
              onClick={() => setActiveTab("firewall")}
              className={`${
                activeTab === "firewall" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <Wifi className="w-4 h-4 mr-2" />
              Firewall
            </Button>
          </div>
        </CardContent>
      </Card>

      {activeTab === "overview" && (
        <>
          {/* Security Score */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Security Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray="85, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">85</div>
                      <div className="text-sm text-gray-400">Score</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">SSL Active</div>
                  <div className="text-xs text-gray-400">All domains secured</div>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">Firewall</div>
                  <div className="text-xs text-gray-400">12 rules active</div>
                </div>
                <div className="text-center">
                  <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">Monitoring</div>
                  <div className="text-xs text-gray-400">24/7 active</div>
                </div>
                <div className="text-center">
                  <Key className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">2FA</div>
                  <div className="text-xs text-gray-400">Enabled</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Threats */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Recent Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                    {getStatusIcon(event.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{event.description}</p>
                        <Badge className={getSeverityColor(event.severity)}>{event.severity}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>IP: {event.ip}</span>
                        <span>{event.timestamp}</span>
                        <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "events" && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Security Events</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left">
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Description</th>
                    <th className="p-4 font-medium">Severity</th>
                    <th className="p-4 font-medium">IP Address</th>
                    <th className="p-4 font-medium">Timestamp</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {securityEvents.map((event, index) => (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4">
                        <Badge className="bg-blue-500/20 text-blue-300">{event.type.replace("_", " ")}</Badge>
                      </td>
                      <td className="p-4 text-gray-300">{event.description}</td>
                      <td className="p-4">
                        <Badge className={getSeverityColor(event.severity)}>{event.severity}</Badge>
                      </td>
                      <td className="p-4 font-mono text-sm text-gray-400">{event.ip}</td>
                      <td className="p-4 text-gray-400">{event.timestamp}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(event.status)}
                          <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="hover:bg-white/10">
                            <Eye className="w-4 h-4" />
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
      )}

      {activeTab === "ssl" && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>SSL Certificates</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left">
                    <th className="p-4 font-medium">Domain</th>
                    <th className="p-4 font-medium">Issuer</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Expires</th>
                    <th className="p-4 font-medium">Auto Renew</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sslCertificates.map((cert, index) => (
                    <motion.tr
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4 font-medium">{cert.domain}</td>
                      <td className="p-4 text-gray-400">{cert.issuer}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(cert.status)}
                          <Badge className={getStatusColor(cert.status)}>{cert.status}</Badge>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">{cert.expires}</td>
                      <td className="p-4">
                        <Badge
                          className={cert.autoRenew ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}
                        >
                          {cert.autoRenew ? "Enabled" : "Disabled"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
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
      )}

      {activeTab === "firewall" && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Firewall Rules</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left">
                    <th className="p-4 font-medium">Rule Name</th>
                    <th className="p-4 font-medium">Action</th>
                    <th className="p-4 font-medium">Source</th>
                    <th className="p-4 font-medium">Port</th>
                    <th className="p-4 font-medium">Protocol</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {firewallRules.map((rule, index) => (
                    <motion.tr
                      key={rule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4 font-medium">{rule.name}</td>
                      <td className="p-4">
                        <Badge
                          className={
                            rule.action === "allow" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                          }
                        >
                          {rule.action}
                        </Badge>
                      </td>
                      <td className="p-4 font-mono text-sm text-gray-400">{rule.source}</td>
                      <td className="p-4 text-gray-400">{rule.port}</td>
                      <td className="p-4">
                        <Badge className="bg-blue-500/20 text-blue-300">{rule.protocol.toUpperCase()}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={rule.enabled ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"}
                        >
                          {rule.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="hover:bg-white/10">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400">
                            <XCircle className="w-4 h-4" />
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
      )}
    </div>
  )
}
