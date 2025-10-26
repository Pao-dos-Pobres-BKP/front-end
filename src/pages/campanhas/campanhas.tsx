import CampaignCard from "@/components/ui/campaignCard/campaignCard";
import Plus from "@/assets/Plus.svg";
import { useState, useEffect } from "react";
import CampaignModal from "./components/CampaignModal";
import EditCampaignModal from "@/components/campaign/EditCampaignModal";
import DeleteCampaignConfirmModal from "@/components/campaign/DeleteCampaignConfirmModal";
import AdminCreateCampaignModal from "@/components/campaign/AdminCreateCampaignModal";
import DonorCreateCampaignModal from "@/components/campaign/DonorCreateCampaignModal";
import { useUser } from "@/hooks/useUser";
import { 
  getCampaigns, 
  updateCampaign, 
  deleteCampaign,
  createCampaign,
  type CampaignAPI 
} from "@/services/campaigns";
import { getUserDonations } from "@/services/donations";
import { SearchBar } from "@/components/ui/search-bar";
import { useSearchParams } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import CampaignCardSkeleton from "@/skeletons/campaign-card-skeleton";
import type { CampaignBase } from "@/types/Campaign";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type CampaignData = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdBy: string;
  targetAmount: number;
  currentAmount: number;
  achievementPercentage: number;
  status: "ACTIVE" | "INACTIVE" | "COMPLETED";
};

type CampaignWithSituation = CampaignAPI & {
  situation: "approved" | "pending" | "rejected" | "recurring";
};

