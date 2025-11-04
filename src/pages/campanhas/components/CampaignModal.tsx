import { useState, useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Progress } from "@/components/ui/progress";
import Button from "@/components/ui/button";
import Link from "@/components/ui/link";
import fundo from "@/assets/fundo-pp.png";
import { getUserDonations, type DonationAPI } from "@/services/donations";
import { useUser } from "@/hooks/useUser";

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
  const [checkingCollaboration, setCheckingCollaboration] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { user } = useUser();

  const formattedTargetAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(campaign.targetAmount);

  const imageUrl = campaign.imageUrl || fundo;

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
          (donation: DonationAPI) => donation.campaignId === campaign.id
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

  useEffect(() => {
    if (!open) {
      setImageLoaded(false);
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
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
          {!imageLoaded ? (
            <div className="w-full h-40 bg-gray-200 animate-pulse rounded-2xl mb-3" />
          ) : (
            <img
              src={imageUrl}
              alt={campaign.title}
              className="w-full h-40 object-cover rounded-2xl mb-3"
            />
          )}

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

          {campaign.status === "PENDING" ? (
            <div className="mt-4">
              <Button
                variant="quaternary"
                size="large"
                className="w-full opacity-60 cursor-not-allowed"
                disabled
              >
                Campanha sob aprovação
              </Button>
            </div>
          ) : campaign.status === "CANCELED" ? (
            <div className="mt-4">
              <Button
                variant="quaternary"
                size="large"
                className="w-full opacity-60 cursor-not-allowed"
                disabled
              >
                Campanha rejeitada
              </Button>
            </div>
          ) : checkingCollaboration ? (
            <div className="mt-4">
              <div className="h-12 bg-gray-200 animate-pulse rounded-xl w-full" />
            </div>
          ) : !isCollaborator ? (
            <div className="mt-4">
              <Button
                variant="quaternary"
                size="large"
                className="w-full"
                onClick={() => {
                  // Redirecionar para página de doação
                  window.location.href = `/doacao?campaignId=${campaign.id}`;
                }}
              >
                Colabore com a campanha!
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-center gap-2">
              <Button
                variant="confirm"
                size="large"
                className="w-full cursor-not-allowed"
                disabled
              >
                Você é colaborador dessa campanha!
              </Button>
              <Link href="/minhas-colaboracoes" variant="blue">
                Encerrar minha colaboração
              </Link>
            </div>
          )}
        </div>
      }
    />
  );
}
