import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface BarChartProps {
  title?: string;
  data: { month: string; doacoes: number }[];
}

export default class BarChartComponent extends React.Component<BarChartProps> {
  render() {
    const { title = "Doações Realizadas por Período", data } = this.props;

    return (
      <div className="bg-white p-4 rounded-2xl shadow-md w-full h-80">
        <h2 className="text-sm font-inter mb-2 text-black">{title}</h2>
        <ResponsiveContainer width={343} height={280}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="doacoes" fill="#E8B931" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
