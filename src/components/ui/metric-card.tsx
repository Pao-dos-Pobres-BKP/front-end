interface MetricCardProps {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function MetricCard({ label, value, prefix, suffix }: MetricCardProps) {
  return (
    <div className="flex h-20 sm:bg-red-300 md:bg-amber-300 lg:bg-green-300 xl:to-blue-300 sm:h-24 flex-1 flex-col items-center justify-center gap-1 sm:gap-2 rounded-lg bg-white shadow-sm">
      <span className="text-md sm:text-xl md:text-xl font-bold text-[color:var(--color-components)] truncate max-w-full">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="text-[10px] sm:text-xs font-medium text-center text-[color:var(--color-components)] leading-tight line-clamp-2">
        {label}
      </span>
    </div>
  );
}
