import { useState, useEffect } from "react";
import Image from "@/assets/Image.svg";
import { DatePicker } from "./Calendar/date-picker";
import Input from "./input";

interface EditNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: unknown) => void;
  initialData: {
    title: string;
    date: Date;
    link: string;
    photo?: string;
  };
}

export default function EditNewsModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditNewsModalProps) {
  const [formData, setFormData] = useState(initialData);
  const [, setPreviewPhoto] = useState(
    initialData.photo || "https://via.placeholder.com/60"
  );

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      setPreviewPhoto(initialData.photo || "https://via.placeholder.com/60");
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, photo: url });
      setPreviewPhoto(url);
    }
  };

  const handlePhotoRemove = () => {
    setPreviewPhoto("https://via.placeholder.com/60");
    setFormData({ ...formData, photo: "" });
  };

  const handleConfirm = () => {
    onSave(formData);
    onClose();
  };


  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 px-2">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg mx-4 sm:mx-0">
        <h2 className="text-2xl font-bold text-[#005172] mb-4 text-left">
          Editar notícia
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
          <DatePicker
            label="Data"
            value={formData.date}
            onChange={(date) =>
              setFormData((prev) => ({
                ...prev,
                date: date ?? new Date(),
              }))
            }
            fullWidth
          />
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
        <div className="flex items-center justify-center w-full mb-6 mt-6">
          {formData.photo && formData.photo !== "https://via.placeholder.com/60" ? (
            <div className="flex items-center justify-between bg-[#005172] text-white rounded-xl px-4 py-3 cursor-pointer w-full h-12">
              <span className="text-sm truncate max-w-[80%]">
                {formData.photo.split("/").pop()?.split("\\").pop()}
              </span>
              <button
                type="button"
                onClick={handlePhotoRemove}
                className="ml-2 text-white text-lg font-bold hover:text-red-300"
              >
                ×
              </button>
            </div>
          ) : (
            <label className="text-sm font-medium text-[#005172] cursor-pointer w-full">
              <span className="flex justify-center items-center gap-2 px-4 py-3 border border-[#005172] rounded-xl hover:bg-gray-100 w-full h-12">
                <img src={Image} className="w-5 h-5" />
                Anexar Imagem
              </span>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button className="px-6 py-2 bg-gray-300 rounded-lg" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="px-6 py-2 bg-[#005172] text-white rounded-lg"
            onClick={handleConfirm}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
