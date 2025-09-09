import { useFormValidation } from "@/hooks/useFormValidation";
import { isValidCPF, isValidPhone } from "@/utils/formatters";
import FormContainer from "./shared/FormContainer";
import FormActions from "./shared/FormActions";
import StepIndicator from "./shared/StepIndicator";
import PersonalFormFields, { type PersonalFormData } from "./shared/PersonalFormFields";

interface PersonalFieldsProps {
  onCancel: () => void;
  onNext: () => void;
}

const initialForm: PersonalFormData = {
  nomeCompleto: "",
  dataNascimento: undefined,
  genero: "",
  cpf: "",
  telefone: "",
};

const validationRules = {
  nomeCompleto: (value: string) => (!value.trim() ? "Nome completo é obrigatório" : null),
  dataNascimento: (value?: Date) => (!value ? "Data de nascimento é obrigatória" : null),
  genero: (value: string) => (!value ? "Gênero é obrigatório" : null),
  cpf: (value: string) => {
    if (!value.trim()) return "CPF é obrigatório";
    if (!isValidCPF(value)) return "CPF inválido";
    return null;
  },
  telefone: (value: string) => {
    if (!value.trim()) return "Telefone é obrigatório";
    if (!isValidPhone(value)) return "Telefone inválido";
    return null;
  },
};

export default function PersonalFields({ onCancel, onNext }: PersonalFieldsProps) {
  const { form, errors, updateField, validateForm } = useFormValidation(
    initialForm,
    validationRules
  );

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const steps = [
    { number: 1, label: "Dados Pessoais", isActive: true, isCompleted: false },
    { number: 2, label: "Dados de Acesso", isActive: false, isCompleted: false },
  ];

  return (
    <FormContainer>
      <PersonalFormFields form={form} errors={errors} onChange={updateField} />

      <StepIndicator steps={steps} />

      <FormActions
        primaryAction={{
          label: "Próximo",
          onClick: handleNext,
          variant: "primary",
        }}
        secondaryAction={{
          label: "Cancelar",
          onClick: onCancel,
          variant: "tertiary",
        }}
      />
    </FormContainer>
  );
}
