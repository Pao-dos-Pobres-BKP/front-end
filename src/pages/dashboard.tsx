import { useState, useEffect } from "react";

import { MetricCard } from "@/components/ui/metric-card";
import { Tabs } from "@/components/ui/tabs";
import { Select } from "@/components/ui/select";
import Button from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateRangePicker } from "@/components/ui/Calendar/date-range-picker";
import type { DateRange } from "react-day-picker";
import Input from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { TotalArrecadadoChart } from "@/components/charts/total-collected-chart";
import { PagamentosGeralChart } from "@/components/charts/payment-general-chart";
import { DoadoresGeralStats } from "@/components/charts/donor-general-stats-charts";
import { PagamentosPorCampanhaChart } from "@/components/charts/payment-by-campaign-chart";
import { DoadoresPorCampanhaStats } from "@/components/charts/donor-by-campaign-stats-chart";

type MetricData = {
  newDonors: number;
  recurringDonors: number;
  totalDonors: number;
  raisedThisMonth: number;
  averageDonation: number;
};

const mockMetrics: MetricData = {
  newDonors: 29,
  recurringDonors: 213,
  totalDonors: 841,
  raisedThisMonth: 9343.21,
  averageDonation: 20.0,
};

type Option = { value: string; label: string };

const sectorOptions = [
  { value: "financeiro", label: "Financeiro" },
  { value: "operacional", label: "Operacional" },
];

const metric1OptionMap: Record<string, Option[]> = {
  financeiro: [
    { value: "total", label: "Total" },
    { value: "metodo", label: "Método de Pagamento" },
  ],
  operacional: [{ value: "doadores", label: "Doadores" }],
};

const metric2OptionMap: Record<string, Option[]> = {
  total: [{ value: "valor", label: "Valor" }],
  metodo: [
    { value: "quantidade", label: "Quantidade" },
    { value: "valor", label: "Valor" },
  ],
  doadores: [
    { value: "idade", label: "Idade" },
    { value: "genero", label: "Gênero" },
  ],
};

const sectorDescriptions: Record<string, string> = {
  financeiro: "Ver estatísticas de doações: valores e quantidade.",
  operacional: "Ver estatísticas a cerca dos doadores.",
};

const metric1Descriptions: Record<string, string> = {
  total: "Para ver o total daquela métrica naquele período.",
  metodo: "Para ver as estatísticas de acordo com o método de pagamento.",
  doadores: "Para ver as estatísticas a cerca dos doadores.",
};

const metric2Descriptions: Record<string, string> = {
  valor: "Para ver as estatísticas de valores em reais.",
  quantidade: "Para ver as estatísticas de quantidade daquele parâmetro.",
  idade: "Estatísticas sobre a idade dos doadores.",
  genero: "Estatística a cerca do gênero dos doadores.",
};

type Campaign = { id: string; name: string };
const allCampaigns: Campaign[] = [
  { id: "campanha-a", name: "Campanha de Natal 2025" },
  { id: "campanha-b", name: "Campanha de Inverno" },
  { id: "campanha-c", name: "Ajuda RS" },
  { id: "campanha-d", name: "Cestas Básicas POA" },
];

const searchCampaigns = async (query: string): Promise<Campaign[]> => {
  if (query.length < 3) return [];
  console.log(`Buscando campanhas com o termo: ${query}`);
  const filtered = allCampaigns.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  return new Promise<Campaign[]>((resolve) => setTimeout(() => resolve(filtered), 300));
};

