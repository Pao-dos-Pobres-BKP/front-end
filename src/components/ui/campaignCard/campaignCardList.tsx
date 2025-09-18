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

  return (
    <article
      className={cn(
        "md:flex flex flex-row w-full bg-white border border-[#e6e8eb] rounded-2xl p-5 items-center justify-between",
        className
      )}
      aria-label={`Card lista ${title}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2 py-1">
        <div className="flex items-center justify-center">
          {(() => {
            const map: Record<string, string | undefined> = {
              approved: blueHeart,
              pending: orangeHeart,
              recurring: redHeart,
            };
            const src = situation ? map[situation] : undefined;
            return src ? (
              <div className="h-6 w-6">
                <img src={src} alt="" className="h-6 w-6" />
              </div>
            ) : null;
          })()}
          <div className="font-semibold flex flex-col items-start ml-2">
            <div className="text-[#034d6b] truncate text-xl">{title}</div>
            <div className="text-sm text-[#f68537] truncate">
              por {creatorName}
            </div>
          </div>
        </div>
        <div className="flex items-center w-full ml-5 mr-2">
          <div className="flex flex-col w-full">
            <div className="flex justify-center md:justify-start items-center gap-1.5 w-full">
              <div className="text-xl font-bold text-[#034d6b]">
                {formatCurrency(raised)}
              </div>
              <div className="text-sm text-[#6b7280] truncate">
                de {formatCurrency(goal)}
              </div>
            </div>
            <div className="w-full rounded-full overflow-hidden mt-1 justify-center items-center flex">
              {situation == "approved" || situation == "recurring" ? (
                <Progress value={percent} variant="blue" size="large" />
              ) : situation == "rejected" ? (
                <div className="w-50 text-center text-xs font-semibold text-yellow-800 bg-red-400 rounded-full py-0.5 px-2">
                  Rejeitada
                </div>
              ) : (
                <div className="w-50 text-center text-xs font-semibold text-white bg-[#F6C337] rounded-full py-0.5 px-2">
                  Pendente Aprovação
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          role="button"
          tabIndex={0}
          onClick={onAction}
          onKeyDown={handleActionKeyDown}
          className={cn(
            "inline-flex items-center justify-center text-sm font-semibold rounded-[10px] transition-colors shadow-sm hover:shadow-lg focus:outline-none cursor-pointer w-12 h-12 pl-3.5 pr-3.5",
            "bg-[#034d6b] hover:bg-[#023a50] text-white hover:text-white" // botão fixo azul
          )}
        >
          <Category set="bold" />
        </div>
      </div>
    </article>
  );
}
