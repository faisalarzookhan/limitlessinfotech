"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, Send, Bot, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([
    { from: "bot", text: "Hello! How can I help you today?" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return

    const newMessages = [...messages, { from: "user", text: inputValue }]
    setMessages(newMessages)
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue }),
      })
      const data = await response.json()
      setMessages([...newMessages, { from: "bot", text: data.reply }])
    } catch (error) {
      console.error("Chatbot error:", error)
      setMessages([...newMessages, { from: "bot", text: "Sorry, something went wrong." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} className="rounded-full w-16 h-16 shadow-lg">
          <Bot className="w-8 h-8" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 z-50 w-full max-w-sm bg-card border rounded-lg shadow-xl flex flex-col"
          >
            <div className="p-4 border-b">
              <h3 className="font-semibold text-card-foreground">Chat with us</h3>
            </div>
            <div ref={chatContainerRef} className="p-4 h-80 overflow-y-auto flex-1">
              {messages.map((msg, index) => (
                <div key={index} className={`flex mb-4 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      msg.from === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button variant="ghost" size="icon">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
