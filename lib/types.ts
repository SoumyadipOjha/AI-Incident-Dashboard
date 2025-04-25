export type SeverityLevel = "Low" | "Medium" | "High"
export type SortOrder = "newest" | "oldest"

export interface Incident {
  id: number
  title: string
  description: string
  severity: SeverityLevel
  reported_at: string
}
