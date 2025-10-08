interface MetricCardProps {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function MetricCard({ label, value, prefix, suffix }: MetricCardProps) {
  return (
    <div className="flex h-16 sm:h-20 md:h-24 flex-1 min-w-[90px] sm:min-w-[110px] md:min-w-[130px] flex-col items-center justify-center gap-0.5 sm:gap-1 md:gap-2 rounded-lg bg-white px-2 sm:px-3 md:px-4 shadow-sm">
      <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-[color:var(--color-components)] truncate max-w-full">
        {prefix}{value}{suffix}
      </span>
      <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-center text-[color:var(--color-components)] leading-tight line-clamp-2">
        {label}
      </span>
    </div>
  );
}