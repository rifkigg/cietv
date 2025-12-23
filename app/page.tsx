import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

// Helper untuk format tanggal Indonesia
function formatDate(date: Date | null) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const revalidate = 60; // Revalidate setiap 60 detik agar data fresh

export default async function HomePage() {
  // 1. Ambil Data (Published Only)
  const allPosts = await db.query.posts.findMany({
    where: eq(posts.published, true),
    orderBy: [desc(posts.createdAt)],
    with: {
      category: true,
    },
    limit: 10, // Ambil 10 berita terbaru
  });

  // Jika tidak ada data
  if (allPosts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Belum ada berita yang diterbitkan.</p>
        </div>
      </div>
    );
  }

  // 2. Bagi Data untuk Layout
  const [heroPost, ...restPosts] = allPosts;
  const sidePosts = restPosts.slice(0, 3); // 3 berita untuk sidebar
  const gridPosts = restPosts.slice(3); // Sisanya untuk grid bawah

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* --- SECTION 1: HERO & SIDEBAR --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* HERO (Kiri - Lebar 8 kolom) */}
          <div className="lg:col-span-8 group cursor-pointer">
            <Link href={`/news/${heroPost.slug}`}>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-gray-200">
                {heroPost.imageUrl ? (
                  <Image
                    src={heroPost.imageUrl}
                    alt={heroPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 hover:bg-red-700 text-white border-none">
                    {heroPost.category?.name || "News"}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> {heroPost.author || "Admin"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />{" "}
                    {formatDate(heroPost.createdAt)}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight group-hover:text-red-700 transition-colors">
                  {heroPost.title}
                </h1>
                <p className="text-gray-600 line-clamp-3 md:text-lg">
                  {heroPost.content.substring(0, 150)}...
                </p>
              </div>
            </Link>
          </div>

          {/* SIDEBAR (Kanan - Lebar 4 kolom) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold border-l-4 border-red-600 pl-3">
                Top News
              </h3>
              <Link
                href="/news"
                className="text-sm text-red-600 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              {sidePosts.map((post: any) => (
                <Link
                  href={`/news/${post.slug}`}
                  key={post.id}
                  className="group flex gap-4 items-start"
                >
                  <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                    {post.imageUrl && (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant="secondary"
                      className="w-fit text-[10px] px-1.5 py-0"
                    >
                      {post.category?.name}
                    </Badge>
                    <h4 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h4>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {formatDate(post.createdAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Iklan / Banner Kecil (Opsional) */}
            <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm mt-8 border border-dashed border-gray-400">
              Ad Space
            </div>
          </div>
        </section>

        {/* --- SECTION 2: TRENDY / LATEST GRID --- */}
        {gridPosts.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold">Latest Stories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post: any) => (
                <Link
                  href={`/news/${post.slug}`}
                  key={post.id}
                  className="group flex flex-col gap-3"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-200">
                    {post.imageUrl && (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="outline"
                        className="bg-white/90 backdrop-blur-sm border-none text-black font-normal"
                      >
                        {post.category?.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.content}
                    </p>
                    <div className="pt-2 text-red-600 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer Sederhana */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            {/* Ganti Teks dengan Gambar Logo (versi putih/filter jika perlu, atau pakai box putih) */}
            <div className="bg-white w-fit p-2 rounded-md">
              <Image
                src="/cietv.jpeg"
                alt="CIETV Logo"
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>

            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              Portal berita terdepan yang menyajikan informasi terkini, akurat,
              dan terpercaya untuk Anda setiap hari.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
