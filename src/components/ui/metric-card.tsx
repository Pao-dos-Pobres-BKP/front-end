interface MetricCardProps {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function MetricCard({ label, value, prefix, suffix }: MetricCardProps) {
  return (
    <div className="flex h-20 sm:h-24 flex-1 min-w-[120px] flex-col items-center justify-center gap-1 sm:gap-2 rounded-lg bg-white px-3 sm:px-4 shadow-sm">
      <span className="text-lg sm:text-xl md:text-2xl font-bold text-[color:var(--color-components)] truncate max-w-full">
        {prefix}{value}{suffix}
      </span>
      <span className="text-[10px] sm:text-xs font-medium text-center text-[color:var(--color-components)] leading-tight line-clamp-2">
        {label}
      </span>
    </div>
  );
}