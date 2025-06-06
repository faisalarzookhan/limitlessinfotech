"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Mail,
  Plus,
  Trash2,
  Edit,
  Key,
  Forward,
  Settings,
  Shield,
  Send,
  Archive,
  SpellCheckIcon as Spam,
} from "lucide-react"

interface EmailAccount {
  id: string
  email: string
  password: string
  quota: string
  used: string
  autoResponder: boolean
  forwardingEnabled: boolean
  spamFilter: boolean
  created: string
  lastLogin: string
  status: "active" | "suspended"
}

interface EmailFilter {
  id: string
  name: string
  condition: string
  action: string
  enabled: boolean
}

interface AutoResponder {
  id: string
  email: string
  subject: string
  message: string
  enabled: boolean
  startDate: string
  endDate: string
}

const mockEmailAccounts: EmailAccount[] = [
  {
    id: "1",
    email: "admin@limitless.com",
    password: "••••••••",
    quota: "1000 MB",
    used: "245 MB",
    autoResponder: false,
    forwardingEnabled: false,
    spamFilter: true,
    created: "2024-01-10",
    lastLogin: "2024-01-15 14:30",
    status: "active",
  },
  {
    id: "2",
    email: "support@limitless.com",
    password: "••••••••",
    quota: "500 MB",
    used: "89 MB",
    autoResponder: true,
    forwardingEnabled: true,
    spamFilter: true,
    created: "2024-01-12",
    lastLogin: "2024-01-15 09:15",
    status: "active",
  },
]

const mockFilters: EmailFilter[] = [
  {
    id: "1",
    name: "Spam Filter",
    condition: "Subject contains 'SPAM'",
    action: "Move to Spam folder",
    enabled: true,
  },
  {
    id: "2",
    name: "Newsletter Filter",
    condition: "From contains 'newsletter'",
    action: "Move to Newsletter folder",
    enabled: true,
  },
]

