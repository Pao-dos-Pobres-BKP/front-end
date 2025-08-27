import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TextareaWithTextProps {
  labelText: string
}

export function TextareaWithText({ labelText }: TextareaWithTextProps) {
  return (
    <div className="grid w-full gap-3">
      <Label
        htmlFor="message-2"
        className="text-black font-medium text-left"
      >
        {labelText}
      </Label>
      <Textarea
        placeholder="Digite sua mensagem aqui..."
        id="message-2"
      />
      <p className="text-gray-500 text-sm text-left">
        Entre em contato com o time de suporte.
      </p>
    </div>
  )
}
