"use server";

import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// Definisi tipe state return (opsional tapi bagus untuk TS)
type LoginState = {
  error?: string;
} | undefined | null;

export async function loginAction(prevState: LoginState, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin/posts", // Redirect ke admin setelah sukses
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau Password salah!" };
        default:
          return { error: "Terjadi kesalahan sistem." };
      }
    }
    throw error; // Next.js butuh throw error untuk redirect
  }
}

export async function logoutAction() {
  // Di sini nanti logika logout sesungguhnya (misal: await signOut())
  console.log("Proses Logout di Server...");
  
  // Setelah logout, redirect ke halaman login atau home
  redirect("/");
}