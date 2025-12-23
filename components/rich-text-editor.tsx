"use client";

import React, { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { uploadEditorImage } from "@/server/upload-actions"; // Import server action tadi

// Import ReactQuill secara dinamis
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  { ssr: false }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  // Kita butuh ref untuk mengakses instance Quill editor
  const quillRef = useRef<any>(null);

  // HANDLER KHUSUS IMAGE
  const imageHandler = () => {
    // 1. Buat elemen input file secara virtual
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // 2. Ketika user memilih file
    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      // 3. Upload ke server (via Server Action)
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Panggil server action yang kita buat di langkah 1
        const url = await uploadEditorImage(formData);

        // 4. Masukkan URL gambar ke dalam Editor
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        // Insert embed image di posisi kursor
        editor.insertEmbed(range.index, "image", url);
        // Pindahkan kursor ke sebelah kanan gambar
        editor.setSelection(range.index + 1);
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Gagal mengupload gambar. Silakan coba lagi.");
      }
    };
  };

  // PENTING: useMemo agar modules tidak di-render ulang setiap ketik (bikin hilang fokus)
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"], // Ada tombol image sekarang
          ["clean"],
        ],
        handlers: {
          image: imageHandler, // Pasang handler custom kita
        },
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image", // Jangan lupa daftarkan format 'image'
  ];

  return (
    <div className="bg-white">
      <ReactQuill
        ref={quillRef} // Pasang Ref disini
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="h-96 mb-12" // Sedikit lebih tinggi biar enak edit gambar
      />
    </div>
  );
}
