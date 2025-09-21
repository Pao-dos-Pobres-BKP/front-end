import Input from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export const FormContent = () => {
  //valor mockado enquanto não tem integração com o usuário
  const userLogged = false;
  return (
    <div className="mt-9 gap-4 flex flex-col items-center">
      <Select
        placeholder="Campanha"
        options={[
          { label: "Campanha 1", value: "campanha-1" },
          { label: "Campanha 2", value: "campanha-2" },
        ]}
        fullWidth
      />
      {userLogged && <Input placeholder="Frequência" fullWidth />}
      <Input placeholder="Valor" fullWidth />
      <Select
        placeholder="Tipo de pagamento"
        options={[
          { label: "Pix", value: "pix" },
          { label: "Débito", value: "debito" },
        ]}
        fullWidth
      />
    </div>
  );
};
export default FormContent;
