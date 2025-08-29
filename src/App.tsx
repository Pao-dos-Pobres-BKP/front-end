import React from "react";
import { BarChartComponent } from "./components/ui/charts/bar-chart-component";
import { AreaChartComponent } from "./components/ui/charts/area-chart-component";
import { PieChartComponent } from "./components/ui/charts/pie-chart-component";

class App extends React.Component {
  render() {
    // Dados de exemplo para os gráficos
    const barChartData = [
      { month: "Jan", doacoes: 4000 },
      { month: "Fev", doacoes: 3000 },
      { month: "Mar", doacoes: 2000 },
      { month: "Abr", doacoes: 2780 },
      { month: "Mai", doacoes: 1890 },
      { month: "Jun", doacoes: 2390 },
    ];
    const pieChartData = [
      { name: "Masculino", value: 400 },
      { name: "Feminino", value: 300 },
      { name: "Não-binário", value: 300 },
      { name: "Outro", value: 200 },
    ];
    const areaChartData = [
      { month: "Jan", total: 2400 },
      { month: "Fev", total: 2210 },
      { month: "Mar", total: 2290 },
      { month: "Abr", total: 2000 },
      { month: "Mai", total: 500},
      { month: "Jun", total: 2500 },
    ];
    return (
      <div className="bg-[#2F5361] flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
        <PieChartComponent data={pieChartData} />
        <BarChartComponent data={barChartData} />
        <AreaChartComponent title="Gastos" data={areaChartData} />
      </div>
    );
  }
};

export default App;