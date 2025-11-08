import CampaignCard from "@/components/ui/campaignCard/campaignCard";
import { CampaignCardProfileCompact } from "@/components/ui/campaignCard/campaingCardProfileCompact";
import exemplo_foto_perfil from "@/assets/exemplo_foto_perfil.jpg";
import { Setting } from "react-iconly";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/search-bar";

import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EditUserModal from "@/components/ui/edit-user-modal";
import ConfirmLogoutModal from "@/components/ui/confirm-logout-modal";

import type { Gender, User } from "@/contexts/UserContext";
import CreateAdminModal from "@/components/ui/create-admin-modal";
import { useUser } from "@/hooks/useUser";
import { usePerfil } from "./usePerfil";
import { formatCurrency } from "@/utils/formatCurrency";
import { dateUtils } from "@/utils/dateUtils";
import { formatCPF, formatPhone } from "@/utils/formatters";
import { ROUTES } from "@/constant/routes";
import { getDonors, type DonorItem, updateDonor, type UpdateDonorData } from "@/services/donors";
import { listAdmins, type AdminItem } from "@/services/admin";
import { DonorDetailsModal } from "@/components/ui/donor-details-modal";
import { AdminDetailsModal } from "@/components/ui/admin-details-modal";
import { toast } from "sonner";

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
const USERS_PAGE_SIZE = 10;

type UserListItem = { type: "donor"; data: DonorItem } | { type: "admin"; data: AdminItem };

type UserFilter = "all" | "donors" | "admins";

