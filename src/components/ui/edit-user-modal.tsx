import { useState, useEffect } from "react";

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
    };
}

export default function EditUserModal({ isOpen, onClose, onSave, initialData }: EditUserModalProps) {
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

    const handleConfirmar = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-[#005172] mb-4">Editar Perfil</h2>

                <div className="flex items-center gap-4 mb-4">
                    <img src="https://via.placeholder.com/60" alt="foto de perfil" className="w-16 h-16 rounded-full object-cover" />
                    <button className="px-3 py-1 text-sm border rounded-lg">IMG_0431 ✕</button> {/* falta arrumar, se é que vai ser mesmo possivel do usuário trocar a foto*/}
                </div>
                <label className="text-sm font-medium text-[#005172]">
                    Nome
                    <input
                        name="nome"
                        type="text"
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </label>

                <label className="text-sm font-medium text-[#005172]">
                    Data de Nascimento
                    <input
                        name="nascimento"
                        type="text"
                        value={formData.nascimento}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </label>

                <label className="text-sm font-medium text-[#005172]">
                    Gênero
                    <select
                        name="genero"
                        value={formData.genero}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        <option>Masculino</option>
                        <option>Feminino</option>
                        <option>Outro</option>
                    </select>
                </label>

                <label className="text-sm font-medium text-[#005172]">
                    CPF
                    <input
                        name="cpf"
                        type="text"
                        value={formData.cpf}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </label>

                <label className="text-sm font-medium text-[#005172]">
                    Telefone
                    <input
                        name="telefone"
                        type="text"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </label>

                <label className="text-sm font-medium text-[#005172]">
                    E-mail
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </label>

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
