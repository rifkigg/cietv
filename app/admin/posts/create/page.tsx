import { createPostAction } from "@/server/post-actions";
import PostForm from "@/components/admin/post-form";
import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";

export default async function CreatePostPage() {
  // 1. Ambil semua kategori untuk dropdown
  const categoriesData = await db.select().from(categories);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Tulis Berita Baru</h1>
      
      <PostForm 
        actionHandler={createPostAction} 
        categories={categoriesData} // Kirim data kategori
        buttonLabel="Publish Berita"
      />
    </div>
  );
}