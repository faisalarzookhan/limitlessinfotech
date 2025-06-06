"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Upload,
  Calendar,
  Clock,
  HardDrive,
  RefreshCw,
  Settings,
  Trash2,
  CheckCircle,
  XCircle,
  Play,
  Pause,
} from "lucide-react"

interface Backup {
  id: string
  name: string
  type: "full" | "incremental" | "database" | "files"
  size: string
  created: string
  status: "completed" | "running" | "failed" | "scheduled"
  location: "local" | "cloud" | "remote"
}

interface BackupSchedule {
  id: string
  name: string
  frequency: "daily" | "weekly" | "monthly"
  time: string
  type: "full" | "incremental"
  enabled: boolean
  lastRun: string
  nextRun: string
}

const mockBackups: Backup[] = [
  {
    id: "1",
    name: "Full Site Backup - 2024-01-15",
    type: "full",
    size: "2.3 GB",
    created: "2024-01-15 02:00:00",
    status: "completed",
    location: "cloud",
  },
  {
    id: "2",
    name: "Database Backup - 2024-01-15",
    type: "database",
    size: "245 MB",
    created: "2024-01-15 01:30:00",
    status: "completed",
    location: "local",
  },
  {
    id: "3",
    name: "Files Backup - 2024-01-14",
    type: "files",
    size: "1.8 GB",
    created: "2024-01-14 23:00:00",
    status: "completed",
    location: "remote",
  },
  {
    id: "4",
    name: "Incremental Backup - 2024-01-14",
    type: "incremental",
    size: "156 MB",
    created: "2024-01-14 12:00:00",
    status: "running",
    location: "cloud",
  },
]

const mockSchedules: BackupSchedule[] = [
  {
    id: "1",
    name: "Daily Database Backup",
    frequency: "daily",
    time: "02:00",
    type: "incremental",
    enabled: true,
    lastRun: "2024-01-15 02:00",
    nextRun: "2024-01-16 02:00",
  },
  {
    id: "2",
    name: "Weekly Full Backup",
    frequency: "weekly",
    time: "01:00",
    type: "full",
    enabled: true,
    lastRun: "2024-01-15 01:00",
    nextRun: "2024-01-22 01:00",
  },
  {
    id: "3",
    name: "Monthly Archive",
    frequency: "monthly",
    time: "00:00",
    type: "full",
    enabled: false,
    lastRun: "2024-01-01 00:00",
    nextRun: "2024-02-01 00:00",
  },
]

