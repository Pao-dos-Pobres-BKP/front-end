import { Label } from "@/components/ui/label"
import Input from "@/components/ui/input"
import * as React from "react"

type InputWithLabelProps = React.InputHTMLAttributes<HTMLInputElement> & {
  labelText: string
  helperText?: React.ReactNode
  id?: string
}

export function InputWithLabel({
  labelText,
  placeholder = "",
  helperText,
  id = "input-1",
  ...inputProps
}: InputWithLabelProps) {
  const helperHasContent =
    helperText !== undefined &&
    !(typeof helperText === "string" && helperText.trim().length === 0)

  const helperId = helperHasContent ? `${id}-helper` : undefined

  return (
    <div className="grid w-full gap-2">
      <Label htmlFor={id} className="text-black font-medium text-left">
        {labelText}
      </Label>

      <Input
        id={id}
        placeholder={placeholder}
        aria-describedby={helperId}
        className="w-full h-11 sm:h-12"
        {...inputProps}
      />

      {helperHasContent ? (
        <div
          id={helperId}
          className="text-gray-500 text-sm text-left flex justify-between"
        >
          {helperText}
        </div>
      ) : null}
    </div>
  )
}