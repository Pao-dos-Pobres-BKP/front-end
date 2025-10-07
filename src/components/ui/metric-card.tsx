interface MetricCardProps {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function MetricCard({ label, value, prefix, suffix }: MetricCardProps) {
  return (
    <div className="flex h-20 min-w-[120px] flex-col items-center justify-center gap-2 rounded-lg bg-white px-4 shadow-sm">
      <span className="text-2xl font-bold text-[color:var(--color-components)]">
        {prefix}{value}{suffix}
      </span>
      <span className="text-xs font-medium text-center text-[color:var(--color-components)]">
        {label}
      </span>
    </div>
  );
}