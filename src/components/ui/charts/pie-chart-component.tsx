"use client"

import { Pie, PieChart, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/charts/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/charts/chart"

interface PieChartProps {
  title?: string
  data: { name: string; value: number }[]
  colors?: string[]
}

export function PieChartComponent({
  title = "Gênero",
  data,
  colors = ["#E8C468", "#2A9D90", "#F4A462", "#8C6A2F", "#A6B75F", "#D97B3D", "#E5D4B0", "#6FB6A9", "#8B4B3E"],
}: PieChartProps) {

  const chartConfig: ChartConfig = data.reduce((config, item, index) => {
    config[item.name] = {
      label: item.name,
      color: colors[index % colors.length],
    }
    return config
  }, {} as ChartConfig)

  return (
    <Card className="bg-white text-black w-[365px] h-[374px] border border-black rounded-[10px]">
      <CardHeader className="justify-center">
        <div className="text-black text-sm font-bold text-align: center">{title}</div>
      </CardHeader>
      <CardContent className="h-[650px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ value, ...props }) => (
                <text
                  x={props.x}
                  y={props.y}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill="#000"
                  fontSize={12}
                  fontFamily="Inter"
                >
                  {value}
                </text>
              )}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-center gap-3 pt-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-xs font-inter text-black">{item.name}</span>
          </div>
        ))}
      </CardFooter>
    </Card>
  )
}
