"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/charts/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/charts/chart"

interface AreaChartProps {
  title?: string
  description?: string
  data: { month: string; total: number }[]
}

const chartConfig = {
  total: {
    label: "Total",
    color: "#FBC106",
  },
} satisfies ChartConfig

export function AreaChartComponent({
  title = "Distribuição de Gastos",
  data,
}: AreaChartProps) {
  return (
    <Card className="bg-white text-black w-[365px] h-[281px] border border-black rounded-[10px]">
      <CardHeader className="justify-center">
        <div className="text-black text-sm font-bold text-align: center">{title}</div>
      </CardHeader>
      <CardContent className="h-[185px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#D1D5DB"
              strokeDasharray="4 4"
              strokeWidth={1}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="total"
              type="linear"
              fill="#ffffff"
              fillOpacity={0.4}
              stroke="#A9840C"
              strokeWidth={3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
