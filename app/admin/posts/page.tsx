import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Halaman ini bersifat Async Server Component
export default async function PostsPage() {
  // PERBAIKAN: Gunakan db.query agar bisa mengambil data relasi (category)
  const data = await db.query.posts.findMany({
    orderBy: [desc(posts.createdAt)],
    with: {
      category: true, // Ambil data kategori yang berelasi
    },
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Berita</h1>

        {/* Tombol Create */}
        <Link href="/admin/posts/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Berita
          </Button>
        </Link>
      </div>

      {/* 2. Render Tabel dengan data */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
