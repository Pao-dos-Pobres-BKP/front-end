import { Progress } from "@/components/ui/progress";
import CampaignCard from "@/components/ui/campaignCard/campaignCard";
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

import type { Gender, User } from "@/contexts/UserContext";
import CreateAdminModal from "@/components/ui/create-admin-modal";
import { useUser } from "@/hooks/useUser";
import { usePerfil } from "./usePerfil";
import { formatCurrency } from "@/utils/formatCurrency";
import { dateUtils } from "@/utils/dateUtils";
import { formatCPF, formatPhone } from "@/utils/formatters";

interface ProfileUser extends User {
  totalDonated: number;
  percentageAchieved: number;
}

const genderMapper: Record<Gender, string> = {
  MALE: "Masculino",
  FEMALE: "Feminino",
  OTHER: "Outro",
};

const CAMPAIGNS_PAGE_SIZE = 4;

export default function Perfil() {
  const [campaignsPageSize] = useState(CAMPAIGNS_PAGE_SIZE);
  const [currentCampaignsPage, setCurrentCampaignsPage] = useState(1);
  const [currentDonationsPage, setCurrentDonationsPage] = useState(1);

  const { campaigns, campaignsTotalPages, donations, donationsTotalPages } = usePerfil({
    campaignsPage: currentCampaignsPage,
    campaignsPageSize: campaignsPageSize,
    donationsPage: currentDonationsPage,
    donationsPageSize: 10,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user: currentUser } = useUser();

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
      <div className="flex justify-center px-6 py-6">
        <div className="w-full max-w-6md bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-lg gap-4 p-4 mb-6">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={dados.photo || "https://via.placeholder.com/80"}
                alt="Foto do usuário"
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div className="flex flex-col flex-1">
                <div className="flex items-center">
                  <h2 className="text-[22px] sm:text-[27px] font-bold text-[#005172]">
                    {currentUser?.fullname}
                  </h2>
                </div>
                <div className="flex items-center mt-2">
                  <p className="text-xs sm:text-sm font-inter text-[#005172]">
                    Membro desde{" "}
                    {dateUtils.formatCompleteDate(currentUser?.createdAt ?? new Date())}
                  </p>
                </div>
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

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-0.5/3 flex flex-col gap-4">
              <div className="bg-white rounded-lg p-6 flex-1 min-h-[420px]">
                <div className="flex flex-col space-y-10">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">
                      Data de Nascimento:
                    </label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {currentUser?.birthDate ? dateUtils.formatDate(currentUser?.birthDate) : "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">Gênero:</label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {genderMapper[currentUser?.gender as Gender] ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">CPF:</label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {formatCPF(currentUser?.cpf ?? "")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">
                      Telefone:
                    </label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {formatPhone(currentUser?.phone ?? "")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">E-mail:</label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {currentUser?.email}
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
                    {formatCurrency(currentUser?.totalDonated ?? 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 items-start">
              <h3 className="text-sm font-semibold text-[#005172]">Campanhas que apoia</h3>

              <div className="flex flex-col gap-3 w-full min-h-[400px]">
                {campaigns.length > 0 ? (
                  campaigns.map((campaign, index) => (
                    <CampaignCard
                      key={index}
                      {...campaign}
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
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      size="sm"
                      onClick={
                        currentCampaignsPage === 1
                          ? undefined
                          : () => setCurrentCampaignsPage((prev) => prev - 1)
                      }
                      className={cn(
                        "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors",
                        currentCampaignsPage === 1
                          ? "bg-white text-[#F68537] border-[#F68537] cursor-not-allowed"
                          : "bg-[#F68537] text-white border-[#F68537]"
                      )}
                    >
                      Anterior
                    </PaginationPrevious>
                  </PaginationItem>

                  {Array.from({ length: campaignsTotalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        size="icon"
                        onClick={() => setCurrentCampaignsPage(i + 1)}
                        isActive={currentCampaignsPage === i + 1}
                        className={`px-3 py-1 border rounded-full transition-colors ${
                          currentCampaignsPage === i + 1
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
                        currentCampaignsPage === campaignsTotalPages
                          ? undefined
                          : () => setCurrentCampaignsPage((prev) => prev + 1)
                      }
                      className={cn(
                        "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors",
                        currentCampaignsPage === campaignsTotalPages
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

          <hr className="border-t border-[#266D88CC] mx-50 my-8" />
          <h2 className="text-2xl font-bold text-[#005172] mt-2 mb-4">Histórico de Doações</h2>

          <div className="mt-2 bg-white rounded-lg p-6 min-h-[580px] flex flex-col">
            <div className="flex flex-col gap-3 flex-1">
              {donations.map((donation, index) => (
                <CampaignCard
                  key={index}
                  variant="historic"
                  className="border border-[#005172] rounded-lg text-sm p-3"
                  title={donation.campaignName}
                  donationAmount={donation.amount}
                  periodicity={donation.periodicity}
                  campaignCreator={donation.campaignCreatedBy}
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
                        currentDonationsPage === 1
                          ? undefined
                          : () => setCurrentDonationsPage((prev) => prev - 1)
                      }
                      className={cn(
                        "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors",
                        currentDonationsPage === 1
                          ? "bg-white text-[#F68537] border-[#F68537] cursor-not-allowed"
                          : "bg-[#F68537] text-white border-[#F68537]"
                      )}
                    >
                      Anterior
                    </PaginationPrevious>
                  </PaginationItem>

                  {Array.from({ length: donationsTotalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        size="icon"
                        onClick={() => setCurrentDonationsPage(i + 1)}
                        isActive={currentDonationsPage === i + 1}
                        className={`px-3 py-1 border rounded-full transition-colors ${
                          currentDonationsPage === i + 1
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
                        currentDonationsPage === donationsTotalPages
                          ? undefined
                          : () => setCurrentDonationsPage((prev) => prev + 1)
                      }
                      className={cn(
                        "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors",
                        currentDonationsPage === donationsTotalPages
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
