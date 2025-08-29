"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/charts/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/charts/chart"

interface BarChartProps {
  title?: string
  description?: string
  data: { month: string; doacoes: number }[]
}

const chartConfig = {
  doacoes: {
    label: "Doações",
    color: "#E8B931",
  },
} satisfies ChartConfig


export function BarChartComponent({
  title = "Doações Realizadas por Período",
  data,
}: BarChartProps) {
  return (
    <Card className="bg-white text-black w-[365px] h-[359px] border border-black rounded-[10px]">
      <CardHeader className="justify-center">
        <div className="text-black text-sm font-bold text-align: center">{title}</div>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ left: 36, right: 12, top: 0, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#D1D5DB"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="doacoes"
              fill="#E8B931"
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-black font-inter font-normal text-[12px] leading-[100%] tracking-[0]">
          Aqui é possível visualizarmos as doações realizadas por período ao longo do ano de <span className="font-bold">2025</span>.
        </div>
      </CardFooter>
    </Card>
  )
}
