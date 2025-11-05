import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import { Progress } from "../progress";
import blueHeart from "@/assets/blueHeart.svg";
import orangeHeart from "@/assets/orangeHeart.svg";
import redHeart from "@/assets/redHeart.svg";

export type CampaignCardCompactProps = {
  title: string;
  raised: number;
  goal: number;
  creatorName?: string;
  onAction?: () => void;
  className?: string;
  situation?: "approved" | "pending" | "rejected" | "recurring";
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
  } = props;

  const situationIcon =
    situation === "approved"
      ? blueHeart
      : situation === "pending"
        ? orangeHeart
        : situation === "recurring"
          ? redHeart
          : null;

  return (
    <>
      <article
        className={cn(
          "flex flex-col w-full bg-white border border-[#e6e8eb] rounded-2xl p-5 gap-3",
          "md:flex-row md:items-center md:justify-between",
          className
        )}
        aria-label={`Card compacto ${title}`}
      >
        <div className="flex items-center gap-2">
          {situationIcon && <img src={situationIcon} alt="" className="h-6 w-6 flex-shrink-0" />}
          <div className="flex flex-col truncate">
            <div className="text-[#034d6b] text-xl font-semibold truncate">{title}</div>
            {creatorName && (
              <div className="text-sm text-[#f68537] truncate">por {creatorName}</div>
            )}
          </div>
        </div>
        <div className="flex items-center w-full gap-3">
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex justify-between items-center gap-1.5 w-full flex-wrap">
              <div className="text-lg font-bold text-[#034d6b] truncate">
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
        </div>
      </article>
    </>
  );
}
