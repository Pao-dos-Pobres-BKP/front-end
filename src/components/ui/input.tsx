import cn from "../../utils/cn";
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

type LabelPosition = "left" | "center" | "right";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
  label?: string;
  labelPosition?: LabelPosition;
  labelText?: string;
  helperText?: React.ReactNode;
  error?: string;
};

const Input = ({
  className,
  fullWidth = false,
  label,
  labelPosition = "left",
  labelText,
  helperText,
  error,
  id = "input-1",
  type,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const hasError = !!error;
  const hasHelperText =
    helperText !== undefined && !(typeof helperText === "string" && helperText.trim().length === 0);
  const displayLabel = labelText || label;
  const isPasswordInput = type === "password";

  const descriptorId = hasError ? `${id}-error` : hasHelperText ? `${id}-helper` : undefined;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getLabelClasses = () => {
    const baseClasses = "block mb-1 text-sm font-medium text-[var(--color-components)]";

    const positionClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    return cn(baseClasses, positionClasses[labelPosition]);
  };

  return (
    <div className="w-full">
      {displayLabel && (
        <label htmlFor={id} className={getLabelClasses()}>
          {displayLabel}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={isPasswordInput && showPassword ? "text" : type}
          aria-invalid={hasError}
          aria-describedby={descriptorId}
          className={cn(
            "rounded-lg border border-[var(--color-components)]/30 bg-white px-3 py-2 text-sm text-black shadow-sm outline-none placeholder:text-[var(--color-components)]/50 focus:border-[var(--color-components)] focus:ring-1 focus:ring-[var(--color-components)]",
            fullWidth ? "w-full" : "w-80",
            hasError && "border-red-500 focus:border-red-500 focus:ring-red-500",
            isPasswordInput && "pr-10",
            className
          )}
          {...props}
        />

        {isPasswordInput && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-components)]/60 hover:text-[var(--color-components)] focus:outline-none focus:text-[var(--color-components)] transition-colors"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {hasError ? (
        <p id={descriptorId} className="text-red-600 text-sm text-left mt-1">
          {error}
        </p>
      ) : hasHelperText ? (
        <div
          id={descriptorId}
          className="text-gray-500 text-sm text-left flex justify-between mt-1"
        >
          {helperText}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
