import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import Button from "../button";
import { useState } from "react";
import { Progress } from "../progress";
import { ChevronDownIcon } from "lucide-react"

export type CampaignCardProfileProps = {
    title: string;
    raised: number;
    goal: number;
    creatorName?: string;
    onAction?: () => void;
    className?: string;
    donorName: string;
    donorEmail: string;
    donationAmount?: number;
    memberSince: string; //'DD/MM/AAAA' or year
    campaigns: string[];
    progressPercent?: number;
};

export function CampaignCardProfile({
    goal,
    title,
    className,
    donorName,
    donorEmail,
    donationAmount,
    memberSince = "DD/MM/AAAA",
    campaigns = [],
    progressPercent: percent = 0
}: CampaignCardProfileProps) {
    const [detailsOpen, setDetailsOpen] = useState(true);
    return (
        <article className={cn("w-full bg-white border border-[#e6e8eb] rounded-2xl", className)} role="group" aria-label={`Perfil do doador ${donorName ?? ""}`}>
            <div>
                <div
                    className="flex gap-4 cursor-pointer relative p-4 items-center"
                    onClick={() => setDetailsOpen((v) => !v)}
                    id="profile-card-header"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setDetailsOpen((v) => !v);
                        }
                    }}
                    aria-expanded={detailsOpen}
                    aria-controls="profile-card-details"
                >
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
                            <div className="text-sm text-left text-[#f68537] font-semibold">para {title}</div>
                        </div>
                    </div>
                    <div
                        className={cn(
                            "text-[#6b7280] transition-transform transform duration-200 content-center items-center justify-center", detailsOpen ? "rotate-180" : "rotate-0")}>
                        <ChevronDownIcon />
                    </div>
                </div>

                <div
                    className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-in-out",
                        detailsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                    id="profile-card-details"
                    aria-hidden={!detailsOpen}
                >
                    <div className="overflow-hidden rounded-b-2xl">
                        <div className="text-[#005172] bg-[#DEDEDE] pb-4 pl-4 pr-4">
                            <div className="flex font-semibold items-center gap-3  pt-3 border-t-1 border-gray-300">
                                <div>Quanto doou: </div>
                                <div className="flex-1">
                                    <div className="rounded-full overflow-hidden">
                                        <Progress value={percent} variant="blue" size="large" />
                                    </div>
                                </div>
                                <div className="text-md font-bold ">{formatCurrency(goal)}</div>
                            </div>

                            <div className="mt-3 font-semibold text-[var(--color-text-muted)] w-full text-left">
                                <div className="mt-1 font-bold mb-1">Campanhas:</div>
                                <ul className="list-disc list-inside text-sm">
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
            </div>
        </article>
    );
}