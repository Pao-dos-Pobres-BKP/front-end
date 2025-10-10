import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import blueHeart from "@/assets/blueHeart.svg";
import orangeHeart from "@/assets/orangeHeart.svg";
import redHeart from "@/assets/redHeart.svg";

export type CampaignCardHistoricProps = {
  title: string;
  raised: number;
  goal: number;
  creatorName?: string;
  className?: string;
  situation?: "approved" | "pending" | "rejected" | "recurring";
  lastDonation?: number;
};

export function CampaignCardHistoric(props: CampaignCardHistoricProps) {
  const { situation, creatorName, title, className, lastDonation } = props;

  const situationLabels: Record<string, string> = {
    approved: "Única",
    pending: "Pendente de Aprovação",
    rejected: "Rejeitada",
    recurring: "Recorrente",
  };

  const gradientTextClass =
    situation === "recurring"
      ? "bg-gradient-to-b from-[#FF4A4A] to-[#FF8787] bg-clip-text text-transparent"
      : situation === "approved"
        ? "bg-gradient-to-b from-[#456DFF] to-[#AABCFF] bg-clip-text text-transparent"
        : "text-[#034d6b]";

  const renderIcon = () => {
    const map: Record<string, string | undefined> = {
      approved: blueHeart,
      pending: orangeHeart,
      recurring: redHeart,
    };
    const src = situation ? map[situation] : undefined;
    if (!src) return null;
    return (
      <div className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0">
        <img src={src} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
    );
  };

  return (
    <article
      className={cn(
        "grid grid-cols-1 sm:grid-cols-3 w-full bg-white border border-[#e6e8eb] rounded-2xl p-4 sm:p-5 gap-3 sm:gap-4",
        "sm:[&>*:nth-child(2)]:justify-self-center sm:[&>*:nth-child(3)]:justify-self-end",
        className
      )}
      aria-label={`Card histórico ${title}`}
    >
      <div className="flex items-center min-w-0 w-full sm:w-auto col-span-1 overflow-hidden">
        {renderIcon()}
        <div className="font-semibold flex flex-col items-start ml-2 min-w-0 flex-1 truncate">
          <div className="text-[#034d6b] truncate text-base sm:text-xl">{title}</div>
          {creatorName && (
            <div
              className={cn(
                "text-xs sm:text-sm truncate",
                situation === "recurring"
                  ? "bg-gradient-to-b from-[#FF4A4A] to-[#FF8787] bg-clip-text text-transparent"
                  : situation === "approved"
                    ? "bg-gradient-to-b from-[#456DFF] to-[#AABCFF] bg-clip-text text-transparent"
                    : "text-[#034d6b]"
              )}
            >
              por {creatorName}
            </div>
          )}
        </div>
      </div>

      {situation && (
        <div
          className={cn(
            "flex sm:hidden items-center justify-self-start text-base font-semibold",
            "hidden sm:flex sm:col-span-1 items-center justify-center text-xl font-semibold ml-100",
            gradientTextClass
          )}
        >
          {situationLabels[situation]}
        </div>
      )}

      {(situation || lastDonation !== undefined) && (
        <div className="sm:hidden grid grid-cols-2 gap-2 w-full col-span-1">
          {situation && (
            <div className={cn("text-base font-semibold text-left col-span-1", gradientTextClass)}>
              {situationLabels[situation]}
            </div>
          )}
          {lastDonation !== undefined && (
            <div
              className={cn(
                "text-xl font-semibold text-right col-span-1 justify-self-end",
                gradientTextClass
              )}
            >
              +{formatCurrency(lastDonation)}
            </div>
          )}
        </div>
      )}

      {lastDonation !== undefined && (
        <div
          className={cn(
            "hidden sm:flex items-center justify-self-end text-2xl font-semibold ml-4",
            gradientTextClass
          )}
        >
          +{formatCurrency(lastDonation)}
        </div>
      )}
    </article>
  );
}