const mockAutoResponders: AutoResponder[] = [
  {
    id: "1",
    email: "support@limitless.com",
    subject: "Thank you for contacting us",
    message: "We have received your message and will respond within 24 hours.",
    enabled: true,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
]

export default function AdvancedEmailTools() {
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>(mockEmailAccounts)
  const [filters, setFilters] = useState<EmailFilter[]>(mockFilters)
  const [autoResponders, setAutoResponders] = useState<AutoResponder[]>(mockAutoResponders)
  const [newAccountForm, setNewAccountForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    quota: "250",
    domain: "limitless.com",
  })

  const createEmailAccount = () => {
    if (newAccountForm.username.trim() && newAccountForm.password.trim()) {
      const newAccount: EmailAccount = {
        id: Date.now().toString(),
        email: `${newAccountForm.username}@${newAccountForm.domain}`,
        password: "••••••••",
        quota: `${newAccountForm.quota} MB`,
        used: "0 MB",
        autoResponder: false,
        forwardingEnabled: false,
        spamFilter: true,
        created: new Date().toISOString().split("T")[0],
        lastLogin: "Never",
        status: "active",
      }
      setEmailAccounts([...emailAccounts, newAccount])
      setNewAccountForm({
        username: "",
        password: "",
        confirmPassword: "",
        quota: "250",
        domain: "limitless.com",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Advanced Email Tools</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="accounts" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="accounts">Email Accounts</TabsTrigger>
              <TabsTrigger value="filters">Email Filters</TabsTrigger>
              <TabsTrigger value="autoresponder">Auto Responder</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="accounts" className="space-y-6">
              {/* Create Email Account */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Create Email Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Username</label>
                      <Input
                        placeholder="username"
                        value={newAccountForm.username}
                        onChange={(e) => setNewAccountForm((prev) => ({ ...prev, username: e.target.value }))}
                        className="bg-white/5 border-white/10"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Email: {newAccountForm.username}@{newAccountForm.domain}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Domain</label>
                      <select
                        value={newAccountForm.domain}
                        onChange={(e) => setNewAccountForm((prev) => ({ ...prev, domain: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white"
                      >
                        <option value="limitless.com">limitless.com</option>
                        <option value="limitlessinfotech.com">limitlessinfotech.com</option>
                        <option value="limitless.dev">limitless.dev</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <Input
                        type="password"
                        placeholder="Strong password"
                        value={newAccountForm.password}
                        onChange={(e) => setNewAccountForm((prev) => ({ ...prev, password: e.target.value }))}
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm Password</label>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        value={newAccountForm.confirmPassword}
                        onChange={(e) => setNewAccountForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Quota (MB)</label>
                      <Input
                        type="number"
                        placeholder="250"
                        value={newAccountForm.quota}
                        onChange={(e) => setNewAccountForm((prev) => ({ ...prev, quota: e.target.value }))}
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    <div className="flex items-end">
                      <Button
                        onClick={createEmailAccount}
                        className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Account
                      </Button>
                    </div>
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
                          <th className="p-4 font-medium">Usage</th>
                          <th className="p-4 font-medium">Features</th>
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
                            <td className="p-4">
                              <div>
                                <div className="font-medium">{account.email}</div>
                                <div className="text-xs text-gray-400">Created: {account.created}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{account.used}</span>
                                  <span>{account.quota}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{
                                      width: `${(Number.parseInt(account.used) / Number.parseInt(account.quota)) * 100}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1">
                                {account.autoResponder && (
                                  <Badge variant="outline" className="text-xs">
                                    Auto Reply
                                  </Badge>
                                )}
                                {account.forwardingEnabled && (
                                  <Badge variant="outline" className="text-xs">
                                    Forwarding
                                  </Badge>
                                )}
                                {account.spamFilter && (
                                  <Badge variant="outline" className="text-xs">
                                    Spam Filter
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge
                                className={
                                  account.status === "active"
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-red-500/20 text-red-300"
                                }
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
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <Forward className="w-4 h-4" />
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

            <TabsContent value="filters" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Email Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-lg">
                    <Input placeholder="Filter name" className="bg-white/5 border-white/10" />
                    <Input placeholder="Condition" className="bg-white/5 border-white/10" />
                    <Input placeholder="Action" className="bg-white/5 border-white/10" />
                    <Button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Filter
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {filters.map((filter) => (
                      <div key={filter.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Switch checked={filter.enabled} />
                          <div>
                            <div className="font-medium">{filter.name}</div>
                            <div className="text-sm text-gray-400">
                              {filter.condition} → {filter.action}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="hover:bg-white/10">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="autoresponder" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Auto Responder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Account</label>
                      <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white">
                        {emailAccounts.map((account) => (
                          <option key={account.id} value={account.email}>
                            {account.email}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <Input placeholder="Auto reply subject" className="bg-white/5 border-white/10" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <Textarea
                        placeholder="Auto reply message..."
                        className="bg-white/5 border-white/10 min-h-[100px]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date</label>
                      <Input type="date" className="bg-white/5 border-white/10" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">End Date</label>
                      <Input type="date" className="bg-white/5 border-white/10" />
                    </div>

                    <div className="md:col-span-2">
                      <Button className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/30">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Auto Responder
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {autoResponders.map((responder) => (
                      <div key={responder.id} className="p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-4">
                            <Switch checked={responder.enabled} />
                            <div>
                              <div className="font-medium">{responder.email}</div>
                              <div className="text-sm text-gray-400">{responder.subject}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-red-500/10 text-red-400">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400 bg-white/5 p-3 rounded">{responder.message}</div>
                        <div className="text-xs text-gray-500 mt-2">
                          Active: {responder.startDate} to {responder.endDate}
                        </div>
                      </div>
                    ))}
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
                      <span>Security Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-400">Add extra security to email accounts</div>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">DKIM Signing</div>
                        <div className="text-sm text-gray-400">Digitally sign outgoing emails</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">SPF Records</div>
                        <div className="text-sm text-gray-400">Prevent email spoofing</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">DMARC Policy</div>
                        <div className="text-sm text-gray-400">Email authentication policy</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Spam className="w-5 h-5" />
                      <span>Spam Protection</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">SpamAssassin</div>
                        <div className="text-sm text-gray-400">Advanced spam filtering</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Greylisting</div>
                        <div className="text-sm text-gray-400">Temporary rejection of unknown senders</div>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">RBL Checking</div>
                        <div className="text-sm text-gray-400">Real-time blacklist checking</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Spam Score Threshold</label>
                      <Input type="number" defaultValue="5" className="bg-white/5 border-white/10" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <Mail className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">{emailAccounts.length}</h3>
                    <p className="text-gray-400 text-sm">Email Accounts</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <Send className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">1,247</h3>
                    <p className="text-gray-400 text-sm">Emails Sent Today</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <Archive className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">892</h3>
                    <p className="text-gray-400 text-sm">Emails Received Today</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6 text-center">
                    <Spam className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">23</h3>
                    <p className="text-gray-400 text-sm">Spam Blocked</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Email Usage by Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emailAccounts.map((account) => (
                      <div key={account.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium">{account.email}</div>
                          <div className="text-sm text-gray-400">
                            {account.used} / {account.quota}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {Math.round((Number.parseInt(account.used) / Number.parseInt(account.quota)) * 100)}%
                          </div>
                          <div className="text-sm text-gray-400">Used</div>
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
