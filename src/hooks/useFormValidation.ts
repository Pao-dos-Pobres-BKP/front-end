import { useState } from "react";

type ValidationRules<T> = {
  [K in keyof T]: (value: T[K]) => string | null;
};

export function useFormValidation<T extends object>(
  initialState: T,
  validationRules: ValidationRules<T>
) {
  const [form, setForm] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const updateField = (field: keyof T, value: T[keyof T]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let hasErrors = false;

    for (const field in validationRules) {
      const error = validationRules[field](form[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const resetForm = () => {
    setForm(initialState);
    setErrors({});
  };

  return {
    form,
    errors,
    updateField,
    validateForm,
    resetForm,
    setForm,
    setErrors,
  };
}
