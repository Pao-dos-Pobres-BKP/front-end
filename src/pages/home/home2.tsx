import { PagamentosPorCampanhaChart } from "@/components/charts/payment-by-campaign-chart";
import { PagamentosGeralChart } from "@/components/charts/payment-general-chart";
import { TotalArrecadadoChart } from "@/components/charts/total-collected-chart";
import { DoadoresGeralStats } from "@/components/charts/donor-general-stats-charts";
import { DoadoresPorCampanhaStats } from "@/components/charts/donor-by-campaign-stats-chart";

const Home = () => {
  return (
    <div className="container py-10 flex flex-col gap-8 bg-gray-200 justify-center items-center">
      <div className="flex flex-col items-center gap-8 w-full max-w-6xl">
        <PagamentosGeralChart />
        <PagamentosPorCampanhaChart />
        <TotalArrecadadoChart />
        <DoadoresGeralStats />
        <DoadoresPorCampanhaStats />
      </div>
    </div>
  );
};

export default Home;
