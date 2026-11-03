export interface SummaryEntity {
  id: number
  title: string
  total: number
  desc: string
}

export type DocumentStatus = "Ingested" | "Pending" | "Failed"

export interface DocumentEntity {
  id: number | string
  title: string
  code: string
  category: string
  size: string
  uploadedAt: string
  status: DocumentStatus
  author?: string
  department?: string
  description?: string
}
