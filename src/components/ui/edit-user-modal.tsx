import { useState } from "react";

export interface User {
  nome: string;
  nascimento: string;
  genero: string;
  cpf: string;
  telefone: string;
  email: string;
  foto?: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dados: User) => void;
}

export default function EditUserModal({ isOpen, onClose, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState<User>();
  const [previewFoto, setPreviewFoto] = useState("https://via.placeholder.com/60");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value } as User);
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewFoto(url);
      setFormData({ foto: url, ...formData } as User);
    }
  };

  const handleFotoRemover = () => {
    setPreviewFoto("https://via.placeholder.com/60");
    setFormData({ foto: "", ...formData } as User);
  };

  const handleConfirmar = () => {
    onSave(formData as User);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 px-2">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg mx-4 sm:mx-0">
        <h2 className="text-2xl font-bold text-[#005172] mb-4">Editar Perfil</h2>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={previewFoto}
            alt="foto de perfil"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-[#005172] cursor-pointer">
              <span className="px-3 py-1 border rounded-lg hover:bg-gray-100">Alterar Foto</span>
              <input type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
            </label>
            {previewFoto !== "https://via.placeholder.com/60" && (
              <button
                type="button"
                onClick={handleFotoRemover}
                className="px-3 py-1 border border-red-500 text-red-500 rounded-lg text-sm hover:bg-red-50"
              >
                Remover Foto
              </button>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-[#005172]">
            Nome
            <input
              name="nome"
              type="text"
              value={formData?.nome}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-[#005172]">
            Data de Nascimento
            <input
              name="nascimento"
              type="text"
              value={formData?.nascimento}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-[#005172]">
            Gênero
            <select
              name="genero"
              value={formData?.genero}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option>Masculino</option>
              <option>Feminino</option>
              <option>Outro</option>
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-[#005172]">
            CPF
            <input
              name="cpf"
              type="text"
              value={formData?.cpf}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-[#005172]">
            Telefone
            <input
              name="telefone"
              type="text"
              value={formData?.telefone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-[#005172]">
            E-mail
            <input
              name="email"
              type="email"
              value={formData?.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </label>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button className="px-6 py-2 bg-gray-300 rounded-lg" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="px-6 py-2 bg-[#005172] text-white rounded-lg"
            onClick={handleConfirmar}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
