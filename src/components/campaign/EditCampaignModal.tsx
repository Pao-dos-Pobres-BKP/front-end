import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FormStep } from "./steps";
import { updateCampaignSchema } from "@/schemas/campaign";
import { z } from "zod";
import type { CampaignBase } from "@/types/Campaign";

interface EditCampaignModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  campaign: CampaignBase | null; // preloaded campaign
  onSave: (data: {
    id: string;
    title: string;
    description: string;
    targetValue: number;
    image?: File | null;
  }) => Promise<void> | void;
  onDeleteRequest: () => void; // triggers external delete modal
}

const currencyMask = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const number = (parseInt(digits, 10) || 0) / 100;
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const EditCampaignModal: React.FC<EditCampaignModalProps> = ({
  open,
  onOpenChange,
  campaign,
  onSave,
  onDeleteRequest,
}) => {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    targetValue: "",
    imageName: "" as string | null,
  });
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (campaign && open) {
      setForm({
        title: campaign.title,
        description: campaign.description,
        targetValue: currencyMask(String(campaign.targetValue * 100)), // assume value already numeric
        imageName: campaign.image?.name || campaign.image?.url || "",
      });
    }
  }, [campaign, open]);

  function resetAll() {
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
    if (!campaign) return null;
    try {
      const parsed = updateCampaignSchema.parse({
        id: campaign.id,
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

    await onSave({
      id: parsed.id,
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
          Editar Campanha
        </DialogTitle>
        <FormStep
          form={form}
          onChange={handleChange}
          onImageSelect={handleImage}
          onBack={() => {
            resetAll();
            onOpenChange(false);
          }}
          onNext={handleSubmit}
          stepOverride={1}
          totalStepsOverride={1}
        />
        <div className="text-center">
          <button
            type="button"
            onClick={onDeleteRequest}
            className="text-sm text-red-600 hover:cursor-pointer underline"
          >
            Excluir esta campanha
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default EditCampaignModal;
