interface MetricCardProps {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function MetricCard({ label, value, prefix, suffix }: MetricCardProps) {
  return (
    <div className="flex h-20 sm:h-24 w-full min-w-[100px] sm:min-w-[120px] flex-col items-center justify-center gap-1 sm:gap-2 rounded-lg bg-white px-2 sm:px-4 shadow-sm">
      <span className="text-xl sm:text-2xl font-bold text-[color:var(--color-components)] truncate max-w-full">
        {prefix}{value}{suffix}
      </span>
      <span className="text-[10px] sm:text-xs font-medium text-center text-[color:var(--color-components)] leading-tight px-1">
        {label}
      </span>
    </div>
  );
}