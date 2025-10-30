import { Progress } from "@/components/ui/progress";
import CampaignCard from "@/components/ui/campaignCard/campaignCard";
import Input from "@/components/ui/input";
import exemplo_foto_perfil from "@/assets/exemplo_foto_perfil.jpg";
import { EditSquare } from "react-iconly";
import { cn } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useState } from "react";
import EditUserModal from "@/components/ui/edit-user-modal";
import ConfirmLogoutModal from "@/components/ui/confirm-logout-modal";

import type { User } from "@/contexts/UserContext";
import CreateAdminModal from "@/components/ui/create-admin-modal";
import { useUser } from "@/hooks/useUser";

interface ProfileUser extends User {
  totalDonated: number;
  percentageAchieved: number;
}

export default function Perfil() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const currentUser = useUser().user;

  const [dados, setDados] = useState<ProfileUser>({
    id: "1",
    role: "DONOR",
    accessToken: "fake-token-123",
    fullname: "Fulano de Tal",
    birthDate: new Date("1971-08-12"),
    gender: "MALE",
    cpf: "123.456.789-00",
    phone: "(51) 9 9999-8888",
    email: "fulanodetal@email.com.br",
    totalDonated: 2000,
    percentageAchieved: 75,
    photo: exemplo_foto_perfil,
  });

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

  type SituationType = "approved" | "pending" | "rejected" | "recurring";
  const campanhasHistorico: {
    title: string;
    creatorName: string;
    raised: number;
    goal: number;
    situation: SituationType;
  }[] = [
    {
      title: "Campanha de Santo Antônio",
      creatorName: " Fundação Pão dos Pobres Santo Antônio",
      raised: 81825.33,
      goal: 90000,
      situation: "recurring",
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: " Fundação Pão dos Pobres Santo Antônio",
      raised: 5000,
      goal: 10000,
      situation: "recurring",
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: " Fundação Pão dos Pobres Santo Antônio",
      raised: 15000,
      goal: 20000,
      situation: "approved",
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: " Fundação Pão dos Pobres Santo Antônio",
      raised: 2500,
      goal: 3000,
      situation: "approved",
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: " Fundação Pão dos Pobres Santo Antônio",
      raised: 7000,
      goal: 10000,
      situation: "approved",
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: " Fundação Pão dos Pobres Santo Antônio",
      raised: 9000,
      goal: 15000,
      situation: "approved",
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: " Fundação Pão dos Pobres Santo Antônio",
      raised: 1200,
      goal: 2000,
      situation: "approved",
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: " Fundação Pão dos Pobres Santo Antônio",
      raised: 4500,
      goal: 5000,
      situation: "approved",
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: " Fundação Pão dos Pobres Santo Antônio",
      raised: 800,
      goal: 1000,
      situation: "approved",
    },
  ];

  const totalPages = Math.ceil(campanhasHistorico.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = campanhasHistorico.slice(indexOfFirstCard, indexOfLastCard);

  const handleEditarConta = () => {
    setIsEditModalOpen(true);
  };

  const handleOpenCreateAdminModal = () => {
    setIsCreateAdminModalOpen(true);
  };

  const handleSalvarPerfil = (updatedUser: User) => {
    setDados((prev) => ({ ...prev, ...updatedUser }));
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#2F5361] font-inter">
      <div className="flex justify-center px-4 sm:px-6 lg:px-12 xl:px-8 py-8">
        <div className="w-full max-w-[2400px] bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-12 xl:p-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-lg gap-4 p-4 lg:p-0 mb-6 lg:mb-8">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={dados.photo || "https://via.placeholder.com/80"}
                alt="Foto do usuário"
                className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl md:text-[27px] font-bold text-[#005172] break-words">
                  {dados.fullname}
                </h2>
                <p className="text-xs sm:text-sm font-inter text-[#005172] mt-2">
                  Membro desde 12 de Agosto de 2023
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {currentUser?.role === "ADMIN" && (
                <button
                  onClick={handleOpenCreateAdminModal}
                  className="flex-1 sm:flex-none px-6 py-2 text-sm border rounded-xl bg-[#005172] text-white hover:bg-[#24434f] transition-colors"
                >
                  Ajustes
                </button>
              )}
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex-1 sm:flex-none px-6 py-2 text-sm border rounded-xl text-[#005172] hover:bg-[#e6f3f5] transition-colors"
              >
                Sair da Conta
              </button>
              <button
                className="p-2 rounded-md bg-[#005172] text-white hover:bg-[#24434f] flex items-center justify-center"
                onClick={handleEditarConta}
              >
                <EditSquare size="medium" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-12">
            <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-4">
              <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-0 flex-1">
                <div className="flex flex-col space-y-6 sm:space-y-8 lg:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left whitespace-nowrap">
                      Data de Nascimento:
                    </label>
                    <span className="py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.birthDate ? dados.birthDate.toLocaleDateString("pt-BR") : "—"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">Gênero:</label>
                    <span className="py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {{
                        MALE: "Masculino",
                        FEMALE: "Feminino",
                        OTHER: "Outro",
                      }[dados.gender as "MALE" | "FEMALE" | "OTHER"] ?? "—"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left whitespace-nowrap">
                      CPF:
                    </label>
                    <span className="py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.cpf}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">
                      Telefone:
                    </label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.phone}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left whitespace-nowrap">
                      E-mail:
                    </label>
                    <span className="py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left break-all">
                      {dados.email}
                    </span>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-2">
                  <span className="text-sm text-[#005172] whitespace-nowrap">
                    Quanto doou até agora:
                  </span>
                  <Progress
                    value={dados.percentageAchieved}
                    variant="blue"
                    size="medium"
                    className="flex-1"
                  />
                  <span className="text-sm text-[#005172] whitespace-nowrap">
                    {dados.totalDonated.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 items-start">
              <h3 className="text-sm font-semibold text-[#005172]">Campanhas que apoia</h3>

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
                <div className="w-full mx-auto py-8 bg-blue-100 text-[#005172] text-center font-medium border border-[#005172] rounded-lg">
                  Você ainda não apoia nenhuma campanha.
                </div>
              )}
            </div>
          </div>

          <hr className="border-t border-[#266D88CC] mx-50 my-8" />
          <h2 className="text-2xl font-bold text-[#005172] mt-2 mb-4">Histórico de Doações</h2>

          <div className="mt-2 bg-white rounded-lg p-6 min-h-[580px] flex flex-col">
            <div className="flex flex-col md:flex-row gap-3 items-center mb-6 w-full">
              <Input placeholder="Buscar..." fullWidth />

              <div className="relative w-full md:w-1/3">
                <select
                  id="filtro-doacoes"
                  className="w-full appearance-none bg-[#F68537] text-white py-2 pl-3 pr-10 rounded-md shadow-sm focus:outline-none"
                >
                  <option value="" disabled>
                    Selecione uma data
                  </option>
                  <option value="30">Últimos 30 dias</option>
                  <option value="60">Últimos 60 dias</option>
                  <option value="120">Últimos 120 dias</option>
                </select>
                <svg
                  className="w-4 h-4 text-white absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              <button className="w-full md:w-auto px-4 py-2 rounded-lg bg-[#F68537] text-white hover:bg-orange-600">
                Pesquisar
              </button>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {currentCards.map((campanha, index) => (
                <CampaignCard
                  key={index}
                  title={campanha.title}
                  creatorName={campanha.creatorName}
                  raised={campanha.raised}
                  goal={campanha.goal}
                  variant="historic"
                  situation={campanha.situation}
                  lastDonation={80}
                  className="border border-[#005172] rounded-lg text-sm p-3"
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-6">
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      size="sm"
                      onClick={
                        currentPage === 1 ? undefined : () => setCurrentPage(currentPage - 1)
                      }
                      className={cn(
                        "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors",
                        currentPage === 1
                          ? "bg-white text-[#F68537] border-[#F68537] cursor-not-allowed"
                          : "bg-[#F68537] text-white border-[#F68537]"
                      )}
                    >
                      Anterior
                    </PaginationPrevious>
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        size="icon"
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className={`px-3 py-1 border rounded-full transition-colors ${
                          currentPage === i + 1
                            ? "bg-white text-[#F68537] border-[#F68537]"
                            : "bg-[#F68537] text-white border-[#F68537]"
                        }`}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      size="sm"
                      onClick={
                        currentPage === totalPages
                          ? undefined
                          : () => setCurrentPage(currentPage + 1)
                      }
                      className={cn(
                        "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors",
                        currentPage === totalPages
                          ? "bg-white text-[#F68537] border-[#F68537] cursor-not-allowed"
                          : "bg-[#F68537] text-white border-[#F68537]"
                      )}
                    >
                      Próximo
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      <CreateAdminModal
        isModalOpen={isCreateAdminModalOpen}
        onClose={() => setIsCreateAdminModalOpen(false)}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSalvarPerfil}
        initialData={dados}
      />

      <ConfirmLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