export default function BackupManager() {
  const [backups, setBackups] = useState<Backup[]>(mockBackups)
  const [schedules, setSchedules] = useState<BackupSchedule[]>(mockSchedules)
  const [activeTab, setActiveTab] = useState<"backups" | "schedules" | "restore">("backups")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "scheduled":
        return <Clock className="w-4 h-4 text-yellow-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300"
      case "running":
        return "bg-blue-500/20 text-blue-300"
      case "failed":
        return "bg-red-500/20 text-red-300"
      case "scheduled":
        return "bg-yellow-500/20 text-yellow-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full":
        return "bg-purple-500/20 text-purple-300"
      case "incremental":
        return "bg-blue-500/20 text-blue-300"
      case "database":
        return "bg-green-500/20 text-green-300"
      case "files":
        return "bg-orange-500/20 text-orange-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getLocationIcon = (location: string) => {
    switch (location) {
      case "cloud":
        return "☁️"
      case "remote":
        return "🌐"
      case "local":
        return "💾"
      default:
        return "📁"
    }
  }

  const createBackup = (type: "full" | "incremental" | "database" | "files") => {
    const newBackup: Backup = {
      id: Date.now().toString(),
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Backup - ${new Date().toISOString().split("T")[0]}`,
      type,
      size: "0 MB",
      created: new Date().toISOString(),
      status: "running",
      location: "cloud",
    }
    setBackups([newBackup, ...backups])

    // Simulate backup completion after 3 seconds
    setTimeout(() => {
      setBackups((prev) =>
        prev.map((backup) =>
          backup.id === newBackup.id
            ? { ...backup, status: "completed", size: `${Math.floor(Math.random() * 1000) + 100} MB` }
            : backup,
        ),
      )
    }, 3000)
  }

  const deleteBackup = (id: string) => {
    setBackups(backups.filter((backup) => backup.id !== id))
  }

  const toggleSchedule = (id: string) => {
    setSchedules(
      schedules.map((schedule) => (schedule.id === id ? { ...schedule, enabled: !schedule.enabled } : schedule)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Backup Manager Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Backup Manager</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              onClick={() => setActiveTab("backups")}
              className={`${
                activeTab === "backups" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <Download className="w-4 h-4 mr-2" />
              Backups
            </Button>
            <Button
              onClick={() => setActiveTab("schedules")}
              className={`${
                activeTab === "schedules" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedules
            </Button>
            <Button
              onClick={() => setActiveTab("restore")}
              className={`${
                activeTab === "restore" ? "bg-blue-500/20 border-blue-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <Upload className="w-4 h-4 mr-2" />
              Restore
            </Button>
          </div>
        </CardContent>
      </Card>

      {activeTab === "backups" && (
        <>
          {/* Create Backup */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Create New Backup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={() => createBackup("full")}
                  className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30"
                >
                  <HardDrive className="w-4 h-4 mr-2" />
                  Full Backup
                </Button>
                <Button
                  onClick={() => createBackup("incremental")}
                  className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Incremental
                </Button>
                <Button
                  onClick={() => createBackup("database")}
                  className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Database Only
                </Button>
                <Button
                  onClick={() => createBackup("files")}
                  className="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Files Only
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Backup List */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Backup History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Backup Name</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Size</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Location</th>
                      <th className="p-4 font-medium">Created</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backups.map((backup, index) => (
                      <motion.tr
                        key={backup.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="p-4 font-medium">{backup.name}</td>
                        <td className="p-4">
                          <Badge className={getTypeColor(backup.type)}>{backup.type}</Badge>
                        </td>
                        <td className="p-4 text-gray-400">{backup.size}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(backup.status)}
                            <Badge className={getStatusColor(backup.status)}>{backup.status}</Badge>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <span>{getLocationIcon(backup.location)}</span>
                            <span className="text-gray-400 capitalize">{backup.location}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">{new Date(backup.created).toLocaleString()}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Upload className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteBackup(backup.id)}
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

      {activeTab === "schedules" && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Backup Schedules</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left">
                    <th className="p-4 font-medium">Schedule Name</th>
                    <th className="p-4 font-medium">Frequency</th>
                    <th className="p-4 font-medium">Time</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Last Run</th>
                    <th className="p-4 font-medium">Next Run</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule, index) => (
                    <motion.tr
                      key={schedule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4 font-medium">{schedule.name}</td>
                      <td className="p-4">
                        <Badge className="bg-blue-500/20 text-blue-300 capitalize">{schedule.frequency}</Badge>
                      </td>
                      <td className="p-4 text-gray-400">{schedule.time}</td>
                      <td className="p-4">
                        <Badge className={getTypeColor(schedule.type)}>{schedule.type}</Badge>
                      </td>
                      <td className="p-4 text-gray-400">{schedule.lastRun}</td>
                      <td className="p-4 text-gray-400">{schedule.nextRun}</td>
                      <td className="p-4">
                        <Badge
                          className={
                            schedule.enabled ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"
                          }
                        >
                          {schedule.enabled ? "Active" : "Disabled"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleSchedule(schedule.id)}
                            className="hover:bg-white/10"
                          >
                            {schedule.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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

      {activeTab === "restore" && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Restore from Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center p-8">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">Select Backup to Restore</h3>
                <p className="text-gray-400 mb-6">
                  Choose a backup from the list above or upload a backup file to restore your data.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Backup File
                  </Button>
                  <Button className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Restore from Cloud
                  </Button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h4 className="text-lg font-medium mb-4">Restore Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Restore Type</label>
                    <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white">
                      <option value="full" className="bg-slate-800">
                        Full Restore
                      </option>
                      <option value="selective" className="bg-slate-800">
                        Selective Restore
                      </option>
                      <option value="database" className="bg-slate-800">
                        Database Only
                      </option>
                      <option value="files" className="bg-slate-800">
                        Files Only
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Restore Location</label>
                    <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white">
                      <option value="current" className="bg-slate-800">
                        Current Location
                      </option>
                      <option value="staging" className="bg-slate-800">
                        Staging Environment
                      </option>
                      <option value="custom" className="bg-slate-800">
                        Custom Path
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Backup Statistics */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Backup Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{backups.length}</div>
              <div className="text-gray-400">Total Backups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {backups.filter((b) => b.status === "completed").length}
              </div>
              <div className="text-gray-400">Successful</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">4.8 GB</div>
              <div className="text-gray-400">Total Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{schedules.filter((s) => s.enabled).length}</div>
              <div className="text-gray-400">Active Schedules</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
