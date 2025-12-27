"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"; // Shadcn Input
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils"; // Pastikan ada fungsi cn

interface SearchInputProps {
    className?: string; // Tambahkan ini
}

export function SearchInput({ className }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") || "");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic search kamu...
  };

  return (
    <form onSubmit={onSearch} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari tokoh, topik atau peristiwa..."
        // Gabungkan className default dengan className dari props
        className={cn(
            "pl-10 w-full focus-visible:ring-blue-600 focus-visible:ring-offset-0",
            className 
        )}
      />
    </form>
  );
}