import { NewsArticle } from '@/types/news.types';

export const mockNews: NewsArticle[] = [
  {
    id: 1,
    title: "Breaking: Teknologi AI Terbaru Meluncur",
    excerpt: "Perusahaan teknologi besar baru saja meluncurkan inovasi terbaru dalam bidang kecerdasan buatan...",
    content: "Lorem ipsum dolor sit amet...",
    author: "Budi Santoso",
    publishedAt: "2024-01-15T10:00:00Z",
    category: "Teknologi",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    readTime: 5
  },
  {
    id: 2,
    title: "Pasar Saham Asia Menguat Signifikan",
    excerpt: "Indeks pasar saham di kawasan Asia mengalami peningkatan tajam pada perdagangan hari ini...",
    content: "Lorem ipsum dolor sit amet...",
    author: "Siti Nurhaliza",
    publishedAt: "2024-01-15T08:30:00Z",
    category: "Bisnis",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    readTime: 3
  },
  // Tambahkan lebih banyak berita...
];