import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";
import { DropdownLimited } from "@/components/ui/Calendar/calendar-dropdown";

import { format as dfFormat } from "date-fns";
import { ptBR } from "date-fns/locale";


import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "secondary",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();
  const capitalize = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  const navBtnBase =
    "h-7 w-7 p-0 select-none rounded-md bg-transparent hover:bg-slate-100 text-black";

  return (
    <DayPicker
      locale={ptBR}
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:2.25rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatCaption: (date) => {
          const month = dfFormat(date, "LLLL", { locale: ptBR });
          const year = dfFormat(date, "yyyy", { locale: ptBR });
          return `${capitalize(month)} ${year}`;
        },

        formatMonthDropdown: (date) => {
          const month = dfFormat(date, "LLLL", { locale: ptBR });
          return capitalize(month);
        },
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("flex gap-4 flex-col md:flex-row relative", defaultClassNames.months),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          navBtnBase,
          "aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(navBtnBase, "aria-disabled:opacity-50", defaultClassNames.button_next),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5 text-black",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative border border-slate-300 rounded-md has-focus:border-ring shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px]",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute bg-popover inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium text-black",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-black rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2 gap-2", defaultClassNames.week),
        week_number_header: cn("select-none w-(--cell-size)", defaultClassNames.week_number_header),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn("rounded-l-md bg-accent", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn("rounded-md ring-1 ring-slate-300", defaultClassNames.today),
        outside: cn(
          "text-muted-foreground opacity-40 hover:opacity-60 aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
          }

          return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
        },
        DayButton: (p) => <CalendarDayButton {...p} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
        Dropdown: (p: any) => <DropdownLimited {...p} maxVisibleItems={10} />,

      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "relative w-full min-w-(--cell-size) aspect-square p-0",
        "flex items-center justify-center",
        "bg-transparent border-0 shadow-none outline-none",
        "focus-visible:ring-0",
        defaultClassNames.day,
        className
      )}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      {...props}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full leading-none",
          "size-[calc(var(--cell-size)-.5rem)]",
          "text-[0.8125rem] font-medium text-black",
          "bg-transparent",
          "hover:ring-1 hover:ring-slate-300 hover:bg-gray-100",
          "group-data-[focused=true]/day:ring-1 group-data-[focused=true]/day:ring-black/20",
          modifiers.selected && "bg-[var(--color-components)] text-white ring-0 hover:text-black"
        )}
      >
        {day.date.getDate()}
      </span>
    </button>
  );
}

export { Calendar, CalendarDayButton };