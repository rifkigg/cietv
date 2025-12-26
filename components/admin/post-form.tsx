"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RichTextEditor from "../rich-text-editor";

interface PostFormProps {
  actionHandler: (prevState: any, formData: FormData) => Promise<any>;
  categories: { id: number; name: string }[];
  initialData?: any;
  buttonLabel: string;
}

export default function PostForm({
  actionHandler,
  categories,
  initialData,
  buttonLabel,
}: PostFormProps) {
  const router = useRouter();
  const [state, action, isPending] = useActionState(actionHandler, null);
  const [content, setContent] = useState(initialData?.content || "");

  // State untuk preview gambar
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl || null
  );

  // Handler file tetap sama sesuai kodemu
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <form
      action={action}
      className="max-w-4xl mx-auto bg-white border rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6 md:p-8 space-y-8">
        {/* --- JUDUL BERITA --- */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base font-semibold">
            Judul Berita
          </Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={initialData?.title || ""}
            placeholder="Masukkan judul berita utama..."
            className="text-lg py-5"
          />
        </div>

        {/* --- GRID: KATEGORI & AUTHOR (2 Kolom) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kategori */}
          <div className="space-y-2">
            <Label>Kategori</Label>
            <Select
              name="categoryId"
              defaultValue={initialData?.categoryId?.toString()}
            >
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

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author">Penulis</Label>
            <Input
              id="author"
              name="author"
              defaultValue={initialData?.author || "Admin"}
              placeholder="Nama penulis..."
            />
          </div>
        </div>

        {/* --- IMAGE UPLOAD (LOGIKA TETAP SAMA) --- */}
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Label htmlFor="image" className="font-semibold">
            Gambar Thumbnail
          </Label>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Input Wrapper */}
            <div className="w-full md:w-1/2 space-y-2">
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer bg-white"
              />
              <p className="text-xs text-muted-foreground">
                Format: JPG, PNG, WEBP. Maksimal ukuran 2MB.
              </p>
            </div>

            {/* Preview Wrapper */}
            {previewUrl ? (
              <div className="relative w-full md:w-1/2 h-48 rounded-md overflow-hidden border shadow-sm">
                <Image
                  src={previewUrl}
                  alt="Preview Thumbnail"
                  fill
                  className="object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
            ) : (
              <div className="hidden md:flex items-center justify-center w-1/2 h-20 bg-gray-100 rounded text-gray-400 text-sm border">
                Belum ada gambar
              </div>
            )}
          </div>
        </div>

        {/* --- RICH TEXT EDITOR (LOGIKA TETAP SAMA) --- */}
        <div className="space-y-3">
          <Label className="font-semibold">Konten Berita</Label>
          <div className="border rounded-md min-h-[300px]">
            {/* Component Editor Visual */}
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          {/* Input Hidden Wajib untuk Server Action */}
          <input type="hidden" name="content" value={content} />
        </div>

        {/* Error Message */}
        {state?.error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
            ⚠️ {state.error}
          </div>
        )}
      </div>

      {/* --- BUTTONS ACTION (Sticky Bottom style) --- */}
      <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="min-w-[100px]"
        >
          Batal
        </Button>
        <Button type="submit" disabled={isPending} className="min-w-[120px]">
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              Menyimpan...
            </span>
          ) : (
            buttonLabel
          )}
        </Button>
      </div>
    </form>
  );
}
