import Link from "next/link";
import Image from "next/image"; // <--- Jangan lupa import ini
import { Button } from "./ui/button";
import { Search, Menu, Bell } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
            </Button>
            
            <Link href="/" className="flex items-center">
                {/* Menggunakan Logo dari public/cietv.jpeg */}
                <Image 
                    src="/cietv.jpeg" 
                    alt="CIETV Logo" 
                    width={120}  // Lebar dasar (resolusi render)
                    height={50}  // Tinggi dasar
                    className="h-10 w-auto object-contain" // CSS: Tinggi fix 40px, lebar menyesuaikan
                    priority // Agar logo di-load paling duluan
                />
            </Link>
        </div>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="text-black hover:text-red-600 transition font-bold">Home</Link>
            <Link href="/news" className="hover:text-red-600 transition">News</Link>
            <Link href="/sports" className="hover:text-red-600 transition">Sports</Link>
            <Link href="/tech" className="hover:text-red-600 transition">Technology</Link>
            <Link href="/opinion" className="hover:text-red-600 transition">Opinion</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <Search className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Bell className="h-5 w-5 text-gray-500" />
            </Button>
            <Link href="/admin/posts">
                <Button variant="default" size="sm" className="rounded-full px-6 bg-red-600 hover:bg-red-700">
                    Login
                </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}