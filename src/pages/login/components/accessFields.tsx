import { useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import FormContainer from "./shared/FormContainer";
import FormActions from "./shared/FormActions";
import StepIndicator from "./shared/StepIndicator";
import AccessFormFields, { type AccessFormData } from "./shared/AccessFormFields";

interface AccessFieldsProps {
  onBack: () => void;
  onRegister: (data: AccessFormData) => void;
}

const initialForm: AccessFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationRules = {
  email: (value: string) => {
    if (!value.trim()) return "E-mail é obrigatório";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "E-mail inválido";
    return null;
  },
  password: (value: string) => {
    if (!value.trim()) return "Senha é obrigatória";
    if (value.length < 6) return "Senha deve ter pelo menos 6 caracteres";
    return null;
  },
  confirmPassword: (value: string) => {
    if (!value.trim()) return "Confirmação de senha é obrigatória";
    return null;
  },
};

export default function AccessFields({ onBack, onRegister }: AccessFieldsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { form, errors, updateField, validateForm, setErrors } = useFormValidation(
    initialForm,
    validationRules
  );

  const handleRegister = async () => {
    const isFormValid = validateForm();
    if (form.password !== form.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Senhas não coincidem",
      }));
      return;
    }
    if (!isFormValid) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRegister(form);
    }, 1500);
  };

  const steps = [
    { number: 1, label: "Dados Pessoais", isActive: false, isCompleted: true },
    { number: 2, label: "Dados de Acesso", isActive: true, isCompleted: false },
  ];

  return (
    <FormContainer>
      <AccessFormFields form={form} errors={errors} onChange={updateField} disabled={isLoading} />
      <StepIndicator steps={steps} />
      <FormActions
        primaryAction={{
          label: isLoading ? "Cadastrando..." : "Cadastrar",
          onClick: handleRegister,
          variant: "confirm",
          disabled: isLoading,
        }}
        secondaryAction={{
          label: "Voltar",
          onClick: onBack,
          variant: "tertiary",
          disabled: isLoading,
        }}
      />
    </FormContainer>
  );
}
