'use server'

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary"; // Import helper tadi

// --- CREATE ---
export async function createPostAction(prevState: any, formData: FormData) {
   const title = formData.get('title') as string;
   const content = formData.get('content') as string;
   const author = formData.get('author') as string;
   const categoryId = formData.get('categoryId');
   const imageFile = formData.get('image') as File; 

   const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

   try {
     // 1. Upload ke Cloudinary
     let imageUrl = null;
     if (imageFile && imageFile.size > 0) {
        const uploadResult = await uploadToCloudinary(imageFile, "cietv/berita");
        if (uploadResult) {
            imageUrl = uploadResult.url; // Kita simpan URL dari Cloudinary
        }
     }

     // 2. Simpan ke Database
     await db.insert(posts).values({
       title,
       slug,
       content,
       imageUrl, 
       author,
       categoryId: categoryId ? parseInt(categoryId as string) : null,
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
  // 1. Validasi ID
  if (!id) {
    return { success: false, error: "ID Berita tidak ditemukan." };
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;
  const categoryId = formData.get('categoryId');
  const imageFile = formData.get('image') as File;
  
  // Buat slug baru jika judul berubah
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  try {
    const updateData: any = {
      title,
      slug,
      content,
      author,
      categoryId: categoryId ? parseInt(categoryId as string) : null,
    };

    // --- LOGIKA GAMBAR ---
    // Pastikan file benar-benar ada dan memiliki ukuran (bukan file kosong)
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        console.log("Mulai upload gambar update...", imageFile.name); // Debugging
        
        const uploadResult = await uploadToCloudinary(imageFile, "cietv/berita");
        
        if (uploadResult) {
             updateData.imageUrl = uploadResult.url;
             console.log("Upload berhasil:", uploadResult.url);
        } else {
             throw new Error("Gagal upload ke Cloudinary");
        }
    }

    // Update DB
    await db.update(posts)
      .set(updateData)
      .where(eq(posts.id, id));

    revalidatePath('/admin/posts');
    return { success: true };

  } catch (error) {
     // PENTING: Log error ke terminal VS Code agar kita tahu alasannya
     console.error("ERROR UPDATE POST:", error); 
     return { success: false, error: "Gagal update berita. Cek terminal server." };
  }
}

// Delete Post (Masih sama)
export async function deletePost(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  // Tips: Kalau mau pro, di sini bisa tambah logika hapus gambar di Cloudinary juga pakai API delete
  await db.delete(posts).where(eq(posts.id, parseInt(id)));
  revalidatePath("/admin/posts");
}