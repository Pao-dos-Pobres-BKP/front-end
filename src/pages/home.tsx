import { Progress } from "../components/ui/progress";
import Button from "../components/ui/button";
import CampaignCard from "@/components/ui/campaignCard";

const Home = () => {
  return (
    <div className="container py-10 flex flex-col gap-6 bg-[var(--color-background)] px-6">
      <h1 className="text-2xl font-bold">Exemplos de CampaignCard</h1>

      {/* Hero example */}
      <CampaignCard
        title="Campanha de Santo Antônio"
        creatorName="Fundação Pão dos Pobres Santo Antônio"
        raised={81825.33}
        goal={90000}
      />

      {/* Profile example */}
      <CampaignCard
        title="Campanha de Santo Antônio"
        raised={2000}
        goal={5000}
        variant="profile"
        donorName="Fulano De Tal"
        donorEmail="email@email.com"
        donationAmount={50}
        campaigns={["Campanha de Santo Antônio", "Campanha de Aniversário 130 anos do Pão", "Campanha de Natal Solidário"]}
        memberSince="01/2019"
        situation="pending"
      />

      {/* Compact example */}
      <CampaignCard
        title="Campanha de Santo Antônio"
        creatorName="Fundação Pão dos Pobres Santo Antônio"
        raised={81825.33}
        goal={90000}
        actionLabel="Acessar"
        variant="compact"
        situation="pending"
      />

      {/* Keep existing playground controls for quick testing */}
      <div className="mt-6 flex gap-3 flex-wrap">
        <Button variant="primary" size="small">
          Salvar
        </Button>
        <Button variant="secondary" size="medium">
          Salvar
        </Button>
        <Button variant="destructive" size="large">
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default Home;
