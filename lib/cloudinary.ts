import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: File, folder: string = "cietv-news"): Promise<{ url: string; public_id: string } | null> {
  if (!file || file.size === 0) return null;

  // 1. Convert File ke Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 2. Upload menggunakan Promise (karena sdk cloudinary pakai callback style)
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: folder, // Nama folder di dashboard Cloudinary
        resource_type: "auto", // Bisa gambar, video, dll
        transformation: [
            { quality: "auto", fetch_format: "auto" } // Otomatis optimasi size & format (webp/avif)
        ]
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
          return;
        }
        
        if (result) {
            resolve({
                url: result.secure_url, // URL https yang aman
                public_id: result.public_id
            });
        }
      }
    ).end(buffer); // Eksekusi upload stream
  });
}