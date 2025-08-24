import Button from "../components/ui/button";
import { Select } from "../components/ui/select";

const options = [
  { value: "1", label: "Opção 1" },
  { value: "2", label: "Opção 2" },
  { value: "3", label: "Opção 3" },
  { value: "4", label: "Opção 4" },
  { value: "5", label: "Opção 5" },
  { value: "6", label: "Opção 6" },
  { value: "7", label: "Opção 7" },
  { value: "8", label: "Opção 8" },
  { value: "9", label: "Opção 9" },
  { value: "10", label: "Opção 10" },
];

const Home = () => {
  return (
    <div className="container py-10 flex flex-col gap-4 w-screen">
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
      <Select
        options={options}
        size="small"
        placeholder="Selecione uma opção"
        onChange={(valor) => console.log(`Selecionado: ${valor}`)}
      />
      <Select
        options={options}
        size="small"
        disabled
        placeholder="Selecione uma opção"
      />
      <Select
        options={options}
        size="medium"
        placeholder="Selecione uma opção"
        onChange={(valor) => console.log(`Selecionado: ${valor}`)}
      />
      <Select
        options={options}
        size="medium"
        disabled
        placeholder="Selecione uma opção"
      />
      <Select
        options={options}
        size="large"
        placeholder="Selecione uma opção"
        onChange={(valor) => console.log(`Selecionado: ${valor}`)}
      />
      <Select
        options={options}
        size="large"
        disabled
        placeholder="Selecione uma opção"
      />
    </div>
  );
};

export default Home;
