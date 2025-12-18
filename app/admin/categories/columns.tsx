"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { deleteCategoryAction } from "@/server/category-actions"

export type Category = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date | null;
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Nama Kategori",
  },
  {
    accessorKey: "slug",
    header: "Slug URL",
    cell: ({ row }) => <span className="text-gray-500 italic">{row.getValue("slug")}</span>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            
            <DropdownMenuItem asChild>
                <Link href={`/admin/categories/${category.id}/edit`} className="cursor-pointer flex items-center">
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </Link>
            </DropdownMenuItem>
            
            <form action={deleteCategoryAction}>
                <input type="hidden" name="id" value={category.id} />
                <button type="submit" className="w-full">
                    <DropdownMenuItem className="text-red-600 cursor-pointer">
                        <Trash className="mr-2 h-4 w-4" /> Hapus
                    </DropdownMenuItem>
                </button>
            </form>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]