"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Loader2, Plus, Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  status: "completed" | "in-progress" | "pending" | "blocked"
  category: string
}

const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "1",
    date: "2023-01-15",
    title: "Project Kick-off Meeting",
    description: "Initial meeting with the client to define project scope and objectives.",
    status: "completed",
    category: "Planning",
  },
  {
    id: "2",
    date: "2023-02-01",
    title: "UI/UX Design Phase",
    description: "Designing wireframes and mockups for the main application screens.",
    status: "completed",
    category: "Design",
  },
  {
    id: "3",
    date: "2023-03-10",
    title: "Backend API Development",
    description: "Developing RESTful APIs for data management and user authentication.",
    status: "in-progress",
    category: "Development",
  },
  {
    id: "4",
    date: "2023-04-05",
    title: "Frontend Integration",
    description: "Integrating the designed UI with the backend APIs.",
    status: "pending",
    category: "Development",
  },
  {
    id: "5",
    date: "2023-04-20",
    title: "Database Schema Finalization",
    description: "Finalizing the database schema based on application requirements.",
    status: "blocked",
    category: "Planning",
  },
  {
    id: "6",
    date: "2023-05-15",
    title: "User Acceptance Testing (UAT)",
    description: "Client testing of the application to ensure all requirements are met.",
    status: "pending",
    category: "Testing",
  },
]

const categories = ["Planning", "Design", "Development", "Testing", "Deployment", "Maintenance"]
const statuses = ["completed", "in-progress", "pending", "blocked"]

export default function ProjectTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>(mockTimelineEvents)
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null)
  const [formState, setFormState] = useState({
    date: "",
    title: "",
    description: "",
    status: "pending" as TimelineEvent["status"],
    category: "Planning",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string, field: "status" | "category") => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormState({
      date: "",
      title: "",
      description: "",
      status: "pending",
      category: "Planning",
    })
    setIsAddingEvent(false)
    setEditingEvent(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const newEvent = {
      ...formState,
      id: editingEvent ? editingEvent.id : Date.now().toString(),
    }

    try {
      // Simulate API call
      const apiEndpoint = editingEvent ? "/api/timeline/update" : "/api/timeline/add"
      const method = editingEvent ? "PUT" : "POST"

      const response = await fetch(apiEndpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      })
      const data = await response.json()

      if (data.success) {
        if (editingEvent) {
          setEvents((prev) => prev.map((event) => (event.id === newEvent.id ? newEvent : event)))
          toast({ title: "Success!", description: "Timeline event updated successfully." })
        } else {
          setEvents((prev) => [...prev, newEvent])
          toast({ title: "Success!", description: "Timeline event added successfully." })
        }
        resetForm()
      } else {
        throw new Error(data.error || "Failed to save event.")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (event: TimelineEvent) => {
    setEditingEvent(event)
    setFormState({
      date: event.date,
      title: event.title,
      description: event.description,
      status: event.status,
      category: event.category,
    })
    setIsAddingEvent(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/timeline/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      const data = await response.json()

      if (data.success) {
        setEvents((prev) => prev.filter((event) => event.id !== id))
        toast({ title: "Success!", description: "Timeline event deleted successfully." })
      } else {
        throw new Error(data.error || "Failed to delete event.")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="custom-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Project Timeline</span>
          </span>
          <Button onClick={() => setIsAddingEvent(true)} className="btn-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAddingEvent && (
          <Card className="custom-card p-6 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-foreground">
                {editingEvent ? "Edit Timeline Event" : "Add New Timeline Event"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-2">
                    Event Title
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., Backend API Finalization"
                    value={formState.title}
                    onChange={handleFormChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-2">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description of the event..."
                    value={formState.description}
                    onChange={handleFormChange}
                    className="input-field min-h-[100px]"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-muted-foreground mb-2">
                      Date
                    </label>
                    <Input
                      id="date"
                      type="date"
                      value={formState.date}
                      onChange={handleFormChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-muted-foreground mb-2">
                      Status
                    </label>
                    <Select
                      value={formState.status}
                      onValueChange={(value) => handleSelectChange(value, "status")}
                      required
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status} className="hover:bg-muted/50">
                            {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-muted-foreground mb-2">
                      Category
                    </label>
                    <Select
                      value={formState.category}
                      onValueChange={(value) => handleSelectChange(value, "category")}
                      required
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category} className="hover:bg-muted/50">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="btn-outline-primary bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading} className="btn-gradient">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                      </>
                    ) : (
                      "Save Event"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Timeline Display */}
        <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-border">
          {sortedEvents.map((event, index) => (
            <div
              key={event.id}
              className="mb-8 flex items-start relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={cn(
                  "absolute -left-1.5 top-2 w-3 h-3 rounded-full border-2 border-primary",
                  event.status === "completed"
                    ? "bg-accent-green"
                    : event.status === "in-progress"
                      ? "bg-accent-blue"
                      : event.status === "pending"
                        ? "bg-muted-foreground"
                        : "bg-destructive",
                )}
              />
              <Card className="custom-card flex-1 ml-6 p-4">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-lg">{event.title}</h3>
                    <Badge
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        event.status === "completed"
                          ? "bg-accent-green/20 text-accent-green"
                          : event.status === "in-progress"
                            ? "bg-accent-blue/20 text-accent-blue"
                            : event.status === "pending"
                              ? "bg-muted/20 text-muted-foreground"
                              : "bg-destructive/20 text-destructive",
                      )}
                    >
                      {event.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{event.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Date: {event.date}</span>
                    <span>Category: {event.category}</span>
                  </div>
                  <div className="flex justify-end space-x-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(event)}
                      className="btn-outline-primary"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(event.id)}
                      className="btn-outline-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
