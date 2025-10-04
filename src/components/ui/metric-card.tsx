interface MetricCardProps {
  value: string | number;
  label: string;
};

export function MetricCard({ label, value }: MetricCardProps) {
    return (
        <div className="flex h-20 w-50 flex-col items-center justify-center gap-2 rounded-lg bg-white px-4 shadow-sm">
            <span className="text-[#005172] text-2xl font-bold">{value}</span>
            <span className="text-[#005172] text-xs font-medium">{label}</span>
        </div>
    )
}