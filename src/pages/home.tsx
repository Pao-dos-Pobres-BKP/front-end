import { Modal } from "@/components/layout/modal";
import Button from "../components/ui/button";
import { useState } from "react";
import News from "@/components/layout/news";
import CampaignCard from "@/components/ui/campaignCard/campaignCard";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
    <div className="container py-10 flex flex-col gap-6 bg-[var(--color-background)] px-6">
      <h1 className="text-2xl font-bold">Exemplos de CampaignCard</h1>

      <CampaignCard
        title="Campanha de Santo Antônio"
        creatorName="Fundação Pão dos Pobres Santo Antônio"
        raised={81825.33}
        goal={90000}
      />

      <CampaignCard
        title="Campanha de Santo Antônio"
        raised={2000}
        goal={5000}
        variant="profile"
        donorName="Fulano De Tal"
        donorEmail="email@email.com"
        donationAmount={50}
        campaigns={[
          "Campanha de Santo Antônio",
          "Campanha de Aniversário 130 anos do Pão",
          "Campanha de Natal Solidário",
        ]}
        memberSince="01/2019"
        situation="pending"
      />

      <CampaignCard
        title="Campanha de Santo Antônio"
        creatorName="Fundação Pão dos Pobres Santo Antônio"
        raised={81825.33}
        goal={90000}
        actionLabel="Acessar"
        variant="compact"
        situation="recurring"
        donorName=""
        donorEmail=""
        memberSince=""
        campaigns={[]}
      />

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

      <div>
        <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>
        <Modal
          title="Title"
          footer={
            <>
              <Button variant="tertiary" size="extraSmall" onClick={() => setIsModalOpen(false)}>
                Voltar
              </Button>
              <Button variant="primary" size="extraSmall" onClick={() => setIsModalOpen(false)}>
                Confirmar
              </Button>
            </>
          }
          onOpenChange={setIsModalOpen}
          open={isModalOpen}
          message="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem, minus?"
        />
      </div>
    </div>
    <News></News>
    </div>
  );
};
 export default Home;