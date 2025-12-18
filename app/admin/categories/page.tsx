import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import { desc } from "drizzle-orm";
import { DataTable } from "@/components/ui/data-table"; // Copy file data-table.tsx dari folder posts ke sini
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function CategoriesPage() {
  const data = await db.select().from(categories).orderBy(desc(categories.createdAt));

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Kategori</h1>
        <Link href="/admin/categories/create">
            <Button>
                <Plus className="mr-2 h-4 w-4" /> Tambah Kategori
            </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}