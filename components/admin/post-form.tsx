'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Tipe props untuk komponen ini
interface PostFormProps {
  actionHandler: (prevState: any, formData: FormData) => Promise<any>;
  categories: { id: number; name: string }[]; // Data kategori untuk dropdown
  initialData?: any; // Data awal (untuk Edit)
  buttonLabel: string;
}

export default function PostForm({ actionHandler, categories, initialData, buttonLabel }: PostFormProps) {
  const router = useRouter();
  const [state, action, isPending] = useActionState(actionHandler, null);

  useEffect(() => {
    if (state?.success) {
      router.push('/admin/posts');
      router.refresh();
    }
  }, [state, router]);

  return (
    <form action={action} className="space-y-6 border p-6 rounded-lg shadow-sm bg-white">
      
      {/* JUDUL */}
      <div className="grid gap-2">
        <Label htmlFor="title">Judul Berita</Label>
        <Input 
          id="title" 
          name="title" 
          required 
          defaultValue={initialData?.title || ''} 
          placeholder="Judul berita..."
        />
      </div>

      {/* KATEGORI (DROPDOWN) */}
      <div className="grid gap-2">
        <Label>Kategori</Label>
        {/* name="categoryId" penting agar terbaca oleh FormData */}
        <Select name="categoryId" defaultValue={initialData?.categoryId?.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* AUTHOR */}
      <div className="grid gap-2">
        <Label htmlFor="author">Penulis</Label>
        <Input 
          id="author" 
          name="author" 
          defaultValue={initialData?.author || 'Admin'} 
        />
      </div>

      {/* IMAGE URL */}
      <div className="grid gap-2">
        <Label htmlFor="imageUrl">URL Gambar</Label>
        <Input 
          id="imageUrl" 
          name="imageUrl" 
          defaultValue={initialData?.imageUrl || ''} 
          placeholder="https://..."
        />
      </div>

      {/* CONTENT */}
      <div className="grid gap-2">
        <Label htmlFor="content">Isi Berita</Label>
        <Textarea 
          id="content" 
          name="content" 
          className="min-h-[200px]" 
          required 
          defaultValue={initialData?.content || ''} 
        />
      </div>

      {/* ERROR MESSAGE */}
      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      {/* BUTTONS */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Batal
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : buttonLabel}
        </Button>
      </div>
    </form>
  );
}