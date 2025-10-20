import { useState, useEffect } from "react";
import { ChartCard } from "@/components/ui/charts/chart-card";
import { BaseAreaChart } from "@/components/ui/charts/area-chart-component";
import type { ChartConfig } from "@/components/ui/charts/chart";
import { CalendarIcon } from "lucide-react";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
};

const fetchDataForPeriod = async (startDate: Date, endDate: Date) => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) {
    return Array.from({ length: diffDays + 1 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return {
        data: formatDate(date),
        total: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000,
      };
    });
  } else {
    const months = Math.ceil(diffDays / 30);
    return Array.from({ length: months }, (_, i) => ({
      data: `Mês ${i + 1}`,
      total: Math.floor(Math.random() * (150000 - 50000 + 1)) + 50000,
    }));
  }
};

const chartConfig = {
  total: { label: "Total", color: "#A9840C" },
} satisfies ChartConfig;

export const TotalArrecadadoChart = () => {
  const [data, setData] = useState<Array<{ data: string; total: number }>>([]);
  const [monthSeparators, setMonthSeparators] = useState<{ x: string }[]>([]);

  const [period] = useState(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 29);
    return { startDate, endDate };
  });

  useEffect(() => {
    fetchDataForPeriod(period.startDate, period.endDate).then((fetchedData) => {
      setData(fetchedData);

      const separators: { x: string }[] = [];
      let currentMonth: string | null = null;
      fetchedData.forEach((item) => {
        const month = item.data.split("/")[1];
        if (currentMonth !== null && month !== currentMonth) {
          separators.push({ x: item.data });
        }
        currentMonth = month;
      });
      setMonthSeparators(separators);
    });
  }, [period]);

  const formattedPeriod = `${formatDate(period.startDate)} - ${formatDate(period.endDate)}`;

  const periodSelector = (
    <div className="flex items-center gap-2 text-sm text-gray-600 border rounded-md px-3 py-1 cursor-pointer">
      <CalendarIcon className="h-4 w-4" />
      <span>{formattedPeriod}</span>
    </div>
  );

  return (
    <ChartCard title="Total Arrecadado no Período" controls={periodSelector}>
      <BaseAreaChart
        data={data}
        dataKey="total"
        categoryKey="data"
        config={chartConfig}
        strokeColor="#A9840C"
        referenceLines={monthSeparators}
      />
    </ChartCard>
  );
};