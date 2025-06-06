"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Plus,
  Trash2,
  Edit,
  Shield,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react"

interface Domain {
  id: string
  name: string
  status: "active" | "pending" | "expired"
  registrar: string
  expires: string
  autoRenew: boolean
  sslStatus: "active" | "expired" | "none"
  dnsStatus: "active" | "error"
}

interface Subdomain {
  id: string
  name: string
  domain: string
  documentRoot: string
  created: string
}

interface DNSRecord {
  id: string
  type: "A" | "CNAME" | "MX" | "TXT" | "NS"
  name: string
  value: string
  ttl: number
}

const mockDomains: Domain[] = [
  {
    id: "1",
    name: "limitless.com",
    status: "active",
    registrar: "Namecheap",
    expires: "2025-01-15",
    autoRenew: true,
    sslStatus: "active",
    dnsStatus: "active",
  },
  {
    id: "2",
    name: "limitlessinfotech.com",
    status: "active",
    registrar: "GoDaddy",
    expires: "2024-12-20",
    autoRenew: false,
    sslStatus: "expired",
    dnsStatus: "active",
  },
  {
    id: "3",
    name: "limitless.dev",
    status: "pending",
    registrar: "Cloudflare",
    expires: "2025-03-10",
    autoRenew: true,
    sslStatus: "none",
    dnsStatus: "error",
  },
]

const mockSubdomains: Subdomain[] = [
  {
    id: "1",
    name: "api",
    domain: "limitless.com",
    documentRoot: "/public_html/api",
    created: "2024-01-10",
  },
  {
    id: "2",
    name: "blog",
    domain: "limitless.com",
    documentRoot: "/public_html/blog",
    created: "2024-01-12",
  },
  {
    id: "3",
    name: "staging",
    domain: "limitless.com",
    documentRoot: "/public_html/staging",
    created: "2024-01-08",
  },
]

const mockDNSRecords: DNSRecord[] = [
  {
    id: "1",
    type: "A",
    name: "@",
    value: "192.168.1.100",
    ttl: 3600,
  },
  {
    id: "2",
    type: "CNAME",
    name: "www",
    value: "limitless.com",
    ttl: 3600,
  },
  {
    id: "3",
    type: "MX",
    name: "@",
    value: "mail.limitless.com",
    ttl: 3600,
  },
  {
    id: "4",
    type: "TXT",
    name: "@",
    value: "v=spf1 include:_spf.google.com ~all",
    ttl: 3600,
  },
]

export default function DomainManager() {
  const [domains, setDomains] = useState<Domain[]>(mockDomains)
  const [subdomains, setSubdomains] = useState<Subdomain[]>(mockSubdomains)
  const [dnsRecords, setDNSRecords] = useState<DNSRecord[]>(mockDNSRecords)
  const [activeTab, setActiveTab] = useState<"domains" | "subdomains" | "dns">("domains")
  const [newSubdomainForm, setNewSubdomainForm] = useState({
    name: "",
    domain: "limitless.com",
    documentRoot: "/public_html/",
  })

  const createSubdomain = () => {
    if (newSubdomainForm.name.trim()) {
      const newSubdomain: Subdomain = {
        id: Date.now().toString(),
        name: newSubdomainForm.name,
        domain: newSubdomainForm.domain,
        documentRoot: newSubdomainForm.documentRoot,
        created: new Date().toISOString().split("T")[0],
      }
      setSubdomains([...subdomains, newSubdomain])
      setNewSubdomainForm({ name: "", domain: "limitless.com", documentRoot: "/public_html/" })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "expired":
      case "error":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300"
      case "expired":
      case "error":
        return "bg-red-500/20 text-red-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Domain Manager Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Domain Manager</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              onClick={() => setActiveTab("domains")}
              className={`${
                activeTab === "domains" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <Globe className="w-4 h-4 mr-2" />
              Domains
            </Button>
            <Button
              onClick={() => setActiveTab("subdomains")}
              className={`${
                activeTab === "subdomains" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Subdomains
            </Button>
            <Button
              onClick={() => setActiveTab("dns")}
              className={`${activeTab === "dns" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"}`}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              DNS Records
            </Button>
          </div>
        </CardContent>
      </Card>

      {activeTab === "domains" && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Domain List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left">
                    <th className="p-4 font-medium">Domain</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">SSL</th>
                    <th className="p-4 font-medium">DNS</th>
                    <th className="p-4 font-medium">Registrar</th>
                    <th className="p-4 font-medium">Expires</th>
                    <th className="p-4 font-medium">Auto Renew</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {domains.map((domain, index) => (
                    <motion.tr
                      key={domain.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4 font-medium">{domain.name}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(domain.status)}
                          <Badge className={getStatusColor(domain.status)}>{domain.status}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(domain.sslStatus)}
                          <Badge className={getStatusColor(domain.sslStatus)}>{domain.sslStatus}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(domain.dnsStatus)}
                          <Badge className={getStatusColor(domain.dnsStatus)}>{domain.dnsStatus}</Badge>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">{domain.registrar}</td>
                      <td className="p-4 text-gray-400">{domain.expires}</td>
                      <td className="p-4">
                        <Badge
                          className={domain.autoRenew ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}
                        >
                          {domain.autoRenew ? "Enabled" : "Disabled"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="hover:bg-white/10">
                            <Shield className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-white/10">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-white/10">
                            <Edit className="w-4 h-4" />
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

      {activeTab === "subdomains" && (
        <>
          {/* Create Subdomain */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Create Subdomain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Subdomain name"
                  value={newSubdomainForm.name}
                  onChange={(e) => setNewSubdomainForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-white/5 border-white/10"
                />
                <select
                  value={newSubdomainForm.domain}
                  onChange={(e) => setNewSubdomainForm((prev) => ({ ...prev, domain: e.target.value }))}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white"
                >
                  {domains.map((domain) => (
                    <option key={domain.id} value={domain.name} className="bg-slate-800">
                      {domain.name}
                    </option>
                  ))}
                </select>
                <Input
                  placeholder="Document root"
                  value={newSubdomainForm.documentRoot}
                  onChange={(e) => setNewSubdomainForm((prev) => ({ ...prev, documentRoot: e.target.value }))}
                  className="bg-white/5 border-white/10"
                />
                <Button
                  onClick={createSubdomain}
                  className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Subdomains List */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Subdomains</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Subdomain</th>
                      <th className="p-4 font-medium">Full Domain</th>
                      <th className="p-4 font-medium">Document Root</th>
                      <th className="p-4 font-medium">Created</th>
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
                        <td className="p-4 font-medium">{subdomain.name}</td>
                        <td className="p-4 text-blue-400">
                          {subdomain.name}.{subdomain.domain}
                        </td>
                        <td className="p-4 text-gray-400 font-mono text-sm">{subdomain.documentRoot}</td>
                        <td className="p-4 text-gray-400">{subdomain.created}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Edit className="w-4 h-4" />
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
        </>
      )}

      {activeTab === "dns" && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>DNS Records</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left">
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Value</th>
                    <th className="p-4 font-medium">TTL</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dnsRecords.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4">
                        <Badge className="bg-blue-500/20 text-blue-300 font-mono">{record.type}</Badge>
                      </td>
                      <td className="p-4 font-medium">{record.name}</td>
                      <td className="p-4 text-gray-400 font-mono text-sm">{record.value}</td>
                      <td className="p-4 text-gray-400">{record.ttl}s</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="hover:bg-white/10">
                            <Edit className="w-4 h-4" />
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
      )}
    </div>
  )
}
