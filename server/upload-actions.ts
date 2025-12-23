"use server";

import { uploadToCloudinary } from "@/lib/cloudinary";

export async function uploadEditorImage(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file uploaded");
  }

  // Upload ke folder khusus agar rapi
  const result = await uploadToCloudinary(file, "cietv-content");

  if (!result) {
    throw new Error("Upload failed");
  }

  // Kembalikan URL gambar
  return result.url;
}
