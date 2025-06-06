"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  MessageSquare,
  Send,
  Paperclip,
  ImageIcon,
  File,
  Phone,
  Video,
  MoreHorizontal,
  CheckCheck,
  Clock,
  Smile,
} from "lucide-react"

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  type: "text" | "file" | "image" | "system"
  fileUrl?: string
  fileName?: string
  fileSize?: string
  status: "sending" | "sent" | "delivered" | "read"
  replyTo?: string
}

interface ChatRoom {
  id: string
  name: string
  type: "direct" | "group" | "project"
  participants: string[]
  lastMessage?: ChatMessage
  unreadCount: number
  isOnline: boolean
  avatar?: string
}

interface ChatUser {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "busy" | "offline"
  lastSeen: string
}

const mockUsers: ChatUser[] = [
  {
    id: "EMP001",
    name: "John Doe",
    avatar: "👨‍💻",
    status: "online",
    lastSeen: "Now",
  },
  {
    id: "EMP002",
    name: "Sarah Smith",
    avatar: "👩‍🎨",
    status: "busy",
    lastSeen: "5 minutes ago",
  },
  {
    id: "EMP003",
    name: "Mike Johnson",
    avatar: "👨‍💼",
    status: "online",
    lastSeen: "2 minutes ago",
  },
  {
    id: "CLIENT001",
    name: "TechCorp Client",
    avatar: "🏢",
    status: "online",
    lastSeen: "1 minute ago",
  },
]

const mockChatRooms: ChatRoom[] = [
  {
    id: "room1",
    name: "Development Team",
    type: "group",
    participants: ["EMP001", "EMP002", "EMP003"],
    unreadCount: 3,
    isOnline: true,
    avatar: "👥",
  },
  {
    id: "room2",
    name: "TechCorp Project",
    type: "project",
    participants: ["EMP001", "EMP002", "EMP003", "CLIENT001"],
    unreadCount: 1,
    isOnline: true,
    avatar: "🚀",
  },
  {
    id: "room3",
    name: "Sarah Smith",
    type: "direct",
    participants: ["EMP001", "EMP002"],
    unreadCount: 0,
    isOnline: true,
    avatar: "👩‍🎨",
  },
]

const mockMessages: ChatMessage[] = [
  {
    id: "msg1",
    senderId: "EMP002",
    senderName: "Sarah Smith",
    senderAvatar: "👩‍🎨",
    content: "Hey team! I've finished the new design mockups. Ready for review!",
    timestamp: "2024-01-16 14:30",
    type: "text",
    status: "read",
  },
  {
    id: "msg2",
    senderId: "EMP001",
    senderName: "John Doe",
    senderAvatar: "👨‍💻",
    content: "Great work! I'll integrate them into the frontend today.",
    timestamp: "2024-01-16 14:32",
    type: "text",
    status: "read",
  },
  {
    id: "msg3",
    senderId: "EMP002",
    senderName: "Sarah Smith",
    senderAvatar: "👩‍🎨",
    content: "design-mockups-v2.fig",
    timestamp: "2024-01-16 14:35",
    type: "file",
    fileUrl: "/files/design-mockups-v2.fig",
    fileName: "design-mockups-v2.fig",
    fileSize: "15.7 MB",
    status: "delivered",
  },
  {
    id: "msg4",
    senderId: "CLIENT001",
    senderName: "TechCorp Client",
    senderAvatar: "🏢",
    content: "The designs look fantastic! Can we schedule a call to discuss the implementation timeline?",
    timestamp: "2024-01-16 15:00",
    type: "text",
    status: "sent",
  },
]

interface RealTimeChatProps {
  currentUserId: string
  isMinimized?: boolean
  onToggleMinimize?: () => void
}

