//Modal para a edição de uma notícia
import { useState, useEffect } from "react";

interface EditNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dados: unknown) => void;
  initialData: {
    title: string;
    date: string;
    link: string;
    foto?: string;

  };
}

export default function EditNewsModal({ isOpen, onClose, onSave, initialData }: EditNewsModalProps) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
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
                    <input
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
                    Data
                    <input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </label>
                </div>


            <div className="mb-4 text-left">
              <label className="text-sm font-medium text-[#005172]">
                Link para site principal do Pão dos Pobres
                <input
                  name="link"
                  type="text"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="URL"
                />
              </label>
            </div>

            <div className="flex items-center gap-2 justify-center m-6">
              <label className="text-sm font-medium text-[#005172] cursor-pointer">
                <span className="px-3 py-1 border rounded-lg hover:bg-gray-100">
                  Anexar imagem
                </span>
                <input type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
              </label>
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
