import { Tabs } from "@/components/layout/tabs";
import { Avatar } from "@/components/ui/avatar";
import Button from "../components/ui/button";

const Home = () => {

      const barChartData = [
      { month: "Jan", doacoes: 4000 },
      { month: "Fev", doacoes: 3000 },
      { month: "Mar", doacoes: 2000 },
      { month: "Abr", doacoes: 2780 },
      { month: "Mai", doacoes: 1890 },
      { month: "Jun", doacoes: 2390 },
      { month: "Jul", doacoes: 4000 },
      { month: "Ago", doacoes: 3000 },
      { month: "Set", doacoes: 2000 },
      { month: "Out", doacoes: 2780 },
      { month: "Nov", doacoes: 1890 },
      { month: "Dez", doacoes: 2390 },
    ];
    const pieChartData = [
      { name: "Masculino", value: 230 },
      { name: "Feminino", value: 210 },
      { name: "Outro", value: 135 },
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
    <div className="container py-10 flex flex-col gap-4 bg-gray-200 justify-center items-center">
      <Button variant="primary" size="small" className="">
        Salvar
      </Button>
      <Button variant="secondary" size="medium">
        Salvar
      </Button>
      <Button variant="destructive" size="large">
        Salvar
      </Button>
      <Button variant="confirm" size="large">
        Salvar
      </Button>
      <Button variant="primary" desactive size="large">
        Salvar
      </Button>

      <Tabs tabs={["Usuário", "Senha"]}>
        <div>Conteúdo do Usuário</div>
        <div>Conteúdo da Senha</div>
      </Tabs>

      <Tabs tabs={["Usuário", "Senha"]} variant="secondary">
        <div>Conteúdo do Usuário</div>
        <div>Conteúdo da Senha</div>
      </Tabs>

      <Avatar imgUrl="https://github.com/arturbschultz.png" size="small" />
      <Avatar imgUrl="https://github.com/arturbschultz.png" />
      <Avatar imgUrl="https://github.com/arturbschultz.png" size="large" />

    </div>
  );
};

export default Home;
