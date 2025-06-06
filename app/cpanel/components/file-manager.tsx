"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Folder,
  Upload,
  Download,
  Trash2,
  Edit,
  Search,
  Plus,
  MoreHorizontal,
  ImageIcon,
  Code,
  Archive,
  GitBranch,
} from "lucide-react"
import FileVersionControl from "@/app/components/file-version-control"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  size?: string
  modified: string
  permissions: string
  extension?: string
}

const mockFiles: FileItem[] = [
  { id: "1", name: "public_html", type: "folder", modified: "2024-01-15 10:30", permissions: "755" },
  { id: "2", name: "logs", type: "folder", modified: "2024-01-14 15:45", permissions: "755" },
  { id: "3", name: "mail", type: "folder", modified: "2024-01-13 09:20", permissions: "750" },
  {
    id: "4",
    name: "index.html",
    type: "file",
    size: "2.4 KB",
    modified: "2024-01-15 14:22",
    permissions: "644",
    extension: "html",
  },
  {
    id: "5",
    name: "style.css",
    type: "file",
    size: "15.7 KB",
    modified: "2024-01-15 11:18",
    permissions: "644",
    extension: "css",
  },
  {
    id: "6",
    name: "script.js",
    type: "file",
    size: "8.3 KB",
    modified: "2024-01-14 16:45",
    permissions: "644",
    extension: "js",
  },
  {
    id: "7",
    name: "config.php",
    type: "file",
    size: "1.2 KB",
    modified: "2024-01-12 08:30",
    permissions: "600",
    extension: "php",
  },
  {
    id: "8",
    name: "backup.zip",
    type: "file",
    size: "125.8 MB",
    modified: "2024-01-10 22:15",
    permissions: "644",
    extension: "zip",
  },
  {
    id: "9",
    name: "logo.png",
    type: "file",
    size: "45.2 KB",
    modified: "2024-01-09 13:40",
    permissions: "644",
    extension: "png",
  },
]

export default function FileManager() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [currentPath, setCurrentPath] = useState("/home/limitless")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const [showVersionControl, setShowVersionControl] = useState(false)
  const [selectedFileForVersions, setSelectedFileForVersions] = useState<FileItem | null>(null)

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") return <Folder className="w-5 h-5 text-blue-400" />

    switch (file.extension) {
      case "html":
      case "htm":
        return <Code className="w-5 h-5 text-orange-400" />
      case "css":
        return <Code className="w-5 h-5 text-blue-400" />
      case "js":
        return <Code className="w-5 h-5 text-yellow-400" />
      case "php":
        return <Code className="w-5 h-5 text-purple-400" />
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return <ImageIcon className="w-5 h-5 text-green-400" />
      case "zip":
      case "rar":
      case "tar":
        return <Archive className="w-5 h-5 text-red-400" />
      default:
        return <FileText className="w-5 h-5 text-gray-400" />
    }
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const deleteSelectedFiles = () => {
    setFiles((prev) => prev.filter((file) => !selectedFiles.includes(file.id)))
    setSelectedFiles([])
  }

  return (
    <div className="space-y-6">
      {/* File Manager Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>File Manager</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-500/20 text-blue-300">{currentPath}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search files and folders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30">
                <Plus className="w-4 h-4 mr-2" />
                New Folder
              </Button>
              <Button size="sm" className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
              {selectedFiles.length > 0 && (
                <Button
                  size="sm"
                  onClick={deleteSelectedFiles}
                  className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete ({selectedFiles.length})
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left">
                  <th className="p-4 font-medium">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles(filteredFiles.map((f) => f.id))
                        } else {
                          setSelectedFiles([])
                        }
                      }}
                      className="rounded border-white/20 bg-white/5"
                    />
                  </th>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Size</th>
                  <th className="p-4 font-medium">Modified</th>
                  <th className="p-4 font-medium">Permissions</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file, index) => (
                  <motion.tr
                    key={file.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b border-white/5 hover:bg-white/5 ${
                      selectedFiles.includes(file.id) ? "bg-blue-500/10" : ""
                    }`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => toggleFileSelection(file.id)}
                        className="rounded border-white/20 bg-white/5"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file)}
                        <span className="font-medium">{file.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">{file.size || "-"}</td>
                    <td className="p-4 text-gray-400">{file.modified}</td>
                    <td className="p-4">
                      <Badge className="bg-gray-500/20 text-gray-300 font-mono text-xs">{file.permissions}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedFileForVersions(file)
                            setShowVersionControl(true)
                          }}
                          className="hover:bg-white/10"
                        >
                          <GitBranch className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <MoreHorizontal className="w-4 h-4" />
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

      {/* Storage Usage */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Used Space</span>
              <span className="font-medium">2.3 GB / 10 GB</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: "23%" }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">1.2 GB</div>
                <div className="text-gray-400">Documents</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">0.8 GB</div>
                <div className="text-gray-400">Images</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-400">0.2 GB</div>
                <div className="text-gray-400">Scripts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">0.1 GB</div>
                <div className="text-gray-400">Other</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Version Control Modal */}
      {showVersionControl && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold">File Version Control</h2>
              <Button
                onClick={() => setShowVersionControl(false)}
                variant="ghost"
                size="sm"
                className="hover:bg-white/10"
              >
                ✕
              </Button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <FileVersionControl />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
