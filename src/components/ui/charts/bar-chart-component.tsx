"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/charts/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/charts/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-shadcn"

interface BarChartProps {
  title?: string
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
  const [filter, setFilter] = useState<string>("all")

  const filteredData =
    filter === "all" ? data : data.filter((d) => d.month.startsWith(filter))

  return (
    <Card
      className="
        bg-white text-black 
        w-[343px] h-[281px] 
        sm:w-[520px] sm:h-[440px] 
        md:w-[1360px] md:h-[538px] 
        border border-black rounded-[10px]
      "
    >
      <CardHeader className="flex flex-col gap-2">
        <div className="text-black text-sm font-bold text-center w-full">
          {title}
        </div>
          <div className="flex justify-start">
        <Select onValueChange={setFilter} defaultValue="all">
          <SelectTrigger className="w-[180px] border border-gray-100 rounded-[10px]">
            <SelectValue placeholder="Filtrar por mês" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border border-gray-100 rounded-md">
            <SelectItem value="all" className="hover:bg-gray-300">
              Todos os meses
            </SelectItem>
            <SelectItem value="J" className="hover:bg-gray-300">
              Meses que começam com J
            </SelectItem>
            <SelectItem value="M" className="hover:bg-gray-300">
              Meses que começam com M
            </SelectItem>
            <SelectItem value="A" className="hover:bg-gray-300">
              Meses que começam com A
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardHeader>

      <CardContent className="md:w-[1340px] md:h-[393px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={filteredData}
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
            <Bar dataKey="doacoes" fill="#E8B931" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
