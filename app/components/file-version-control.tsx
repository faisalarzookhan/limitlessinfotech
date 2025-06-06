"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  FileText,
  GitBranch,
  Clock,
  User,
  Download,
  Upload,
  Eye,
  RotateCcw,
  GitCommit,
  GitMerge,
  History,
  ContrastIcon as Compare,
  Tag,
  AlertCircle,
  CheckCircle,
  Search,
} from "lucide-react"

interface FileVersion {
  id: string
  version: string
  fileName: string
  fileSize: string
  uploadedBy: string
  uploadedAt: string
  description: string
  changes: string[]
  status: "current" | "previous" | "archived"
  downloadUrl: string
  commitHash: string
  branch: string
  tags: string[]
}

interface FileHistory {
  id: string
  fileName: string
  currentVersion: string
  totalVersions: number
  lastModified: string
  lastModifiedBy: string
  fileType: string
  fileSize: string
  versions: FileVersion[]
  branches: string[]
  collaborators: string[]
}

const mockFileHistory: FileHistory[] = [
  {
    id: "file1",
    fileName: "design-mockups.fig",
    currentVersion: "v3.2",
    totalVersions: 8,
    lastModified: "2024-01-16 14:30",
    lastModifiedBy: "Sarah Smith",
    fileType: "Figma Design",
    fileSize: "15.7 MB",
    branches: ["main", "feature/mobile-design", "hotfix/color-scheme"],
    collaborators: ["EMP001", "EMP002", "EMP003"],
    versions: [
      {
        id: "v3.2",
        version: "v3.2",
        fileName: "design-mockups.fig",
        fileSize: "15.7 MB",
        uploadedBy: "Sarah Smith",
        uploadedAt: "2024-01-16 14:30",
        description: "Updated mobile responsiveness and added dark mode support",
        changes: ["Added dark mode toggle", "Improved mobile layout", "Updated color palette"],
        status: "current",
        downloadUrl: "/files/design-mockups-v3.2.fig",
        commitHash: "a1b2c3d4",
        branch: "main",
        tags: ["stable", "mobile-ready"],
      },
      {
        id: "v3.1",
        version: "v3.1",
        fileName: "design-mockups.fig",
        fileSize: "14.2 MB",
        uploadedBy: "Sarah Smith",
        uploadedAt: "2024-01-15 11:20",
        description: "Client feedback implementation",
        changes: ["Updated header design", "Changed button styles", "Added new icons"],
        status: "previous",
        downloadUrl: "/files/design-mockups-v3.1.fig",
        commitHash: "e5f6g7h8",
        branch: "main",
        tags: ["client-approved"],
      },
      {
        id: "v3.0",
        version: "v3.0",
        fileName: "design-mockups.fig",
        fileSize: "13.8 MB",
        uploadedBy: "Sarah Smith",
        uploadedAt: "2024-01-14 16:45",
        description: "Major design overhaul",
        changes: ["Complete UI redesign", "New component library", "Updated typography"],
        status: "previous",
        downloadUrl: "/files/design-mockups-v3.0.fig",
        commitHash: "i9j0k1l2",
        branch: "main",
        tags: ["major-release"],
      },
    ],
  },
  {
    id: "file2",
    fileName: "project-requirements.pdf",
    currentVersion: "v2.1",
    totalVersions: 5,
    lastModified: "2024-01-15 09:15",
    lastModifiedBy: "Mike Johnson",
    fileType: "PDF Document",
    fileSize: "2.4 MB",
    branches: ["main", "feature/additional-requirements"],
    collaborators: ["EMP003", "CLIENT001"],
    versions: [
      {
        id: "v2.1",
        version: "v2.1",
        fileName: "project-requirements.pdf",
        fileSize: "2.4 MB",
        uploadedBy: "Mike Johnson",
        uploadedAt: "2024-01-15 09:15",
        description: "Added security requirements and compliance standards",
        changes: ["Added GDPR compliance section", "Updated security protocols", "Added API rate limiting"],
        status: "current",
        downloadUrl: "/files/project-requirements-v2.1.pdf",
        commitHash: "m3n4o5p6",
        branch: "main",
        tags: ["security-update"],
      },
      {
        id: "v2.0",
        version: "v2.0",
        fileName: "project-requirements.pdf",
        fileSize: "2.1 MB",
        uploadedBy: "Mike Johnson",
        uploadedAt: "2024-01-12 14:30",
        description: "Client feedback integration",
        changes: ["Updated feature specifications", "Added new user stories", "Revised timeline"],
        status: "previous",
        downloadUrl: "/files/project-requirements-v2.0.pdf",
        commitHash: "q7r8s9t0",
        branch: "main",
        tags: ["client-reviewed"],
      },
    ],
  },
]

