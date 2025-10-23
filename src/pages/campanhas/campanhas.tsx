import Button from "@/components/ui/button";
import CampaignCard from "@/components/ui/campaignCard/campaignCard";
import Input from "@/components/ui/input";
import Plus from "@/assets/Plus.svg";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
//import { useUser } from "@/hooks/useUser";
import type { CampaignCardCompactProps } from "@/components/ui/campaignCard/campaignCardCompact";

const Campanhas = () => {
  const [, setIsModalOpen] = useState(false);
  //const { user } = useUser();

  /*
  const fetchCampaigns = async () => {
   // API AQUI
  }
   */

  return (
    <div className="bg-[var(--color-bg-campaingn)] p-8 min-h-screen flex flex-col gap-6">
      <section className="flex justify-center items-center gap-4">
        <Input placeholder="Pesquisar campanhas" className=" w-full" />
        <div>
          <DatePicker className="bg-[var(--color-text-special-2)] text-white" />
        </div>
        <Button variant="quinary" className=" transition-colors" size="campaign">
          Pesquisar
        </Button>
        <div
          role="button"
          className="min-h-10 min-w-10 bg-[var(--color-text-special-2)] flex items-center justify-center rounded-[10px] cursor-pointer transition-colors shadow-sm hover:shadow-md"
          onClick={() => setIsModalOpen(true)}
        >
          <img src={Plus} alt="Plus Icon" className="h-4 w-4" />
        </div>
      </section>

      <div className="flex flex-col gap-3">
        {campaigns.map((campaign, index) => (
          <CampaignCard
            key={index}
            title={campaign.title}
            raised={campaign.raised}
            goal={campaign.goal}
            creatorName={campaign.creatorName}
            situation={campaign.situation}
          />
        ))}
      </div>
    </div>
  );
};

export default Campanhas;

const campaigns: CampaignCardCompactProps[] = [
  {
    title: "Ajuda para tratamento do João",
    raised: 8500,
    goal: 10000,
    creatorName: "Maria Silva",
    situation: "approved",
    progressPercent: 85,
  },
  {
    title: "Campanha de alimentos para famílias carentes",
    raised: 4200,
    goal: 5000,
    creatorName: "Instituto Esperança",
    situation: "pending",
    progressPercent: 84,
  },
  {
    title: "Reforma da escola comunitária",
    raised: 12000,
    goal: 20000,
    creatorName: "Associação Educando Juntos",
    situation: "rejected",
    progressPercent: 60,
  },
  {
    title: "Cirurgia para o cachorro Thor",
    raised: 2600,
    goal: 3000,
    creatorName: "Ana Costa",
    situation: "recurring",
    progressPercent: 87,
  },
  {
    title: "Apoio à banda juvenil local",
    raised: 1800,
    goal: 5000,
    creatorName: "Lucas Andrade",
    situation: "approved",
    progressPercent: 36,
  },
  {
    title: "Alimentos para moradores de rua",
    raised: 9500,
    goal: 10000,
    creatorName: "Projeto Mãos Amigas",
    situation: "approved",
    progressPercent: 95,
  },
  {
    title: "Compra de equipamentos para hospital público",
    raised: 52000,
    goal: 100000,
    creatorName: "Fundação Vida",
    situation: "approved",
    progressPercent: 52,
  },
  {
    title: "Custeio de intercâmbio educacional",
    raised: 23000,
    goal: 30000,
    creatorName: "EducaMundo",
    situation: "approved",
    progressPercent: 77,
  },
  {
    title: "Construção de poço em comunidade rural",
    raised: 7500,
    goal: 10000,
    creatorName: "Água para Todos",
    situation: "approved",
    progressPercent: 75,
  },
  {
    title: "Campanha de arrecadação de brinquedos",
    raised: 1200,
    goal: 2000,
    creatorName: "Sorriso Feliz",
    situation: "approved",
    progressPercent: 60,
  },
  {
    title: "Auxílio para tratamento do câncer da Dona Lúcia",
    raised: 32000,
    goal: 50000,
    creatorName: "Carlos Nogueira",
    situation: "approved",
    progressPercent: 64,
  },
  {
    title: "Projeto Música nas Escolas",
    raised: 8700,
    goal: 15000,
    creatorName: "Som da Vida",
    situation: "approved",
    progressPercent: 58,
  },
  {
    title: "Campanha emergencial de enchentes",
    raised: 43000,
    goal: 50000,
    creatorName: "SOS Cidadania",
    situation: "approved",
    progressPercent: 86,
  },
  {
    title: "Doação de materiais escolares",
    raised: 3000,
    goal: 5000,
    creatorName: "EducaMais",
    situation: "approved",
    progressPercent: 60,
  },
  {
    title: "Manutenção do abrigo de animais",
    raised: 12500,
    goal: 20000,
    creatorName: "Lar Animal",
    situation: "approved",
    progressPercent: 62,
  },
];
