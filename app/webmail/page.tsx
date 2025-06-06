"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Mail,
  Send,
  Inbox,
  Star,
  Archive,
  Trash2,
  Search,
  Plus,
  Paperclip,
  Reply,
  Forward,
  MoreHorizontal,
  ArrowLeft,
  Shield,
  Lock,
  Loader2,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Email {
  id: string
  from: string
  to: string
  subject: string
  content: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  isImportant: boolean
}

interface ComposeForm {
  to: string
  subject: string
  content: string
}

export default function WebMailPage() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [isComposing, setIsComposing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [emails, setEmails] = useState<Email[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [composeForm, setComposeForm] = useState<ComposeForm>({
    to: "",
    subject: "",
    content: "",
  })
  const { toast } = useToast()

  // Fetch emails on component mount
  useEffect(() => {
    fetchEmails()
  }, [])

  const fetchEmails = async () => {
    try {
      const response = await fetch("/api/receive-emails")
      const data = await response.json()
      if (data.success) {
        setEmails(data.emails)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch emails",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const markAsRead = async (emailId: string) => {
    try {
      const response = await fetch("/api/receive-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAsRead", emailId }),
      })
      const data = await response.json()
      if (data.success) {
        setEmails(data.emails)
      }
    } catch (error) {
      console.error("Failed to mark email as read:", error)
    }
  }

  const toggleStar = async (emailId: string) => {
    try {
      const response = await fetch("/api/receive-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggleStar", emailId }),
      })
      const data = await response.json()
      if (data.success) {
        setEmails(data.emails)
      }
    } catch (error) {
      console.error("Failed to toggle star:", error)
    }
  }

  const sendEmail = async () => {
    if (!composeForm.to || !composeForm.subject || !composeForm.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setSending(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: composeForm.to,
          subject: composeForm.subject,
          content: composeForm.content,
          from: "webmail@limitless.com",
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success!",
          description: "Email sent successfully",
        })

        // Add to sent emails (mock)
        await fetch("/api/receive-emails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "addEmail",
            data: {
              from: "webmail@limitless.com",
              to: composeForm.to,
              subject: `Re: ${composeForm.subject}`,
              content: composeForm.content,
            },
          }),
        })

        setComposeForm({ to: "", subject: "", content: "" })
        setIsComposing(false)
        fetchEmails() // Refresh emails
      } else {
        throw new Error(data.error || "Failed to send email")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send email",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)} minutes ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading WebMail...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-blue-300 hover:text-blue-200">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Image src="/images/logo.png" alt="Limitless" width={32} height={32} />
              <h1 className="text-2xl font-bold">Limitless WebMail</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <Shield className="w-3 h-3 mr-1" />
              Secure
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Lock className="w-3 h-3 mr-1" />
              Encrypted
            </Badge>
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
              <CheckCircle className="w-3 h-3 mr-1" />
              Live Email
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
              <CardHeader>
                <Button
                  onClick={() => setIsComposing(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Compose
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start text-blue-300 bg-blue-500/10">
                    <Inbox className="w-4 h-4 mr-3" />
                    Inbox
                    <Badge className="ml-auto bg-blue-500/20 text-blue-300">
                      {emails.filter((e) => !e.isRead).length}
                    </Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/5">
                    <Star className="w-4 h-4 mr-3" />
                    Starred
                    <Badge className="ml-auto bg-yellow-500/20 text-yellow-300">
                      {emails.filter((e) => e.isStarred).length}
                    </Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/5">
                    <Send className="w-4 h-4 mr-3" />
                    Sent
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/5">
                    <Archive className="w-4 h-4 mr-3" />
                    Archive
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/5">
                    <Trash2 className="w-4 h-4 mr-3" />
                    Trash
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email List */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-4">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
              <CardHeader>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search emails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 focus:border-blue-500/50"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                  {filteredEmails.map((email) => (
                    <motion.div
                      key={email.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedEmail(email)
                        markAsRead(email.id)
                      }}
                      className={`p-4 cursor-pointer border-b border-white/5 hover:bg-white/5 transition-colors relative ${
                        selectedEmail?.id === email.id ? "bg-blue-500/10 border-blue-500/20" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${!email.isRead ? "text-white" : "text-gray-300"}`}>
                            {email.from}
                          </span>
                          {email.isImportant && <Badge className="bg-red-500/20 text-red-300 text-xs">Important</Badge>}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleStar(email.id)
                            }}
                            className={`${email.isStarred ? "text-yellow-400" : "text-gray-400"} hover:text-yellow-300`}
                          >
                            <Star className="w-4 h-4" fill={email.isStarred ? "currentColor" : "none"} />
                          </button>
                          <span className="text-xs text-gray-400">{formatTimestamp(email.timestamp)}</span>
                        </div>
                      </div>
                      <h3 className={`font-medium mb-1 ${!email.isRead ? "text-white" : "text-gray-300"}`}>
                        {email.subject}
                      </h3>
                      <p className="text-sm text-gray-400 truncate">{email.content.substring(0, 100)}...</p>
                      {!email.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full absolute left-2 top-1/2 transform -translate-y-1/2" />
                      )}
                    </motion.div>
                  ))}
                  {filteredEmails.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                      <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No emails found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email Content */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
              {selectedEmail ? (
                <>
                  <CardHeader className="border-b border-white/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">{selectedEmail.subject}</h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <span>From: {selectedEmail.from}</span>
                          <span>To: {selectedEmail.to}</span>
                          <span>{formatTimestamp(selectedEmail.timestamp)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-white/10"
                          onClick={() => {
                            setComposeForm({
                              to: selectedEmail.from,
                              subject: `Re: ${selectedEmail.subject}`,
                              content: `\n\n--- Original Message ---\nFrom: ${selectedEmail.from}\nSubject: ${selectedEmail.subject}\n\n${selectedEmail.content}`,
                            })
                            setIsComposing(true)
                          }}
                        >
                          <Reply className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <Forward className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="prose prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-gray-200 leading-relaxed">
                        {selectedEmail.content}
                      </pre>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-300 mb-2">Select an email</h3>
                    <p className="text-gray-400">Choose an email from the list to view its content</p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Compose Modal */}
      <AnimatePresence>
        {isComposing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsComposing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <Card className="bg-slate-800 border-white/20">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="flex items-center justify-between">
                    <span>Compose Email</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsComposing(false)}
                      className="hover:bg-white/10"
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Input
                    placeholder="To:"
                    value={composeForm.to}
                    onChange={(e) => setComposeForm((prev) => ({ ...prev, to: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                  <Input
                    placeholder="Subject:"
                    value={composeForm.subject}
                    onChange={(e) => setComposeForm((prev) => ({ ...prev, subject: e.target.value }))}
                    className="bg-white/5 border-white/10"
                  />
                  <Textarea
                    placeholder="Write your message..."
                    rows={10}
                    value={composeForm.content}
                    onChange={(e) => setComposeForm((prev) => ({ ...prev, content: e.target.value }))}
                    className="bg-white/5 border-white/10 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="hover:bg-white/10">
                      <Paperclip className="w-4 h-4 mr-2" />
                      Attach
                    </Button>
                    <Button
                      onClick={sendEmail}
                      disabled={sending}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
