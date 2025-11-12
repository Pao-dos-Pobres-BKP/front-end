import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/button";

const VALIDATION_RULES = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 128,
  DESCRIPTION_MIN_LENGTH: 10,
  DESCRIPTION_MAX_LENGTH: 2048,
} as const;

const DEFAULT_URLS = {
  NEWS: "https://www.paodospobres.org.br/noticias/",
  EVENT: "https://www.paodospobres.org.br/eventos/",
} as const;

interface CreateNewsEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (
    type: "news" | "event",
    data:
      | { title: string; description: string; date: string; location: string; url: string }
      | {
          title: string;
          description: string;
          dateStart: string;
          dateEnd: string;
          location: string;
          url: string;
        }
  ) => Promise<void> | void;
}

export const CreateNewsEventModal: React.FC<CreateNewsEventModalProps> = ({
  open,
  onOpenChange,
  onCreate,
}) => {
  const [selectedType, setSelectedType] = React.useState<"news" | "event">("news");
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    date: "",
    dateStart: "",
    dateEnd: "",
    location: "",
    url: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const config = {
    news: {
      title: "Criar Notícia",
      buttonColor: "bg-[#F68537] hover:bg-[#e5782e]",
      typeLabel: "Notícia",
    },
    event: {
      title: "Criar Evento",
      buttonColor: "bg-[#24A254] hover:bg-[#1e8a47]",
      typeLabel: "Evento",
    },
  }[selectedType];

  useEffect(() => {
    if (!open) {
      setSelectedType("news");
      setForm({
        title: "",
        description: "",
        date: "",
        dateStart: "",
        dateEnd: "",
        location: "",
        url: "",
      });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [open]);

  function handleChange(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: "" }));
    }
  }

  function handleTypeChange(type: "news" | "event") {
    setSelectedType(type);
    setForm((f) => ({ ...f, date: "", dateStart: "", dateEnd: "" }));
    setErrors({});
  }

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (form.title.length < VALIDATION_RULES.TITLE_MIN_LENGTH) {
      newErrors.title = `Título deve ter pelo menos ${VALIDATION_RULES.TITLE_MIN_LENGTH} caracteres`;
    }
    if (form.title.length > VALIDATION_RULES.TITLE_MAX_LENGTH) {
      newErrors.title = `Título deve ter no máximo ${VALIDATION_RULES.TITLE_MAX_LENGTH} caracteres`;
    }

    if (form.description.length < VALIDATION_RULES.DESCRIPTION_MIN_LENGTH) {
      newErrors.description = `Descrição deve ter pelo menos ${VALIDATION_RULES.DESCRIPTION_MIN_LENGTH} caracteres`;
    }
    if (
      selectedType === "news" &&
      form.description.length > VALIDATION_RULES.DESCRIPTION_MAX_LENGTH
    ) {
      newErrors.description = `Descrição deve ter no máximo ${VALIDATION_RULES.DESCRIPTION_MAX_LENGTH} caracteres`;
    }

    if (selectedType === "news") {
      if (!form.date) {
        newErrors.date = "Data é obrigatória";
      }
    } else {
      // Get today's date as string for comparison
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      if (!form.dateStart) {
        newErrors.dateStart = "Data de início é obrigatória";
      } else {
        const startDate = new Date(form.dateStart);
        const startDateStr = `${startDate.getUTCFullYear()}-${String(startDate.getUTCMonth() + 1).padStart(2, "0")}-${String(startDate.getUTCDate()).padStart(2, "0")}`;

        if (startDateStr <= todayStr) {
          newErrors.dateStart = "Data de início deve ser a partir de amanhã";
        }
      }

      if (!form.dateEnd) {
        newErrors.dateEnd = "Data de término é obrigatória";
      }

      if (form.dateStart && form.dateEnd && !newErrors.dateStart && !newErrors.dateEnd) {
        const startDate = new Date(form.dateStart);
        const startDateStr = `${startDate.getUTCFullYear()}-${String(startDate.getUTCMonth() + 1).padStart(2, "0")}-${String(startDate.getUTCDate()).padStart(2, "0")}`;

        const endDate = new Date(form.dateEnd);
        const endDateStr = `${endDate.getUTCFullYear()}-${String(endDate.getUTCMonth() + 1).padStart(2, "0")}-${String(endDate.getUTCDate()).padStart(2, "0")}`;

        if (endDateStr < startDateStr) {
          newErrors.dateEnd = "Data de término não pode ser anterior à data de início";
        }
      }
    }

    if (!form.location.trim()) {
      newErrors.location = "Local é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (selectedType === "news") {
        await onCreate("news", {
          title: form.title,
          description: form.description,
          date: new Date(form.date).toISOString(),
          location: form.location,
          url: DEFAULT_URLS.NEWS,
        });
      } else {
        await onCreate("event", {
          title: form.title,
          description: form.description,
          dateStart: new Date(form.dateStart).toISOString(),
          dateEnd: new Date(form.dateEnd).toISOString(),
          location: form.location,
          url: DEFAULT_URLS.EVENT,
        });
      }
      onOpenChange(false);
    } catch (error) {
      console.error(`Erro ao criar ${selectedType === "news" ? "notícia" : "evento"}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-white border-none max-w-2xl max-h-[90vh] overflow-y-auto p-6"
        showCloseButton={false}
      >
        <DialogTitle className="text-2xl font-bold text-[#034d6b] mb-6">{config.title}</DialogTitle>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#034d6b] mb-1.5">
              Tipo <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleTypeChange("news")}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  selectedType === "news"
                    ? "bg-[#F68537] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Notícia
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("event")}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  selectedType === "event"
                    ? "bg-[#24A254] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Evento
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#034d6b] mb-1.5">
              Título <span className="text-red-500">*</span>
            </label>
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Digite o título"
              className={`w-full h-10 ${errors.title ? "border-red-500" : ""}`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#034d6b] mb-1.5">
              Descrição <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Digite a descrição"
              rows={3}
              className={`w-full resize-none ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {selectedType === "news" ? (
            <div>
              <label className="block text-sm font-semibold text-[#034d6b] mb-1.5">
                Data <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className={`w-full h-10 ${errors.date ? "border-red-500" : ""}`}
              />
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-[#034d6b] mb-1.5">
                  Início <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={form.dateStart}
                  onChange={(e) => handleChange("dateStart", e.target.value)}
                  className={`w-full h-10 ${errors.dateStart ? "border-red-500" : ""}`}
                />
                {errors.dateStart && (
                  <p className="text-xs text-red-500 mt-1">{errors.dateStart}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#034d6b] mb-1.5">
                  Término <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={form.dateEnd}
                  onChange={(e) => handleChange("dateEnd", e.target.value)}
                  className={`w-full h-10 ${errors.dateEnd ? "border-red-500" : ""}`}
                />
                {errors.dateEnd && <p className="text-xs text-red-500 mt-1">{errors.dateEnd}</p>}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#034d6b] mb-1.5">
              Local <span className="text-red-500">*</span>
            </label>
            <Input
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Digite o local"
              className={`w-full h-10 ${errors.location ? "border-red-500" : ""}`}
            />
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
          </div>
        </div>

        <div className="pt-4 flex gap-2 justify-center">
          <Button
            variant="senary"
            size="small"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            variant="quaternary"
            size="small"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={config.buttonColor}
          >
            {isSubmitting ? "Criando..." : "Criar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewsEventModal;
