import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import * as React from "react"

type TextareaWithTextProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  labelText: string
  helperText?: string
  id?: string
}

export function TextareaWithText({
  labelText,
  placeholder = "Digite sua mensagem aqui...",
  helperText,
  id = "message-2",
  ...textareaProps
}: TextareaWithTextProps) {
  const helperHasContent = typeof helperText === "string" && helperText.trim().length > 0
  const helperId = helperHasContent ? `${id}-helper` : undefined

  return (
    <div className="grid w-full gap-3">
      <Label htmlFor={id} className="text-black font-medium text-left">
        {labelText}
      </Label>

      <Textarea
        id={id}
        placeholder={placeholder}
        aria-describedby={helperId}
        {...textareaProps}
      />

      {helperHasContent ? (
        <p id={helperId} className="text-gray-500 text-sm text-left">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}