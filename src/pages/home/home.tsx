import { Hero } from "@/pages/home/components/hero";
import { Newsletter } from "@/pages/home/components/newsletter/newsletter";
import PartnerCompanies from "@/pages/home/components/partner-companies";
import HowToHelp from "@/pages/home/components/how-to-help";

import { useHome } from "./useHome";
import { News } from "./components/news";
import { heroAdapter } from "./utils/heroAdapter";

const Home = () => {
  const { latestNews, lastEvents } = useHome();

  const heroItems = lastEvents.map(heroAdapter.eventToHeroItem);

  return (
    <div className="flex flex-col bg-gray-200">
      <Hero items={heroItems} />

      <div>
        <HowToHelp />
        <News news={latestNews} />
        <Newsletter />
        <PartnerCompanies />
      </div>
    </div>
  );
};

export default Home;
