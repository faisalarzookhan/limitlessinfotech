"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Database, Plus, Trash2, Edit, Download, Users, Key, Settings, BarChart3 } from "lucide-react"

interface DatabaseInfo {
  id: string
  name: string
  size: string
  tables: number
  collation: string
  created: string
  lastBackup: string
}

interface DatabaseUser {
  id: string
  username: string
  host: string
  privileges: string[]
  created: string
}

const mockDatabases: DatabaseInfo[] = [
  {
    id: "1",
    name: "limitless_main",
    size: "45.2 MB",
    tables: 12,
    collation: "utf8mb4_unicode_ci",
    created: "2024-01-10",
    lastBackup: "2024-01-15 02:00",
  },
  {
    id: "2",
    name: "limitless_blog",
    size: "23.8 MB",
    tables: 8,
    collation: "utf8mb4_unicode_ci",
    created: "2024-01-12",
    lastBackup: "2024-01-15 02:00",
  },
  {
    id: "3",
    name: "limitless_analytics",
    size: "156.4 MB",
    tables: 15,
    collation: "utf8mb4_unicode_ci",
    created: "2024-01-08",
    lastBackup: "2024-01-15 02:00",
  },
]

const mockUsers: DatabaseUser[] = [
  {
    id: "1",
    username: "limitless_admin",
    host: "localhost",
    privileges: ["ALL PRIVILEGES"],
    created: "2024-01-10",
  },
  {
    id: "2",
    username: "limitless_read",
    host: "localhost",
    privileges: ["SELECT"],
    created: "2024-01-12",
  },
  {
    id: "3",
    username: "limitless_app",
    host: "localhost",
    privileges: ["SELECT", "INSERT", "UPDATE", "DELETE"],
    created: "2024-01-08",
  },
]

export default function DatabaseManager() {
  const [databases, setDatabases] = useState<DatabaseInfo[]>(mockDatabases)
  const [users, setUsers] = useState<DatabaseUser[]>(mockUsers)
  const [activeTab, setActiveTab] = useState<"databases" | "users">("databases")
  const [newDbName, setNewDbName] = useState("")
  const [newUserForm, setNewUserForm] = useState({
    username: "",
    password: "",
    host: "localhost",
  })

  const createDatabase = () => {
    if (newDbName.trim()) {
      const newDb: DatabaseInfo = {
        id: Date.now().toString(),
        name: `limitless_${newDbName}`,
        size: "0 MB",
        tables: 0,
        collation: "utf8mb4_unicode_ci",
        created: new Date().toISOString().split("T")[0],
        lastBackup: "Never",
      }
      setDatabases([...databases, newDb])
      setNewDbName("")
    }
  }

  const createUser = () => {
    if (newUserForm.username.trim() && newUserForm.password.trim()) {
      const newUser: DatabaseUser = {
        id: Date.now().toString(),
        username: `limitless_${newUserForm.username}`,
        host: newUserForm.host,
        privileges: ["SELECT"],
        created: new Date().toISOString().split("T")[0],
      }
      setUsers([...users, newUser])
      setNewUserForm({ username: "", password: "", host: "localhost" })
    }
  }

  const deleteDatabase = (id: string) => {
    setDatabases(databases.filter((db) => db.id !== id))
  }

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Database Manager Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Database Manager</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              onClick={() => setActiveTab("databases")}
              className={`${
                activeTab === "databases" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <Database className="w-4 h-4 mr-2" />
              Databases
            </Button>
            <Button
              onClick={() => setActiveTab("users")}
              className={`${
                activeTab === "users" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Users
            </Button>
          </div>
        </CardContent>
      </Card>

      {activeTab === "databases" && (
        <>
          {/* Create Database */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Create New Database</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Database name (without prefix)"
                    value={newDbName}
                    onChange={(e) => setNewDbName(e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                  <p className="text-xs text-gray-400 mt-1">Full name will be: limitless_{newDbName}</p>
                </div>
                <Button
                  onClick={createDatabase}
                  className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Database
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Database List */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Existing Databases</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Database Name</th>
                      <th className="p-4 font-medium">Size</th>
                      <th className="p-4 font-medium">Tables</th>
                      <th className="p-4 font-medium">Collation</th>
                      <th className="p-4 font-medium">Created</th>
                      <th className="p-4 font-medium">Last Backup</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {databases.map((db, index) => (
                      <motion.tr
                        key={db.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="p-4 font-medium">{db.name}</td>
                        <td className="p-4 text-gray-400">{db.size}</td>
                        <td className="p-4">
                          <Badge className="bg-blue-500/20 text-blue-300">{db.tables}</Badge>
                        </td>
                        <td className="p-4 text-gray-400 font-mono text-sm">{db.collation}</td>
                        <td className="p-4 text-gray-400">{db.created}</td>
                        <td className="p-4 text-gray-400">{db.lastBackup}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteDatabase(db.id)}
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

      {activeTab === "users" && (
        <>
          {/* Create User */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Create New Database User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Input
                    placeholder="Username (without prefix)"
                    value={newUserForm.username}
                    onChange={(e) => setNewUserForm((prev) => ({ ...prev, username: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                  <p className="text-xs text-gray-400 mt-1">Full username: limitless_{newUserForm.username}</p>
                </div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="bg-white/5 border-white/10"
                />
                <Input
                  placeholder="Host"
                  value={newUserForm.host}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, host: e.target.value }))}
                  className="bg-white/5 border-white/10"
                />
                <Button
                  onClick={createUser}
                  className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create User
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User List */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Database Users</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Username</th>
                      <th className="p-4 font-medium">Host</th>
                      <th className="p-4 font-medium">Privileges</th>
                      <th className="p-4 font-medium">Created</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="p-4 font-medium">{user.username}</td>
                        <td className="p-4 text-gray-400">{user.host}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {user.privileges.map((privilege, idx) => (
                              <Badge key={idx} className="bg-green-500/20 text-green-300 text-xs">
                                {privilege}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">{user.created}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Key className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteUser(user.id)}
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

      {/* Database Statistics */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Database Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{databases.length}</div>
              <div className="text-gray-400">Total Databases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{users.length}</div>
              <div className="text-gray-400">Database Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">225.4 MB</div>
              <div className="text-gray-400">Total Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">35</div>
              <div className="text-gray-400">Total Tables</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
