import { useState, useEffect } from "react";
import { ChartCard } from "@/components/charts/components/chart-card";
import { BaseBarChart } from "@/components/charts/components/bar-chart-component";
import type { ChartConfig } from "@/components/charts/components/chart";
import type { DateRange } from "react-day-picker";

type PaymentData = {
  metodo: string;
  valor: number;
  quantidade: number;
};

const fetchPaymentDataByCampaign = async (
  campaignId: string,
  period?: DateRange
): Promise<PaymentData[]> => {
  console.log(`Buscando dados para a campanha: ${campaignId} no período:`, period);
  const mockData: Record<string, PaymentData[]> = {
    "campanha-a": [
      { metodo: "PIX", valor: 12500, quantidade: 120 },
      { metodo: "Cartão", valor: 8700, quantidade: 80 },
      { metodo: "Boleto", valor: 4200, quantidade: 40 },
    ],
    "campanha-b": [
      { metodo: "PIX", valor: 22300, quantidade: 200 },
      { metodo: "Cartão", valor: 15400, quantidade: 150 },
      { metodo: "Boleto", valor: 9800, quantidade: 90 },
    ],
  };
  return new Promise<PaymentData[]>((resolve) =>
    setTimeout(() => resolve(mockData[campaignId] || []), 500)
  );
};

const configValor = {
  valor: { label: "Valor (R$)" },
  PIX: { label: "PIX", color: "#2A9D90" },
  Cartão: { label: "Cartão", color: "#E8C468" },
  Boleto: { label: "Boleto", color: "#F4A462" },
} satisfies ChartConfig;

const configQuantidade = {
  quantidade: { label: "Quantidade" },
  PIX: { label: "PIX", color: "#2A9D90" },
  Cartão: { label: "Cartão", color: "#E8C468" },
  Boleto: { label: "Boleto", color: "#F4A462" },
} satisfies ChartConfig;

export const PagamentosPorCampanhaChart = ({
  campaignId,
  show,
  period,
}: {
  campaignId: string;
  show: "quantidade" | "valor";
  period?: DateRange;
}) => {
  const [data, setData] = useState<PaymentData[]>([]);

  useEffect(() => {
    if (campaignId) {
      fetchPaymentDataByCampaign(campaignId, period).then(setData);
    } else {
      setData([]);
    }
  }, [campaignId, period]);

  if (show === "quantidade") {
    return (
      <ChartCard title="Quantidade de Doações (Campanha)">
        <BaseBarChart
          data={data}
          dataKey="quantidade"
          categoryKey="metodo"
          config={configQuantidade}
        />
      </ChartCard>
    );
  }

  if (show === "valor") {
    return (
      <ChartCard title="Valor Arrecadado (Campanha)">
        <BaseBarChart data={data} dataKey="valor" categoryKey="metodo" config={configValor} />
      </ChartCard>
    );
  }

  return null;
};
