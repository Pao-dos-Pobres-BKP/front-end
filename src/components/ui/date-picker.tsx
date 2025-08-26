"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  fromYear?: number
  toYear?: number
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  buttonSize?: React.ComponentProps<typeof Button>["size"]
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data",
  className,
  buttonVariant,
  buttonSize,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          data-empty={!value}
          className={cn("justify-between", className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "P", { locale: ptBR }) : <span>{placeholder}</span>}
          <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-md">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          autoFocus
          locale={ptBR}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  )
}