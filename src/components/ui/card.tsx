import cn from "../../utils/cn";
import Button from "./button";
import { Progress } from "./progress";

export type CampaignCardProps = {
    title: string;
    raised: number;
    goal: number;
    creatorName?: string;
    variant?: "hero" | "profile" | "compact";
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
    // profile
    donorName?: string;
    donorEmail?: string;
    donationAmount?: number;
    memberSince?: string; //'DD/MM/AAAA' or year
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
    className,
    donorName,
    donorEmail,
    donationAmount,
    memberSince,
    campaigns = [],
}: CampaignCardProps) {
    const percent = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

    if (variant === "profile") {
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
                                <div className="text-left font-semibold text-[#034d6b]">{donorName ?? "Fulano De Tal"}</div>
                                <div className="text-sm font-semibold text-[#6b7280]">{donorEmail ?? "email@email.com"}</div>
                            </div>

                            <div className="text-right">
                                <div className="text-left text-lg font-bold text-[#034d6b]">{donationAmount ? formatCurrency(donationAmount) : "+0,00"}</div>
                                <div className="text-sm text-[#f68537] font-semibold">para {title}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">


                        <div className="mt-3 text-[#005172]">
                            <div className="flex font-semibold items-center gap-3">
                                <div>Quanto doou: </div>
                                <div className="flex-1">
                                    <div className="rounded-full bg-[#e6e8eb] overflow-hidden">
                                        <Progress value={percent} variant="blue" size="large" />
                                    </div>
                                </div>
                                <div className="text-md font-bold ">{formatCurrency(goal)}</div>
                            </div>

                            <div className="mt-3 font-semibold text-[var(--color-text-muted)] w-full text-left">
                                <div className="mt-1 font-bold mb-1">Campanhas:</div>
                                <ul className="list-disc list-inside">
                                    {campaigns.slice(0, 3).map((c, i) => (<li key={i}>{c}</li>))}
                                </ul>
                                <div className="flex mt-2 font-semibold items-center justify-between">
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
        return (
            <article className={cn("w-full bg-white border border-[#e6e8eb] rounded-2xl p-3 flex items-center justify-between", className)} role="group" aria-label={`Card compacto ${title}`}>
                <div className="flex items-center gap-3 min-w-0">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.645 17.9101L9.638 17.9071L9.616 17.8951C9.48729 17.8243 9.35961 17.7516 9.233 17.6771C7.71081 16.7726 6.28827 15.71 4.989 14.5071C2.688 12.3601 0.25 9.17407 0.25 5.25007C0.25 2.32207 2.714 7.09512e-05 5.688 7.09512e-05C6.51475 -0.00397847 7.33178 0.178412 8.07832 0.533676C8.82486 0.888941 9.4817 1.40794 10 2.05207C10.5184 1.40781 11.1754 0.888729 11.9221 0.533459C12.6689 0.178188 13.4861 -0.00412905 14.313 7.09512e-05C17.286 7.09512e-05 19.75 2.32207 19.75 5.25007C19.75 9.17507 17.312 12.3611 15.011 14.5061C13.7117 15.709 12.2892 16.7716 10.767 17.6761C10.6404 17.7509 10.5127 17.8239 10.384 17.8951L10.362 17.9071L10.355 17.9111L10.352 17.9121C10.2436 17.9695 10.1227 17.9995 10 17.9995C9.87729 17.9995 9.75644 17.9695 9.648 17.9121L9.645 17.9101Z" fill="url(#paint0_linear_198_2670)" />
                        <defs>
                            <linearGradient id="paint0_linear_198_2670" x1="10" y1="0" x2="10" y2="17.9995" gradientUnits="userSpaceOnUse">
                                <stop offset="0.427885" stop-color="#005172" />
                                <stop offset="1" stop-color="#00D1D3" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="min-w-0">
                        <div className="font-semibold text-[#034d6b] truncate text-2xl">{title}</div>
                        {creatorName && <div className="text-sm text-left font-semibold text-[#f68537]">{creatorName}</div>}
                    </div>
                </div>

                <div className="flex-1 mx-6">
                    <div className="flex items-center justify-end gap-4">
                        <div className="text-2xl font-bold text-[#034d6b]">{formatCurrency(raised)}</div>
                        <div className="text-md text-[#6b7280]">de {formatCurrency(goal)}</div>
                    </div>
                    <div className="mt-2">
                        <div className="w-full rounded-full bg-[#e6e8eb] overflow-hidden">
                            <Progress value={percent} variant="blue" size="medium" />
                        </div>
                    </div>
                </div>
            </article>
        );
    }

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
            <div className="flex gap-4 w-full">
                <div className="flex-1 min-w-0">
                    <div className="min-w-0">
                        <div className="flex-shrink-0 pt-1 flex items-center gap-3 justify-center">
                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.645 17.9101L9.638 17.9071L9.616 17.8951C9.48729 17.8243 9.35961 17.7516 9.233 17.6771C7.71081 16.7726 6.28827 15.71 4.989 14.5071C2.688 12.3601 0.25 9.17407 0.25 5.25007C0.25 2.32207 2.714 7.09512e-05 5.688 7.09512e-05C6.51475 -0.00397847 7.33178 0.178412 8.07832 0.533676C8.82486 0.888941 9.4817 1.40794 10 2.05207C10.5184 1.40781 11.1754 0.888729 11.9221 0.533459C12.6689 0.178188 13.4861 -0.00412905 14.313 7.09512e-05C17.286 7.09512e-05 19.75 2.32207 19.75 5.25007C19.75 9.17507 17.312 12.3611 15.011 14.5061C13.7117 15.709 12.2892 16.7716 10.767 17.6761C10.6404 17.7509 10.5127 17.8239 10.384 17.8951L10.362 17.9071L10.355 17.9111L10.352 17.9121C10.2436 17.9695 10.1227 17.9995 10 17.9995C9.87729 17.9995 9.75644 17.9695 9.648 17.9121L9.645 17.9101Z" fill="url(#paint0_linear_198_2670)" />
                            </svg>
                            <h3 className="text-3xl font-semibold text-[#034d6b] leading-tight truncate">{title}</h3>
                        </div>
                        {creatorName && <p className="mt-1 text-base text-[#f68537] font-semibold"> por {creatorName}</p>}
                    </div>
                    <div className="mt-4 items-center flex flex-col">
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-[#034d6b]">{formatCurrency(raised)}</span>
                            <span className="text-base text-[#6b7280]">de {formatCurrency(goal)}</span>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-6">
                        <div className="w-full rounded-full bg-[#e6e8eb] overflow-hidden">
                            <Progress value={percent} variant="blue" size="full" />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