const TabContentTrigger = ({ onSelect }: { onSelect: () => void }) => {
  useEffect(() => {
    onSelect();
  }, [onSelect]);
  return null;
};

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const RenderChart = ({
  chartKey,
  campaignId,
  period,
}: {
  chartKey: string | null;
  campaignId: string | null;
  period: DateRange | undefined;
}) => {
  if (!chartKey) {
    return (
      <div className="flex-1 w-full h-80 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-md">
        (Selecione os filtros e clique em "Buscar" para exibir um gráfico)
      </div>
    );
  }

  switch (chartKey) {
    case "financeiro_total_valor":
      return <TotalArrecadadoChart period={period} />;
    case "financeiro_metodo_quantidade":
      return <PagamentosGeralChart show="quantidade" period={period} />;
    case "financeiro_metodo_valor":
      return <PagamentosGeralChart show="valor" period={period} />;
    case "operacional_doadores_idade":
      return <DoadoresGeralStats show="idade" period={period} />;
    case "operacional_doadores_genero":
      return <DoadoresGeralStats show="genero" period={period} />;
    case "financeiro_metodo_quantidade_campaign":
      if (!campaignId) return <p>Erro: Campanha não selecionada.</p>;
      return (
        <PagamentosPorCampanhaChart campaignId={campaignId} show="quantidade" period={period} />
      );
    case "financeiro_metodo_valor_campaign":
      if (!campaignId) return <p>Erro: Campanha não selecionada.</p>;
      return <PagamentosPorCampanhaChart campaignId={campaignId} show="valor" period={period} />;
    case "operacional_doadores_idade_campaign":
      if (!campaignId) return <p>Erro: Campanha não selecionada.</p>;
      return <DoadoresPorCampanhaStats campaignId={campaignId} show="idade" period={period} />;
    case "operacional_doadores_genero_campaign":
      if (!campaignId) return <p>Erro: Campanha não selecionada.</p>;
      return <DoadoresPorCampanhaStats campaignId={campaignId} show="genero" period={period} />;

    default:
      return (
        <div className="flex-1 w-full h-80 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-md">
          (Combinação de filtros inválida)
        </div>
      );
  }
};

