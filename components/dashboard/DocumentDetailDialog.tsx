"use client"

import * as React from "react"
import {
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  HardDrive,
  MessageSquareText,
  Tag,
  User,
  XCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { DocumentEntity, DocumentStatus } from "@/app/dashboard/types"

export interface DocumentDetailDialogProps {
  document: DocumentEntity | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentDetailDialog({
  document,
  open,
  onOpenChange,
}: DocumentDetailDialogProps) {
  if (!document) return null

  const renderStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case "Ingested":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200/80">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Ingested
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 border border-amber-200/80">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            Pending
          </span>
        )
      case "Failed":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 border border-rose-200/80">
            <XCircle className="h-3.5 w-3.5 text-rose-600" />
            Failed
          </span>
        )
      default:
        return null
    }
  }

  const getStatusMessage = (status: DocumentStatus) => {
    switch (status) {
      case "Ingested":
        return {
          bg: "bg-emerald-50/60 border-emerald-200/70 text-emerald-800",
          desc: "Berkas telah lolos verifikasi kepatuhan sistem dan terindeks secara aman.",
        }
      case "Pending":
        return {
          bg: "bg-amber-50/60 border-amber-200/70 text-amber-800",
          desc: "Berkas masih dalam proses tinjauan oleh panitia lelang / tim verifikator.",
        }
      case "Failed":
        return {
          bg: "bg-rose-50/60 border-rose-200/70 text-rose-800",
          desc: "Berkas tidak memenuhi kelayakan atau terdapat persyaratan wajib yang belum lengkap.",
        }
    }
  }

  const statusInfo = getStatusMessage(document.status)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[90vh] sm:h-auto sm:max-w-xl p-0 overflow-hidden rounded-2xl border border-zinc-200 shadow-xl bg-white font-inter">
        <div className="p-6 pb-4 border-b border-zinc-100 bg-gradient-to-b from-zinc-50/80 to-white">
          <DialogHeader className="gap-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-primary-gray">
                  {document.code}
                </span>
                <span className="text-xs text-primary-gray">•</span>
                <span className="text-xs font-medium text-primary-gray">
                  ID #{document.id}
                </span>
              </div>
              {renderStatusBadge(document.status)}
            </div>

            <DialogTitle className="text-base sm:text-lg font-bold text-primary-dark leading-snug pt-1">
              {document.title}
            </DialogTitle>

            <DialogDescription className="text-xs text-primary-gray flex items-center gap-1.5">
              <span>Rincian spesifikasi berkas lelang dan catatan pengunggah</span>
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3">
              <div className="flex items-center gap-1.5 text-primary-gray text-[11px] mb-1">
                <Tag className="h-3 w-3" />
                <span>Kategori</span>
              </div>
              <p className="text-xs font-semibold text-primary-dark">
                {document.category}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3">
              <div className="flex items-center gap-1.5 text-primary-gray text-[11px] mb-1">
                <HardDrive className="h-3 w-3" />
                <span>Ukuran Berkas</span>
              </div>
              <p className="text-xs font-mono font-semibold text-primary-dark">
                {document.size}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3">
              <div className="flex items-center gap-1.5 text-primary-gray text-[11px] mb-1">
                <Calendar className="h-3 w-3" />
                <span>Diunggah</span>
              </div>
              <p className="text-xs font-semibold text-primary-dark">
                {document.uploadedAt}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3">
              <div className="flex items-center gap-1.5 text-primary-gray text-[11px] mb-1">
                <User className="h-3 w-3" />
                <span>Pengunggah</span>
              </div>
              <p className="text-xs font-semibold text-primary-dark truncate" title={document.author || "Admin"}>
                {document.author || "Admin"}
              </p>
            </div>
          </div>

          {document.author && (
            <div className="rounded-xl border border-zinc-200/80 bg-white p-3.5 flex items-start gap-3 shadow-2xs">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-primary-dark shrink-0">
                {document.author
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-primary-dark">
                  {document.author}
                </span>
                <span className="text-[11px] text-primary-gray">
                  {document.department || "Penyelenggara Tender"} • Requestor / Pengunggah
                </span>
              </div>
            </div>
          )}

          {document.description ? (
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-dark">
                <MessageSquareText className="h-3.5 w-3.5 text-primary-gray" />
                <span>Catatan & Deskripsi dari Pengunggah</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {document.description}
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-zinc-200 p-4 text-center text-xs text-primary-gray">
              Tidak ada catatan khusus yang dilampirkan oleh pengunggah untuk dokumen ini.
            </div>
          )}

          <div className={`rounded-xl border p-3 text-xs flex items-center gap-2.5 ${statusInfo.bg}`}>
            <span className="font-semibold shrink-0">Info Status:</span>
            <span className="leading-tight">{statusInfo.desc}</span>
          </div>
        </div>

        <div className="p-4 px-6 border-t border-zinc-100 bg-zinc-50/40 flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto text-xs h-9"
          >
            Tutup
          </Button>

          <Button
            type="button"
            onClick={() => {
              alert(`Mengunduh berkas: ${document.title} (${document.code})`)
            }}
            className="w-full sm:w-auto bg-[#18181B] hover:bg-black text-white text-xs h-9 gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Unduh Berkas ({document.size})</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DocumentDetailDialog
