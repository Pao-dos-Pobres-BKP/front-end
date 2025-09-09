import Input from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { formatCPF, formatPhone } from "@/utils/formatters";

const genderOptions = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "outro", label: "Outro" },
  { value: "prefiro_nao_informar", label: "Prefiro não informar" },
];

interface PersonalFormData {
  nomeCompleto: string;
  dataNascimento?: Date;
  genero: string;
  cpf: string;
  telefone: string;
}

interface PersonalFormFieldsProps {
  form: PersonalFormData;
  errors: Partial<Record<keyof PersonalFormData, string>>;
  onChange: (field: keyof PersonalFormData, value: string | Date) => void;
}

export default function PersonalFormFields({ form, errors, onChange }: PersonalFormFieldsProps) {
  const handleInputChange =
    (field: keyof Pick<PersonalFormData, "nomeCompleto" | "cpf" | "telefone">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (field === "cpf") {
        value = formatCPF(value);
      } else if (field === "telefone") {
        value = formatPhone(value);
      }

      onChange(field, value);
    };

  return (
    <>
      <Input
        id="nomeCompleto"
        label="Nome Completo"
        placeholder="Digite seu nome completo"
        type="text"
        value={form.nomeCompleto}
        onChange={handleInputChange("nomeCompleto")}
        fullWidth
        error={errors.nomeCompleto}
      />

      <DatePicker
        id="dataNascimento"
        label="Data de Nascimento"
        value={form.dataNascimento}
        onChange={(date) => onChange("dataNascimento", date || new Date())}
        placeholder="Selecione sua data de nascimento"
        fullWidth
        error={errors.dataNascimento}
      />

      <Select
        id="genero"
        label="Gênero"
        options={genderOptions}
        placeholder="Selecione seu gênero"
        value={form.genero}
        onChange={(value) => onChange("genero", value)}
        fullWidth
        error={errors.genero}
      />

      <Input
        id="cpf"
        label="CPF"
        placeholder="000.000.000-00"
        type="text"
        value={form.cpf}
        onChange={handleInputChange("cpf")}
        fullWidth
        error={errors.cpf}
        maxLength={14}
      />

      <Input
        id="telefone"
        label="Telefone"
        placeholder="(11) 99999-9999"
        type="tel"
        value={form.telefone}
        onChange={handleInputChange("telefone")}
        fullWidth
        error={errors.telefone}
        maxLength={15}
      />
    </>
  );
}

export type { PersonalFormData };
