import React, { useState, useEffect } from "react";

import Navbar from "@/components/layout/navbar";
import { MetricCard } from "@/components/ui/metric-card";
import { Tabs } from "@/components/ui/tabs";
import { Select } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import Button from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const sectorOptions = [
  { value: "financeiro", label: "Financeiro" },
  { value: "operacional", label: "Operacional" },
];

const metricOptions = [
  { value: "doadores", label: "Doadores" },
  { value: "doacoes", label: "Doações" },
  { value: "recorrentes", label: "Recorrentes" },
  { value: "genero", label: "Gênero" },
];

const TabContentTrigger = ({ onSelect }: { onSelect: () => void }) => {
  useEffect(() => {
    onSelect();
  }, [onSelect]);
  return null;
};

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [timeRangeTab, setTimeRangeTab] = useState<"mensal" | "anual">("mensal");
  const [sectorFilter, setSectorFilter] = useState("");
  const [metricFilter, setMetricFilter] = useState("");
  const [datePeriod, setDatePeriod] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setMetrics(mockMetrics);
  }, []);

  useEffect(() => {
    console.log(`Filtro de período alterado para: ${timeRangeTab}`);
  }, [timeRangeTab]);

  return (
    <div className="bg-[#2F5361] min-h-screen">
      <Navbar />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6">
        <aside
          className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0"} overflow-hidden`}
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
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 text-left">Métrica</label>
              <Select
                options={metricOptions}
                value={metricFilter}
                onChange={setMetricFilter}
                placeholder="Selecione..."
                fullWidth
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600 text-left">Período</label>
              <DatePicker
                value={datePeriod}
                onChange={setDatePeriod}
                placeholder="01/08/2025 - 31/08/2025"
                fullWidth
              />
            </div>

            <div className="mt-auto flex gap-2">
              <Button variant="tertiary" className="flex-1">
                Limpar
              </Button>
              <Button variant="primary" className="flex-1">
                Buscar
              </Button>
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col gap-6">
          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${!isSidebarOpen ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}
          >
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex h-20 sm:h-24 flex-1 min-w-[120px] flex-row items-center justify-between gap-2 rounded-lg bg-white px-4 shadow-sm hover:bg-gray-100 transition-colors"
              >
                <span className="font-bold text-lg text-[color:var(--color-components)]">
                  Dashboard
                </span>
                <ChevronRight className="h-5 w-5 text-[color:var(--color-components)]" />
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
            <div className="flex-1 w-full h-80 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-md">
              (Espaço reservado para o componente de Gráfico)
            </div>
            <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 pt-4 mt-4 border-t border-gray-200"></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
