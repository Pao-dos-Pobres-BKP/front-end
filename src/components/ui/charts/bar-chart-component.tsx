"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import type { ChartConfig } from "@/components/ui/charts/chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts/chart";

interface BaseBarChartProps<TData> {
  data: TData[];
  dataKey: string;
  categoryKey: string;
  config: ChartConfig;
}

export function BaseBarChart<TData extends Record<string, unknown>>({
  data,
  dataKey,
  categoryKey,
  config,
}: BaseBarChartProps<TData>) {
  return (
    <ChartContainer config={config} className="h-full w-full">
      <BarChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={categoryKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          // tickFormatter={(value: string) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} width={32} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel className="bg-white" />}
        />
        <Bar dataKey={dataKey} radius={8}>
          {data.map((item, index) => {
            const categoryValue = item[categoryKey] as string;
            const color =
              config[categoryValue]?.color || config[dataKey]?.color || "var(--color-primary)";
            return <Cell key={`cell-${categoryValue}-${index}`} fill={color} />;
          })}
        </Bar>{" "}
      </BarChart>
    </ChartContainer>
  );
}
