import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import { Progress } from "../progress";
import Button from "../button";

export type CampaignCardCompactProps = {
    title: string;
    raised: number;
    goal: number;
    creatorName?: string;
    onAction?: () => void;
    className?: string;
    situation?: "approved" | "pending" | "rejected";
    progressPercent?: number;
};


export function CampaignCardCompact(props: CampaignCardCompactProps) {
    const {
        situation,
        goal,
        raised,
        creatorName,
        title,
        className,
        progressPercent: percent = 0,
        onAction
    } = props;

    return (
        <article
            className={cn("md:flex flex flex-row w-full bg-white border border-[#e6e8eb] rounded-2xl p-5 items-center justify-between", className)}
            aria-label={`Card compacto ${title}`}
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
                <div className="flex items-center justify-center">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.645 17.9101L9.638 17.9071L9.616 17.8951C9.48729 17.8243 9.35961 17.7516 9.233 17.6771C7.71081 16.7726 6.28827 15.71 4.989 14.5071C2.688 12.3601 0.25 9.17407 0.25 5.25007C0.25 2.32207 2.714 7.09512e-05 5.688 7.09512e-05C6.51475 -0.00397847 7.33178 0.178412 8.07832 0.533676C8.82486 0.888941 9.4817 1.40794 10 2.05207C10.5184 1.40781 11.1754 0.888729 11.9221 0.533459C12.6689 0.178188 13.4861 -0.00412905 14.313 7.09512e-05C17.286 7.09512e-05 19.75 2.32207 19.75 5.25007C19.75 9.17507 17.312 12.3611 15.011 14.5061C13.7117 15.709 12.2892 16.7716 10.767 17.6761C10.6404 17.7509 10.5127 17.8239 10.384 17.8951L10.362 17.9071L10.355 17.9111L10.352 17.9121C10.2436 17.9695 10.1227 17.9995 10 17.9995C9.87729 17.9995 9.75644 17.9695 9.648 17.9121L9.645 17.9101Z" fill="url(#paint0_linear_198_2670)" />
                        <defs>
                            <linearGradient id="paint0_linear_198_2670" x1="10" y1="0" x2="10" y2="17.9995" gradientUnits="userSpaceOnUse">
                                <stop offset="0.427885" stopColor="#005172" />
                                <stop offset="1" stopColor="#00D1D3" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="font-semibold flex flex-col items-start ml-2">
                        <div className="text-[#034d6b] truncate text-xl">{title}</div>
                        <div className="text-sm text-[#f68537] truncate">por {creatorName}</div>
                    </div>
                </div>
                <div className="flex items-center mr-2">
                    <div className="flex flex-col w-full items-center">
                        <div className="flex items-center gap-1.5">
                            <div className="text-xl font-bold text-[#034d6b]">{formatCurrency(raised)}</div>
                            <div className="text-sm text-[#6b7280] truncate">de {formatCurrency(goal)}</div>
                        </div>
                        <div className="w-full rounded-full overflow-hidden mt-2 justify-center items-center flex">
                            {situation == "approved" ? (
                                <Progress value={percent} variant="blue" size="large" />
                            ) : situation == "rejected" ? (
                                <div className="w-50 text-center text-xs font-semibold text-yellow-800 bg-red-400 rounded-full py-1 px-2">Rejeitada</div>
                            ) : (
                                <div className="w-50 text-center text-xs font-semibold text-white bg-[#F6C337] rounded-full py-1 px-2">Pendente Aprovação</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Button onClick={onAction} className="w-fit pl-3.5 pr-3.5" variant="secondary"><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.577 20.3691H5.753C2.312 20.3691 0 17.9541 0 14.3601V6.04611C0 2.45211 2.312 0.0371094 5.753 0.0371094H9.492C9.906 0.0371094 10.242 0.373109 10.242 0.787109C10.242 1.20111 9.906 1.53711 9.492 1.53711H5.753C3.169 1.53711 1.5 3.30711 1.5 6.04611V14.3601C1.5 17.0991 3.169 18.8691 5.753 18.8691H14.577C17.161 18.8691 18.831 17.0991 18.831 14.3601V10.3321C18.831 9.91811 19.167 9.58211 19.581 9.58211C19.995 9.58211 20.331 9.91811 20.331 10.3321V14.3601C20.331 17.9541 18.018 20.3691 14.577 20.3691Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.86689 13.4285H9.84389C10.2239 13.4285 10.5799 13.2815 10.8489 13.0125L18.3579 5.50349C18.6659 5.19549 18.8359 4.78549 18.8359 4.34949C18.8359 3.91249 18.6659 3.50149 18.3579 3.19349L17.1409 1.97649C16.5039 1.34149 15.4679 1.34149 14.8299 1.97649L7.35689 9.44949C7.09789 9.70849 6.95089 10.0525 6.94189 10.4175L6.86689 13.4285ZM9.84389 14.9285H6.09789C5.89589 14.9285 5.70189 14.8465 5.56089 14.7015C5.41989 14.5575 5.34289 14.3625 5.34789 14.1595L5.44189 10.3805C5.46089 9.62849 5.76389 8.92149 6.29589 8.38849H6.29689L13.7699 0.915488C14.9919 -0.304512 16.9789 -0.304512 18.2009 0.915488L19.4179 2.13249C20.0109 2.72449 20.3369 3.51149 20.3359 4.34949C20.3359 5.18749 20.0099 5.97349 19.4179 6.56449L11.9089 14.0735C11.3579 14.6245 10.6239 14.9285 9.84389 14.9285Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7298 7.91685C17.5378 7.91685 17.3458 7.84385 17.1998 7.69685L12.6338 3.13085C12.3408 2.83785 12.3408 2.36285 12.6338 2.06985C12.9268 1.77685 13.4008 1.77685 13.6938 2.06985L18.2598 6.63685C18.5528 6.92985 18.5528 7.40385 18.2598 7.69685C18.1138 7.84385 17.9218 7.91685 17.7298 7.91685Z" fill="white" />
                </svg>
                </Button>
            </div>
        </article>
    );
}