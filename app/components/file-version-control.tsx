"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { History, GitBranch, Upload, Download, Trash2, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface FileVersion {
  id: string
  version: string
  timestamp: string
  author: string
  changes: string
  status: "active" | "archived" | "pending"
  downloadLink: string
}

interface FileInfo {
  name: string
  currentVersion: string
  lastModified: string
  path: string
}

const mockFileVersions: FileVersion[] = [
  {
    id: "v1",
    version: "1.0.0",
    timestamp: "2024-01-01T10:00:00Z",
    author: "John Doe",
    changes: "Initial release of the homepage design.",
    status: "active",
    downloadLink: "/files/homepage-v1.zip",
  },
  {
    id: "v2",
    version: "1.0.1",
    timestamp: "2024-01-05T14:30:00Z",
    author: "Jane Smith",
    changes: "Fixed responsive issues on mobile devices.",
    status: "active",
    downloadLink: "/files/homepage-v2.zip",
  },
  {
    id: "v3",
    version: "1.1.0",
    timestamp: "2024-01-10T09:00:00Z",
    author: "Mike Johnson",
    changes: "Added new hero section with animation effects.",
    status: "active",
    downloadLink: "/files/homepage-v3.zip",
  },
  {
    id: "v4",
    version: "1.1.1",
    timestamp: "2024-01-12T11:20:00Z",
    author: "John Doe",
    changes: "Minor text updates and SEO improvements.",
    status: "active",
    downloadLink: "/files/homepage-v4.zip",
  },
]

const mockFileInfo: FileInfo = {
  name: "homepage.html",
  currentVersion: "1.1.1",
  lastModified: "2024-01-12T11:20:00Z",
  path: "/public_html/index.html",
}

