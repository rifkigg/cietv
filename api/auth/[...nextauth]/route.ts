// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/server/auth"; // Import dari file auth.ts yang kita buat tadi

export const { GET, POST } = handlers;