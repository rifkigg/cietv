// src/db/seed.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users } from '@/db/schema'; // Pastikan path ini sesuai dengan file schema kamu
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config({ path: '.env' }); 

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

const main = async () => {
  console.log('🌱 Sedang melakukan seeding data admin...');

  // 1. Hash Password (sangat penting!)
  // Password aslinya: 'cietv12345'
  const hashedPassword = await bcrypt.hash('cietv12345', 12);

  try {
    // 2. Masukkan data ke tabel users
    await db.insert(users).values({
      name: 'admin',
      email: 'admin@cietv.com',
      password: hashedPassword, 
    });

    console.log('✅ Seeding berhasil! User admin telah dibuat.');
  } catch (error) {
    console.error('❌ Seeding gagal:', error);
  }
  
  process.exit(0);
};

main();