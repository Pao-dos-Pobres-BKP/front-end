// React import not required with the current JSX runtime
import cn from "../../utils/cn";
import Button from "./button";
import { Progress } from "./progress";

export type CampaignCardProps = {
    title: string;
    raised: number;
    goal: number;
    creatorName?: string;
    // variant now supports three visual models requested from Figma
    variant?: "hero" | "profile" | "compact";
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
    // profile-specific props
    donorName?: string;
    donorEmail?: string;
    donationAmount?: number;
    memberSince?: string; // e.g. 'DD/MM/AAAA' or year
    campaigns?: string[];
};

function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
        value
    );
}

export default function CampaignCard({
    title,
    raised,
    goal,
    creatorName,
    variant = "hero",
    actionLabel = "Doar",
    onAction,
    className,
    donorName,
    donorEmail,
    donationAmount,
    memberSince,
    campaigns = [],
}: CampaignCardProps) {
    const percent = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

    // Render per variant requested in the Figma
    if (variant === "profile") {
        // donor / profile card (middle example)
        return (
            <article className={cn("w-full bg-white border border-[#e6e8eb] rounded-2xl p-4", className)} role="group" aria-label={`Perfil do doador ${donorName ?? ""}`}>
                <div>
                    <div className="flex gap-4">
                        <div>
                            <div className="h-12 w-12 rounded-full bg-[#00d1d3] flex items-center justify-center text-white font-semibold" aria-hidden>
                                {donorName ? donorName.split(" ").map(s => s[0]).slice(0, 2).join("") : "U"}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 w-full">
                            <div>
                                <div className="font-semibold text-[#034d6b]">{donorName ?? "Fulano De Tal"}</div>
                                <div className="text-sm text-[#6b7280]">{donorEmail ?? "email@email.com"}</div>
                            </div>

                            <div className="text-right">
                                <div className="text-left text-lg font-bold text-[#034d6b]">{donationAmount ? formatCurrency(donationAmount) : "+0,00"}</div>
                                <div className="text-sm text-[#f68537]">para {title}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">


                        <div className="mt-3">
                            <div className="flex items-center gap-3">
                                <div>Quanto doou: </div>
                                <div className="flex-1">
                                    <div className="rounded-full bg-[#e6e8eb] overflow-hidden">
                                        <Progress value={percent} variant="blue" size="large" />
                                    </div>
                                </div>
                                <div className="text-md font-bold text-[#6b7280]">{formatCurrency(goal)}</div>
                            </div>

                            <div className="mt-3 text-sm text-[var(--color-text-muted)] w-full text-left">
                                <div className="mt-1 font-bold">Campanhas:</div>
                                <ul className="list-disc list-inside text-[#034d6b]">
                                    {campaigns.slice(0, 3).map((c, i) => (<li key={i} className="text-sm">{c}</li>))}
                                </ul>
                                <div className="flex mt-2 items-center justify-between">
                                    <div>Membro desde: {memberSince ?? "DD/MM/AAAA"}</div>
                                    <div>
                                        <Button variant="secondary" size="small">Adicionar Dados</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </article>
        );
    }

    if (variant === "compact") {
        // compact horizontal card (bottom example)
        return (
            <article className={cn("w-full bg-white border border-[#e6e8eb] rounded-2xl p-3 flex items-center justify-between", className)} role="group" aria-label={`Card compacto ${title}`}>
                <div className="flex items-center gap-3 min-w-0">
                    <span className="inline-flex items-center justify-center h-6 w-6 text-[#034d6b]">♥</span>
                    <div className="min-w-0">
                        <div className="font-semibold text-[#034d6b] truncate">{title}</div>
                        {creatorName && <div className="text-sm text-[#f68537]">{creatorName}</div>}
                    </div>
                </div>

                <div className="flex-1 mx-6">
                    <div className="flex items-center justify-end gap-4">
                        <div className="text-lg font-bold text-[#034d6b]">{formatCurrency(raised)}</div>
                        <div className="text-sm text-[#6b7280]">de {formatCurrency(goal)}</div>
                    </div>
                    <div className="mt-2">
                        <div className="w-full rounded-full bg-[#e6e8eb] overflow-hidden">
                            <Progress value={percent} variant="blue" size="small" />
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <Button variant="secondary" size="small" onClick={onAction}>{actionLabel}</Button>
                </div>
            </article>
        );
    }

    // default: hero / large banner (top example)
    return (
        <article
            className={cn(
                "w-full bg-white border border-[#e6e8eb] rounded-2xl p-6",
                "md:flex md:items-center md:justify-between md:gap-4",
                className
            )}
            role="group"
            aria-label={`Card da campanha ${title}`}
        >
            <div className="flex items-start gap-4 w-full">
                <div className="flex-shrink-0 pt-1">
                    <span className="inline-flex items-center justify-center h-8 w-8 text-[var(--color-brand)]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M12 21s-7-4.5-9-7.5C-1 8 5 3 8 6c1 1.5 2 2.5 4 4 2-1.5 3-2.5 4-4 3-3 9 2 5 7.5C19 16.5 12 21 12 21z" fill="currentColor" />
                        </svg>
                    </span>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-4">
                        <div className="min-w-0">
                            <h3 className="text-2xl md:text-3xl font-semibold text-[#034d6b] leading-tight truncate">{title}</h3>
                            {creatorName && <p className="mt-1 text-base text-[#f68537]">{creatorName}</p>}
                        </div>

                        <div className="mt-4 md:mt-0 md:text-right flex flex-col items-start md:items-end">
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl md:text-3xl font-bold text-[#034d6b]">{formatCurrency(raised)}</span>
                                <span className="text-base text-[#6b7280]">de {formatCurrency(goal)}</span>
                            </div>
                            <span className="mt-1 text-base text-[#6b7280]">{percent}%</span>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-6">
                        <div className="w-full rounded-full bg-[#e6e8eb] overflow-hidden">
                            <Progress value={percent} variant="blue" size="full" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-4 flex items-center gap-3">
                <Button variant="secondary" size="small" onClick={onAction}>{actionLabel}</Button>
            </div>
        </article>
    );
}

