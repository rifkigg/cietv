import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { PostCard } from "@/components/post-card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60; // Refresh data setiap 60 detik (ISR)

export default async function HomePage() {
  // 1. Ambil data berita yang published, urutkan terbaru
  // Kita gunakan db.query agar relasi category otomatis terambil
  const allPosts = await db.query.posts.findMany({
    where: eq(posts.published, true),
    orderBy: [desc(posts.createdAt)],
    with: {
      category: true, // Join tabel kategori
    },
    limit: 10, // Ambil 10 berita terbaru
  });

  // Pisahkan berita utama (index 0) dan berita lainnya
  const [featuredPost, ...otherPosts] = allPosts;

  return (
    <main className="min-h-screen bg-white pb-20">
      
      {/* NAVBAR SEDERHANA (Bisa dipisah ke layout.tsx) */}
      <header className="border-b bg-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-black text-blue-700 tracking-tighter">CIETV NEWS</h1>
            <Link href="/login" className="text-sm font-medium hover:text-blue-600">Login Admin</Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        
        {/* Jika belum ada berita sama sekali */}
        {allPosts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                <h2 className="text-2xl font-semibold">Belum ada berita.</h2>
                <p>Silakan login ke admin panel untuk membuat berita baru.</p>
            </div>
        )}

        {/* SECTION 1: HEADLINE / FEATURED POST */}
        {featuredPost && (
          <section className="mb-12">
            <Link href={`/berita/${featuredPost.slug}`} className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Gambar Besar */}
              <div className="md:col-span-8 relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                 {featuredPost.imageUrl ? (
                    <Image
                        src={featuredPost.imageUrl}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                    />
                 ) : (
                    <div className="flex h-full items-center justify-center bg-gray-200">No Image</div>
                 )}
              </div>

              {/* Teks Headline */}
              <div className="md:col-span-4 flex flex-col justify-center gap-4">
                 <div className="flex items-center gap-2">
                    <Badge className="bg-red-600 hover:bg-red-700">TERBARU</Badge>
                    {featuredPost.category && (
                        <span className="text-sm font-bold text-blue-600 uppercase tracking-wide">
                            {featuredPost.category.name}
                        </span>
                    )}
                 </div>
                 
                 <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 group-hover:text-blue-700 transition-colors">
                    {featuredPost.title}
                 </h2>
                 
                 <p className="text-gray-500 line-clamp-3 md:line-clamp-4">
                    {featuredPost.content} {/* Nanti bisa kita strip HTML tags nya */}
                 </p>

                 <div className="text-sm text-gray-400 mt-2">
                    {formatDate(featuredPost.createdAt)} • {featuredPost.author}
                 </div>
              </div>
            </Link>
          </section>
        )}

        {/* SECTION 2: LATEST NEWS GRID */}
        {otherPosts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6 border-b pb-2">
                <h3 className="text-2xl font-bold text-gray-800">Berita Lainnya</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {otherPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}