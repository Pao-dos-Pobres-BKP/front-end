import { useState, useEffect } from "react";
import { ChartCard } from "@/components/ui/charts/chart-card";
import { BasePieChart } from "@/components/ui/charts/pie-chart-component";
import { BaseBarChart } from "@/components/ui/charts/bar-chart-component";
import type { ChartConfig } from "@/components/ui/charts/chart";
import type { DateRange } from "react-day-picker";

type DonorStats = {
  pieData: { name: string; value: number }[];
  barData: { faixa: string; total: number }[];
};

const mockData: Record<string, DonorStats> = {
  "campanha-a": {
    pieData: [
      { name: "Masculino", value: 150 },
      { name: "Feminino", value: 210 },
      { name: "Outro", value: 30 },
    ],
    barData: [
      { faixa: "18-20", total: 150 },
      { faixa: "21-25", total: 150 },
      { faixa: "26-30", total: 280 },
      { faixa: "31-35", total: 220 },
      { faixa: "36-40", total: 180 },
      { faixa: "41-45", total: 220 },
      { faixa: "46-50", total: 180 },
      { faixa: "51-55", total: 220 },
      { faixa: "56-60", total: 180 },
      { faixa: "61-65", total: 220 },
      { faixa: "65+", total: 180 },
    ],
  },
  "campanha-b": {
    pieData: [
      { name: "Masculino", value: 300 },
      { name: "Feminino", value: 300 },
      { name: "Outro", value: 50 },
    ],
    barData: [
      { faixa: "18-20", total: 90 },
      { faixa: "21-25", total: 50 },
      { faixa: "26-30", total: 80 },
      { faixa: "31-35", total: 120 },
      { faixa: "36-40", total: 280 },
      { faixa: "41-45", total: 220 },
      { faixa: "46-50", total: 180 },
      { faixa: "51-55", total: 20 },
      { faixa: "56-60", total: 80 },
      { faixa: "61-65", total: 60 },
      { faixa: "65+", total: 180 },
    ],
  },
};

const fetchDonorStatsByCampaign = async (
  campaignId: string,
  period?: DateRange
): Promise<DonorStats> => {
  console.log(`Buscando estatísticas para a campanha: ${campaignId} no período:`, period);
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockData[campaignId] || { pieData: [], barData: [] }), 500)
  );
};

const pieConfig = {
  Masculino: { label: "Masculino", color: "#E8C468" },
  Feminino: { label: "Feminino", color: "#2A9D90" },
  Outro: { label: "Outro", color: "#F4A462" },
} satisfies ChartConfig;

const barConfig = {
  total: { label: "Total de Doadores", color: "#264653" },
} satisfies ChartConfig;

export const DoadoresPorCampanhaStats = ({
  campaignId,
  show,
  period,
}: {
  campaignId: string;
  show: "genero" | "idade";
  period?: DateRange;
}) => {
  const [pieData, setPieData] = useState<DonorStats["pieData"]>([]);
  const [barData, setBarData] = useState<DonorStats["barData"]>([]);

  useEffect(() => {
    if (campaignId) {
      fetchDonorStatsByCampaign(campaignId, period).then((stats) => {
        setPieData(stats.pieData);
        setBarData(stats.barData);
      });
    } else {
      setPieData([]);
      setBarData([]);
    }
  }, [campaignId, period]);

  if (show === "genero") {
    return (
      <ChartCard title="Doadores por Gênero (Campanha)">
        <BasePieChart data={pieData} dataKey="value" nameKey="name" config={pieConfig} />
      </ChartCard>
    );
  }

  if (show === "idade") {
    return (
      <ChartCard title="Doadores por Faixa Etária (Campanha)">
        <BaseBarChart data={barData} dataKey="total" categoryKey="faixa" config={barConfig} />
      </ChartCard>
    );
  }

  return null;
};
