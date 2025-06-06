"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, Plus, Trash2, Edit, Key, Forward, Settings, Users } from "lucide-react"

interface EmailAccount {
  id: string
  email: string
  quota: string
  used: string
  created: string
  lastLogin: string
  status: "active" | "suspended"
}

interface EmailForwarder {
  id: string
  from: string
  to: string
  created: string
}

interface MailingList {
  id: string
  name: string
  members: number
  created: string
}

const mockEmailAccounts: EmailAccount[] = [
  {
    id: "1",
    email: "admin@limitless.com",
    quota: "1000 MB",
    used: "245 MB",
    created: "2024-01-10",
    lastLogin: "2024-01-15 14:30",
    status: "active",
  },
  {
    id: "2",
    email: "support@limitless.com",
    quota: "500 MB",
    used: "89 MB",
    created: "2024-01-12",
    lastLogin: "2024-01-15 09:15",
    status: "active",
  },
  {
    id: "3",
    email: "info@limitless.com",
    quota: "250 MB",
    used: "156 MB",
    created: "2024-01-08",
    lastLogin: "2024-01-14 16:45",
    status: "active",
  },
]

const mockForwarders: EmailForwarder[] = [
  {
    id: "1",
    from: "sales@limitless.com",
    to: "admin@limitless.com",
    created: "2024-01-10",
  },
  {
    id: "2",
    from: "contact@limitless.com",
    to: "support@limitless.com",
    created: "2024-01-12",
  },
]

const mockMailingLists: MailingList[] = [
  {
    id: "1",
    name: "newsletter@limitless.com",
    members: 1247,
    created: "2024-01-08",
  },
  {
    id: "2",
    name: "updates@limitless.com",
    members: 89,
    created: "2024-01-10",
  },
]

