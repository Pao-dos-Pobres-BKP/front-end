import { useState, useEffect } from "react";
import CampaignCard from "@/components/ui/campaignCard/campaignCard";
import exemplo_foto_perfil from "@/assets/exemplo_foto_perfil.jpg";
import { EditSquare } from "react-iconly";

import EditUserModal from "@/components/ui/edit-user-modal";
import ConfirmLogoutModal from "@/components/ui/confirm-logout-modal";
import SettingUserModal from "@/components/ui/settingsUsersModal";

import { Label } from "@radix-ui/react-label";
import ConfirmDeleteAccount from "@/components/ui/modal";
import Button from "@/components/ui/button";


const mockAdminData = {
  nome: "Fulano de Tal (ADMIN LOGADO)",
  nascimento: "12 de Agosto de 1971",
  genero: "Masculino",
  cpf: "123.456.789-00",
  telefone: "(51) 9 9999-8888",
  email: "fulanodetal@email.com.br",
  totalDonated: 2000,
  percentageAchieved: 75,
  foto: exemplo_foto_perfil,
};

const mockTargetData = {
  nome: "Ciclano de Oliveira (DOADOR)",
  nascimento: "01 de Janeiro de 1990",
  genero: "Feminino",
  cpf: "000.111.222-33",
  telefone: "(21) 7 7777-6666",
  email: "ciclano@email.com.br",
  totalDonated: 500,
  percentageAchieved: 25,
  foto: "https://via.placeholder.com/80?text=DOADOR",
};


export default function PerfilAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);


  const [isViewingOwnProfile, setIsViewingOwnProfile] = useState(true);


  const [dados, setDados] = useState(mockAdminData);


  useEffect(() => {
    if (isViewingOwnProfile) {
      setDados(mockAdminData);
    } else {
      setDados(mockTargetData);
    }
    setIsModalOpen(false);
    setIsLogoutModalOpen(false);
    setUserModalOpen(false);
  }, [isViewingOwnProfile]);


  const campanhas = [
    {
      title: "Campanha de Santo Antônio",
      creatorName: "Fundação Pão dos Pobres Santo Antônio",
      raised: 81825.33,
      goal: 90000,
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: "Fundação Pão dos Pobres Santo Antônio",
      raised: 81825.33,
      goal: 90000,
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: "Fundação Pão dos Pobres Santo Antônio",
      raised: 81825.33,
      goal: 90000,
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: "Fundação Pão dos Pobres Santo Antônio",
      raised: 81825.33,
      goal: 90000,
    },
  ];

  const handleEditarConta = () => {
    setIsModalOpen(true);
  };

  const handleSalvarPerfil = (novosDados: any) => {
    setDados(novosDados);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const handleAjustes = () => {
    setUserModalOpen(true);
  };

  const handleExcluirConta = () => {
    setIsDeleteAccountOpen(true);
  }


  const showSelfControls = isViewingOwnProfile;
  const showAdminControls = !isViewingOwnProfile;


  return (
    <div className="min-h-screen bg-[#2F5361] font-inter">
      <div className="flex justify-center px-6 py-6">
        <div className="w-full max-w-6md bg-white rounded-xl shadow-lg p-4">

          {/* Botão de Teste para Alternar as Visões */}
          <button
            onClick={() => setIsViewingOwnProfile(prev => !prev)}
            className="mb-4 px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Alternar para: {isViewingOwnProfile ? "Visão de Gestão (Outro Usuário)" : "Visão Própria"}
          </button>
          {/* Final do Botão de Teste */}


          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-lg gap-4 p-4 mb-6">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={dados.foto || "https://via.placeholder.com/80"}
                alt="Foto do usuário"
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div className="flex flex-col flex-1">
                <div className="flex items-center">
                  <h2 className="text-[22px] sm:text-[27px] font-bold text-[#005172]">
                    {dados.nome}
                  </h2>
                </div>
                <div className="flex items-center mt-2">
                  <p className="text-xs sm:text-sm font-inter text-[#005172]">
                    Membro desde 12 de Agosto de 2023
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">

              {showSelfControls && (
                <>
                  <Button
                    variant="senary"
                    size="extraSmall"
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="px-3 py-1 border border-red-500 text-red-500 rounded-lg text-sm hover:bg-red-50"
                  >
                    Sair da Conta
                  </Button>
                  <Button
                    variant="primary"
                    size="extraSmall"
                    onClick={handleAjustes}
                  >
                    Ajustes
                  </Button>
                </>
              )}

              {showAdminControls && (
                <Button
                  variant="destructive"
                  size="small"
                  onClick={handleExcluirConta}
                >
                  Exlcuir perfil
                </Button>
              )}

              <Button
                variant="primary"
                size="extraSmall"
                onClick={handleEditarConta}
              >
                <EditSquare size="medium" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-0.5/3 flex flex-col gap-4">
              <div className="bg-white rounded-lg p-6 flex-1 min-h-[420px]">
                <div className="flex flex-col space-y-10">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-[#005172] text-left">
                      Data de Nascimento:
                    </Label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.nascimento}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-[#005172] text-left">
                      Gênero:
                    </Label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.genero}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-[#005172] text-left">
                      CPF:
                    </Label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.cpf}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-[#005172] text-left">
                      Telefone:
                    </Label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.telefone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-[#005172] text-left">
                      E-mail:
                    </Label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 items-start">
              <h3 className="text-sm font-semibold text-[#005172]">
                Campanhas que apoia
              </h3>

              {campanhas.length > 0 ? (
                campanhas.map((campanha, index) => (
                  <CampaignCard
                    key={index}
                    title={campanha.title}
                    creatorName={campanha.creatorName}
                    raised={campanha.raised}
                    goal={campanha.goal}
                    variant="compact"
                    situation="recurring"
                    className="border border-[#005172] rounded-lg text-sm p-3"
                  />
                ))
              ) : (
                <div className="w-full mx-auto py-8 rounded-lg bg-blue-100 text-[#005172] text-center font-medium border border-[#005172] rounded-lg">
                  Você ainda não apoia nenhuma campanha.
                </div>
              )}
            </div>
          </div>

          <EditUserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSalvarPerfil}
            initialData={dados}
          />

          <ConfirmLogoutModal
            isOpen={isLogoutModalOpen}
            onClose={() => setIsLogoutModalOpen(false)}
            onConfirm={handleConfirmLogout}
          />
          <SettingUserModal
            isOpen={isUserModalOpen}
            onClose={() => setUserModalOpen(false)}
            onSave={handleAjustes}
            initialData={dados}

          />
          <ConfirmDeleteAccount
            isOpen={isDeleteAccountOpen}
            onClose={() => setIsDeleteAccountOpen(false)}
            onConfirm={handleExcluirConta} variant={"delete-account"}
          />
        </div>
      </div>
    </div>
  );
}