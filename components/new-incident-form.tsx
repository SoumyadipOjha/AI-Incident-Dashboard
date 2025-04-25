"use client"

import type React from "react"

import { useState } from "react"
import type { Incident, SeverityLevel } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

interface NewIncidentFormProps {
  onSubmit: (incident: Omit<Incident, "id" | "reported_at">) => void
}

export function NewIncidentForm({ onSubmit }: NewIncidentFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [severity, setSeverity] = useState<SeverityLevel | "">("")
  const [errors, setErrors] = useState<{
    title?: string
    description?: string
    severity?: string
  }>({})

  const validateForm = () => {
    const newErrors: {
      title?: string
      description?: string
      severity?: string
    } = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!severity) {
      newErrors.severity = "Severity level is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit({
        title,
        description,
        severity: severity as SeverityLevel,
      })

      // Reset form
      setTitle("")
      setDescription("")
      setSeverity("")
      setErrors({})
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Title <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter incident title"
          className={errors.title ? "border-red-300" : ""}
        />
        {errors.title && (
          <p className="text-sm text-red-500 flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.title}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Description <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the incident in detail"
          rows={4}
          className={errors.description ? "border-red-300" : ""}
        />
        {errors.description && (
          <p className="text-sm text-red-500 flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.description}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="severity" className="block text-sm font-medium">
          Severity Level <span className="text-red-500">*</span>
        </label>
        <Select value={severity} onValueChange={(value) => setSeverity(value as SeverityLevel)}>
          <SelectTrigger id="severity" className={errors.severity ? "border-red-300" : ""}>
            <SelectValue placeholder="Select severity level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
        {errors.severity && (
          <p className="text-sm text-red-500 flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.severity}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit">Submit Incident Report</Button>
      </div>
    </form>
  )
}
