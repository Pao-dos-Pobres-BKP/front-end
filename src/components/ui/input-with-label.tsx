import { Label } from "@/components/ui/label";
import Input from "@/components/ui/input"; // Este componente precisa receber o 'error'
import * as React from "react";

type InputWithLabelProps = React.InputHTMLAttributes<HTMLInputElement> & {
  labelText: string;
  helperText?: React.ReactNode;
  id?: string;
  error?: string;
};

export function InputWithLabel({
  labelText,
  placeholder = "",
  helperText,
  id = "input-1",
  error,
  ...inputProps
}: InputWithLabelProps) {
  const hasError = !!error;
  const hasHelperText =
    helperText !== undefined && !(typeof helperText === "string" && helperText.trim().length === 0);

  const descriptorId = hasError ? `${id}-error` : hasHelperText ? `${id}-helper` : undefined;

  return (
    <div className="grid w-full gap-2">
      <Label htmlFor={id} className="text-black font-medium text-left">
        {labelText}
      </Label>

      <Input
        id={id}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={descriptorId}
        className="w-full h-11 sm:h-12"
        error={error}
        {...inputProps}
      />

      {hasError ? (
        <p id={descriptorId} className="text-red-600 text-sm text-left">
          {error}
        </p>
      ) : hasHelperText ? (
        <div id={descriptorId} className="text-gray-500 text-sm text-left flex justify-between">
          {helperText}
        </div>
      ) : null}
    </div>
  );
}
