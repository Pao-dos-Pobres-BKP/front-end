import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PieChartProps {
  title?: string;
  data: { name: string; value: number }[];
  colors?: string[];
}

export default class PieChartComponent extends React.Component<PieChartProps> {
  render() {
    const {
      title = "Gênero",
      data,
      colors = ["#E8C468", "#2A9D90", "#F4A462", "#A9840C"],
    } = this.props;

    return (
      <div className="bg-white p-4 rounded-2xl shadow-md w-full h-80 flex flex-col items-center justify-center">
        <h2 className="text-sm font-inter mb-2 text-black">{title}</h2>
        <ResponsiveContainer width={343} height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
