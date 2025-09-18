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
        "flex flex-row w-full bg-white border border-[#e6e8eb] rounded-2xl p-5 items-center justify-between",
        className
      )}
      aria-label={`Card histórico ${title}`}
    >
      <div className="flex items-center min-w-0">
        {(() => {
          const map: Record<string, string | undefined> = {
            approved: blueHeart,
            pending: orangeHeart,
            recurring: redHeart,
          };
          const src = situation ? map[situation] : undefined;
          return src ? (
            <div className="h-6 w-6 flex-shrink-0">
              <img src={src} alt="" className="h-6 w-6" />
            </div>
          ) : null;
        })()}
        <div className="font-semibold flex flex-col items-start ml-2 min-w-0">
          <div className="text-[#034d6b] truncate text-xl">{title}</div>
          <div className="text-sm text-[#f68537] truncate">por {creatorName}</div>
        </div>
      </div>

      {situation && (
        <div
          className={cn(
            "text-xl font-semibold text-center flex-1",
            gradientTextClass
          )}
        >
          {situationLabels[situation]}
        </div>
      )}

      {lastDonation !== undefined && (
        <div className={cn("text-2xl font-semibold ml-4", gradientTextClass)}>
          +{formatCurrency(lastDonation)}
        </div>
      )}
    </article>
  );
}
