import { formatCurrency } from "@/utils/formatCurrency";
import cn from "../../utils/cn";
import { CampaignCardCompact } from "./campaignCardCompact";
import { CampaignCardProfile } from "./campaignCardProfile";
import { Progress } from "./progress";

export type CampaignCardProps = {
    title: string;
    raised: number;
    goal: number;
    creatorName?: string;
    variant?: "default" | "profile" | "compact";
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
    situation?: "approved" | "pending" | "rejected";
    // profile
    donorName: string;
    donorEmail: string;
    donationAmount?: number;
    memberSince: string; //'DD/MM/AAAA' or year
    campaigns: string[];
};

export default function CampaignCard({
    title,
    raised,
    goal,
    creatorName,
    variant = "default",
    className,
    donorName,
    donorEmail,
    donationAmount,
    memberSince,
    campaigns = [],
    situation
}: CampaignCardProps) {
    const percent = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

    if (variant === "profile") {
        return <CampaignCardProfile
            donorName={donorName}
            donorEmail={donorEmail}
            donationAmount={donationAmount}
            memberSince={memberSince}
            campaigns={campaigns}
            title={title}
            raised={raised}
            goal={goal}
            className={className}
            progressPercent={percent}
        />;
    }

    if (variant === "compact") {
        return <CampaignCardCompact
            situation={situation}
            goal={goal}
            raised={raised}
            creatorName={creatorName}
            title={title}
            className={className}
            progressPercent={percent}
        />;
    }

    return (
        <article
            className={cn(
                "w-full bg-white border border-[#e6e8eb] rounded-2xl",
                "md:flex md:items-center md:justify-between md:gap-4",
                className
            )}
            role="group"
            aria-label={`Card da campanha ${title}`}
        >
            <div className="flex gap-4 w-full p-4">
                <div className="flex-1 min-w-0">
                    <div className="min-w-0">
                        <div className="flex-shrink-0 flex items-center gap-2 justify-center">
                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.645 17.9101L9.638 17.9071L9.616 17.8951C9.48729 17.8243 9.35961 17.7516 9.233 17.6771C7.71081 16.7726 6.28827 15.71 4.989 14.5071C2.688 12.3601 0.25 9.17407 0.25 5.25007C0.25 2.32207 2.714 7.09512e-05 5.688 7.09512e-05C6.51475 -0.00397847 7.33178 0.178412 8.07832 0.533676C8.82486 0.888941 9.4817 1.40794 10 2.05207C10.5184 1.40781 11.1754 0.888729 11.9221 0.533459C12.6689 0.178188 13.4861 -0.00412905 14.313 7.09512e-05C17.286 7.09512e-05 19.75 2.32207 19.75 5.25007C19.75 9.17507 17.312 12.3611 15.011 14.5061C13.7117 15.709 12.2892 16.7716 10.767 17.6761C10.6404 17.7509 10.5127 17.8239 10.384 17.8951L10.362 17.9071L10.355 17.9111L10.352 17.9121C10.2436 17.9695 10.1227 17.9995 10 17.9995C9.87729 17.9995 9.75644 17.9695 9.648 17.9121L9.645 17.9101Z" fill="url(#paint0_linear_198_2670)" />
                                <defs>
                                    <linearGradient id="paint0_linear_198_2670" x1="10" y1="0" x2="10" y2="17.9995" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.427885" stop-color="#005172" />
                                        <stop offset="1" stop-color="#00D1D3" />
                                    </linearGradient>
                                </defs>
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

