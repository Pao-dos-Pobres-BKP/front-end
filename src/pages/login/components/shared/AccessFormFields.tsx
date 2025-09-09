import Input from "@/components/ui/input";

interface AccessFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AccessFormFieldsProps {
  form: AccessFormData;
  errors: Partial<Record<keyof AccessFormData, string>>;
  onChange: (field: keyof AccessFormData, value: string) => void;
  disabled?: boolean;
}

export default function AccessFormFields({
  form,
  errors,
  onChange,
  disabled,
}: AccessFormFieldsProps) {
  const handleChange =
    (field: keyof AccessFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field, e.target.value);
    };

  return (
    <>
      <Input
        id="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        type="email"
        value={form.email}
        onChange={handleChange("email")}
        fullWidth
        error={errors.email}
        disabled={disabled}
      />

      <Input
        id="password"
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
        value={form.password}
        onChange={handleChange("password")}
        fullWidth
        error={errors.password}
        disabled={disabled}
      />

      <Input
        id="confirmPassword"
        label="Confirmar Senha"
        placeholder="Confirme sua senha"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange("confirmPassword")}
        fullWidth
        error={errors.confirmPassword}
        disabled={disabled}
      />
    </>
  );
}

export type { AccessFormData };
