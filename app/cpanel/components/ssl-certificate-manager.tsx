"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Plus,
  RefreshCw,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Globe,
  Lock,
  Key,
  Settings,
} from "lucide-react"

interface SSLCertificate {
  id: string
  domain: string
  issuer: string
  type: "Let's Encrypt" | "Commercial" | "Self-Signed" | "Wildcard"
  status: "active" | "expired" | "expiring" | "pending"
  issuedDate: string
  expiryDate: string
  autoRenew: boolean
  keySize: number
  algorithm: string
}

const mockCertificates: SSLCertificate[] = [
  {
    id: "1",
    domain: "limitless.com",
    issuer: "Let's Encrypt",
    type: "Let's Encrypt",
    status: "active",
    issuedDate: "2024-01-01",
    expiryDate: "2024-04-01",
    autoRenew: true,
    keySize: 2048,
    algorithm: "RSA",
  },
  {
    id: "2",
    domain: "*.limitless.com",
    issuer: "DigiCert",
    type: "Wildcard",
    status: "active",
    issuedDate: "2023-12-15",
    expiryDate: "2024-12-15",
    autoRenew: false,
    keySize: 2048,
    algorithm: "RSA",
  },
  {
    id: "3",
    domain: "api.limitless.com",
    issuer: "Let's Encrypt",
    type: "Let's Encrypt",
    status: "expiring",
    issuedDate: "2023-10-15",
    expiryDate: "2024-01-20",
    autoRenew: true,
    keySize: 2048,
    algorithm: "RSA",
  },
]

export default function SSLCertificateManager() {
  const [certificates, setCertificates] = useState<SSLCertificate[]>(mockCertificates)
  const [newDomain, setNewDomain] = useState("")
  const [selectedCertType, setSelectedCertType] = useState<"letsencrypt" | "commercial" | "upload">("letsencrypt")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "expiring":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "expired":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "pending":
        return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300"
      case "expiring":
        return "bg-yellow-500/20 text-yellow-300"
      case "expired":
        return "bg-red-500/20 text-red-300"
      case "pending":
        return "bg-blue-500/20 text-blue-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const now = new Date()
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const generateCertificate = () => {
    if (newDomain.trim()) {
      const newCert: SSLCertificate = {
        id: Date.now().toString(),
        domain: newDomain,
        issuer: selectedCertType === "letsencrypt" ? "Let's Encrypt" : "Commercial",
        type: selectedCertType === "letsencrypt" ? "Let's Encrypt" : "Commercial",
        status: "pending",
        issuedDate: new Date().toISOString().split("T")[0],
        expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        autoRenew: selectedCertType === "letsencrypt",
        keySize: 2048,
        algorithm: "RSA",
      }
      setCertificates([...certificates, newCert])
      setNewDomain("")
    }
  }

  const renewCertificate = (id: string) => {
    setCertificates((certs) =>
      certs.map((cert) =>
        cert.id === id
          ? {
              ...cert,
              status: "pending",
              expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            }
          : cert,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>SSL Certificate Manager</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="certificates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/5 border-white/10">
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-6">
          {/* Certificate Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-green-400">
                  {certificates.filter((c) => c.status === "active").length}
                </h3>
                <p className="text-gray-400 text-sm">Active Certificates</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-yellow-400">
                  {certificates.filter((c) => c.status === "expiring").length}
                </h3>
                <p className="text-gray-400 text-sm">Expiring Soon</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <RefreshCw className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-blue-400">{certificates.filter((c) => c.autoRenew).length}</h3>
                <p className="text-gray-400 text-sm">Auto-Renewal</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <Globe className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-purple-400">{certificates.length}</h3>
                <p className="text-gray-400 text-sm">Total Domains</p>
              </CardContent>
            </Card>
          </div>

          {/* Certificates List */}
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
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Issuer</th>
                      <th className="p-4 font-medium">Expires</th>
                      <th className="p-4 font-medium">Auto Renew</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert, index) => (
                      <motion.tr
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Lock className="w-4 h-4 text-green-400" />
                            <span className="font-medium">{cert.domain}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-blue-500/20 text-blue-300">{cert.type}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(cert.status)}
                            <Badge className={getStatusColor(cert.status)}>{cert.status}</Badge>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">{cert.issuer}</td>
                        <td className="p-4">
                          <div>
                            <div className="text-sm">{cert.expiryDate}</div>
                            <div
                              className={`text-xs ${
                                getDaysUntilExpiry(cert.expiryDate) < 30
                                  ? "text-red-400"
                                  : getDaysUntilExpiry(cert.expiryDate) < 60
                                    ? "text-yellow-400"
                                    : "text-gray-400"
                              }`}
                            >
                              {getDaysUntilExpiry(cert.expiryDate)} days left
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              cert.autoRenew ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"
                            }
                          >
                            {cert.autoRenew ? "Enabled" : "Disabled"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => renewCertificate(cert.id)}
                              className="hover:bg-white/10"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Download className="w-4 h-4" />
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

        <TabsContent value="generate" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Generate New SSL Certificate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Domain Name</label>
                <Input
                  placeholder="example.com or *.example.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Certificate Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedCertType === "letsencrypt"
                        ? "border-blue-500/50 bg-blue-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                    onClick={() => setSelectedCertType("letsencrypt")}
                  >
                    <CardContent className="p-4 text-center">
                      <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h3 className="font-medium">Let's Encrypt</h3>
                      <p className="text-xs text-gray-400 mt-1">Free, Auto-renewable</p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedCertType === "commercial"
                        ? "border-blue-500/50 bg-blue-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                    onClick={() => setSelectedCertType("commercial")}
                  >
                    <CardContent className="p-4 text-center">
                      <Key className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <h3 className="font-medium">Commercial</h3>
                      <p className="text-xs text-gray-400 mt-1">Extended validation</p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedCertType === "upload" ? "border-blue-500/50 bg-blue-500/10" : "border-white/10 bg-white/5"
                    }`}
                    onClick={() => setSelectedCertType("upload")}
                  >
                    <CardContent className="p-4 text-center">
                      <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <h3 className="font-medium">Upload</h3>
                      <p className="text-xs text-gray-400 mt-1">Existing certificate</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {selectedCertType === "upload" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Certificate File (.crt)</label>
                    <Input type="file" accept=".crt,.pem" className="bg-white/5 border-white/10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Private Key (.key)</label>
                    <Input type="file" accept=".key,.pem" className="bg-white/5 border-white/10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Certificate Chain (optional)</label>
                    <Input type="file" accept=".crt,.pem" className="bg-white/5 border-white/10" />
                  </div>
                </div>
              )}

              <Button
                onClick={generateCertificate}
                className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
              >
                <Plus className="w-4 h-4 mr-2" />
                {selectedCertType === "upload" ? "Upload Certificate" : "Generate Certificate"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>SSL Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Auto-renewal for Let's Encrypt</h3>
                  <p className="text-sm text-gray-400">Automatically renew certificates 30 days before expiry</p>
                </div>
                <Button className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30">Enabled</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email notifications</h3>
                  <p className="text-sm text-gray-400">Get notified about certificate expiry</p>
                </div>
                <Button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30">Configure</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">HSTS (HTTP Strict Transport Security)</h3>
                  <p className="text-sm text-gray-400">Force HTTPS connections</p>
                </div>
                <Button className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30">Enabled</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Certificate transparency logging</h3>
                  <p className="text-sm text-gray-400">Log certificates to CT logs</p>
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
