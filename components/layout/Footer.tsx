import * as React from "react"

export interface FooterProps {
  className?: string
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer
      className={`w-full border-t border-zinc-200/80 bg-white font-inter text-xs text-primary-gray ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 md:px-8 py-5">
        <p className="text-center sm:text-left">
          &copy; 2025 Sistem Manajemen Dokumen Tender. Biro Pengadaan Nasional.
        </p>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Sistem Online</span>
          </div>

          <span className="text-zinc-300 select-none">&bull;</span>

          <span>Standar Kepatuhan ISO 27001</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
