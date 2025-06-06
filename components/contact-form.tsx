"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Send, Loader2, CheckCircle, Mail, User, Building, MessageSquare } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  company: string
  service: string
  message: string
}

const services = [
  "Web Development",
  "Mobile App Development",
  "Custom Software",
  "CRM Solutions",
  "Business Automation",
  "AI Integration",
  "General Inquiry",
]

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you within 24 hours.",
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          message: "",
        })
      }, 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-green-400">Message Sent Successfully!</h3>
        <p className="text-slate-300 mb-6">
          Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
        </p>
        <div className="flex justify-center space-x-2">
          <Badge className="bg-blue-500/20 text-blue-300">📧 Confirmation email sent</Badge>
          <Badge className="bg-green-500/20 text-green-300">⚡ Fast response guaranteed</Badge>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
            <User className="w-4 h-4" />
            <span>Full Name *</span>
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your full name"
            className="bg-slate-700/50 border-slate-600 focus:border-blue-500/50"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
            <Mail className="w-4 h-4" />
            <span>Email Address *</span>
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email address"
            className="bg-slate-700/50 border-slate-600 focus:border-blue-500/50"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
            <Building className="w-4 h-4" />
            <span>Company Name</span>
          </label>
          <Input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
            placeholder="Enter your company name"
            className="bg-slate-700/50 border-slate-600 focus:border-blue-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Service Interest</label>
          <select
            value={formData.service}
            onChange={(e) => setFormData((prev) => ({ ...prev, service: e.target.value }))}
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:border-blue-500/50 focus:outline-none text-white"
          >
            <option value="" className="bg-slate-800">
              Select a service
            </option>
            {services.map((service) => (
              <option key={service} value={service} className="bg-slate-800">
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
          <MessageSquare className="w-4 h-4" />
          <span>Message *</span>
        </label>
        <Textarea
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          placeholder="Tell us about your project requirements, goals, and how we can help you..."
          rows={6}
          className="bg-slate-700/50 border-slate-600 focus:border-blue-500/50 resize-none"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500/20 text-blue-300">🔐 Secure & Confidential</Badge>
          <Badge className="bg-green-500/20 text-green-300">⚡ 24hr Response</Badge>
          <Badge className="bg-orange-500/20 text-orange-300">🎯 Free Consultation</Badge>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-3"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
