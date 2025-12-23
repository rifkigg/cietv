import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Search, Bell } from "lucide-react";
import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links"; // <--- Import component baru

export async function Navbar() {
  const categoryList = await db.select().from(categories);

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO & MOBILE MENU */}
        <div className="flex items-center gap-4">
          <MobileNav categories={categoryList} />

          <Link href="/" className="flex items-center">
            <Image
              src="/cietv.jpeg"
              alt="CIETV Logo"
              width={120}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* NAVIGATION (DESKTOP) - PANGGIL DISINI */}
        <NavLinks categories={categoryList} />

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5 text-gray-500" />
          </Button>
          <Link href="/admin/posts">
            <Button
              variant="default"
              size="sm"
              className="rounded-full px-6 bg-red-600 hover:bg-red-700"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
