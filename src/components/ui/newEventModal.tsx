//Modal para a criação de nova notíca ou novo evento
import { useState, useEffect } from "react";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import Calendar from "@/assets/Calendar.svg";
import Paper from "@/assets/Paper.svg";

interface NewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dados: any) => void;
  initialData: {
    title: string;
    description?: string;
    adress?: string;
    date: string;
    hour?: string;
    link: string;
    foto?: string;
  };
}

export default function NewModal({ isOpen, onClose, onSave, initialData }: NewModalProps) {
  const [formData, setFormData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState<"evento" | "noticia">("evento");
  const [step, setStep] = useState<"tipo" | "form">("tipo");

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      setStep("tipo");
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

  const handleEscolhaTipo = (tipo: "evento" | "noticia") => {
    setCurrentPage(tipo);
    setStep("form");
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 px-2">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg mx-4 sm:mx-0">
        {step === "tipo" && (
          <>
            <h2 className="text-2xl font-bold text-[#005172] mb-6 text-center">Novo Comunicado</h2>

            <div className="flex justify-center gap-8 mb-6">
              <button
                onClick={() => handleEscolhaTipo("evento")}
                className="flex flex-col items-center p-4 border rounded-lg hover:border-[#005172] transition"
              >
                <img src={Calendar} alt="Ícone de Evento" className="w-8 h-8 mb-2" />
                <span className="text-[#005172] font-medium">Evento</span>
              </button>

              <button
                onClick={() => handleEscolhaTipo("noticia")}
                className="flex flex-col items-center p-4 border rounded-lg hover:border-[#005172] transition"
              >
                <img src={Paper} alt="Ícone de Notícia" className="w-8 h-8 mb-2" />
                <span className="text-[#005172] font-medium">Notícia</span>
              </button>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <h2 className="text-2xl font-bold text-[#005172] mb-4 text-left">
              {currentPage === "evento" ? "Novo Evento" : "Nova Notícia"}
            </h2>

            {currentPage === "evento" && (
              <>
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
                    Descrição
                    <input
                      name="description"
                      type="text"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Descrição"
                    />
                  </label>
                </div>

                <div className="mb-4 text-left">
                  <label className="text-sm font-medium text-[#005172]">
                    Localização
                    <input
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
                    Hora
                    <input
                      name="hour"
                      type="time"
                      value={formData.hour}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </label>
                </div>
              </>
            )}

            {currentPage === "noticia" && (
              <>
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
              </>
            )}

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

            <Pagination className="mt-6 flex justify-center">
              <PaginationContent className="flex gap-2">
                <PaginationItem>
                  <button
                    className={`w-3 h-3 rounded-full ${currentPage === "evento" ? "bg-[#005172]" : "bg-gray-300"}`}
                    onClick={() => setCurrentPage("evento")}
                  ></button>
                </PaginationItem>
                <PaginationItem>
                  <button
                    className={`w-3 h-3 rounded-full ${currentPage === "noticia" ? "bg-[#005172]" : "bg-gray-300"}`}
                    onClick={() => setCurrentPage("noticia")}
                  ></button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </div>
  );
}