export default function RealTimeChat({ currentUserId, isMinimized = false, onToggleMinimize }: RealTimeChatProps) {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(mockChatRooms[0])
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate real-time message updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate typing indicators
      if (Math.random() > 0.8) {
        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]
        setTypingUsers([randomUser.name])
        setTimeout(() => setTypingUsers([]), 2000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return

    const message: ChatMessage = {
      id: `msg${Date.now()}`,
      senderId: currentUserId,
      senderName: mockUsers.find((u) => u.id === currentUserId)?.name || "You",
      senderAvatar: mockUsers.find((u) => u.id === currentUserId)?.avatar || "👤",
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: "text",
      status: "sending",
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "sent" } : msg)))
    }, 1000)

    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "delivered" } : msg)))
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sending":
        return <Clock className="w-3 h-3 text-gray-400" />
      case "sent":
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-blue-400" />
      case "read":
        return <CheckCheck className="w-3 h-3 text-green-400" />
      default:
        return null
    }
  }

  const getUserStatus = (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId)
    return user?.status || "offline"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-red-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  if (isMinimized) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg relative"
        >
          <MessageSquare className="w-6 h-6" />
          {mockChatRooms.reduce((total, room) => total + room.unreadCount, 0) > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center p-0">
              {mockChatRooms.reduce((total, room) => total + room.unreadCount, 0)}
            </Badge>
          )}
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 w-96 h-[600px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-50"
    >
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-lg">
                {selectedRoom?.avatar}
              </div>
              {selectedRoom?.type === "direct" && (
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-800 ${getStatusColor(
                    getUserStatus(selectedRoom.participants.find((p) => p !== currentUserId) || ""),
                  )}`}
                />
              )}
            </div>
            <div>
              <h3 className="font-medium text-sm">{selectedRoom?.name}</h3>
              <p className="text-xs text-gray-400">
                {selectedRoom?.type === "group"
                  ? `${selectedRoom.participants.length} members`
                  : selectedRoom?.type === "project"
                    ? "Project Chat"
                    : "Direct Message"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="hover:bg-white/10">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="hover:bg-white/10">
              <Video className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onToggleMinimize} className="hover:bg-white/10">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chat Rooms List */}
        <div className="flex-1 flex">
          <div className="w-32 border-r border-white/10 p-2 space-y-2 overflow-y-auto">
            {mockChatRooms.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRoom(room)}
                className={`relative p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedRoom?.id === room.id ? "bg-blue-500/20" : "hover:bg-white/10"
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-sm">
                      {room.avatar}
                    </div>
                    {room.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800" />
                    )}
                  </div>
                  <span className="text-xs text-center leading-tight">{room.name.split(" ")[0]}</span>
                  {room.unreadCount > 0 && (
                    <Badge className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                      {room.unreadCount}
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => {
                const isOwn = message.senderId === currentUserId
                const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex space-x-2 max-w-[80%] ${isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
                      {showAvatar && !isOwn && (
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                          {message.senderAvatar}
                        </div>
                      )}
                      <div className={`${showAvatar && !isOwn ? "" : "ml-8"}`}>
                        {showAvatar && !isOwn && <p className="text-xs text-gray-400 mb-1">{message.senderName}</p>}
                        <div
                          className={`p-3 rounded-lg ${
                            isOwn
                              ? "bg-blue-500/20 text-blue-100"
                              : message.type === "system"
                                ? "bg-gray-500/20 text-gray-300 text-center"
                                : "bg-white/10 text-white"
                          }`}
                        >
                          {message.type === "file" ? (
                            <div className="flex items-center space-x-2">
                              <File className="w-4 h-4" />
                              <div>
                                <p className="text-sm font-medium">{message.fileName}</p>
                                <p className="text-xs text-gray-400">{message.fileSize}</p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm">{message.content}</p>
                          )}
                        </div>
                        <div className={`flex items-center space-x-2 mt-1 ${isOwn ? "justify-end" : ""}`}>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {isOwn && getStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {/* Typing Indicator */}
              {typingUsers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xs">
                    👤
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="bg-white/5 border-white/10 flex-1"
                />
                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
