import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function DropdownLimited({
  value,
  onChange,
  options,
  maxVisibleItems = 12,
  widthClass = "w-30",
}: {
  value: number;
  onChange: (v: number) => void;
  options: { value: number; label: string }[];
  name: "month" | "year";
  maxVisibleItems?: number;
  widthClass?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = options.find((o) => o.value === value);
  const maxH = `calc(${maxVisibleItems} * 2rem)`;

  return (
    <div ref={rootRef} className={cn("relative", widthClass)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "h-8 rounded-md border border-slate-300 bg-white px-2 text-sm w-full",
          "inline-flex items-center justify-between"
        )}
      >
        <span className="tabular-nums">{current?.label}</span>
        <ChevronDownIcon className="size-4 text-muted-foreground" />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md overflow-auto"
          style={{ maxHeight: maxH }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2 text-sm hover:bg-gray-100",
                "tabular-nums",
                opt.value === value && "bg-gray-50 font-medium"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}