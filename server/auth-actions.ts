"use server";

import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Definisi tipe state return (opsional tapi bagus untuk TS)
type LoginState =
  | {
      error?: string;
    }
  | undefined
  | null;

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
  const cookieStore = await cookies();

  // 1. Hapus cookie utama sesi Auth.js
  cookieStore.delete("authjs.session-token");

  // (Opsional) Hapus cookie pendukung lainnya agar bersih total
  cookieStore.delete("authjs.csrf-token");
  cookieStore.delete("authjs.callback-url");
  redirect("/");
}
