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
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PostFormProps {
  actionHandler: (prevState: any, formData: FormData) => Promise<any>;
  categories: { id: number; name: string }[];
  initialData?: any;
  buttonLabel: string;
}

export default function PostForm({ actionHandler, categories, initialData, buttonLabel }: PostFormProps) {
  const router = useRouter();
  const [state, action, isPending] = useActionState(actionHandler, null);
  
  // State untuk preview gambar saat user memilih file
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.imageUrl || null);

  useEffect(() => {
    if (state?.success) {
      router.push('/admin/posts');
      router.refresh();
    }
  }, [state, router]);

  // Fungsi handle perubahan input file untuk preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

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

      {/* KATEGORI */}
      <div className="grid gap-2">
        <Label>Kategori</Label>
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

      {/* --- IMAGE UPLOAD (PERUBAHAN DI SINI) --- */}
      <div className="grid gap-2">
        <Label htmlFor="image">Gambar Thumbnail</Label>
        
        {/* Input File */}
        <Input 
          id="image" 
          name="image" 
          type="file" 
          accept="image/*" // Hanya terima gambar
          onChange={handleFileChange}
          className="cursor-pointer"
        />
        <p className="text-xs text-gray-500">Maksimal ukuran file disarankan di bawah 2MB.</p>

        {/* Preview Gambar */}
        {previewUrl && (
            <div className="mt-2 relative w-full h-48 border rounded-md overflow-hidden bg-gray-100">
                <Image 
                    src={previewUrl} 
                    alt="Preview" 
                    fill 
                    className="object-cover"
                />
            </div>
        )}
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

      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Batal
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Mengupload..." : buttonLabel}
        </Button>
      </div>
    </form>
  );
}