import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FormStep } from "./steps";
import { updateCampaignSchema } from "@/schemas/campaign";
import { z } from "zod";
import type { CampaignBase } from "@/types/Campaign";

interface CampaignWithDates extends CampaignBase {
  startDate?: string;
  endDate?: string;
}

interface EditCampaignModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  campaign: CampaignBase | null; // preloaded campaign
  onSave: (data: {
    id: string;
    title: string;
    description: string;
    targetValue: number;
    endDate: Date;
    image?: File | null;
    password: string;
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
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [password, setPassword] = React.useState("");
  const [, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    console.log("🔔 EditCampaignModal useEffect:", { open, campaign: campaign?.title });
    if (campaign && open) {
      console.log("✅ Modal ABERTO com campanha:", campaign);
      const campaignWithDates = campaign as CampaignWithDates;
      setForm({
        title: campaign.title,
        description: campaign.description,
        targetValue: currencyMask(String(campaign.targetValue * 100)), // assume value already numeric
        imageName: campaign.image?.name || campaign.image?.url || "",
        startDate: campaignWithDates.startDate ? new Date(campaignWithDates.startDate) : undefined,
        endDate: campaignWithDates.endDate ? new Date(campaignWithDates.endDate) : undefined,
      });
    } else {
      console.log("❌ Modal não aberto:", { open, hasCampaign: !!campaign });
    }
  }, [campaign, open]);

  function resetAll() {
    setPassword("");
    setErrors({});
  }
  function handleChange(field: string, value: string) {
    if (field === "targetValue") value = currencyMask(value);
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleDateChange(field: "startDate" | "endDate", value: Date | undefined) {
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

    if (!form.endDate) {
      alert("A data de término é obrigatória");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const endDateOnly = new Date(form.endDate);
    endDateOnly.setHours(0, 0, 0, 0);

    if (endDateOnly < tomorrow) {
      alert("A data de término deve ser no mínimo amanhã");
      return;
    }

    await onSave({
      id: parsed.id,
      title: parsed.title,
      description: parsed.description,
      targetValue: parsed.targetValue,
      endDate: form.endDate,
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
          Editar Campanha
        </DialogTitle>
        <FormStep
          form={form}
          onChange={handleChange}
          onDateChange={handleDateChange}
          onImageSelect={handleImage}
          onBack={() => {
            resetAll();
            onOpenChange(false);
          }}
          onNext={handleSubmit}
          stepOverride={1}
          totalStepsOverride={1}
          showDates={true}
          isEditMode={true}
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
