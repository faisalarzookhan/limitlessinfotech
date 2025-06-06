import { Server as SocketIOServer } from "socket.io"
import type { Server as HTTPServer } from "http"
import { AuthService } from "./auth"

export class WebSocketService {
  private io: SocketIOServer

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL,
        methods: ["GET", "POST"],
      },
    })

    this.setupMiddleware()
    this.setupEventHandlers()
  }

  private setupMiddleware() {
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token
        const user = AuthService.verifyToken(token)

        if (!user) {
          return next(new Error("Authentication error"))
        }

        socket.data.user = user
        next()
      } catch (error) {
        next(new Error("Authentication error"))
      }
    })
  }

  private setupEventHandlers() {
    this.io.on("connection", (socket) => {
      const user = socket.data.user

      // Join user to their personal room
      socket.join(`user:${user.id}`)

      // Join user to their role-based room
      socket.join(`role:${user.role}`)

      // Handle chat room joining
      socket.on("join-room", (roomId: string) => {
        socket.join(`room:${roomId}`)
        socket.to(`room:${roomId}`).emit("user-joined", {
          userId: user.id,
          userName: user.name,
        })
      })

      // Handle chat messages
      socket.on(
        "send-message",
        (data: {
          roomId: string
          content: string
          type: "text" | "file"
          fileUrl?: string
          fileName?: string
        }) => {
          const message = {
            id: Date.now().toString(),
            roomId: data.roomId,
            senderId: user.id,
            senderName: user.name,
            content: data.content,
            type: data.type,
            fileUrl: data.fileUrl,
            fileName: data.fileName,
            timestamp: new Date().toISOString(),
          }

          // Broadcast to room
          this.io.to(`room:${data.roomId}`).emit("new-message", message)

          // Save to database (implement this)
          // DatabaseService.saveChatMessage(message)
        },
      )

      // Handle typing indicators
      socket.on("typing", (data: { roomId: string; isTyping: boolean }) => {
        socket.to(`room:${data.roomId}`).emit("user-typing", {
          userId: user.id,
          userName: user.name,
          isTyping: data.isTyping,
        })
      })

      // Handle notifications
      socket.on(
        "send-notification",
        (data: {
          targetUserId: string
          type: string
          title: string
          message: string
          actionUrl?: string
        }) => {
          this.io.to(`user:${data.targetUserId}`).emit("notification", {
            id: Date.now().toString(),
            type: data.type,
            title: data.title,
            message: data.message,
            actionUrl: data.actionUrl,
            timestamp: new Date().toISOString(),
          })
        },
      )

      socket.on("disconnect", () => {
        console.log(`User ${user.name} disconnected`)
      })
    })
  }

  // Public methods for sending notifications
  public sendNotificationToUser(userId: string, notification: any) {
    this.io.to(`user:${userId}`).emit("notification", notification)
  }

  public sendNotificationToRole(role: string, notification: any) {
    this.io.to(`role:${role}`).emit("notification", notification)
  }

  public broadcastToRoom(roomId: string, event: string, data: any) {
    this.io.to(`room:${roomId}`).emit(event, data)
  }
}
