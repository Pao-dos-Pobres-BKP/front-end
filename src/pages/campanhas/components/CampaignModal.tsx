import { useState } from "react";
import Modal from "@/components/ui/modal";
import { Progress } from "@/components/ui/progress";
import Button from "@/components/ui/button";
import Link from "@/components/ui/link";
import fundo from "@/assets/fundo-pp.png";

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

type CampaignModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: CampaignData;
};

export default function CampaignModal({ open, onOpenChange, campaign }: CampaignModalProps) {
  const [isCollaborator, setIsCollaborator] = useState(false);

  const formattedTargetAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(campaign.targetAmount);

  const imageUrl = campaign.imageUrl || fundo;

  return (
    <Modal
      variant="custom"
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title={campaign.title}
      description=""
      footer={
        <div className="w-full -mt-4">
          <img
            src={imageUrl}
            alt={campaign.title}
            className="w-full h-40 object-cover rounded-md mb-3"
          />

          <p className="text-[13px] leading-relaxed text-[var(--color-text-2)] mb-4">
            {campaign.description}
          </p>

          <div className="flex items-center justify-between text-[12px] mb-2">
            <span className="text-[#0F172A] font-medium">Objetivo: {formattedTargetAmount}</span>
            <span className="text-[var(--color-text-3)]">
              {campaign.achievementPercentage}% atingida
            </span>
          </div>

          <Progress value={campaign.achievementPercentage} variant="blue" size="full" />

          {!isCollaborator ? (
            <div className="mt-4">
              <Button
                variant="quaternary"
                size="large"
                className="w-full"
                onClick={() => setIsCollaborator(true)}
              >
                Colabore com a campanha!
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-center gap-2">
              <Button
                variant="confirm"
                size="large"
                className="w-full"
                onClick={() => onOpenChange(false)}
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
