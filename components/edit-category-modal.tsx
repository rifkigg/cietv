"use client";

import { useState, useEffect, useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  createCategoryAction,
  updateCategoryAction,
} from "@/server/category-actions";
import { toast } from "sonner";

// Tipe data sederhana untuk props
interface EditCategoryModalProps {
  category: {
    id: number;
    name: string;
  };
}

const initialState = { success: false, error: "" };

export function EditCategoryModal({ category }: EditCategoryModalProps) {
  const [open, setOpen] = useState(false);

  // Binding ID ke action update (karena action butuh parameter ke-1: id)
  const updateWithId = updateCategoryAction.bind(null, category.id);

  const [state, formAction, isPending] = useActionState(
    updateWithId,
    initialState
  );

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success("Kategori berhasil diperbarui!"); // Alert Sukses
    }
    if (state?.error) {
        toast.error("Gagal update kategori");
    }
  }, [state?.success, state?.error]);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state?.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Edit Kategori</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Kategori</Label>
              {/* Default Value diisi dengan nama lama */}
              <Input
                id="name"
                name="name"
                defaultValue={category.name}
                required
              />
            </div>
            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700"
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Update
    </Button>
  );
}
