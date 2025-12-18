import { Sidebar } from "@/components/admin/sidebar";
import { MobileNav } from "@/components/admin/mobile-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      
      {/* 1. Sidebar Desktop (Hanya muncul di layar MD ke atas) */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      {/* 2. Header Mobile (Hanya muncul di layar kecil) */}
      <div className="md:hidden sticky top-0 z-50">
        <MobileNav />
      </div>

      {/* 3. Konten Utama */}
      {/* md:pl-64 artinya di desktop konten geser ke kanan 64 unit untuk tempat sidebar */}
      <main className="flex-1 md:pl-64">
        <div className="p-4 md:p-8">
            {children}
        </div>
      </main>
      
    </div>
  );
}