"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, BookOpen, Receipt, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarLinkProps {
  icon: React.ReactNode
  text: string
  href: string
  isActive?: boolean
}

function SidebarLink({ icon, text, href, isActive }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-primary-dark transition-all hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800", // Use primary-dark
        isActive && "bg-primary-blue-light text-primary-blue font-medium",
      )}
    >
      {icon}
      {text}
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block w-[280px] border-r bg-white dark:bg-gray-950 h-screen sticky top-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-primary-dark">
            {" "}
            <Image src="/logo.png" alt="LolosASN Logo" width={160} height={160} />
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">MENU</h3>
            <SidebarLink icon={<Home className="h-5 w-5" />} text="Beranda" href="/" isActive={pathname === "/"} />
            <SidebarLink
              icon={<ShoppingBag className="h-5 w-5" />}
              text="Keranjang Tryout"
              href="/keranjang-tryout"
              isActive={pathname === "/keranjang-tryout"}
            />
            <SidebarLink
              icon={<BookOpen className="h-5 w-5" />}
              text="Tryout Saya"
              href="/tryout-saya"
              isActive={pathname === "/tryout-saya"}
            />
            <SidebarLink
              icon={<Receipt className="h-5 w-5" />}
              text="Riwayat Pembelian"
              href="/riwayat-pembelian"
              isActive={pathname === "/riwayat-pembelian"}
            />
            <SidebarLink
              icon={<User className="h-5 w-5" />}
              text="Akun saya"
              href="/akun-saya"
              isActive={pathname === "/akun-saya"}
            />
          </nav>
        </div>
      </div>
    </aside>
  )
}
