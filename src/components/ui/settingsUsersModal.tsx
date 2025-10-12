import { useState, useEffect } from "react";
import { CampaignCardProfileCompact } from "./campaignCard/campaingCardProfileCompact";
import { Tabs } from "@/components/ui/tabs";
import Button from "./button";
import PlusIcon from "@/assets/Plus.svg";

interface SettingUserModalProps {
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
type UserRole = "admin" | "donor";

interface User {
    profileName: string;
    role: UserRole;
}

export default function SettingUserModal({ isOpen, onClose, onSave, initialData }: SettingUserModalProps) {
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
    const users: User[] = [
        { profileName: "Fulano de Tal", role: "admin" },
        { profileName: "Maria Silva", role: "donor" },
        { profileName: "João Santos", role: "donor" },
        { profileName: "Ana Lima", role: "admin" },
        { profileName: "Pedro Costa", role: "donor" },
    ];


    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-60 px-2">
            <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg mx-4 sm:mx-0">
                <h2 className="text-2xl font-bold text-[#005172] mb-4 text-left">Ajustes</h2>
                <div className="bg-[#CCDFE5] py-3 mt-6 text-left font-semibold -mx-6 w-auto">
                    <h2 className="px-4">Lista de usuários</h2>
                </div>
                <div className="max-h-[450px] overflow-y-auto py-3 ">
                    <div className="scale-[0.85] origin-top py-3 space-y-3 w-full">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <Tabs tabs={["Doadores", "Admin", "Todos"]} variant="secondary">
                                    <div className=" flex-wrap space-y-3 w-full space-x-10">
                                        {users
                                            .filter((u) => u.role === "donor")
                                            .map((u, index) => (
                                                <CampaignCardProfileCompact
                                                    key={index}
                                                    profileName={u.profileName}
                                                    role={u.role}
                                                />
                                            ))}
                                    </div>

                                    <div className=" flex-wrap space-y-3 w-full space-x-10">
                                        {users
                                            .filter((u) => u.role === "admin")
                                            .map((u, index) => (
                                                <CampaignCardProfileCompact
                                                    key={index}
                                                    profileName={u.profileName}
                                                    role={u.role}
                                                />
                                            ))}
                                    </div>

                                    <div className=" flex-wrap space-y-3 w-full space-x-10">
                                        {users.map((u, index) => (
                                            <CampaignCardProfileCompact
                                                key={index}
                                                profileName={u.profileName}
                                                role={u.role}
                                            />
                                        ))}
                                    </div>
                                </Tabs>
                            </div>
                            <div className="flex items-center">
                                <Button variant="primary" size="extraSmall" className="ml-2 sm:ml-4 flex-shrink-0">
                                    <img src={PlusIcon} alt="Icone-plus" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-6 py-5 bg-[#CCDFE5] -mx-6 -my-6 rounded-b-xl">
                    <Button
                        className="px-6 py-2 rounded-lg"
                        onClick={onClose}
                        size="extraSmall"
                        variant="tertiary"
                    >
                        Fechar
                    </Button>
                    <Button
                        className="px-6 py-2 rounded-lg"
                        onClick={handleConfirmar}
                        size="extraSmall"
                        variant="primary"
                    >
                        Salvar
                    </Button>
                </div>
            </div>
        </div>
    );
}
