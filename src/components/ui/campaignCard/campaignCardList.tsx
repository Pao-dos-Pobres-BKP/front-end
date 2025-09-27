import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import { Progress } from "../progress";
import blueHeart from "@/assets/blueHeart.svg";
import orangeHeart from "@/assets/orangeHeart.svg";
import redHeart from "@/assets/redHeart.svg";
import { Category } from "react-iconly";

export type CampaignCardListProps = {
  title: string;
  raised: number;
  goal: number;
  creatorName?: string;
  onAction?: () => void;
  className?: string;
  situation?: "approved" | "pending" | "rejected" | "recurring";
  progressPercent?: number;
};

export function CampaignCardList(props: CampaignCardListProps) {
  const {
    situation,
    goal,
    raised,
    creatorName,
    title,
    className,
    progressPercent: percent = 0,
    onAction,
  } = props;

  const handleActionKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onAction?.();
    }
  };

  const situationIcons: Record<"approved" | "pending" | "recurring", string> = {
    approved: blueHeart,
    pending: orangeHeart,
    recurring: redHeart,
  };

  return (
    <article
      className={cn(
        "flex flex-col md:flex-row w-full bg-white border border-[#e6e8eb] rounded-2xl p-4 md:p-5 items-start md:items-center justify-between gap-3",
        className
      )}
      aria-label={`Card lista ${title}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3">
        <div className="flex items-center gap-2 flex-shrink-0">
          {situation && situation !== "rejected" && (
            <img src={situationIcons[situation]} alt="" className="h-6 w-6 flex-shrink-0" />
          )}
          <div className="flex flex-col truncate">
            <div className="text-[#034d6b] text-xl font-semibold truncate">{title}</div>
            {creatorName && (
              <div className="text-sm text-[#f68537] truncate">por {creatorName}</div>
            )}
          </div>
        </div>
        <div className="flex items-center w-full gap-3">
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center gap-1.5 w-full flex-wrap">
              <div className="text-xl font-bold text-[#034d6b] truncate">
                {formatCurrency(raised)}
              </div>
              <div className="text-sm text-[#6b7280] truncate">de {formatCurrency(goal)}</div>
            </div>
            <div className="w-full mt-1">
              {situation === "approved" || situation === "recurring" ? (
                <Progress value={percent} variant="blue" size="large" />
              ) : situation === "rejected" ? (
                <div className="text-center text-xs font-semibold text-yellow-800 bg-red-400 rounded-full py-0.5 px-2 w-full max-w-[120px]">
                  Rejeitada
                </div>
              ) : (
                <div className="text-center text-xs font-semibold text-white bg-[#F6C337] rounded-full py-0.5 px-2 w-full max-w-[140px]">
                  Pendente Aprovação
                </div>
              )}
            </div>
          </div>
          <div className="flex-shrink-0">
            <div
              role="button"
              tabIndex={0}
              onClick={onAction}
              onKeyDown={handleActionKeyDown}
              className={cn(
                "inline-flex items-center justify-center text-sm font-semibold rounded-[10px] transition-colors shadow-sm hover:shadow-lg focus:outline-none cursor-pointer min-w-[44px] h-10 sm:h-11 md:h-12 px-3",
                "bg-[#034d6b] hover:bg-[#023a50] text-white"
              )}
            >
              <Category set="bold" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
