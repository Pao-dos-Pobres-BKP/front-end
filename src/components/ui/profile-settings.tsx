import { useState, useEffect } from "react";
import { CampaignCardProfileCompact } from "./campaignCard/campaingCardProfileCompact";
import { Tabs } from "@/components/ui/tabs";
import Button from "./button";
import PlusIcon from "@/assets/Plus.svg";
import CreateAdminModal from "./create-admin-modal";

interface ProfileSettingsModalProps {
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

export default function ProfileSettingsModal({ isOpen, onClose, onSave, initialData }: ProfileSettingsModalProps) {
    const [formData, setFormData] = useState(initialData);
    const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData);
        }
    }, [isOpen, initialData]);

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

    const handleOpenCreateAdminModal = () => {
        setIsCreateAdminModalOpen(true);
    };

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-60 px-2">
            <CreateAdminModal
                isModalOpen={isCreateAdminModalOpen}
                onClose={() => setIsCreateAdminModalOpen(false)}
            />
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg mx-4 sm:mx-0">
                <h2 className="text-2xl font-bold text-[#005172] m-4 text-left">Ajustes</h2>
                <div className="flex items-center justify-between bg-[#CCDFE5] w-full text-left font-semibold">
                    <h2 className="m-4">Lista de usuários</h2>
                    <div>
                        <Button variant="primary" size="extraSmall" className="flex-shrink-0 mx-4" onClick={handleOpenCreateAdminModal}>
                            <img className="invert" src={PlusIcon} alt="Icone-plus" />
                        </Button>
                    </div>
                </div>
                <div className="max-h-[450px] overflow-y-auto">
                    <div className="m-4">
                        <div className="flex flex-wrap items-center justify-between">
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
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-6 py-5 bg-[#CCDFE5] rounded-b-xl">
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