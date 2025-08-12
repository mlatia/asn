"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

interface SidebarLinkProps {
  iconSrc: string
  iconAlt: string
  text: string
  href: string
  isActive?: boolean
  onClick?: () => void
}

function SidebarLink({ iconSrc, iconAlt, text, href, isActive, onClick }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-primary-dark transition-all hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800",
        isActive && "bg-primary-blue-light text-primary-blue font-medium",
      )}
    >
      <Image src={iconSrc} alt={iconAlt} width={20} height={20} className="h-5 w-5" />
      {text}
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)
  const closeSidebar = () => setIsOpen(false)

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white dark:bg-gray-900"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed md:static top-0 left-0 h-screen w-[280px] border-r bg-white dark:bg-gray-950 z-50 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary-dark">
              <Image src="/logo.png" alt="LolosASN Logo" width={160} height={160} />
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">MENU</h3>
              <SidebarLink iconSrc="/ic-beranda.png" iconAlt="Beranda Icon" text="Beranda" href="/" isActive={pathname === "/"} onClick={closeSidebar} />
              <SidebarLink iconSrc="/ic-chart.png" iconAlt="Keranjang Icon" text="Keranjang Tryout" href="/keranjang-tryout" isActive={pathname === "/keranjang-tryout"} onClick={closeSidebar} />
              <SidebarLink iconSrc="/ic-to.png" iconAlt="Tryout Icon" text="Tryout Saya" href="/tryout-saya" isActive={pathname === "/tryout-saya"} onClick={closeSidebar} />
              <SidebarLink iconSrc="/ic-receipt.png" iconAlt="Riwayat Icon" text="Riwayat Pembelian" href="/riwayat-pembelian" isActive={pathname === "/riwayat-pembelian"} onClick={closeSidebar} />
              <SidebarLink iconSrc="/ic-user.png" iconAlt="User Icon" text="Akun saya" href="/akun-saya" isActive={pathname === "/akun-saya"} onClick={closeSidebar} />
            </nav>
          </div>
        </div>
      </aside>
    </>
  )
}