// TEMPORÁRIO: Lista de todos os gráficos para navegar
const allChartKeys = [
  "financeiro_total_valor",
  "financeiro_metodo_quantidade",
  "financeiro_metodo_valor",
  "operacional_doadores_idade",
  "operacional_doadores_genero",
  "financeiro_metodo_quantidade_campaign",
  "financeiro_metodo_valor_campaign",
  "operacional_doadores_idade_campaign",
  "operacional_doadores_genero_campaign",
];

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [timeRangeTab, setTimeRangeTab] = useState<"mensal" | "anual">("mensal");
  const [sectorFilter, setSectorFilter] = useState("");
  const [metric1Filter, setMetric1Filter] = useState("");
  const [metric2Filter, setMetric2Filter] = useState("");
  const [metric1Options, setMetric1Options] = useState<Option[]>([]);
  const [metric2Options, setMetric2Options] = useState<Option[]>([]);
  const [datePeriod, setDatePeriod] = useState<DateRange | undefined>(undefined);
  const [chartToShow, setChartToShow] = useState<string | null>("operacional_doadores_idade"); // exemplo
  const [useCampaignFilter, setUseCampaignFilter] = useState(false);
  const [campaignSearchTerm, setCampaignSearchTerm] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignSearchResults, setCampaignSearchResults] = useState<Campaign[]>([]);
  const [isCampaignDropdownOpen, setCampaignDropdownOpen] = useState(false);

  const [currentChartIndex, setCurrentChartIndex] = useState(0);

  // TEMPORÁRIO: Atualiza o gráfico quando o índice muda
  useEffect(() => {
    setChartToShow(allChartKeys[currentChartIndex]);
    // Se for um gráfico de campanha, seleciona uma campanha automaticamente
    if (allChartKeys[currentChartIndex].includes("_campaign")) {
      setSelectedCampaign(allCampaigns[0]);
    }
  }, [currentChartIndex]);

  // TEMPORÁRIO: Funções de navegação
  const handlePreviousChart = () => {
    setCurrentChartIndex((prev) => (prev > 0 ? prev - 1 : allChartKeys.length - 1));
  };

  const handleNextChart = () => {
    setCurrentChartIndex((prev) => (prev < allChartKeys.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    setMetrics(mockMetrics);
  }, []);

  useEffect(() => {
    if (sectorFilter) {
      setMetric1Options(metric1OptionMap[sectorFilter] || []);
    } else {
      setMetric1Options([]);
    }
    setMetric1Filter("");
    setMetric2Filter("");
  }, [sectorFilter]);

  useEffect(() => {
    if (metric1Filter) {
      setMetric2Options(metric2OptionMap[metric1Filter] || []);
    } else {
      setMetric2Options([]);
    }
    setMetric2Filter("");
  }, [metric1Filter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (useCampaignFilter && campaignSearchTerm.length >= 2) {
        searchCampaigns(campaignSearchTerm).then(setCampaignSearchResults);
      } else {
        setCampaignSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [campaignSearchTerm, useCampaignFilter]);

  const showCampaignFilter =
    (sectorFilter === "financeiro" && metric1Filter === "metodo") ||
    (sectorFilter === "operacional" && metric1Filter === "doadores");

  useEffect(() => {
    if (!showCampaignFilter) {
      setUseCampaignFilter(false);
      setCampaignSearchTerm("");
      setSelectedCampaign(null);
    }
  }, [showCampaignFilter]);

  useEffect(() => {
    console.log(`Filtro de período alterado para: ${timeRangeTab}`);
  }, [timeRangeTab]);

  const handleClearFilters = () => {
    setTimeRangeTab("mensal");
    setSectorFilter("");
    setMetric1Filter("");
    setMetric2Filter("");
    setDatePeriod(undefined);
    setChartToShow(null);
    setUseCampaignFilter(false);
    setCampaignSearchTerm("");
    setSelectedCampaign(null);
  };

  const isAnyFilterActive =
    sectorFilter !== "" ||
    metric1Filter !== "" ||
    metric2Filter !== "" ||
    !!datePeriod ||
    useCampaignFilter;

  const areAllFiltersSelected =
    sectorFilter !== "" && metric1Filter !== "" && metric2Filter !== "" && !!datePeriod;

  const canSearch =
    areAllFiltersSelected && (!useCampaignFilter || (useCampaignFilter && !!selectedCampaign));

  const handleSearch = () => {
    let key = `${sectorFilter}_${metric1Filter}_${metric2Filter}`;
    if (useCampaignFilter && selectedCampaign) {
      key += "_campaign";
    }
    setChartToShow(key);
  };

  const handleSelectCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setCampaignSearchTerm(campaign.name);
    setCampaignDropdownOpen(false);
  };

  return (
    <div className="bg-[#2F5361]">
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6">
        <aside
          className={`transition-all duration-300 ${isSidebarOpen ? "w-80" : "w-0"} overflow-hidden`}
        >
          <div className="bg-white rounded-lg p-4 h-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg text-[var(--color-components)]">Dashboard</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-[var(--color-components)] hover:bg-gray-200 p-1 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2 text-left">Resumos Totais</h3>
              <div className="[&>div>div]:w-full [&>div>div>button]:flex-1">
                <Tabs tabs={["Mensal", "Anual"]} variant="default">
                  <TabContentTrigger onSelect={() => setTimeRangeTab("mensal")} />
                  <TabContentTrigger onSelect={() => setTimeRangeTab("anual")} />
                </Tabs>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 text-left">Setor</label>
              <Select
                options={sectorOptions}
                value={sectorFilter}
                onChange={setSectorFilter}
                placeholder="Selecione..."
                fullWidth
              />
              {sectorFilter && (
                <p className="text-xs text-gray-500 mt-1 px-1 text-left">
                  {sectorDescriptions[sectorFilter]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 text-left">Métrica 1</label>
              <Select
                options={metric1Options}
                value={metric1Filter}
                onChange={setMetric1Filter}
                placeholder="Selecione..."
                fullWidth
                disabled={!sectorFilter}
              />
              {metric1Filter && (
                <p className="text-xs text-gray-500 mt-1 px-1 text-left">
                  {metric1Descriptions[metric1Filter]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 text-left">Métrica 2</label>
              <Select
                options={metric2Options}
                value={metric2Filter}
                onChange={setMetric2Filter}
                placeholder="Selecione..."
                fullWidth
                disabled={!metric1Filter}
              />
              {metric2Filter && (
                <p className="text-xs text-gray-500 mt-1 px-1 text-left">
                  {metric2Descriptions[metric2Filter]}
                </p>
              )}
            </div>

            {showCampaignFilter && (
              <div className="flex flex-col gap-3 p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="campaign-filter"
                    checked={useCampaignFilter}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true;
                      setUseCampaignFilter(isChecked);
                      if (!isChecked) {
                        setSelectedCampaign(null);
                        setCampaignSearchTerm("");
                      }
                    }}
                  />
                  <label
                    htmlFor="campaign-filter"
                    className="text-sm font-semibold text-gray-600 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                  >
                    Opcional: Filtrar por Campanha
                  </label>
                </div>

                <div className="relative w-full">
                  <Input
                    fullWidth
                    type="text"
                    value={campaignSearchTerm}
                    onChange={(e) => {
                      setCampaignSearchTerm(e.target.value);
                      setSelectedCampaign(null);
                      setCampaignDropdownOpen(true);
                    }}
                    onBlur={() => setTimeout(() => setCampaignDropdownOpen(false), 200)}
                    placeholder="Digite para buscar..."
                    disabled={!useCampaignFilter}
                  />
                  {isCampaignDropdownOpen && campaignSearchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg left-0 max-h-48 overflow-y-auto">
                      <ul className="w-full">
                        {campaignSearchResults.map((campaign) => (
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
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 text-left">Período</label>
              <DateRangePicker
                value={datePeriod}
                onChange={setDatePeriod}
                placeholder="Selecione..."
                fullWidth
              />
            </div>

            <div className="mt-auto flex gap-2">
              <Button
                variant="tertiary"
                className="flex-1"
                onClick={handleClearFilters}
                disabled={!isAnyFilterActive}
              >
                Limpar
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                disabled={!canSearch}
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col gap-6">
          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${
              !isSidebarOpen ? "lg:grid-cols-6" : "lg:grid-cols-5"
            }`}
          >
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="
                  flex items-center justify-center h-12 lg:h-16 rounded-lg bg-white px-2 lg:px-4 shadow-sm
                  hover:bg-gray-100 transition-colors
                "
              >
                <div className="flex items-center gap-2">
                  <span className="text-base md:text-xl font-bold text-[color:var(--color-components)]">
                    Dashboard
                  </span>
                  <ChevronRight className="h-5 w-5 text-[color:var(--color-components)]" />
                </div>
              </button>
            )}
            {metrics && (
              <>
                <MetricCard label="Novos Doadores" value={metrics.newDonors} prefix="+ " />
                <MetricCard label="Doadores Recorrentes" value={metrics.recurringDonors} />
                <MetricCard label="Doadores" value={metrics.totalDonors} />
                <MetricCard
                  label="Arrecadado este mês"
                  value={formatCurrency(metrics.raisedThisMonth)}
                />
                <MetricCard
                  label="Média de doação"
                  value={formatCurrency(metrics.averageDonation)}
                  prefix="~"
                />
              </>
            )}
          </div>

          <div className="bg-white rounded-lg p-6 flex-1 flex flex-col">
            {/* TEMPORÁRIO: Navegação entre gráficos */}
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between gap-4">
                <Button variant="secondary" onClick={handlePreviousChart} size="small">
                  ← Anterior
                </Button>
                <div className="flex-1 text-center">
                  <p className="text-sm text-gray-600">
                    Gráfico {currentChartIndex + 1} de {allChartKeys.length}
                  </p>
                  <p className="font-semibold text-[var(--color-components)]">
                    {allChartKeys[currentChartIndex]}
                  </p>
                </div>
                <Button variant="secondary" onClick={handleNextChart} size="small">
                  Próximo →
                </Button>
              </div>
            </div>

            <RenderChart
              chartKey={chartToShow}
              campaignId={selectedCampaign ? selectedCampaign.id : null}
              period={datePeriod}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
