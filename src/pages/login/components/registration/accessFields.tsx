import { useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import FormContainer from "../shared/FormContainer";
import FormActions from "../shared/FormActions";
import StepIndicator from "../shared/StepIndicator";
import AccessFormFields, { type AccessFormData } from "./AccessFormFields";

interface AccessFieldsProps {
  onBack: () => void;
  onRegister: (data: AccessFormData) => void | Promise<string | boolean | undefined>;
  errorApi?: (data: string) => string;
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
    if (value.length < 9) return "Senha deve ter pelo menos 9 caracteres";
    if (!/[a-z]/.test(value)) return "Senha deve conter pelo menos 1 letra minúscula";
    if (!/[A-Z]/.test(value)) return "Senha deve conter pelo menos 1 letra maiúscula";
    if (!/\d/.test(value)) return "Senha deve conter pelo menos 1 número";
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(value)) {
      return "Senha deve conter pelo menos 1 símbolo (!@#$%^&*...)";
    }

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
    try {
      const result = await onRegister(form);

      if (typeof result === "string") {
        setErrors((prev) => ({
          ...prev,
          api: result,
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        api: "Não foi possível conectar ao servidor. Tente novamente mais tarde...",
      }));
      console.error("Erro no cadastro:", error);
    } finally {
      setIsLoading(false);
    }
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