export default function FileVersionControl() {
  const [selectedFile, setSelectedFile] = useState<FileHistory | null>(mockFileHistory[0])
  const [selectedVersion, setSelectedVersion] = useState<FileVersion | null>(null)
  const [compareVersions, setCompareVersions] = useState<string[]>([])
  const [newVersionForm, setNewVersionForm] = useState({
    description: "",
    changes: "",
    branch: "main",
    tags: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBranch, setFilterBranch] = useState("all")
  const { toast } = useToast()

  const uploadNewVersion = () => {
    if (!newVersionForm.description.trim() || !selectedFile) {
      toast({
        title: "Error",
        description: "Please provide a description for the new version",
        variant: "destructive",
      })
      return
    }

    const newVersion: FileVersion = {
      id: `v${Number.parseFloat(selectedFile.currentVersion.slice(1)) + 0.1}`,
      version: `v${Number.parseFloat(selectedFile.currentVersion.slice(1)) + 0.1}`,
      fileName: selectedFile.fileName,
      fileSize: selectedFile.fileSize,
      uploadedBy: "Current User",
      uploadedAt: new Date().toISOString(),
      description: newVersionForm.description,
      changes: newVersionForm.changes
        .split(",")
        .map((change) => change.trim())
        .filter(Boolean),
      status: "current",
      downloadUrl: `/files/${selectedFile.fileName}-${`v${Number.parseFloat(selectedFile.currentVersion.slice(1)) + 0.1}`}`,
      commitHash: Math.random().toString(36).substr(2, 8),
      branch: newVersionForm.branch,
      tags: newVersionForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    // Update file history
    const updatedFile = {
      ...selectedFile,
      currentVersion: newVersion.version,
      totalVersions: selectedFile.totalVersions + 1,
      lastModified: newVersion.uploadedAt,
      lastModifiedBy: newVersion.uploadedBy,
      versions: [newVersion, ...selectedFile.versions.map((v) => ({ ...v, status: "previous" as const }))],
    }

    setSelectedFile(updatedFile)
    setNewVersionForm({
      description: "",
      changes: "",
      branch: "main",
      tags: "",
    })

    toast({
      title: "Version Uploaded",
      description: `New version ${newVersion.version} has been created successfully`,
    })
  }

  const rollbackToVersion = (version: FileVersion) => {
    if (!selectedFile) return

    const rollbackVersion: FileVersion = {
      ...version,
      id: `v${Number.parseFloat(selectedFile.currentVersion.slice(1)) + 0.1}`,
      version: `v${Number.parseFloat(selectedFile.currentVersion.slice(1)) + 0.1}`,
      uploadedBy: "Current User",
      uploadedAt: new Date().toISOString(),
      description: `Rollback to ${version.version}: ${version.description}`,
      status: "current",
      commitHash: Math.random().toString(36).substr(2, 8),
    }

    const updatedFile = {
      ...selectedFile,
      currentVersion: rollbackVersion.version,
      totalVersions: selectedFile.totalVersions + 1,
      lastModified: rollbackVersion.uploadedAt,
      lastModifiedBy: rollbackVersion.uploadedBy,
      versions: [rollbackVersion, ...selectedFile.versions.map((v) => ({ ...v, status: "previous" as const }))],
    }

    setSelectedFile(updatedFile)

    toast({
      title: "Rollback Successful",
      description: `Rolled back to version ${version.version}`,
    })
  }

  const toggleCompareVersion = (versionId: string) => {
    if (compareVersions.includes(versionId)) {
      setCompareVersions(compareVersions.filter((id) => id !== versionId))
    } else if (compareVersions.length < 2) {
      setCompareVersions([...compareVersions, versionId])
    } else {
      toast({
        title: "Comparison Limit",
        description: "You can only compare up to 2 versions at a time",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "previous":
        return <History className="w-4 h-4 text-blue-400" />
      case "archived":
        return <AlertCircle className="w-4 h-4 text-gray-400" />
      default:
        return <FileText className="w-4 h-4 text-gray-400" />
    }
  }

  const filteredVersions =
    selectedFile?.versions.filter((version) => {
      const matchesSearch =
        version.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        version.version.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesBranch = filterBranch === "all" || version.branch === filterBranch
      return matchesSearch && matchesBranch
    }) || []

  return (
    <div className="space-y-6">
      {/* File Version Control Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <GitBranch className="w-5 h-5" />
              <span>File Version Control</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button size="sm" className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Version
              </Button>
              <Button size="sm" variant="ghost" className="hover:bg-white/10">
                <GitMerge className="w-4 h-4 mr-2" />
                Merge Branch
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{mockFileHistory.length}</div>
              <div className="text-sm text-gray-400">Tracked Files</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {mockFileHistory.reduce((total, file) => total + file.totalVersions, 0)}
              </div>
              <div className="text-sm text-gray-400">Total Versions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {mockFileHistory.reduce((total, file) => total + file.branches.length, 0)}
              </div>
              <div className="text-sm text-gray-400">Active Branches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {mockFileHistory.reduce((total, file) => total + file.collaborators.length, 0)}
              </div>
              <div className="text-sm text-gray-400">Collaborators</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* File List */}
        <div className="lg:col-span-4">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Tracked Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockFileHistory.map((file) => (
                <motion.div
                  key={file.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFile(file)}
                  className={`p-4 rounded-lg cursor-pointer border transition-all ${
                    selectedFile?.id === file.id
                      ? "bg-blue-500/20 border-blue-500/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-blue-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-medium">{file.fileName}</h3>
                      <p className="text-sm text-gray-400 mt-1">{file.fileType}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge className="bg-green-500/20 text-green-300">{file.currentVersion}</Badge>
                        <span className="text-xs text-gray-500">{file.totalVersions} versions</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{file.fileSize}</span>
                        <span>by {file.lastModifiedBy}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Version History */}
        <div className="lg:col-span-8">
          {selectedFile && (
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedFile.fileName}</CardTitle>
                    <p className="text-gray-400 mt-1">Version History & Control</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search versions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 w-64"
                      />
                    </div>
                    <select
                      value={filterBranch}
                      onChange={(e) => setFilterBranch(e.target.value)}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white text-sm"
                    >
                      <option value="all" className="bg-slate-800">
                        All Branches
                      </option>
                      {selectedFile.branches.map((branch) => (
                        <option key={branch} value={branch} className="bg-slate-800">
                          {branch}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Upload New Version Form */}
                <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium mb-3">Upload New Version</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Version description"
                      value={newVersionForm.description}
                      onChange={(e) => setNewVersionForm((prev) => ({ ...prev, description: e.target.value }))}
                      className="bg-white/5 border-white/10"
                    />
                    <select
                      value={newVersionForm.branch}
                      onChange={(e) => setNewVersionForm((prev) => ({ ...prev, branch: e.target.value }))}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white"
                    >
                      {selectedFile.branches.map((branch) => (
                        <option key={branch} value={branch} className="bg-slate-800">
                          {branch}
                        </option>
                      ))}
                    </select>
                    <Textarea
                      placeholder="Changes made (comma separated)"
                      value={newVersionForm.changes}
                      onChange={(e) => setNewVersionForm((prev) => ({ ...prev, changes: e.target.value }))}
                      className="bg-white/5 border-white/10"
                      rows={2}
                    />
                    <Input
                      placeholder="Tags (comma separated)"
                      value={newVersionForm.tags}
                      onChange={(e) => setNewVersionForm((prev) => ({ ...prev, tags: e.target.value }))}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <Button
                    onClick={uploadNewVersion}
                    className="mt-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Create New Version
                  </Button>
                </div>

                {/* Version Comparison */}
                {compareVersions.length > 0 && (
                  <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">
                        Comparing {compareVersions.length} version{compareVersions.length > 1 ? "s" : ""}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-blue-500/20 hover:bg-blue-500/30">
                          <Compare className="w-4 h-4 mr-2" />
                          View Diff
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setCompareVersions([])}
                          className="hover:bg-white/10"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {compareVersions.map((versionId) => {
                        const version = selectedFile.versions.find((v) => v.id === versionId)
                        return version ? (
                          <Badge key={versionId} className="bg-blue-500/20 text-blue-300">
                            {version.version}
                          </Badge>
                        ) : null
                      })}
                    </div>
                  </div>
                )}

                {/* Version List */}
                <div className="space-y-4">
                  {filteredVersions.map((version, index) => (
                    <motion.div
                      key={version.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border transition-all ${
                        compareVersions.includes(version.id)
                          ? "bg-blue-500/10 border-blue-500/30"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={compareVersions.includes(version.id)}
                              onChange={() => toggleCompareVersion(version.id)}
                              className="rounded border-white/20 bg-white/5"
                            />
                            {getStatusIcon(version.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-medium">{version.version}</h3>
                              <Badge className="bg-gray-500/20 text-gray-300 font-mono text-xs">
                                {version.commitHash}
                              </Badge>
                              <Badge className="bg-purple-500/20 text-purple-300">{version.branch}</Badge>
                              {version.tags.map((tag) => (
                                <Badge key={tag} className="bg-orange-500/20 text-orange-300">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-sm text-gray-300 mb-2">{version.description}</p>
                            {version.changes.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs text-gray-400 mb-1">Changes:</p>
                                <ul className="text-xs text-gray-300 space-y-1">
                                  {version.changes.map((change, i) => (
                                    <li key={i} className="flex items-center space-x-2">
                                      <GitCommit className="w-3 h-3 text-green-400" />
                                      <span>{change}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <User className="w-3 h-3" />
                                <span>{version.uploadedBy}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{new Date(version.uploadedAt).toLocaleString()}</span>
                              </span>
                              <span>{version.fileSize}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="hover:bg-white/10">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-white/10">
                            <Download className="w-4 h-4" />
                          </Button>
                          {version.status !== "current" && (
                            <Button
                              size="sm"
                              onClick={() => rollbackToVersion(version)}
                              className="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30"
                            >
                              <RotateCcw className="w-4 h-4 mr-1" />
                              Rollback
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