export default function FileVersionControl() {
  const [versions, setVersions] = useState<FileVersion[]>(mockFileVersions)
  const [fileInfo, setFileInfo] = useState<FileInfo>(mockFileInfo)
  const [newVersionDetails, setNewVersionDetails] = useState({
    version: "",
    changes: "",
  })
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleNewVersionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewVersionDetails((prev) => ({ ...prev, [id]: value }))
  }

  const handleUploadNewVersion = async () => {
    if (!newVersionDetails.version || !newVersionDetails.changes) {
      toast({
        title: "Error",
        description: "Please provide a version number and describe changes.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    // Simulate API call for uploading a new version
    try {
      // In a real scenario, you'd send the actual file content along with metadata
      const response = await fetch("/api/files/upload-version", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: fileInfo.name,
          path: fileInfo.path,
          version: newVersionDetails.version,
          changes: newVersionDetails.changes,
          author: "Current User", // Replace with actual user
        }),
      })
      const data = await response.json()

      if (data.success) {
        const newVersion: FileVersion = {
          id: `v${Date.now()}`,
          version: newVersionDetails.version,
          timestamp: new Date().toISOString(),
          author: "Current User",
          changes: newVersionDetails.changes,
          status: "active",
          downloadLink: `/files/${fileInfo.name}-${newVersionDetails.version}.zip`,
        }
        setVersions((prev) => [newVersion, ...prev])
        setFileInfo((prev) => ({ ...prev, currentVersion: newVersion.version, lastModified: newVersion.timestamp }))
        setNewVersionDetails({ version: "", changes: "" })
        toast({
          title: "Success!",
          description: `Version ${newVersion.version} uploaded successfully.`,
        })
      } else {
        throw new Error(data.error || "Failed to upload new version.")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred during upload.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRevertVersion = async (versionId: string) => {
    const versionToRevert = versions.find((v) => v.id === versionId)
    if (!versionToRevert) return

    if (!confirm(`Are you sure you want to revert to version ${versionToRevert.version}? This cannot be undone.`)) {
      return
    }

    // Simulate API call for reverting
    try {
      const response = await fetch("/api/files/revert-version", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId: fileInfo.name, versionId }),
      })
      const data = await response.json()

      if (data.success) {
        setFileInfo((prev) => ({
          ...prev,
          currentVersion: versionToRevert.version,
          lastModified: new Date().toISOString(),
        }))
        toast({
          title: "Success!",
          description: `Successfully reverted to version ${versionToRevert.version}.`,
        })
      } else {
        throw new Error(data.error || "Failed to revert version.")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred during revert.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteVersion = async (versionId: string) => {
    if (!confirm("Are you sure you want to delete this version? This action cannot be undone.")) {
      return
    }

    // Simulate API call for deleting
    try {
      const response = await fetch("/api/files/delete-version", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId: fileInfo.name, versionId }),
      })
      const data = await response.json()

      if (data.success) {
        setVersions((prev) => prev.filter((v) => v.id !== versionId))
        toast({
          title: "Success!",
          description: "Version deleted successfully.",
        })
      } else {
        throw new Error(data.error || "Failed to delete version.")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred during deletion.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="custom-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <History className="w-5 h-5 text-primary" />
          <span>File Version Control</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg border border-border">
          <div>
            <p className="text-sm text-muted-foreground">File Name</p>
            <p className="font-medium text-foreground">{fileInfo.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Version</p>
            <p className="font-medium text-foreground">{fileInfo.currentVersion}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Modified</p>
            <p className="font-medium text-foreground">{new Date(fileInfo.lastModified).toLocaleString()}</p>
          </div>
        </div>

        {/* Upload New Version */}
        <div className="space-y-4 p-4 bg-muted/20 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Upload className="w-5 h-5 text-accent-blue" />
            <span>Upload New Version</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="version" className="block text-sm font-medium text-muted-foreground mb-2">
                Version Number (e.g., 1.2.0)
              </label>
              <Input
                id="version"
                placeholder="e.g., 1.2.0"
                value={newVersionDetails.version}
                onChange={handleNewVersionChange}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-muted-foreground mb-2">
                Select File
              </label>
              <Input id="file" type="file" className="input-field file:text-primary" />
            </div>
          </div>
          <div>
            <label htmlFor="changes" className="block text-sm font-medium text-muted-foreground mb-2">
              Changes Description
            </label>
            <Textarea
              id="changes"
              placeholder="Describe the changes in this version..."
              rows={3}
              value={newVersionDetails.changes}
              onChange={handleNewVersionChange}
              className="input-field"
            />
          </div>
          <Button onClick={handleUploadNewVersion} disabled={isUploading} className="btn-gradient">
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" /> Upload Version
              </>
            )}
          </Button>
        </div>

        {/* Version History */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-accent-green" />
            <span>Version History</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border/50">
                <tr className="text-left">
                  <th className="p-4 font-medium table-header">Version</th>
                  <th className="p-4 font-medium table-header">Date</th>
                  <th className="p-4 font-medium table-header">Author</th>
                  <th className="p-4 font-medium table-header">Changes</th>
                  <th className="p-4 font-medium table-header">Status</th>
                  <th className="p-4 font-medium table-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {versions.map((version, index) => (
                  <tr
                    key={version.id}
                    className={cn(
                      "table-row animate-fade-in-up",
                      version.id === fileInfo.currentVersion ? "bg-primary/5" : "",
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="p-4 font-medium text-foreground">{version.version}</td>
                    <td className="p-4 text-muted-foreground">{new Date(version.timestamp).toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground">{version.author}</td>
                    <td className="p-4 text-muted-foreground max-w-xs truncate">{version.changes}</td>
                    <td className="p-4">
                      <Badge
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          version.status === "active"
                            ? "bg-accent-green/20 text-accent-green"
                            : version.status === "pending"
                              ? "bg-accent-orange/20 text-accent-orange"
                              : "bg-muted/20 text-muted-foreground",
                        )}
                      >
                        {version.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" asChild className="btn-outline-primary bg-transparent">
                          <a href={version.downloadLink} download>
                            <Download className="w-4 h-4" />
                            <span className="sr-only">Download</span>
                          </a>
                        </Button>
                        {version.id !== fileInfo.currentVersion && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRevertVersion(version.id)}
                            className="btn-outline-primary"
                          >
                            <History className="w-4 h-4" />
                            <span className="sr-only">Revert</span>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteVersion(version.id)}
                          className="btn-outline-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
