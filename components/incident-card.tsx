"use client"

import type { Incident } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface IncidentCardProps {
  incident: Incident
  isExpanded: boolean
  onToggleDetails: () => void
}

export function IncidentCard({ incident, isExpanded, onToggleDetails }: IncidentCardProps) {
  // Format date to be more readable
  const formattedDate = new Date(incident.reported_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "High":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-100"
    }
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{incident.title}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                {incident.severity} Severity
              </Badge>
              <span className="text-sm text-slate-500">Reported: {formattedDate}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleDetails}
            className="self-start sm:self-center"
            aria-expanded={isExpanded}
            aria-controls={`incident-details-${incident.id}`}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" />
                View Details
              </>
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div id={`incident-details-${incident.id}`} className="p-4 bg-slate-50 border-t border-slate-200">
          <h4 className="font-medium text-sm text-slate-500 mb-2">Description</h4>
          <p className="text-slate-700">{incident.description}</p>
        </div>
      )}
    </div>
  )
}
