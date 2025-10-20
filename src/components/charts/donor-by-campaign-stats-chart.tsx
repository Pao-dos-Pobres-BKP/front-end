import { useState, useEffect } from "react";
import { ChartCard } from "@/components/ui/charts/chart-card";
import { BasePieChart } from "@/components/ui/charts/pie-chart-component";
import { BaseBarChart } from "@/components/ui/charts/bar-chart-component";
import type { ChartConfig } from "@/components/ui/charts/chart";
import Input from "@/components/ui/input";

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

const fetchDonorStatsByCampaign = async (campaignId: string): Promise<DonorStats> => {
  console.log(`Buscando estatísticas para a campanha: ${campaignId}`);
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockData[campaignId] || { pieData: [], barData: [] }), 500)
  );
};

const allCampaigns = [
  { id: "campanha-a", name: "Campanha A" },
  { id: "campanha-b", name: "Campanha B" },
];

const searchCampaigns = async (query: string) => {
  if (query.length < 3) return [];
  console.log(`Buscando campanhas com o termo: ${query}`);
  const filtered = allCampaigns.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  return new Promise<typeof allCampaigns>((resolve) => setTimeout(() => resolve(filtered), 300));
};

const pieConfig = {
  Masculino: { label: "Masculino", color: "#E8C468" },
  Feminino: { label: "Feminino", color: "#2A9D90" },
  Outro: { label: "Outro", color: "#F4A462" },
} satisfies ChartConfig;

const barConfig = {
  total: { label: "Total de Doadores", color: "#264653" },
} satisfies ChartConfig;

export const DoadoresPorCampanhaStats = () => {
  const [pieData, setPieData] = useState<DonorStats["pieData"]>([]);
  const [barData, setBarData] = useState<DonorStats["barData"]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState(allCampaigns[0]);
  const [searchTerm, setSearchTerm] = useState(allCampaigns[0].name);
  const [searchResults, setSearchResults] = useState(allCampaigns);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchDonorStatsByCampaign(selectedCampaign.id).then((stats) => {
      setPieData(stats.pieData);
      setBarData(stats.barData);
    });
  }, [selectedCampaign]);

  const handleSelectCampaign = (campaign: (typeof allCampaigns)[0]) => {
    setSelectedCampaign(campaign);
    setSearchTerm(campaign.name);
    setDropdownOpen(false);
  };

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
            {searchResults.map(campaign => (
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
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <h2 className="text-lg font-bold">Estatísticas de Doadores por Campanha</h2>
        {campaignSelector}
      </div>
      <div className="grid md:grid-cols-2 gap-6 w-full">
        <ChartCard title="Doadores por Gênero">
          <BasePieChart data={pieData} dataKey="value" nameKey="name" config={pieConfig} />
        </ChartCard>
        <ChartCard title="Doadores por Faixa Etária">
          <BaseBarChart data={barData} dataKey="total" categoryKey="faixa" config={barConfig} />
        </ChartCard>
      </div>
    </div>
  );
};
