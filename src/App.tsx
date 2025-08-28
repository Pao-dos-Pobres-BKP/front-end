import React from "react";
import BarChartComponent from "./components/ui/bar-chart-component";
import AreaChartComponent from "./components/ui/area-chart-component";
import PieChartComponent from "./components/ui/pie-chart-component";

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
      { month: "Jul", doacoes: 3490 },
      { month: "Ago", doacoes: 3000 },
      { month: "Set", doacoes: 3590 },
      { month: "Out", doacoes: 3190 },
      { month: "Nov", doacoes: 3290 },
      { month: "Dez", doacoes: 6000 },
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
      { month: "Mai", total: 2181 },
      { month: "Jun", total: 2500 },
      { month: "Jul", total: 2100 },
      { month: "Ago", total: 2100 },
      { month: "Set", total: 1900 },
      { month: "Out", total: 1500 },
      { month: "Nov", total: 2100 },
      { month: "Dez", total: 2000},
    ];
    return (
      <div className="bg-[#2F5361] flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
        <PieChartComponent data={pieChartData} />
        <BarChartComponent data={barChartData} />
        <AreaChartComponent data={areaChartData} />
      </div>
    );
  }
};

export default App;