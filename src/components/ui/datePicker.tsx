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
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data",
  className
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
        variant="secondary"
        size="medium"
        data-empty={!value}
        className={cn("justify-between", className)}
        >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value ? format(value, "P", { locale: ptBR }) : <span>{placeholder}</span>}
        <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 border border-slate-300">
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