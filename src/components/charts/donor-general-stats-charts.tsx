import { useState, useEffect } from "react";
import type { DateRange } from "react-day-picker";
import { ChartCard } from "@/components/ui/charts/chart-card";
import { BasePieChart } from "@/components/ui/charts/pie-chart-component";
import { BaseBarChart } from "@/components/ui/charts/bar-chart-component";
import type { ChartConfig } from "@/components/ui/charts/chart";

type PieData = { name: string; value: number };
type BarData = { faixa: string; total: number };

const fetchDonorGeneralStats = async (
  period?: DateRange
): Promise<{ pieData: PieData[]; barData: BarData[] }> => {
  console.log("Buscando dados gerais de doadores para o período:", period);
  const pieData = [
    { name: "Masculino", value: 450 },
    { name: "Feminino", value: 510 },
    { name: "Outro", value: 80 },
  ];
  const barData = [
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
  ];

  return new Promise((resolve) => setTimeout(() => resolve({ pieData, barData }), 500));
};

const pieConfig = {
  Masculino: { label: "Masculino", color: "#E8C468" },
  Feminino: { label: "Feminino", color: "#2A9D90" },
  Outro: { label: "Outro", color: "#F4A462" },
} satisfies ChartConfig;

const barConfig = {
  total: { label: "Total de Doadores", color: "#2A9D90" },
} satisfies ChartConfig;

const ageChartId = "age-distribution-chart";

export const DoadoresGeralStats = ({
  show = "all",
  period,
}: {
  show?: "genero" | "idade" | "all";
  period?: DateRange;
}) => {
  const [pieData, setPieData] = useState<PieData[]>([]);
  const [barData, setBarData] = useState<BarData[]>([]);

  useEffect(() => {
    fetchDonorGeneralStats(period).then((stats) => {
      setPieData(stats.pieData);
      setBarData(stats.barData);
    });
  }, [period]);

  if (show === "genero") {
    return (
      <ChartCard title="Doadores por Gênero" id="id">
        <BasePieChart data={pieData} dataKey="value" nameKey="name" config={pieConfig} />
      </ChartCard>
    );
  }

  if (show === "idade") {
    return (
      <>
        <style>{`
          #${ageChartId} .recharts-rectangle:hover {
            fill: #217d72; /* Um tom de verde mais escuro */
          }
        `}</style>
        <ChartCard title="Doadores por Faixa Etária" id={ageChartId}>
          <BaseBarChart data={barData} dataKey="total" categoryKey="faixa" config={barConfig} />
        </ChartCard>
      </>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <style>{`
        #${ageChartId} .recharts-rectangle:hover {
          fill: #217d72; /* Um tom de verde mais escuro */
        }
      `}</style>
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold">Estatísticas Geral de Doadores</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6 w-full">
        <ChartCard title="Doadores por Gênero" id="id">
          <BasePieChart data={pieData} dataKey="value" nameKey="name" config={pieConfig} />
        </ChartCard>
        <ChartCard title="Doadores por Faixa Etária" id={ageChartId}>
          <BaseBarChart data={barData} dataKey="total" categoryKey="faixa" config={barConfig} />
        </ChartCard>
      </div>
    </div>
  );
};
