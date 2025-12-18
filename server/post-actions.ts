'use server'

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// --- CREATE ---
export async function createPostAction(prevState: any, formData: FormData) {
   const title = formData.get('title') as string;
   const content = formData.get('content') as string;
   const imageUrl = formData.get('imageUrl') as string;
   const author = formData.get('author') as string;
   // Ambil categoryId dan ubah jadi number
   const categoryId = formData.get('categoryId');

   const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

   try {
     await db.insert(posts).values({
       title,
       slug,
       content,
       imageUrl,
       author,
       categoryId: categoryId ? parseInt(categoryId as string) : null, // Simpan ID Kategori
       published: true
     });

     revalidatePath('/admin/posts');
     return { success: true };
   } catch (error) {
     console.error(error);
     return { success: false, error: "Gagal membuat berita." };
   }
}

// --- UPDATE ---
export async function updatePostAction(id: number, prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const author = formData.get('author') as string;
  const categoryId = formData.get('categoryId'); // Ambil categoryId
  
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  try {
    await db.update(posts)
      .set({
        title,
        slug,
        content,
        imageUrl,
        author,
        categoryId: categoryId ? parseInt(categoryId as string) : null, // Update ID Kategori
      })
      .where(eq(posts.id, id));

    revalidatePath('/admin/posts');
    return { success: true };
  } catch (error) {
     return { success: false, error: "Gagal update berita." };
  }
}

// --- DELETE (Tetap sama) ---
export async function deletePost(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  await db.delete(posts).where(eq(posts.id, parseInt(id)));
  revalidatePath("/admin/posts");
}