export default function EmailManager() {
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>(mockEmailAccounts)
  const [forwarders, setForwarders] = useState<EmailForwarder[]>(mockForwarders)
  const [mailingLists, setMailingLists] = useState<MailingList[]>(mockMailingLists)
  const [activeTab, setActiveTab] = useState<"accounts" | "forwarders" | "lists">("accounts")
  const [newAccountForm, setNewAccountForm] = useState({
    username: "",
    password: "",
    quota: "250",
  })
  const [newForwarderForm, setNewForwarderForm] = useState({
    from: "",
    to: "",
  })

  const createEmailAccount = () => {
    if (newAccountForm.username.trim() && newAccountForm.password.trim()) {
      const newAccount: EmailAccount = {
        id: Date.now().toString(),
        email: `${newAccountForm.username}@limitless.com`,
        quota: `${newAccountForm.quota} MB`,
        used: "0 MB",
        created: new Date().toISOString().split("T")[0],
        lastLogin: "Never",
        status: "active",
      }
      setEmailAccounts([...emailAccounts, newAccount])
      setNewAccountForm({ username: "", password: "", quota: "250" })
    }
  }

  const createForwarder = () => {
    if (newForwarderForm.from.trim() && newForwarderForm.to.trim()) {
      const newForwarder: EmailForwarder = {
        id: Date.now().toString(),
        from: newForwarderForm.from,
        to: newForwarderForm.to,
        created: new Date().toISOString().split("T")[0],
      }
      setForwarders([...forwarders, newForwarder])
      setNewForwarderForm({ from: "", to: "" })
    }
  }

  const deleteEmailAccount = (id: string) => {
    setEmailAccounts(emailAccounts.filter((account) => account.id !== id))
  }

  const deleteForwarder = (id: string) => {
    setForwarders(forwarders.filter((forwarder) => forwarder.id !== id))
  }

  const getUsagePercentage = (used: string, quota: string) => {
    const usedMB = Number.parseInt(used.replace(" MB", ""))
    const quotaMB = Number.parseInt(quota.replace(" MB", ""))
    return Math.round((usedMB / quotaMB) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Email Manager Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Email Manager</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              onClick={() => setActiveTab("accounts")}
              className={`${
                activeTab === "accounts" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Accounts
            </Button>
            <Button
              onClick={() => setActiveTab("forwarders")}
              className={`${
                activeTab === "forwarders" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <Forward className="w-4 h-4 mr-2" />
              Forwarders
            </Button>
            <Button
              onClick={() => setActiveTab("lists")}
              className={`${
                activeTab === "lists" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Mailing Lists
            </Button>
          </div>
        </CardContent>
      </Card>

      {activeTab === "accounts" && (
        <>
          {/* Create Email Account */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Create Email Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Input
                    placeholder="Username"
                    value={newAccountForm.username}
                    onChange={(e) => setNewAccountForm((prev) => ({ ...prev, username: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email: {newAccountForm.username}@limitless.com</p>
                </div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={newAccountForm.password}
                  onChange={(e) => setNewAccountForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="bg-white/5 border-white/10"
                />
                <div>
                  <Input
                    type="number"
                    placeholder="Quota (MB)"
                    value={newAccountForm.quota}
                    onChange={(e) => setNewAccountForm((prev) => ({ ...prev, quota: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                  <p className="text-xs text-gray-400 mt-1">Storage limit in MB</p>
                </div>
                <Button
                  onClick={createEmailAccount}
                  className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Email Accounts List */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Email Accounts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Email Address</th>
                      <th className="p-4 font-medium">Quota</th>
                      <th className="p-4 font-medium">Usage</th>
                      <th className="p-4 font-medium">Created</th>
                      <th className="p-4 font-medium">Last Login</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailAccounts.map((account, index) => (
                      <motion.tr
                        key={account.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="p-4 font-medium">{account.email}</td>
                        <td className="p-4 text-gray-400">{account.quota}</td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{account.used}</span>
                              <span>{getUsagePercentage(account.used, account.quota)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${getUsagePercentage(account.used, account.quota)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">{account.created}</td>
                        <td className="p-4 text-gray-400">{account.lastLogin}</td>
                        <td className="p-4">
                          <Badge
                            className={`${
                              account.status === "active"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {account.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Key className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteEmailAccount(account.id)}
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
        </>
      )}

      {activeTab === "forwarders" && (
        <>
          {/* Create Forwarder */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Create Email Forwarder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="From email address"
                  value={newForwarderForm.from}
                  onChange={(e) => setNewForwarderForm((prev) => ({ ...prev, from: e.target.value }))}
                  className="bg-white/5 border-white/10"
                />
                <Input
                  placeholder="To email address"
                  value={newForwarderForm.to}
                  onChange={(e) => setNewForwarderForm((prev) => ({ ...prev, to: e.target.value }))}
                  className="bg-white/5 border-white/10"
                />
                <Button
                  onClick={createForwarder}
                  className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Forwarder
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Forwarders List */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Email Forwarders</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 font-medium">From</th>
                      <th className="p-4 font-medium">To</th>
                      <th className="p-4 font-medium">Created</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forwarders.map((forwarder, index) => (
                      <motion.tr
                        key={forwarder.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="p-4 font-medium">{forwarder.from}</td>
                        <td className="p-4 text-gray-400">{forwarder.to}</td>
                        <td className="p-4 text-gray-400">{forwarder.created}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteForwarder(forwarder.id)}
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
        </>
      )}

      {activeTab === "lists" && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Mailing Lists</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left">
                    <th className="p-4 font-medium">List Name</th>
                    <th className="p-4 font-medium">Members</th>
                    <th className="p-4 font-medium">Created</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mailingLists.map((list, index) => (
                    <motion.tr
                      key={list.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4 font-medium">{list.name}</td>
                      <td className="p-4">
                        <Badge className="bg-blue-500/20 text-blue-300">{list.members}</Badge>
                      </td>
                      <td className="p-4 text-gray-400">{list.created}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="hover:bg-white/10">
                            <Users className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-white/10">
                            <Settings className="w-4 h-4" />
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

      {/* Email Statistics */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Email Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{emailAccounts.length}</div>
              <div className="text-gray-400">Email Accounts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{forwarders.length}</div>
              <div className="text-gray-400">Forwarders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{mailingLists.length}</div>
              <div className="text-gray-400">Mailing Lists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">490 MB</div>
              <div className="text-gray-400">Total Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