export default function Perfil() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [campaignsPageSize] = useState(CAMPAIGNS_PAGE_SIZE);
  const [currentCampaignsPage, setCurrentCampaignsPage] = useState(1);
  const [currentDonationsPage, setCurrentDonationsPage] = useState(1);
  const [currentUsersPage, setCurrentUsersPage] = useState(1);
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [allUsers, setAllUsers] = useState<UserListItem[]>([]);
  const [usersTotalPages, setUsersTotalPages] = useState(1);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userFilter, setUserFilter] = useState<UserFilter>("all");

  const [selectedDonor, setSelectedDonor] = useState<DonorItem | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminItem | null>(null);
  const [isDonorDetailsOpen, setIsDonorDetailsOpen] = useState(false);
  const [isAdminDetailsOpen, setIsAdminDetailsOpen] = useState(false);
  const [isDonorEditOpen, setIsDonorEditOpen] = useState(false);

  const {
    campaigns,
    campaignsTotalPages,
    donations,
    donationsTotalPages,
    handleDeleteAccount,
    handleUpdateAccount,
    handleCancelDonation,
  } = usePerfil({
    campaignsPage: currentCampaignsPage,
    campaignsPageSize: campaignsPageSize,
    donationsPage: currentDonationsPage,
    donationsPageSize: 10,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user: currentUser, logout, setUser } = useUser();
  const isAdmin = currentUser?.role === "ADMIN";

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
    // Clear all user data and authToken from localStorage
    logout();
    setIsLogoutModalOpen(false);
    // Redirect to login page
    navigate(ROUTES.login);
  };

  const handleAccountDeletion = async () => {
    if (!currentUser) return;
    await handleDeleteAccount(currentUser.id, currentUser.role);
    // Clear all user data and logout
    logout();
  };

  const handleAccountUpdate = async (updatedUser: User) => {
    if (!currentUser) return;

    try {
      await handleUpdateAccount(currentUser.id, updatedUser);

      // Update the user context with the new data
      setUser({ ...currentUser, ...updatedUser });
      // Update local state
      setDados((prev) => ({ ...prev, ...updatedUser }));

      toast.success(
        isAdmin
          ? "Perfil de administrador atualizado com sucesso!"
          : "Perfil atualizado com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil. Tente novamente.");
      throw error;
    }
  };

  // Convert DonorItem to User for EditUserModal
  const donorToUser = (donor: DonorItem): User => ({
    id: donor.id,
    fullname: donor.fullName,
    email: donor.email,
    birthDate: new Date(donor.birthDate),
    gender: donor.gender,
    phone: donor.phone,
    cpf: donor.cpf,
    role: "DONOR",
    accessToken: "", // Not needed for editing
    totalDonated: 0,
    createdAt: new Date(donor.createdAt),
  });

  const handleEditDonor = () => {
    setIsDonorDetailsOpen(false);
    setIsDonorEditOpen(true);
  };

  const handleUpdateDonor = async (userData: User) => {
    if (!selectedDonor) return;

    try {
      const updateData: UpdateDonorData = {
        fullName: userData.fullname,
        email: userData.email,
        birthDate:
          userData.birthDate instanceof Date
            ? userData.birthDate.toISOString().split("T")[0]
            : userData.birthDate,
        gender: userData.gender,
        phone: userData.phone?.replace(/\D/g, "").startsWith("55")
          ? `+${userData.phone.replace(/\D/g, "")}`
          : `+55${userData.phone?.replace(/\D/g, "")}`,
        cpf: userData.cpf?.replace(/\D/g, ""),
      };

      await updateDonor(selectedDonor.id, updateData);
      toast.success("Doador atualizado com sucesso!");

      // Refresh the users list
      fetchUsers();
      setIsDonorEditOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar doador:", error);
      toast.error("Erro ao atualizar doador. Tente novamente.");
      throw error;
    }
  };

  // Fetch users (donors and admins) for admin
  const fetchUsers = useCallback(async () => {
    if (!isAdmin) return;

    try {
      setLoadingUsers(true);

      // Fetch both donors and admins
      const [donorsResponse, adminsResponse] = await Promise.all([
        getDonors(1, 100), // Get all donors (adjust if needed)
        listAdmins(1, 100), // Get all admins (adjust if needed)
      ]);

      // Combine and sort by name
      const combinedUsers: UserListItem[] = [
        ...donorsResponse.data.map((donor) => ({ type: "donor" as const, data: donor })),
        ...adminsResponse.data.map((admin) => ({ type: "admin" as const, data: admin })),
      ].sort((a, b) => {
        const nameA = a.data.fullName;
        const nameB = b.data.fullName;
        return nameA.localeCompare(nameB);
      });

      setAllUsers(combinedUsers);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoadingUsers(false);
    }
  }, [isAdmin]);

  // Filter and paginate users based on search and tab
  useEffect(() => {
    if (!isAdmin) return;

    const searchTerm = searchParams.get("search")?.toLowerCase() || "";

    // Filter by tab
    let filtered = allUsers;
    if (userFilter === "donors") {
      filtered = allUsers.filter((u) => u.type === "donor");
    } else if (userFilter === "admins") {
      filtered = allUsers.filter((u) => u.type === "admin");
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((u) => u.data.fullName.toLowerCase().includes(searchTerm));
    }

    // Paginate
    const totalPages = Math.ceil(filtered.length / USERS_PAGE_SIZE);
    const startIndex = (currentUsersPage - 1) * USERS_PAGE_SIZE;
    const endIndex = startIndex + USERS_PAGE_SIZE;
    const paginatedUsers = filtered.slice(startIndex, endIndex);

    setUsers(paginatedUsers);
    setUsersTotalPages(totalPages);
  }, [allUsers, userFilter, searchParams, currentUsersPage, isAdmin]);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentUsersPage(1);
  }, [userFilter, searchParams]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
              <div className="flex flex-col flex-1">
                <div className="flex items-center">
                  <h2 className="text-[22px] sm:text-[27px] font-bold text-[#005172]">
                    {currentUser?.fullname}
                  </h2>
                </div>
                <div className="flex items-center mt-2">
                  <p className="text-xs sm:text-sm font-inter text-[#005172]">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {isAdmin && (
                <button
                  onClick={handleOpenCreateAdminModal}
                  className="flex-1 sm:flex-none px-6 py-2 text-sm border rounded-xl bg-[#005172] text-white hover:bg-[#24434f] transition-colors"
                >
                  Criar administrador
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
                title="Configurações do perfil"
              >
                <Setting set="bold" size="medium" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-12">
            {isAdmin ? (
              <div className="w-full flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-[#005172]">Lista de Usuários</h3>

                <div className="flex justify-center w-full">
                  <div className="flex items-center p-1 rounded-[6px] bg-[var(--color-components)] w-fit">
                    {[
                      { label: "Todos", value: "all" as UserFilter },
                      { label: "Doadores", value: "donors" as UserFilter },
                      { label: "Administradores", value: "admins" as UserFilter },
                    ].map(({ label, value }) => {
                      const isActive = userFilter === value;
                      return (
                        <button
                          key={value}
                          className={`cursor-pointer px-2 sm:px-3 py-[6px] rounded min-w-[70px] sm:min-w-[80px] transition-colors ${
                            isActive
                              ? "bg-white text-[var(--color-components)]"
                              : "bg-[var(--color-components)] text-white"
                          }`}
                          onClick={() => setUserFilter(value)}
                        >
                          <span className="text-xs sm:text-sm font-medium">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full">
                  <SearchBar />
                </div>

                {loadingUsers ? (
                  <div className="flex flex-col gap-3 w-full min-h-[200px]">
                    <div className="w-full py-8 text-center text-[#005172]">
                      Carregando usuários...
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-3 w-full min-h-[200px]">
                      {users.length > 0 ? (
                        users.map((user) => (
                          <CampaignCardProfileCompact
                            key={user.data.id}
                            profileName={user.data.fullName}
                            role={user.type === "donor" ? "donor" : "admin"}
                            email={user.data.email}
                            showRole={true}
                            onAction={() => {
                              if (user.type === "donor") {
                                setSelectedDonor(user.data);
                                setIsDonorDetailsOpen(true);
                              } else {
                                setSelectedAdmin(user.data);
                                setIsAdminDetailsOpen(true);
                              }
                            }}
                          />
                        ))
                      ) : (
                        <div className="w-full mx-auto py-8 bg-blue-100 text-[#005172] text-center font-medium border border-[#005172] rounded-lg">
                          Nenhum usuário encontrado.
                        </div>
                      )}
                    </div>
                    <Pagination
                      currentPage={currentUsersPage}
                      totalPages={usersTotalPages}
                      onPageChange={setCurrentUsersPage}
                    />
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-4">
                  <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-0 flex-1">
                    <div className="flex flex-col space-y-6 sm:space-y-8 lg:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <label className="text-sm font-medium text-[#005172] text-left whitespace-nowrap">
                          Data de Nascimento:
                        </label>
                        <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                          {currentUser?.birthDate
                            ? dateUtils.formatDate(currentUser?.birthDate)
                            : "—"}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <label className="text-sm font-medium text-[#005172] text-left">
                          Gênero:
                        </label>
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
                        <label className="text-sm font-medium text-[#005172] text-left">
                          E-mail:
                        </label>
                        <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                          {currentUser?.email}
                        </span>
                      </div>
                    </div>

                    <div className="mt-10 flex items-center gap-2">
                      <span className="text-sm text-[#005172] whitespace-nowrap">
                        Quanto doou até agora:
                      </span>
                      <span className="text-sm text-[#005172] whitespace-nowrap">
                        {formatCurrency(currentUser?.totalDonated ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-3 items-start">
                  <h3 className="text-sm font-semibold text-[#005172]">Campanhas que apoia</h3>

                  <div className="flex flex-col gap-3 w-full min-h-[200px]">
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
                  <Pagination
                    currentPage={currentCampaignsPage}
                    totalPages={campaignsTotalPages}
                    onPageChange={setCurrentCampaignsPage}
                  />
                </div>
              </>
            )}
          </div>

          {!isAdmin && (
            <>
              <hr className="border-t border-[#266D88CC] mx-50 my-8" />
              <h2 className="text-2xl font-bold text-[#005172] mt-2 mb-4">Histórico de Doações</h2>

              <div className="mt-2 bg-white rounded-lg p-6 min-h-[580px] flex flex-col">
                <div className="flex flex-col gap-3 flex-1 w-full">
                  {donations.filter((donation) => donation.periodicity !== "CANCELED").length >
                  0 ? (
                    donations
                      .filter((donation) => donation.periodicity !== "CANCELED")
                      .map((donation, index) => (
                        <CampaignCard
                          key={index}
                          variant="historic"
                          className="border border-[#005172] rounded-lg text-sm p-3"
                          title={donation.campaignName}
                          donationAmount={donation.amount}
                          periodicity={donation.periodicity}
                          campaignCreator={donation.campaignCreatedBy}
                          onAction={() => handleCancelDonation(donation)}
                        />
                      ))
                  ) : (
                    <div className="w-full mx-auto mt-4 py-8 bg-blue-100 text-[#005172] text-center font-medium border border-[#005172] rounded-lg">
                      Você ainda não realizou nenhuma doação.
                    </div>
                  )}
                </div>

                <div className="flex justify-center items-center gap-2 mt-6">
                  <Pagination
                    currentPage={currentDonationsPage}
                    totalPages={donationsTotalPages}
                    onPageChange={setCurrentDonationsPage}
                  />
                </div>
              </div>
            </>
          )}
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
        initialData={currentUser || dados}
        onDeleteAccount={handleAccountDeletion}
        onUpdateAccount={handleAccountUpdate}
      />

      <ConfirmLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />

      <DonorDetailsModal
        open={isDonorDetailsOpen}
        onOpenChange={setIsDonorDetailsOpen}
        donor={selectedDonor}
        onEdit={handleEditDonor}
        onDeleteSuccess={() => {
          // Refresh the list after successful deletion
          fetchUsers();
        }}
      />

      <AdminDetailsModal
        open={isAdminDetailsOpen}
        onOpenChange={setIsAdminDetailsOpen}
        admin={selectedAdmin}
        isCurrentUserRoot={currentUser?.root ?? false}
        onDeleteSuccess={() => {
          // Refresh the list after successful deletion
          fetchUsers();
        }}
      />

      {selectedDonor && (
        <EditUserModal
          isOpen={isDonorEditOpen}
          onClose={() => setIsDonorEditOpen(false)}
          onSave={(updatedUser) => {
            // Update selectedDonor to keep modal in sync
            const updatedDonor: DonorItem = {
              ...selectedDonor,
              fullName: updatedUser.fullname,
              email: updatedUser.email,
              birthDate:
                updatedUser.birthDate instanceof Date
                  ? updatedUser.birthDate.toISOString()
                  : updatedUser.birthDate || selectedDonor.birthDate,
              gender: updatedUser.gender || selectedDonor.gender,
              phone: updatedUser.phone || selectedDonor.phone,
              cpf: updatedUser.cpf || selectedDonor.cpf,
            };
            setSelectedDonor(updatedDonor);
          }}
          initialData={donorToUser(selectedDonor)}
          onUpdateAccount={handleUpdateDonor}
        />
      )}
    </div>
  );
}
