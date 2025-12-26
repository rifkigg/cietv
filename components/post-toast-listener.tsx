"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner"; // Ganti dengan library toast-mu (misal: "sonner" atau "@/components/ui/use-toast")

export function PostToastListener() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Ref untuk memastikan toast hanya jalan 1x per render cycle
  const hasShownToast = useRef(false);

  useEffect(() => {
    const success = searchParams.get("success");

    if (success && !hasShownToast.current) {
      // 1. Tampilkan Toast
      if (success === "created") {
        toast.success("Berita berhasil dibuat!");
      } else if (success === "updated") {
        toast.success("Berita berhasil diperbarui!");
      } else if (success === "deleted") {
        toast.success("Berita berhasil dihapus!");
      }

      // 2. Kunci agar tidak double
      hasShownToast.current = true;

      // 3. Bersihkan URL tanpa refresh halaman
      // Kita hapus param ?success=... agar kalau direfresh manual, toast gak muncul lagi
      const params = new URLSearchParams(searchParams.toString());
      params.delete("success");
      
      // Ganti URL saat ini dengan URL yang sudah bersih
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, router]);

  return null; // Komponen ini tidak merender visual apa-apa
}