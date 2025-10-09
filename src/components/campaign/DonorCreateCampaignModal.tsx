import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AgreementStep, FormStep, PasswordStep } from "./steps";
import { createCampaignSchema, passwordSchema } from "@/schemas/campaign";
import { z } from "zod";

interface DonorCreateCampaignModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (data: {
    title: string;
    description: string;
    targetValue: number;
    image?: File | null;
    password: string;
  }) => Promise<void> | void;
}

const currencyMask = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const number = (parseInt(digits, 10) || 0) / 100;
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const DonorCreateCampaignModal: React.FC<DonorCreateCampaignModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    targetValue: "",
    imageName: "" as string | null,
  });
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [password, setPassword] = React.useState("");
  const [, setErrors] = React.useState<Record<string, string>>({});

  function resetAll() {
    setStep(1);
    setForm({ title: "", description: "", targetValue: "", imageName: "" });
    setImageFile(null);
    setPassword("");
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

  function validatePassword() {
    try {
      passwordSchema.parse({ password });
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors({ password: e.issues[0]?.message || "Senha inválida" });
      }
      return false;
    }
  }

  async function handleSubmit() {
    const parsed = validateForm();
    if (!parsed) return;
    if (!validatePassword()) return;
    await onSubmit({
      title: parsed.title,
      description: parsed.description,
      targetValue: parsed.targetValue,
      image: imageFile ?? null,
      password,
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
        {step === 1 && <AgreementStep onNext={() => setStep(2)} />}
        {step === 2 && (
          <FormStep
            form={form}
            onChange={handleChange}
            onImageSelect={handleImage}
            onBack={() => setStep(1)}
            onNext={() => {
              const ok = validateForm();
              if (ok) setStep(3);
            }}
            stepOverride={2}
            totalStepsOverride={3}
          />
        )}
        {step === 3 && (
          <PasswordStep
            password={password}
            onChange={setPassword}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            confirmLabel="Solicitar"
            stepOverride={3}
            totalStepsOverride={3}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
export default DonorCreateCampaignModal;