const Campanhas = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | null>(null);
  const [selectedCampaignToEdit, setSelectedCampaignToEdit] = useState<CampaignBase | null>(null);
  const [campaignToDelete, setCampaignToDelete] = useState<CampaignWithSituation | null>(null);
  const [campaigns, setCampaigns] = useState<CampaignWithSituation[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useUser();
  const [searchParams] = useSearchParams();

  // Resetar para página 1 quando mudar filtros ou ordenação
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams, sortOrder]);

  // Buscar campanhas e doações do usuário
  useEffect(() => {
    const fetchData = async () => {
      const MIN_LOADING_TIME = 500; // Tempo mínimo de loading em ms
      const startTime = Date.now();
      
      try {
        setLoading(true);
        
        // Obter termo de busca dos parâmetros da URL
        const searchTerm = searchParams.get("search") || undefined;
        
        // Buscar campanhas com paginação
        const campaignsResponse = await getCampaigns({ 
          page: currentPage, 
          pageSize: 10,
          title: searchTerm,
        });
        
        // Armazenar metadados de paginação
        setTotalPages(campaignsResponse.lastPage);
        
        // Buscar doações do usuário (apenas se for doador)
        let donatedCampaignIds = new Set<string>();
        if (user?.role === "DONOR") {
          try {
            const donationsResponse = await getUserDonations({ pageSize: 1000 });
            donatedCampaignIds = new Set(donationsResponse.data.map((d) => d.campaignId));
          } catch (error) {
            console.error("Erro ao buscar doações:", error);
          }
        }

        // Aplicar lógica de filtro e determinar situação de cada campanha
        let filteredCampaigns = campaignsResponse.data
          .filter((campaign) => {
            // Admins veem tudo
            if (user?.role === "ADMIN") return true;

            // Doadores veem:
            // - Todas as campanhas ativas (ACTIVE)
            // - Campanhas pendentes/canceladas que ele criou
            if (user?.role === "DONOR") {
              if (campaign.status === "ACTIVE") return true;
              if (
                (campaign.status === "PENDING" || campaign.status === "CANCELED") &&
                campaign.createdBy === user.id
              ) {
                return true;
              }
              return false;
            }

            return true;
          })
          .map((campaign): CampaignWithSituation => {
            // Determinar a situação do card
            let situation: "approved" | "pending" | "rejected" | "recurring" = "approved";

            if (campaign.status === "PENDING") {
              situation = "pending";
            } else if (campaign.status === "CANCELED") {
              situation = "rejected";
            } else if (campaign.status === "ACTIVE") {
              // Se o usuário é doador e contribuiu para esta campanha, mostrar como recurring
              if (user?.role === "DONOR" && donatedCampaignIds.has(campaign.id)) {
                situation = "recurring";
              } else {
                situation = "approved";
              }
            }

            return {
              ...campaign,
              situation,
            };
          });

        // Ordenar por data (o backend já retorna ordenado, mas aplicamos a ordem local se necessário)
        if (sortOrder === "oldest") {
          filteredCampaigns = filteredCampaigns.reverse();
        }

        // Calcular tempo restante para atingir o tempo mínimo de loading
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

        // Aguardar o tempo mínimo antes de exibir os resultados
        await new Promise(resolve => setTimeout(resolve, remainingTime));

        setCampaigns(filteredCampaigns);
      } catch (error) {
        console.error("Erro ao buscar campanhas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, searchParams, sortOrder, currentPage]);

  const handleOpenCampaignModal = (campaign: CampaignAPI) => {
    const campaignData: CampaignData = {
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      imageUrl: campaign.imageUrl,
      createdBy: campaign.createdBy,
      targetAmount: campaign.targetAmount,
      currentAmount: campaign.currentAmount,
      achievementPercentage: campaign.achievementPercentage,
      status: campaign.status as "ACTIVE" | "INACTIVE" | "COMPLETED",
    };
    setSelectedCampaign(campaignData);
    setIsCampaignModalOpen(true);
  };

  const handleOpenEditModal = (campaign: CampaignAPI) => {
    const campaignBase: CampaignBase = {
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      targetValue: campaign.targetAmount,
      image: campaign.imageUrl ? { url: campaign.imageUrl, name: "" } : undefined,
    };
    setSelectedCampaignToEdit(campaignBase);
    // Armazena a campanha completa para possível exclusão
    const fullCampaign = campaigns.find((c) => c.id === campaign.id);
    if (fullCampaign) {
      setCampaignToDelete(fullCampaign);
    }
    setIsEditModalOpen(true);
  };

  const handleSaveEditedCampaign = async (data: {
    id: string;
    title: string;
    description: string;
    targetValue: number;
    image?: File | null;
  }) => {
    try {
      // Encontra a campanha original para pegar os dados completos
      const originalCampaign = campaigns.find((c) => c.id === data.id);
      if (!originalCampaign || !user) {
        throw new Error("Campanha ou usuário não encontrado");
      }

      // TODO: Se houver imagem nova (File), fazer upload primeiro e obter URL
      const imageUrl = data.image instanceof File 
        ? originalCampaign.imageUrl // Por enquanto mantém a URL original
        : originalCampaign.imageUrl;

      await updateCampaign(data.id, {
        title: data.title,
        description: data.description,
        targetAmount: data.targetValue,
        currentAmount: originalCampaign.currentAmount,
        startDate: originalCampaign.startDate,
        endDate: originalCampaign.endDate,
        imageUrl: imageUrl || undefined,
        status: originalCampaign.status,
        createdBy: user.id,
      });

      // Recarregar as campanhas
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar campanha:", error);
      alert("Erro ao salvar campanha. Tente novamente.");
    }
  };

  const handleDeleteRequest = () => {
    setIsEditModalOpen(false); // Fecha o modal de edição
    setIsDeleteConfirmOpen(true); // Abre o modal de confirmação
  };

  const handleConfirmDelete = async () => {
    if (!campaignToDelete) return;

    try {
      await deleteCampaign(campaignToDelete.id);
      // Fechar modais
      setIsEditModalOpen(false);
      setIsDeleteConfirmOpen(false);
      // Recarregar campanhas
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir campanha:", error);
      alert("Erro ao excluir campanha. Tente novamente.");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setIsEditModalOpen(true); // Reabre o modal de edição
  };

  const handleCreateCampaign = async (data: {
    title: string;
    description: string;
    targetValue: number;
    image?: File | null;
    password?: string;
  }) => {
    if (!user) return;

    try {
      // TODO: Se houver imagem, fazer upload primeiro e obter URL
      const imageUrl = undefined; // Por enquanto sem imagem

      // Define datas padrão: início hoje, fim daqui a 3 meses
      const startDate = new Date().toISOString();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 3);
      const endDateISO = endDate.toISOString();

      await createCampaign({
        title: data.title,
        description: data.description,
        targetAmount: data.targetValue,
        currentAmount: 0,
        startDate,
        endDate: endDateISO,
        imageUrl,
        status: user.role === "ADMIN" ? "ACTIVE" : "PENDING",
        createdBy: user.id,
      });

      // Recarregar campanhas
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar campanha:", error);
      alert("Erro ao criar campanha. Tente novamente.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink onClick={() => handlePageChange(page)} isActive={page === currentPage}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="bg-[var(--color-bg-campaingn)] p-8 min-h-screen flex flex-col gap-6">
      <section className="flex justify-center items-center gap-4">
        <div className="w-full">
          <SearchBar placeholder="Pesquisar campanhas" />
        </div>
        
        <button
          onClick={() => setSortOrder(sortOrder === "recent" ? "oldest" : "recent")}
          className="min-h-10 px-4 bg-[var(--color-text-special-2)] text-white flex items-center justify-center gap-2 rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md hover:opacity-90 whitespace-nowrap"
          title={sortOrder === "recent" ? "Ordenar por mais antigos" : "Ordenar por mais recentes"}
        >
          <ArrowUpDown className="h-4 w-4" />
          <span className="text-sm font-medium">
            {sortOrder === "recent" ? "Mais recentes" : "Mais antigos"}
          </span>
        </button>

        <div
          role="button"
          className="min-h-10 min-w-10 bg-[var(--color-text-special-2)] flex items-center justify-center rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md hover:opacity-90 flex-shrink-0"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <img src={Plus} alt="Plus Icon" className="h-4 w-4" />
        </div>
      </section>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <CampaignCardSkeleton key={index} />
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-white text-lg">Nenhuma campanha encontrada</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                variant="list"
                title={campaign.title}
                raised={campaign.currentAmount}
                goal={campaign.targetAmount}
                creatorName={campaign.createdBy}
                startDate={campaign.startDate}
                endDate={campaign.endDate}
                situation={campaign.situation}
                isAdmin={user?.role === "ADMIN"}
                onAction={() => 
                  user?.role === "ADMIN" 
                    ? handleOpenEditModal(campaign)
                    : handleOpenCampaignModal(campaign)
                }
              />
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
                {renderPaginationItems()}
                <PaginationNext
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={
                    currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                  }
                />
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {/* Modal de Campanha */}
      {selectedCampaign && (
        <CampaignModal
          open={isCampaignModalOpen}
          onOpenChange={setIsCampaignModalOpen}
          campaign={selectedCampaign}
        />
      )}

      {/* Modal de Edição de Campanha */}
      <EditCampaignModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        campaign={selectedCampaignToEdit}
        onSave={handleSaveEditedCampaign}
        onDeleteRequest={handleDeleteRequest}
      />

      {/* Modal de Confirmação de Exclusão */}
      {campaignToDelete && (
        <DeleteCampaignConfirmModal
          open={isDeleteConfirmOpen}
          onOpenChange={(open) => {
            if (!open) {
              handleCancelDelete();
            }
          }}
          onConfirm={handleConfirmDelete}
          campaignTitle={campaignToDelete.title}
        />
      )}

      {/* Modais de Criação de Campanha */}
      {user?.role === "ADMIN" ? (
        <AdminCreateCampaignModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onSubmit={handleCreateCampaign}
        />
      ) : (
        <DonorCreateCampaignModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onSubmit={handleCreateCampaign}
        />
      )}
    </div>
  );
};

export default Campanhas;
