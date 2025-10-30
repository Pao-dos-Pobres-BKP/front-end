import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Progress } from "@/components/ui/progress";
import Button from "@/components/ui/button";
import Link from "@/components/ui/link";
import fundo from "@/assets/fundo-pp.png";
import { getUserDonations } from "@/services/donations";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

type CampaignData = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdBy: string;
  targetAmount: number;
  currentAmount: number;
  achievementPercentage: number;
  status: "PENDING" | "ACTIVE" | "PAUSED" | "FINISHED" | "CANCELED";
};

type CampaignModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: CampaignData;
};

export default function CampaignModal({ open, onOpenChange, campaign }: CampaignModalProps) {
  const [isCollaborator, setIsCollaborator] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [checkingCollaboration, setCheckingCollaboration] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();

  const formattedTargetAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(campaign.targetAmount);

  const imageUrl = campaign.imageUrl || fundo;

  // Verificar se o usuário é colaborador desta campanha
  useEffect(() => {
    const checkCollaboration = async () => {
      if (!open) {
        setCheckingCollaboration(true);
        setIsCollaborator(false);
        return;
      }

      if (!user || user.role !== "DONOR") {
        setIsCollaborator(false);
        setCheckingCollaboration(false);
        return;
      }

      try {
        setCheckingCollaboration(true);
        const donationsResponse = await getUserDonations({ pageSize: 1000 });
        const hasContributed = donationsResponse.data.some(
          (donation) => donation.campaignId === campaign.id
        );
        setIsCollaborator(hasContributed);
      } catch (error) {
        console.error("Erro ao verificar colaboração:", error);
        setIsCollaborator(false);
      } finally {
        setCheckingCollaboration(false);
      }
    };

    checkCollaboration();
  }, [open, campaign.id, user]);

  // Pré-carregar a imagem
  useEffect(() => {
    if (!open) {
      setImageLoaded(false);
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // Considera como carregado mesmo com erro
  }, [open, imageUrl]);

  return (
    <Modal
      variant="custom"
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title={campaign.title}
      description=""
      footer={
        <div className="w-full -mt-4">
          {/* Imagem com skeleton */}
          <div className="relative w-full h-40 mb-3">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-2xl" />
            )}
            <img
              src={imageUrl}
              alt={campaign.title}
              className={`w-full h-40 object-cover rounded-2xl transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="eager"
            />
          </div>

          <p className="text-[13px] leading-relaxed text-[var(--color-text-2)] mb-4">
            {campaign.description}
          </p>

          <div className="flex items-center justify-between text-[12px] mb-2">
            <span className="text-[#0F172A] font-medium">Objetivo: {formattedTargetAmount}</span>
            <span className="text-[var(--color-text-3)]">
              {Math.round(campaign.achievementPercentage)}% atingida
            </span>
          </div>

          <Progress value={campaign.achievementPercentage} variant="blue" size="full" />

          {/* Botões baseados no estado de colaboração */}
          <div className="mt-4">
            {campaign.status === "PENDING" ? (
              <Button
                variant="quaternary"
                size="large"
                className="w-full opacity-60 cursor-not-allowed"
                disabled
              >
                Campanha sob aprovação
              </Button>
            ) : campaign.status === "CANCELED" ? (
              <Button
                variant="quaternary"
                size="large"
                className="w-full opacity-60 cursor-not-allowed"
                disabled
              >
                Campanha rejeitada
              </Button>
            ) : checkingCollaboration ? (
              <div className="space-y-2">
                <div className="h-12 bg-gray-300 animate-pulse rounded-xl w-full" />
              </div>
            ) : !isCollaborator ? (
              <Button
                variant="quaternary"
                size="large"
                className="w-full"
                onClick={() => {
                  navigate(`/doacao?campaignId=${campaign.id}`);
                }}
              >
                Colabore com a campanha!
              </Button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="confirm"
                  size="large"
                  className="w-full"
                  onClick={() => onOpenChange(false)}
                >
                  Você é colaborador dessa campanha!
                </Button>
                <Link href="/perfil" variant="blue">
                  Gerenciar minha colaboração
                </Link>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
