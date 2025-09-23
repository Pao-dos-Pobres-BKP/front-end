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

  return (
    <article
      className={cn(
        "flex flex-col sm:flex-row w-full bg-white border border-[#e6e8eb] rounded-2xl p-4 sm:p-5 items-start sm:items-center justify-start sm:justify-between gap-3 sm:gap-0",
        className
      )}
      aria-label={`Card histórico ${title}`}
    >
      <div className="flex items-center min-w-0 w-full sm:w-auto">
        {(() => {
          const map: Record<string, string | undefined> = {
            approved: blueHeart,
            pending: orangeHeart,
            recurring: redHeart,
          };
          const src = situation ? map[situation] : undefined;
          return src ? (
            <div className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0">
              <img src={src} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          ) : null;
        })()}
        <div className="font-semibold flex flex-col items-start ml-2 min-w-0 flex-1">
          <div className="text-[#034d6b] truncate text-base sm:text-xl">{title}</div>
          <div className="text-xs sm:text-sm text-[#f68537] truncate">por {creatorName}</div>
        </div>
      </div>

      {(situation || lastDonation !== undefined) && (
        <>
          <div className="flex sm:hidden flex-row items-center justify-between w-full gap-2">
            {situation && (
              <div
                className={cn(
                  "text-base font-semibold text-left",
                  gradientTextClass
                )}
              >
                {situationLabels[situation]}
              </div>
            )}

            {lastDonation !== undefined && (
              <div
                className={cn(
                  "text-xl font-semibold text-right",
                  gradientTextClass
                )}
              >
                +{formatCurrency(lastDonation)}
              </div>
            )}
          </div>

          {situation && (
            <div
              className={cn(
                "hidden sm:block text-xl font-semibold flex-1 text-center",
                gradientTextClass
              )}
            >
              {situationLabels[situation]}
            </div>
          )}

          {lastDonation !== undefined && (
            <div
              className={cn(
                "hidden sm:block text-2xl font-semibold text-right ml-4",
                gradientTextClass
              )}
            >
              +{formatCurrency(lastDonation)}
            </div>
          )}
        </>
      )}
    </article>
  );
}
