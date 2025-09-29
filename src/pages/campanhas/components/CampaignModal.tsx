import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Progress } from "@/components/ui/progress";
import Button from "@/components/ui/button";
import Link from "@/components/ui/link";
import fundo from "@/assets/fundo-pp.png";

type CampaignModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CampaignModal({ open, onOpenChange }: CampaignModalProps) {
  const [isCollaborator, setIsCollaborator] = useState(false);

  const title = "Feira de Novidades Pão dos Pobres";
  const description =
    "Serão compradas novas máquinas para uso interno da fundação em função da Feira de Novidades e precisaremos de um orçamento de 8 mil reais para consegui-los. Toda ajuda é bem-vinda!";
  const progressValue = 75;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      message=""
      footer={
        <div className="w-full -mt-4">
          <img src={fundo} alt={title} className="w-full h-40 object-cover rounded-md mb-3" />

          <p className="text-[13px] leading-relaxed text-[var(--color-text-2)] mb-4">
            {description}
          </p>

          <div className="flex items-center justify-between text-[12px] mb-2">
            <span className="text-[#0F172A] font-medium">Objetivo: R$ 8.000,00</span>
            <span className="text-[var(--color-text-3)]">{progressValue}% atingida</span>
          </div>

          <Progress value={progressValue} variant="blue" size="full" />

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
