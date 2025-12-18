import { db } from "@/db/drizzle";
import { posts, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/post-form";
import { updatePostAction } from "@/server/post-actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) return notFound();

  // 1. Ambil Data Postingan
  const postResult = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
  const post = postResult[0];

  if (!post) return notFound();

  // 2. Ambil Semua Kategori (untuk dropdown)
  const categoriesData = await db.select().from(categories);

  // 3. Bind ID ke action update
  const updateActionWithId = updatePostAction.bind(null, post.id);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Berita</h1>
      
      <PostForm 
        actionHandler={updateActionWithId}
        initialData={post}      // Data berita lama
        categories={categoriesData} // Data kategori
        buttonLabel="Update Berita"
      />
    </div>
  );
}