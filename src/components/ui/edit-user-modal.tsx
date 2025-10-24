import { useState, useEffect } from "react";
import type { User, Gender } from "@/contexts/UserContext";
import Modal from "@/components/ui/modal";
import Input from "./input";
import { Select } from "./select";
import { DatePicker } from "./Calendar/date-picker";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dados: User) => void;
  initialData: User;
}

export default function EditUserModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditUserModalProps) {
  const [formData, setFormData] = useState<User>(initialData);
  const [previewPhoto, setPreviewPhoto] = useState(
    initialData.photo || "https://via.placeholder.com/60"
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      setPreviewPhoto(initialData.photo || "https://via.placeholder.com/60");
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value as Gender }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewPhoto(url);
      setFormData((prev) => ({ ...prev, photo: url }));
    }
  };

  const handlePhotoRemove = () => {
    setPreviewPhoto("https://via.placeholder.com/60");
    setFormData((prev) => ({ ...prev, photo: "" }));
  };

  const handleConfirm = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 px-2">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg mx-4 sm:mx-0">
        <h2 className="block text-left text-2xl font-bold text-[#005172] mb-4">Editar Perfil</h2>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={previewPhoto}
            alt="foto de perfil"
            className="w-16 h-16 rounded-full object-cover border border-[color:var(--border-light)]"
          />
          <div className="flex flex-start gap-2">
            <label className="text-sm font-medium text-[color:var(--primary-900)] cursor-pointer">
              <span className="px-3 py-1 border border-[color:var(--border-light)] rounded-lg hover:bg-[color:var(--surface-hover)]">
                Alterar Foto
              </span>
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
            {previewPhoto !== "https://via.placeholder.com/60" && (
              <button
                type="button"
                onClick={handlePhotoRemove}
                className="px-3 py-1 border border-[color:var(--danger-border)] text-[color:var(--danger-text)] rounded-lg text-sm hover:bg-[color:var(--danger-hover)] transition-colors duration-200"
              >
                Remover Foto
              </button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <Input
            id="fullname"
            name="fullname"
            label="Nome"
            value={formData.fullname || ""}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <div className="mb-4">
          <DatePicker
            label="Data de Nascimento"
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

        <div className="mb-4">
          <Select
            id="gender"
            label="Gênero"
            options={[
              { value: "MALE", label: "Masculino" },
              { value: "FEMALE", label: "Feminino" },
              { value: "OTHER", label: "Outro" },
            ]}
            value={formData.gender || ""}
            onChange={handleGenderChange}
            fullWidth
            placeholder="Selecione um gênero"
          />
        </div>

        <div className="mb-4">
          <Input
            id="cpf"
            name="cpf"
            label="CPF"
            value={formData.cpf || ""}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <div className="mb-4">
          <Input
            id="phone"
            name="phone"
            label="Telefone"
            value={formData.phone || ""}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <div className="mb-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="E-mail"
            value={formData.email || ""}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-6 py-2 bg-[color:var(--surface-muted)] rounded-lg hover:bg-[color:var(--surface-hover)] cursor-pointer transition-colors duration-200"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="px-6 py-2 bg-[color:var(--primary-700)] text-[color:var(--text-on-primary)] rounded-lg hover:bg-[color:var(--primary-600)] cursor-pointer transition-colors duration-200"
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>

        <div className="flex flex-col items-center mt-4">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="text-[color:var(--danger-text)] text-sm underline hover:text-[color:var(--warning-text)] cursor-pointer transition-colors duration-200"
          >
            Apagar minha conta
          </button>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        variant="delete-account"
        onConfirm={() => {
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
}
