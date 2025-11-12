import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import type { NewsAPI } from "@/services/news";
import type { EventAPI } from "@/services/events";

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

type EditNewsEventModalProps =
  | {
      type: "news";
      open: boolean;
      onOpenChange: (open: boolean) => void;
      data: NewsAPI | null;
      onSave: (data: {
        id: string;
        title: string;
        description: string;
        date: string;
        location: string;
        url: string;
      }) => Promise<void> | void;
      onDeleteRequest: () => void;
    }
  | {
      type: "event";
      open: boolean;
      onOpenChange: (open: boolean) => void;
      data: EventAPI | null;
      onSave: (data: {
        id: string;
        title: string;
        description: string;
        dateStart: string;
        dateEnd: string;
        location: string;
        url: string;
      }) => Promise<void> | void;
      onDeleteRequest: () => void;
    };

export const EditNewsEventModal: React.FC<EditNewsEventModalProps> = (props) => {
  const { type, open, onOpenChange, data, onSave } = props;

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
      title: "Editar Notícia",
      buttonColor: "bg-[#F68537] hover:bg-[#e5782e]",
    },
    event: {
      title: "Editar Evento",
      buttonColor: "bg-[#24A254] hover:bg-[#1e8a47]",
    },
  }[type];

  useEffect(() => {
    if (data && open) {
      if (type === "news") {
        const newsData = data as NewsAPI;
        setForm({
          title: newsData.title,
          description: newsData.description,
          date: newsData.date.split("T")[0],
          dateStart: "",
          dateEnd: "",
          location: newsData.location,
          url: DEFAULT_URLS.NEWS,
        });
      } else {
        const eventData = data as EventAPI;
        setForm({
          title: eventData.title,
          description: eventData.description,
          date: "",
          dateStart: eventData.dateStart.split("T")[0],
          dateEnd: eventData.dateEnd.split("T")[0],
          location: eventData.location,
          url: DEFAULT_URLS.EVENT,
        });
      }
    }
  }, [data, open, type]);

  function resetAll() {
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

  function handleChange(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: "" }));
    }
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
    if (type === "news" && form.description.length > VALIDATION_RULES.DESCRIPTION_MAX_LENGTH) {
      newErrors.description = `Descrição deve ter no máximo ${VALIDATION_RULES.DESCRIPTION_MAX_LENGTH} caracteres`;
    }

    if (type === "news") {
      if (!form.date) {
        newErrors.date = "Data é obrigatória";
      }
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (!form.dateStart) {
        newErrors.dateStart = "Data de início é obrigatória";
      } else {
        const startDate = new Date(form.dateStart);
        startDate.setHours(0, 0, 0, 0);

        if (startDate <= today) {
          newErrors.dateStart = "Data de início deve ser a partir de amanhã";
        }
      }

      if (!form.dateEnd) {
        newErrors.dateEnd = "Data de término é obrigatória";
      }

      if (form.dateStart && form.dateEnd && !newErrors.dateStart && !newErrors.dateEnd) {
        const startDate = new Date(form.dateStart);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(form.dateEnd);
        endDate.setHours(0, 0, 0, 0);

        if (endDate < startDate) {
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
    if (!data) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (type === "news") {
        await (
          onSave as (data: {
            id: string;
            title: string;
            description: string;
            date: string;
            location: string;
            url: string;
          }) => Promise<void>
        )({
          id: data.id,
          title: form.title,
          description: form.description,
          date: new Date(form.date).toISOString(),
          location: form.location,
          url: DEFAULT_URLS.NEWS,
        });
      } else {
        await (
          onSave as (data: {
            id: string;
            title: string;
            description: string;
            dateStart: string;
            dateEnd: string;
            location: string;
            url: string;
          }) => Promise<void>
        )({
          id: data.id,
          title: form.title,
          description: form.description,
          dateStart: new Date(form.dateStart).toISOString(),
          dateEnd: new Date(form.dateEnd).toISOString(),
          location: form.location,
          url: DEFAULT_URLS.EVENT,
        });
      }
      resetAll();
      onOpenChange(false);
    } catch (error) {
      console.error(`Erro ao salvar ${type === "news" ? "notícia" : "evento"}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o: boolean) => {
        if (!o) resetAll();
        onOpenChange(o);
      }}
    >
      <DialogContent
        className="bg-white border-none max-w-2xl max-h-[90vh] overflow-y-auto p-6"
        showCloseButton={false}
      >
        <DialogTitle className="text-2xl font-bold text-[#034d6b] mb-6">{config.title}</DialogTitle>

        <div className="space-y-4">
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

          {type === "news" ? (
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

        <div className="pt-4 flex flex-col gap-3">
          <div className="flex gap-2 justify-center">
            <Button
              variant="senary"
              size="small"
              onClick={() => {
                resetAll();
                onOpenChange(false);
              }}
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
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditNewsEventModal;
