//Modal para a edição de um evento
import { useState, useEffect } from "react";
import Image from "@/assets/Image.svg"
import { DatePicker } from "./date-picker";
import Input from "./input";

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dados: unknown) => void;
  initialData: {
    birthDate: any;
    title: string;
    description?: string;
    adress?: string;
    date: string;
    hour?: string;
    link: string;
    foto?: string;
  };
}

export default function EditEventModal({ isOpen, onClose, onSave, initialData }: EditEventModalProps) {
  const [formData, setFormData] = useState(initialData);
  const [previewFoto, setPreviewFoto] = useState(initialData.foto || "https://via.placeholder.com/60");

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      setPreviewFoto(previewFoto);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, foto: url });
    }
  };

  const handleFotoRemover = () => {
    setPreviewFoto("https://via.placeholder.com/60");
    setFormData({ ...formData, foto: "" });
  };

  const handleConfirmar = () => {
    onSave(formData);
    onClose();
  };


  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 px-2">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg mx-4 sm:mx-0">
        <h2 className="text-2xl font-bold text-[#005172] mb-4 text-left">
          Editar evento
        </h2>
        <div className="mb-4 text-left">
          <label className="text-sm font-medium text-[#005172]">
            Título
            <Input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Título"
            />
          </label>
        </div>

        <div className="mb-4 text-left">
          <label className="text-sm font-medium text-[#005172]">
            Descrição
            <Input
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Descrição"
              maxLength={200}
            />
          </label>
          <p className="text-xs text-gray-500 text-left mt-1">
            {formData.description?.length}/200
          </p>
        </div>


        <div className="mb-4 text-left">
          <label className="text-sm font-medium text-[#005172]">
            Localização
            <Input
              name="adress"
              type="text"
              value={formData.adress}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Localização"
            />
          </label>
        </div>

        <div className="mb-4 text-left">
          <DatePicker
            label="Data"
            value={formData.birthDate ? new Date(formData.birthDate) : undefined}
            onChange={(date) =>
              setFormData((prev) => ({
                ...prev,
                birthDate: date ?? undefined,
              }))
            }
            fullWidth
          />
        </div>
        <div className="mb-4 text-left">
          <label className="text-sm font-medium text-[#005172]">
            Hora
            <Input
              name="hour"
              type="time"
              value={formData.hour}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </label>
        </div>
        <div className="mb-4 text-left">
          <label className="text-sm font-medium text-[#005172]">
            Link para site principal do Pão dos Pobres
            <Input
              name="link"
              type="text"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="URL"
            />
          </label>
        </div>


        <div className="items-center justify-center w-full">
          {formData.foto && formData.foto !== "https://via.placeholder.com/60" ? (
            <div className="flex items-center justify-between bg-[#005172] text-white rounded-lg px-4 py-2 mt-3 cursor-pointer">
              <span className="text-sm truncate max-w-[80%]">
                {formData.foto.split("/").pop()?.split("\\").pop()}
              </span>
              <button
                type="button"
                onClick={handleFotoRemover}
                className="ml-2 text-white text-lg font-bold hover:text-red-300"
              >
                ×
              </button>
            </div>
          ) : (
            <label className="text-sm font-medium text-[#005172] cursor-pointer">
              <span className="flex justify-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-100">
                <img src={Image} className="w-4 h-4" />
                Anexar Imagem
              </span>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button className="px-6 py-2 bg-gray-300 rounded-lg" onClick={onClose}>
            Cancelar
          </button>
          <button className="px-6 py-2 bg-[#005172] text-white rounded-lg" onClick={handleConfirmar}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
