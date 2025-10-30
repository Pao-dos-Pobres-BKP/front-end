import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import { Progress } from "../progress";
import blueHeart from "@/assets/blueHeart.svg";
import orangeHeart from "@/assets/orangeHeart.svg";
import redHeart from "@/assets/redHeart.svg";
import eyeIcon from "@/assets/eyeIcon.svg";
import editIcon from "@/assets/editIcon.svg";
import cancelIcon from "@/assets/cancelIcon.svg";
import { useState } from "react";
import ConfirmCancelRecurringModal from "../confirm-cancel-recurring-modal";

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
    onAction,
  } = props;

  const [showCancelRecurring, setShowCancelRecurring] = useState(false);

  const actionIconSrc =
    situation === "pending" ? eyeIcon : situation === "approved" ? editIcon : cancelIcon;

  const actionButtonClass =
    situation === "approved"
      ? "bg-[#034d6b] hover:bg-[#023a50] text-white hover:text-white"
      : situation === "pending"
        ? "bg-[#F68537] hover:bg-[#e5782e] text-white hover:text-white"
        : "bg-[#D65E5E] hover:bg-[#c44f4f] text-white hover:text-white";

  const handleActionKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onAction?.();
    }
  };

  const handleActionClick = () => {
    if (situation === "recurring") {
      setShowCancelRecurring(true);
    } else {
      onAction?.();
    }
  };

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
          "flex w-full bg-white border border-[#e6e8eb] rounded-2xl p-5 gap-3",
          className
        )}
        aria-label={`Card compacto ${title}`}
      >
        {/* Column 1: Icon + Title/Creator */}
        <div className="flex items-start gap-2 flex-shrink-0 min-w-0 w-full md:w-[280px]">
          {situationIcon && (
            <img src={situationIcon} alt="" className="h-6 w-6 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex flex-col min-w-0 flex-1">
            <div
              className="text-[#034d6b] text-xl font-semibold w-full overflow-hidden text-ellipsis whitespace-nowrap"
              title={title}
            >
              {title}
            </div>
            {creatorName && (
              <div
                className="text-sm text-[#f68537] w-full overflow-hidden text-ellipsis whitespace-nowrap"
                title={`por ${creatorName}`}
              >
                por {creatorName}
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Values + Progress Bar */}
        <div className="flex flex-col flex-1 min-w-0 justify-center">
          <div className="flex justify-between items-center gap-1.5 mb-1">
            <div className="text-lg font-bold text-[#034d6b] whitespace-nowrap">
              {formatCurrency(raised)}
            </div>
            <div className="text-sm text-[#6b7280] whitespace-nowrap">
              de {formatCurrency(goal)}
            </div>
          </div>

          <div className="w-full">
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

        {/* Coluna 3: Action Button */} 
        <div className="flex-shrink-0 flex items-center">
          <div
            role="button"
            tabIndex={0}
            onClick={handleActionClick}
            onKeyDown={handleActionKeyDown}
            className={cn(
              "inline-flex items-center justify-center text-sm font-semibold rounded-[10px] transition-colors shadow-sm hover:shadow-lg focus:outline-none cursor-pointer min-w-[44px] h-10 sm:h-11 md:h-12 px-3",
              actionButtonClass
            )}
          >
            <img
              src={actionIconSrc}
              alt=""
              className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] md:h-[21px] md:w-[21px]"
              aria-hidden="true"
            />
          </div>
        </div>
      </article>

      <ConfirmCancelRecurringModal
        isOpen={showCancelRecurring}
        onClose={() => setShowCancelRecurring(false)}
        onConfirm={() => {
          setShowCancelRecurring(false);
          onAction?.();
        }}
      />
    </>
  );
}
