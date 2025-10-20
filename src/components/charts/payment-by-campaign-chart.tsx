import { useState, useEffect } from "react";
import { ChartCard } from "@/components/ui/charts/chart-card";
import { BaseBarChart } from "@/components/ui/charts/bar-chart-component";
import type { ChartConfig } from "@/components/ui/charts/chart";
import Input from "@/components/ui/input";

type PaymentData = {
  metodo: string;
  valor: number;
};

const fetchPaymentDataByCampaign = async (campaignId: string): Promise<PaymentData[]> => {
  console.log(`Buscando dados para a campanha: ${campaignId}`);
  const mockData: Record<string, PaymentData[]> = {
    "campanha-a": [
      { metodo: "PIX", valor: 12500 },
      { metodo: "Cartão", valor: 8700 },
      { metodo: "Boleto", valor: 4200 },
    ],
    "campanha-b": [
      { metodo: "PIX", valor: 22300 },
      { metodo: "Cartão", valor: 15400 },
      { metodo: "Boleto", valor: 9800 },
    ],
  };
  return new Promise<PaymentData[]>((resolve) =>
    setTimeout(() => resolve(mockData[campaignId] || []), 500)
  );
};

const allCampaigns = [
  { id: "campanha-a", name: "Campanha de Natal 2025" },
  { id: "campanha-b", name: "Campanha de Inverno" },
  { id: "campanha-c", name: "Ajuda RS" },
  { id: "campanha-d", name: "Cestas Básicas POA" },
];

const searchCampaigns = async (query: string) => {
  if (query.length < 3) return [];
  console.log(`Buscando campanhas com o termo: ${query}`);
  const filtered = allCampaigns.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  return new Promise<typeof allCampaigns>((resolve) => setTimeout(() => resolve(filtered), 300));
};

const chartConfig = {
  valor: { label: "Valor (R$)" },
  PIX: { label: "PIX", color: "#2A9D90" },
  Cartão: { label: "Cartão", color: "#E8C468" },
  Boleto: { label: "Boleto", color: "#F4A462" },
} satisfies ChartConfig;

export const PagamentosPorCampanhaChart = () => {
  const [data, setData] = useState<{ metodo: string; valor: number }[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<{ id: string; name: string } | null>(
    allCampaigns[0]
  );
  const [searchTerm, setSearchTerm] = useState(allCampaigns[0].name);
  const [searchResults, setSearchResults] = useState<typeof allCampaigns>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (selectedCampaign) {
      fetchPaymentDataByCampaign(selectedCampaign.id).then(setData);
    }
  }, [selectedCampaign]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.length >= 3) {
        searchCampaigns(searchTerm).then(setSearchResults);
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleSelectCampaign = (campaign: (typeof allCampaigns)[0]) => {
    setSelectedCampaign(campaign);
    setSearchTerm(campaign.name);
    setDropdownOpen(false);
  };

  const campaignSelector = (
    <div className="relative w-64">
      <Input
        fullWidth
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setDropdownOpen(true);
        }}
        onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
        placeholder="Digite para buscar uma campanha..."
      />
      {isDropdownOpen && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg left-0">
          <ul className="w-full">
            {searchResults.map((campaign) => (
              <li
                key={campaign.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                onMouseDown={() => handleSelectCampaign(campaign)}
              >
                {campaign.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <ChartCard title="Métodos de Pagamento por Campanha" controls={campaignSelector}>
      <BaseBarChart data={data} dataKey="valor" categoryKey="metodo" config={chartConfig} />
    </ChartCard>
  );
};
