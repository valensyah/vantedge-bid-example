"use client"

import * as React from "react"
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { DocumentDetailDialog } from "./DocumentDetailDialog"
import type { DocumentEntity, DocumentStatus } from "@/app/dashboard/types"

export interface TableContentProps {
  data?: DocumentEntity[]
  onDetailClick?: (doc: DocumentEntity) => void
  onUpdateStatusClick?: (doc: DocumentEntity) => void
  debounceMs?: number
}

const ITEMS_PER_PAGE = 8

export function TableContent({
  data = [],
  onDetailClick,
  onUpdateStatusClick,
  debounceMs = 300,
}: TableContentProps) {
  const [selectedTab, setSelectedTab] = React.useState<"all" | DocumentStatus>("all")
  const [searchInput, setSearchInput] = React.useState("")
  const debouncedSearchQuery = useDebounce(searchInput, debounceMs)
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [selectedDocument, setSelectedDocument] = React.useState<DocumentEntity | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false)

  const handleDetailClick = (doc: DocumentEntity) => {
    setSelectedDocument(doc)
    setIsDetailDialogOpen(true)
    onDetailClick?.(doc)
  }

  const categories = React.useMemo(() => {
    const set = new Set<string>()
    data.forEach((item) => {
      if (item.category) set.add(item.category)
    })
    return Array.from(set)
  }, [data])

  const counts = React.useMemo(() => {
    return {
      all: data.length,
      Ingested: data.filter((d) => d.status === "Ingested").length,
      Pending: data.filter((d) => d.status === "Pending").length,
      Failed: data.filter((d) => d.status === "Failed").length,
    }
  }, [data])

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      if (selectedTab !== "all" && item.status !== selectedTab) {
        return false
      }
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false
      }
      if (debouncedSearchQuery.trim() !== "") {
        const query = debouncedSearchQuery.toLowerCase()
        const matchesTitle = item.title.toLowerCase().includes(query)
        const matchesCode = item.code.toLowerCase().includes(query)
        if (!matchesTitle && !matchesCode) {
          return false
        }
      }
      return true
    })
  }, [data, selectedTab, selectedCategory, debouncedSearchQuery])

  React.useEffect(() => {
    setCurrentPage(1)
  }, [selectedTab, selectedCategory, debouncedSearchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE))
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredData.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredData, currentPage])

  const startItem = filteredData.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)

  const renderStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case "Ingested":
        return (
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600 border border-emerald-200/60">
            Ingested
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600 border border-amber-200/60">
            Pending
          </span>
        )
      case "Failed":
        return (
          <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-600 border border-rose-200/60">
            Failed
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-primary-gray">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full font-inter">
      <div className="flex flex-col lg:flex-row lg:justify-between items-start sm:items-center gap-4">
        <div className="w-fit flex flex-wrap justify-center overflow-x-scroll sm:overflow-x-visible sm:justify-start items-center gap-1.5 p-1 bg-zinc-100/80 rounded-xl border border-zinc-200/60 text-xs">
          <button
            type="button"
            onClick={() => setSelectedTab("all")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              selectedTab === "all"
                ? "bg-white text-primary-dark shadow-xs"
                : "text-primary-gray hover:text-primary-dark"
            }`}
          >
            <span>Semua</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[11px] font-mono ${
                selectedTab === "all"
                  ? "bg-zinc-100 text-primary-dark"
                  : "bg-zinc-200/60 text-primary-gray"
              }`}
            >
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTab("Ingested")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              selectedTab === "Ingested"
                ? "bg-white text-primary-dark shadow-xs"
                : "text-primary-gray hover:text-primary-dark"
            }`}
          >
            <span>Ingested</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[11px] font-mono ${
                selectedTab === "Ingested"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                  : "bg-zinc-200/60 text-primary-gray"
              }`}
            >
              {counts.Ingested}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTab("Pending")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              selectedTab === "Pending"
                ? "bg-white text-primary-dark shadow-xs"
                : "text-primary-gray hover:text-primary-dark"
            }`}
          >
            <span>Pending</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[11px] font-mono ${
                selectedTab === "Pending"
                  ? "bg-amber-50 text-amber-600 border border-amber-200/60"
                  : "bg-zinc-200/60 text-primary-gray"
              }`}
            >
              {counts.Pending}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTab("Failed")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              selectedTab === "Failed"
                ? "bg-white text-primary-dark shadow-xs"
                : "text-primary-gray hover:text-primary-dark"
            }`}
          >
            <span>Failed</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[11px] font-mono ${
                selectedTab === "Failed"
                  ? "bg-rose-50 text-rose-600 border border-rose-200/60"
                  : "bg-zinc-200/60 text-primary-gray"
              }`}
            >
              {counts.Failed}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-primary-gray pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari dokumen atau kode..."
              className="w-full pl-9 pr-8 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs text-primary-dark placeholder:text-primary-gray focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                aria-label="Hapus pencarian"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-primary-gray hover:text-primary-dark p-0.5 rounded-md hover:bg-zinc-100 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter Kategori"
              className="appearance-none bg-white border border-zinc-200 rounded-lg pl-3 pr-8 py-1.5 text-xs text-primary-dark font-medium focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all cursor-pointer"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-primary-gray pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200/80 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-200/80 bg-white">
                <th className="py-3.5 px-6 text-[11px] font-semibold text-primary-gray uppercase tracking-wider">
                  Nama Dokumen & Kode Lelang
                </th>
                <th className="py-3.5 px-6 text-[11px] font-semibold text-primary-gray uppercase tracking-wider">
                  Kategori
                </th>
                <th className="py-3.5 px-6 text-[11px] font-semibold text-primary-gray uppercase tracking-wider">
                  Ukuran
                </th>
                <th className="py-3.5 px-6 text-[11px] font-semibold text-primary-gray uppercase tracking-wider">
                  Diunggah
                </th>
                <th className="py-3.5 px-6 text-[11px] font-semibold text-primary-gray uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3.5 px-6 text-[11px] font-semibold text-primary-gray uppercase tracking-wider text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-primary-gray">
                    Tidak ada dokumen yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                paginatedData.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-zinc-50/70 transition-colors group"
                  >
                    <td className="py-3.5 px-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-primary-dark group-hover:text-black transition-colors">
                          {doc.title}
                        </span>
                        <span className="font-mono text-xs text-primary-gray tracking-wide">
                          {doc.code}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-6 text-sm text-primary-gray font-normal">
                      {doc.category}
                    </td>

                    <td className="py-3.5 px-6 font-mono text-xs text-primary-gray tracking-tight">
                      {doc.size}
                    </td>

                    <td className="py-3.5 px-6 text-sm text-primary-gray font-normal">
                      {doc.uploadedAt}
                    </td>

                    <td className="py-3.5 px-6">
                      {renderStatusBadge(doc.status)}
                    </td>

                    <td className="py-3.5 px-6 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleDetailClick(doc)}
                          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-primary-dark shadow-2xs hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
                        >
                          Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-zinc-100 bg-white text-xs">
          <div className="text-primary-gray">
            Menampilkan{" "}
            <span className="font-semibold text-primary-dark">
              {paginatedData.length > 0 ? (currentPage === 1 ? paginatedData.length : `${startItem}-${endItem}`) : 0}
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-primary-dark">
              {filteredData.length}
            </span>{" "}
            dokumen
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-primary-gray hover:text-primary-dark hover:bg-zinc-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Sebelumnya</span>
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNumber = idx + 1
              const isActive = currentPage === pageNumber
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`min-w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-zinc-950 text-white shadow-2xs"
                      : "text-primary-gray hover:bg-zinc-100 hover:text-primary-dark"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-primary-gray hover:text-primary-dark hover:bg-zinc-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <DocumentDetailDialog
        document={selectedDocument}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
    </div>
  )
}

export default TableContent
