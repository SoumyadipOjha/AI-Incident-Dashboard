"use client"

import { useState } from "react"
import { IncidentCard } from "./incident-card"
import { NewIncidentForm } from "./new-incident-form"
import type { Incident, SeverityLevel, SortOrder } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, MinusCircle } from "lucide-react"

// Mock data
const initialIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description:
      "Algorithm consistently favored certain demographics in job recommendations, leading to unequal opportunity distribution across user groups. The issue was traced to training data imbalances.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description:
      "LLM provided incorrect safety procedure information when asked about emergency protocols in a chemical plant. This could have led to dangerous situations if followed in a real emergency.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description:
      "Chatbot inadvertently exposed non-sensitive user metadata in its responses. While no critical information was leaked, it revealed system architecture details that should have remained private.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
  },
  {
    id: 4,
    title: "Facial Recognition False Positives",
    description:
      "Security system incorrectly identified multiple individuals as persons of interest, leading to unnecessary security escalations. The error rate was particularly high for certain ethnic groups.",
    severity: "Medium",
    reported_at: "2025-03-25T16:45:00Z",
  },
  {
    id: 5,
    title: "Autonomous Vehicle Navigation Error",
    description:
      "Test vehicle repeatedly misinterpreted road markings in construction zones, attempting unsafe lane changes. No accidents occurred, but the behavior revealed a critical edge case in the perception system.",
    severity: "High",
    reported_at: "2025-04-05T11:20:00Z",
  },
]

export function AISafetyDashboard() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents)
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | "All">("All")
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())
  const [showForm, setShowForm] = useState(false)

  // Filter incidents by severity
  const filteredIncidents = incidents.filter(
    (incident) => severityFilter === "All" || incident.severity === severityFilter,
  )

  // Sort incidents by date
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime()
    const dateB = new Date(b.reported_at).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  // Toggle incident details
  const toggleDetails = (id: number) => {
    const newExpandedIds = new Set(expandedIds)
    if (newExpandedIds.has(id)) {
      newExpandedIds.delete(id)
    } else {
      newExpandedIds.add(id)
    }
    setExpandedIds(newExpandedIds)
  }

  // Add new incident
  const addIncident = (incident: Omit<Incident, "id" | "reported_at">) => {
    const newIncident: Incident = {
      ...incident,
      id: Math.max(...incidents.map((i) => i.id), 0) + 1,
      reported_at: new Date().toISOString(),
    }
    setIncidents([...incidents, newIncident])
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="severity-filter" className="text-sm font-medium">
              Filter by Severity
            </label>
            <Select value={severityFilter} onValueChange={(value) => setSeverityFilter(value as SeverityLevel | "All")}>
              <SelectTrigger id="severity-filter" className="w-[180px]">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Severities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="sort-order" className="text-sm font-medium">
              Sort by Date
            </label>
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
              <SelectTrigger id="sort-order" className="w-[180px]">
                <SelectValue placeholder="Select sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto">
          {showForm ? (
            <>
              <MinusCircle className="mr-2 h-4 w-4" />
              Hide Report Form
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Report New Incident
            </>
          )}
        </Button>
      </div>

      {/* New Incident Form */}
      {showForm && (
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Report New Incident</h2>
          <NewIncidentForm onSubmit={addIncident} />
        </div>
      )}

      {/* Incidents List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Incidents {severityFilter !== "All" ? `(${severityFilter} Severity)` : ""}
          <span className="text-sm font-normal ml-2 text-slate-500">
            {sortedIncidents.length} {sortedIncidents.length === 1 ? "incident" : "incidents"} found
          </span>
        </h2>

        {sortedIncidents.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-lg">
            <p className="text-slate-500">No incidents found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedIncidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                isExpanded={expandedIds.has(incident.id)}
                onToggleDetails={() => toggleDetails(incident.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
