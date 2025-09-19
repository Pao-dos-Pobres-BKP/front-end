import { Tabs } from "@/components/layout/tabs";
import { Avatar } from "@/components/ui/avatar";
import Button from "../components/ui/button";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@/components/ui/accordion";
import { SearchBar } from "@/components/layout/search-bar";
import { Footer } from "@/components/layout/footer";
import CampaignCard from "@/components/ui/campaignCard/campaignCard";

const Home = () => {
  return (
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
        campaigns={["Campanha de Santo Antônio", "Campanha de Aniversário 130 anos do Pão", "Campanha de Natal Solidário"]}
        memberSince="01/2019"
        situation="pending"
      />

      <CampaignCard
        title="Campanha de Santo Antônio"
        creatorName="Fundação Pão dos Pobres Santo Antônio"
        raised={81825.33}
        goal={90000}
        variant="compact"
        situation="recurring"
      />

      <CampaignCard
        title="Campanha de Santo Antônio"
        creatorName="Fundação Pão dos Pobres Santo Antônio"
        raised={81825.33}
        goal={90000}
        variant="historic"
        situation="approved"
        lastDonation={80}
      />

      <CampaignCard
        title="Campanha de Santo Antônio"
        creatorName="Fundação Pão dos Pobres Santo Antônio"
        raised={81825.33}
        goal={90000}
        variant="historic"
        situation="recurring"
        lastDonation={80}
      />

      <CampaignCard
        title="Campanha de Santo Antônio"
        creatorName="Fundação Pão dos Pobres Santo Antônio"
        raised={81825.33}
        goal={90000}
        variant="list"
        situation="approved"
      />

      <CampaignCard
        title="Campanha de Santo Antônio"
        creatorName="Fundação Pão dos Pobres Santo Antônio"
        raised={81825.33}
        goal={90000}
        variant="list"
        situation="recurring"
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
    </div>
  );
};

export default Home;
