import { useState, useEffect } from "react";
import { ChartCard } from "@/components/ui/charts/chart-card";
import { BaseBarChart } from "@/components/ui/charts/bar-chart-component";
import type { ChartConfig } from "@/components/ui/charts/chart";

type OverallPaymentData = {
  metodo: string;
  quantidade: number;
  valor: number;
};

const fetchOverallPaymentData = async (): Promise<OverallPaymentData[]> => {
  const mockData = [
    { metodo: "PIX", quantidade: 850, valor: 150000 },
    { metodo: "Cartão", quantidade: 620, valor: 215000 },
    { metodo: "Boleto", quantidade: 310, valor: 45000 },
  ];
  return new Promise<OverallPaymentData[]>((resolve) => setTimeout(() => resolve(mockData), 500));
};

const configQuantidade = {
  quantidade: { label: "Quantidade" },
  PIX: { label: "PIX", color: "#2A9D90" },
  Cartão: { label: "Cartão", color: "#E8C468" },
  Boleto: { label: "Boleto", color: "#F4A462" },
} satisfies ChartConfig;

const configValor = {
  valor: { label: "Valor" },
  PIX: { label: "PIX", color: "#2A9D90" },
  Cartão: { label: "Cartão", color: "#E8C468" },
  Boleto: { label: "Boleto", color: "#F4A462" },
} satisfies ChartConfig;

export const PagamentosGeralChart = () => {
  const [data, setData] = useState<OverallPaymentData[]>([]);
  useEffect(() => {
    fetchOverallPaymentData().then(setData);
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6 w-full">
      <ChartCard title="Quantidade de Doações por Método">
        <BaseBarChart
          data={data}
          dataKey="quantidade"
          categoryKey="metodo"
          config={configQuantidade}
        />
      </ChartCard>
      <ChartCard title="Valor Arrecadado por Método">
        <BaseBarChart data={data} dataKey="valor" categoryKey="metodo" config={configValor} />
      </ChartCard>
    </div>
  );
};
