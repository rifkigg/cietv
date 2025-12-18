import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Tabel Users (Admin)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Tabel Categories (Baru)
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(), // Contoh: "Olahraga", "Politik"
  slug: text('slug').unique().notNull(), // Contoh: "olahraga", "politik"
  description: text('description'), // Opsional: deskripsi kategori
  createdAt: timestamp('created_at').defaultNow(),
});

// 3. Tabel Posts (Diperbaiki)
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  
  // PERBAIKAN: Gunakan integer, bukan serial untuk foreign key
  categoryId: integer('category_id').references(() => categories.id), 
  
  author: text('author'),
  
  // PERBAIKAN: Read time adalah angka biasa (menit), bukan serial
  readTime: integer('read_time'), 
  
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()), // Auto update
});

// --- DEFINISI RELASI (Agar mudah di-query dengan with: { ... }) ---

// Relasi: Satu Post punya Satu Category & Satu Author
export const postsRelations = relations(posts, ({ one }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
}));

// Relasi: Satu Category punya Banyak Post
export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));
