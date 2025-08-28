import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface AreaChartProps {
  title?: string;
  data: { month: string; total: number }[];
}

export default class AreaChartComponent extends React.Component<AreaChartProps> {
  render() {
    const { title = "Distribuição de Gastos", data } = this.props;

    return (
      <div className="bg-white p-4 rounded-2xl shadow-md w-full h-80">
        <h2 className="text-sm font-inter mb-2 text-black">{title}</h2>
        <ResponsiveContainer width={343} height={280}>
          <AreaChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke="#A9840C" fill="#FBC106" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
