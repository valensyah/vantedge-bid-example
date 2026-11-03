"use client"

import * as React from "react"
import { Bell, ChevronDown, FileText, LogOut, Menu, Settings, User, X } from "lucide-react"

interface NavItem {
  label: string
  href?: string
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dokumen Tender", href: "#" },
  { label: "Arsip", href: "#" },
  { label: "Log Aktivitas", href: "#" },
  { label: "Pengaturan", href: "#" },
]

export interface NavbarProps {
  activeItem?: string
  onItemClick?: (label: string) => void
  onLogout?: () => void
  userName?: string
  userRole?: string
  userInitials?: string
}

export function Navbar({
  activeItem = "Dokumen Tender",
  onItemClick,
  onLogout,
  userName = "Admin Pengadaan",
  userRole = "Biro Logistik",
  userInitials = "AP",
}: NavbarProps) {
  const [currentActive, setCurrentActive] = React.useState(activeItem)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const mobileMenuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setCurrentActive(activeItem)
  }, [activeItem])

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false)
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        !(event.target as HTMLElement).closest("[data-mobile-toggle]")
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleNavClick = (label: string) => {
    setCurrentActive(label)
    setIsMobileMenuOpen(false)
    onItemClick?.(label)
  }

  const handleLogout = () => {
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
    if (onLogout) {
      onLogout()
    } else {
      console.log("Logged out")
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white font-inter">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-8">
          <button
            type="button"
            data-mobile-toggle
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigasi menu"
            aria-expanded={isMobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-gray transition-colors hover:bg-zinc-100 hover:text-primary-dark md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-white shadow-sm shrink-0">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-primary-dark">
              TenderDocs
            </span>
            <span className="rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[11px] font-medium text-primary-gray">
              v1.0
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentActive === item.label
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.label)}
                  className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-zinc-100 text-primary-dark"
                      : "text-primary-gray hover:bg-zinc-50 hover:text-primary-dark"
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            aria-label="Notifikasi"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-primary-gray transition-colors hover:bg-zinc-100 hover:text-primary-dark"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-zinc-950 ring-2 ring-white" />
          </button>

          <div className="h-5 w-px bg-zinc-200 mx-0.5 sm:mx-0" />

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              className="flex items-center gap-2 sm:gap-3 rounded-lg p-1 sm:p-1.5 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-xs font-semibold text-primary-dark shrink-0">
                {userInitials}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold leading-tight text-primary-dark truncate max-w-[120px] md:max-w-none">
                  {userName}
                </span>
                <span className="text-[11px] leading-tight text-primary-gray truncate max-w-[120px] md:max-w-none">
                  {userRole}
                </span>
              </div>
              <ChevronDown
                className={`h-3.5 w-3.5 text-primary-gray transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 z-50">
                <div className="px-3 py-2 border-b border-zinc-100 mb-1">
                  <p className="text-xs font-semibold text-primary-dark">{userName}</p>
                  <p className="text-[11px] text-primary-gray">{userRole}</p>
                </div>

                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-primary-dark hover:bg-zinc-50 transition-colors"
                  >
                    <User className="h-3.5 w-3.5 text-primary-gray" />
                    <span>Profil Pengguna</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-primary-dark hover:bg-zinc-50 transition-colors"
                  >
                    <Settings className="h-3.5 w-3.5 text-primary-gray" />
                    <span>Pengaturan Akun</span>
                  </button>
                </div>

                <div className="my-1 border-t border-zinc-100" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="border-t border-zinc-200/80 bg-white px-4 py-3 md:hidden shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="sm:hidden flex items-center gap-2.5 pb-3 mb-2 border-b border-zinc-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-xs font-semibold text-primary-dark shrink-0">
              {userInitials}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-primary-dark">{userName}</span>
              <span className="text-[11px] text-primary-gray">{userRole}</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentActive === item.label
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.label)}
                  className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-zinc-100 text-primary-dark font-semibold"
                      : "text-primary-gray hover:bg-zinc-50 hover:text-primary-dark"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-dark" />
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
