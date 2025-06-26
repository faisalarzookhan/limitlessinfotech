"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useCurrency } from "@/components/currency-provider"
import {
  Download,
  Upload,
  History,
  HardDrive,
  Cloud,
  Settings,
  AlertTriangle,
  CheckCircle,
  Plus,
  Trash,
  RefreshCw,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Backup {
  id: string
  name: string
  type: "full" | "database" | "files"
  size: string
  date: string
  status: "completed" | "in-progress" | "failed"
  location: "local" | "cloud"
}

const mockBackups: Backup[] = [
  {
    id: "bkp1",
    name: "Full Website Backup - Jan 2024",
    type: "full",
    size: "2.5 GB",
    date: "2024-01-20 03:00 AM",
    status: "completed",
    location: "cloud",
  },
  {
    id: "bkp2",
    name: "Database Backup - Feb 2024",
    type: "database",
    size: "500 MB",
    date: "2024-02-15 04:00 AM",
    status: "completed",
    location: "local",
  },
  {
    id: "bkp3",
    name: "Files Backup - Mar 2024",
    type: "files",
    size: "1.2 GB",
    date: "2024-03-10 05:00 AM",
    status: "in-progress",
    location: "cloud",
  },
  {
    id: "bkp4",
    name: "Full Website Backup - Apr 2024",
    type: "full",
    size: "2.6 GB",
    date: "2024-04-05 03:00 AM",
    status: "failed",
    location: "local",
  },
]

export default function BackupManager() {
  const [backups, setBackups] = useState<Backup[]>(mockBackups)
  const [newBackupName, setNewBackupName] = useState("")
  const [newBackupType, setNewBackupType] = useState<"full" | "database" | "files">("full")
  const [backupProgress, setBackupProgress] = useState(0)
  const { toast } = useToast()
  const { convertCurrency, targetCurrency, formatCurrency } = useCurrency()

  const handleCreateBackup = () => {
    if (!newBackupName.trim()) {
      toast({
        title: "Error",
        description: "Backup name cannot be empty.",
        variant: "destructive",
      })
      return
    }

    const newBackup: Backup = {
      id: `bkp${Date.now()}`,
      name: newBackupName,
      type: newBackupType,
      size: "Calculating...",
      date: new Date().toLocaleString(),
      status: "in-progress",
      location: "cloud", // Default to cloud for new backups
    }

    setBackups((prev) => [newBackup, ...prev])
    setNewBackupName("")
    setBackupProgress(0)

    toast({
      title: "Backup Initiated",
      description: `"${newBackupName}" backup is now in progress.`,
    })

    // Simulate progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setBackupProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setBackups((prev) =>
          prev.map((b) =>
            b.id === newBackup.id
              ? {
                  ...b,
                  status: "completed",
                  size: `${(Math.random() * 3 + 0.5).toFixed(1)} GB`,
                }
              : b,
          ),
        )
        toast({
          title: "Backup Completed",
          description: `"${newBackupName}" backup finished successfully.`,
          variant: "success",
        })
      }
    }, 300)
  }

  const handleDeleteBackup = (id: string) => {
    setBackups((prev) => prev.filter((b) => b.id !== id))
    toast({
      title: "Backup Deleted",
      description: "The backup has been removed.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-accent-green/20 text-accent-green"
      case "in-progress":
        return "bg-primary/20 text-primary"
      case "failed":
        return "bg-destructive/20 text-destructive"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-accent-green" />
      case "in-progress":
        return <RefreshCw className="w-4 h-4 text-primary animate-spin" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      default:
        return null
    }
  }

  const premiumServiceUSD = 29.99
  const premiumServiceConverted = convertCurrency(premiumServiceUSD, "USD", targetCurrency)

  return (
    <div className="space-y-6">
      {/* Backup Overview */}
      <Card className="custom-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Download className="w-5 h-5 text-primary" />
            <span>Backup Manager</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground">{backups.length}</h3>
              <p className="text-muted-foreground text-sm">Total Backups</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-accent-green">
                {backups.filter((b) => b.status === "completed").length}
              </h3>
              <p className="text-muted-foreground text-sm">Completed</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary">
                {backups.filter((b) => b.status === "in-progress").length}
              </h3>
              <p className="text-muted-foreground text-sm">In Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create New Backup */}
      <Card className="custom-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Plus className="w-5 h-5 text-primary" />
            <span>Create New Backup</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label htmlFor="backup-name" className="block text-sm font-medium text-muted-foreground mb-2">
                Backup Name
              </label>
              <Input
                id="backup-name"
                placeholder="e.g., Monthly Full Backup"
                value={newBackupName}
                onChange={(e) => setNewBackupName(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="backup-type" className="block text-sm font-medium text-muted-foreground mb-2">
                Backup Type
              </label>
              <select
                id="backup-type"
                value={newBackupType}
                onChange={(e) => setNewBackupType(e.target.value as "full" | "database" | "files")}
                className="input-field appearance-none"
              >
                <option value="full">Full Website</option>
                <option value="database">Database Only</option>
                <option value="files">Files Only</option>
              </select>
            </div>
            <Button onClick={handleCreateBackup} className="btn-gradient">
              <Upload className="w-4 h-4 mr-2" />
              Start Backup
            </Button>
          </div>
          {backupProgress > 0 && backupProgress < 100 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Backup Progress: {backupProgress}%</p>
              <Progress value={backupProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Premium Backup Service */}
      <Card className="custom-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-accent-green" />
            <span>Premium Backup Service</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Upgrade to our premium backup service for automated daily backups, unlimited storage, and faster recovery
            times.
          </p>
          <div className="flex items-center justify-between bg-muted/20 border border-border rounded-md p-4 mb-4">
            <div className="flex items-center space-x-3">
              <Cloud className="w-6 h-6 text-accent-cyan" />
              <div>
                <p className="text-lg font-semibold text-foreground">Monthly Cost</p>
                <p className="text-sm text-muted-foreground">Billed Annually</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(premiumServiceConverted, targetCurrency)}
              </p>
              <p className="text-sm text-muted-foreground">(USD {premiumServiceUSD.toFixed(2)})</p>
            </div>
          </div>
          <Button className="btn-gradient w-full">Activate Premium Backup</Button>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card className="custom-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <History className="w-5 h-5 text-primary" />
            <span>Backup History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {backups.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No backups found. Create one to get started!</p>
          ) : (
            <div className="space-y-4">
              {backups.map((backup) => (
                <motion.div
                  key={backup.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border"
                >
                  <div className="flex items-center space-x-4">
                    {backup.location === "cloud" ? (
                      <Cloud className="w-6 h-6 text-accent-cyan" />
                    ) : (
                      <HardDrive className="w-6 h-6 text-accent-purple" />
                    )}
                    <div>
                      <h3 className="font-medium text-foreground">{backup.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {backup.type.charAt(0).toUpperCase() + backup.type.slice(1)} Backup • {backup.size}
                      </p>
                      <p className="text-xs text-muted-foreground">{backup.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(backup.status))}>
                      {getStatusIcon(backup.status)}
                      <span className="ml-1">{backup.status}</span>
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteBackup(backup.id)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      aria-label={`Delete ${backup.name}`}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Backup Settings (Placeholder) */}
      <Card className="custom-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Settings className="w-5 h-5 text-primary" />
            <span>Backup Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Configure your automated backup schedules and retention policies here.
          </p>
          <Button variant="outline" className="btn-outline-primary mt-4">
            Go to Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
