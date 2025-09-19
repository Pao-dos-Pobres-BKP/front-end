import { Outlet } from "react-router-dom";
import PartnerCompanies from "@/components/layout/partner-companies";
import News from "@/components/layout/news";
const Home = () => {
  return (
    <main className="flex-1 w-full">

      <Outlet />
      <div className="w-full h-8"> SOMENTE PARA TESTE</div>
      <News />
      <div className="w-full h-8"> SOMENTE PARA TESTE</div>
      <PartnerCompanies />
    </main>
  );
};

export default Home;
