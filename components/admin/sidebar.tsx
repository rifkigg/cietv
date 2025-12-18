'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, List, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
// Import action yang baru dibuat
import { logoutAction } from "@/server/auth-actions"; 

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Berita / Posts",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    title: "Kategori",
    href: "/admin/categories",
    icon: List,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wider">ADMIN CIETV</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 p-4">
        {/* Panggil action dari file terpisah */}
        <form action={logoutAction}>
            <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors">
                <LogOut className="h-5 w-5" />
                Keluar
            </button>
        </form>
      </div>
    </div>
  );
}