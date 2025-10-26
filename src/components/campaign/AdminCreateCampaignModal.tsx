import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FormStep } from "./steps";
import { createCampaignSchema } from "@/schemas/campaign";
import { z } from "zod";

interface AdminCreateCampaignModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (data: {
    title: string;
    description: string;
    targetValue: number;
    image?: File | null;
  }) => Promise<void> | void;
}

const currencyMask = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const number = (parseInt(digits, 10) || 0) / 100;
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const AdminCreateCampaignModal: React.FC<AdminCreateCampaignModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    targetValue: "",
    imageName: "" as string | null,
  });
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [, setErrors] = React.useState<Record<string, string>>({});

  function resetAll() {
    setForm({ title: "", description: "", targetValue: "", imageName: "" });
    setImageFile(null);
    setErrors({});
  }
  function handleChange(field: string, value: string) {
    if (field === "targetValue") value = currencyMask(value);
    setForm((f) => ({ ...f, [field]: value }));
  }
  function handleImage(file: File | null) {
    setImageFile(file);
    setForm((f) => ({ ...f, imageName: file?.name || "" }));
  }
  function validateForm() {
    try {
      const parsed = createCampaignSchema.parse({
        title: form.title,
        description: form.description,
        targetValue: Number(form.targetValue.replace(/[^0-9,-]/g, "").replace(",", ".")),
        image: imageFile ?? null,
      });
      return parsed;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        e.issues.forEach((i) => {
          if (i.path[0]) fieldErrors[i.path[0] as string] = i.message;
        });
        setErrors(fieldErrors);
      }
      return null;
    }
  }

  async function handleSubmit() {
    const parsed = validateForm();
    if (!parsed) return;

    await onSubmit({
      title: parsed.title,
      description: parsed.description,
      targetValue: parsed.targetValue,
      image: imageFile ?? null,
    });
    resetAll();
    onOpenChange(false);
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(o: boolean) => {
        if (!o) resetAll();
        onOpenChange(o);
      }}
    >
      <DialogContent className="bg-white border-none max-w-3xl" showCloseButton={false}>
        <DialogTitle className="text-2xl font-semibold text-[var(--color-components)]">
          Nova Campanha
        </DialogTitle>
        <FormStep
          form={form}
          onChange={handleChange}
          onImageSelect={handleImage}
          onNext={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
export default AdminCreateCampaignModal;
