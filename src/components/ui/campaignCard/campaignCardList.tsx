import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatters";
import { Progress } from "../progress";
import blueHeart from "@/assets/blueHeart.svg";
import orangeHeart from "@/assets/orangeHeart.svg";
import redHeart from "@/assets/redHeart.svg";
import { Category } from "react-iconly";
import { Edit2, Eye, X } from "lucide-react";

export type CampaignCardListProps = {
  title: string;
  raised: number;
  goal: number;
  creatorName?: string;
  startDate?: string;
  endDate?: string;
  onAction?: () => void;
  className?: string;
  situation?: "approved" | "pending" | "rejected" | "recurring";
  progressPercent?: number;
  isAdmin?: boolean;
};

export function CampaignCardList(props: CampaignCardListProps) {
  const {
    situation,
    goal,
    raised,
    creatorName,
    startDate,
    endDate,
    title,
    className,
    progressPercent: percent = 0,
    onAction,
    isAdmin = false,
  } = props;

  const handleActionKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onAction?.();
    }
  };

  const situationIcons: Record<"approved" | "pending" | "rejected" | "recurring", string> = {
    approved: blueHeart,
    pending: orangeHeart,
    rejected: redHeart,
    recurring: redHeart,
  };

  return (
    <article
      className={cn(
        "flex w-full bg-white border border-[#e6e8eb] rounded-2xl p-4 md:p-5 gap-3",
        className
      )}
      aria-label={`Card lista ${title}`}
    >
      {/* Column 1: Icon + Title/Creator */}
      <div className="flex items-start gap-2 flex-shrink-0 min-w-0 w-full md:w-[320px]">
        {situation && (
          <img src={situationIcons[situation]} alt="" className="h-6 w-6 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex flex-col items-start min-w-0 flex-1">
          <div
            className="text-[#034d6b] text-xl font-semibold text-left w-full overflow-hidden text-ellipsis whitespace-nowrap"
            title={title}
          >
            {title}
          </div>
          {creatorName && (
            <div
              className={cn(
                "text-xs sm:text-sm text-left w-full overflow-hidden text-ellipsis whitespace-nowrap",
                situation === "recurring" || situation === "rejected"
                  ? "bg-gradient-to-b from-[#FF4A4A] to-[#FF8787] bg-clip-text text-transparent"
                  : situation === "approved"
                    ? "bg-gradient-to-b from-[#456DFF] to-[#AABCFF] bg-clip-text text-transparent"
                    : "text-[#034d6b]"
              )}
              title={`por ${creatorName}`}
            >
              por {creatorName}
            </div>
          )}
          {startDate && endDate && (
            <div className="text-[10px] sm:text-xs text-[#6b7280] text-left mt-1">
              {formatDate(startDate)} até {formatDate(endDate)}
            </div>
          )}
        </div>
      </div>

      {/* Column 2: Values + Progress Bar */}
      <div className="flex flex-col flex-1 min-w-0 justify-center">
        <div className="flex justify-between items-center gap-1.5 mb-1">
          <div className="text-xl font-bold text-[#034d6b] whitespace-nowrap">
            {formatCurrency(raised)}
          </div>
          <div className="text-sm text-[#6b7280] whitespace-nowrap">de {formatCurrency(goal)}</div>
        </div>
        <div className="w-full">
          {situation === "approved" || situation === "recurring" ? (
            <Progress value={percent} variant="blue" size="large" />
          ) : situation === "rejected" ? (
            <div className="text-center text-xs font-semibold text-white bg-red-400 rounded-full py-0.5 px-2 w-full max-w-[120px]">
              Rejeitada
            </div>
          ) : (
            <div className="text-center text-xs font-semibold text-white bg-[#F6C337] rounded-full py-0.5 px-2 w-full max-w-[140px]">
              Pendente Aprovação
            </div>
          )}
        </div>
      </div>

      {/* Column 3: Action Button */}
      <div className="flex-shrink-0 flex items-center">
        <div
          role="button"
          tabIndex={0}
          onClick={onAction}
          onKeyDown={handleActionKeyDown}
          className={cn(
            "inline-flex items-center justify-center text-sm font-semibold rounded-[10px] transition-colors shadow-sm hover:shadow-lg focus:outline-none cursor-pointer min-w-[44px] h-10 sm:h-11 md:h-12 px-3",
            situation === "pending"
              ? "bg-[#F6C337] hover:bg-[#E5B328] text-white"
              : situation === "rejected"
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-[#034d6b] hover:bg-[#023a50] text-white"
          )}
        >
          {isAdmin ? (
            situation === "pending" ? (
              <Eye className="h-5 w-5" />
            ) : situation === "rejected" ? (
              <X className="h-5 w-5" />
            ) : (
              <Edit2 className="h-5 w-5" />
            )
          ) : situation === "pending" || situation === "rejected" ? (
            <Eye className="h-5 w-5" />
          ) : (
            <Category set="bold" />
          )}
        </div>
      </div>
    </article>
  );
}
