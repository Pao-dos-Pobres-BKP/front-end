import { useState, useEffect } from "react";
import ConfirmDeleteAccountModal from "./confirm-delete-account";

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (dados: any) => void;
    initialData: {
        nome: string;
        nascimento: string;
        genero: string;
        cpf: string;
        telefone: string;
        email: string;
        foto?: string;
    };
}

export default function EditUserModal({ isOpen, onClose, onSave, initialData }: EditUserModalProps) {
    const [formData, setFormData] = useState(initialData);
    const [previewFoto, setPreviewFoto] = useState(initialData.foto || "https://via.placeholder.com/60");
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    useEffect(() => {
        if (isOpen) {
            setFormData(initialData);
            setPreviewFoto(initialData.foto || "https://via.placeholder.com/60");
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
            setPreviewFoto(url);
            setFormData({ ...formData, foto: url });
        }
    };

    const handleFotoRemove = () => {
        setPreviewFoto("https://via.placeholder.com/60");
        setFormData({ ...formData, foto: "" });
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
                        src={previewFoto}
                        alt="foto de perfil"
                        className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-[#005172] cursor-pointer">
                            <span className="px-3 py-1 border rounded-lg hover:bg-gray-100">
                                Alterar Foto
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFotoChange}
                                className="hidden"
                            />
                        </label>
                        {previewFoto !== "https://via.placeholder.com/60" && (
                            <button
                                type="button"
                                onClick={handleFotoRemove}
                                className="px-3 py-1 border border-red-500 text-red-500 rounded-lg text-sm hover:bg-red-50"
                            >
                                Remover Foto
                            </button>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-[#005172]">
                        Nome
                        <input
                            name="nome"
                            type="text"
                            value={formData.nome}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-[#005172]">
                        Data de Nascimento
                        <input
                            name="nascimento"
                            type="text"
                            value={formData.nascimento}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-[#005172]">
                        Gênero
                        <div className="relative">
                            <select
                                name="genero"
                                value={formData.genero}
                                onChange={handleChange}
                                className="w-full px-3 py-2 pr-10 border rounded-lg appearance-none"
                            >
                                <option>Masculino</option>
                                <option>Feminino</option>
                                <option>Outro</option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-[#005172]">
                        CPF
                        <input
                            name="cpf"
                            type="text"
                            value={formData.cpf}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-[#005172]">
                        Telefone
                        <input
                            name="telefone"
                            type="text"
                            value={formData.telefone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-[#005172]">
                        E-mail
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </label>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <button className="px-6 py-2 bg-gray-300 rounded-lg" onClick={onClose}>
                        Cancelar
                    </button>
                    <button
                        className="px-6 py-2 bg-[#005172] text-white rounded-lg"
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <button
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        className="text-[#D65E5E] text-sm underline hover:text-red-600"
                    >
                        Apagar minha conta
                    </button>
                </div>
            </div>
            <ConfirmDeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => {
                    // lógica de exclusão da conta
                    setShowDeleteModal(false);
                }}
            />
        </div>
    );
}
