import { formatCurrency } from "@/utils/formatCurrency";
import cn from "@/utils/cn";
import { Progress } from "../progress";
import { CampaignCardProfile } from "./campaignCardProfile";
import { CampaignCardCompact } from "./campaignCardCompact";
import blueHeart from "@/assets/blueHeart.svg";
import { CampaignCardHistoric } from "./campaignCardHistoric";
import { CampaignCardList } from "./campaignCardList";
import { CampaignCardProfileCompact } from "./campaingCardProfileCompact";

export type CampaignCardProps = {
  title?: string;
  raised?: number;
  goal?: number;
  creatorName?: string;
  variant?: "default" | "profile" | "compact" | "historic" | "list" | "profile_compact";
  onAction?: () => void;
  className?: string;
  situation?: "approved" | "pending" | "rejected" | "recurring";
  // profile (opcionais)
  role?: "donor" | "admin";
  donorName?: string;
  donorEmail?: string;
  donationAmount?: number;
  memberSince?: string;
  campaigns?: string[];
  lastDonation?: number;
};

export default function CampaignCard({
  title = "Testandoo",
  raised = 30,
  goal = 90,
  creatorName = " João Silva",
  variant = "profile_compact",
  className,
  donorName = "OPAAAA",
  donorEmail = "bekirsch@gmail.com",
  donationAmount = 0,
  memberSince = "",
  campaigns = [],
  lastDonation = 3,
  situation = "approved",
  role = "donor",
}: CampaignCardProps) {
  const percent = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

  if (variant === "profile") {
    return (
      <CampaignCardProfile
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
      />
    );
  }

  if (variant === "compact") {
    return (
      <CampaignCardCompact
        situation={situation}
        goal={goal}
        raised={raised}
        creatorName={creatorName}
        title={title}
        className={className}
        progressPercent={percent}
      />
    );
  }

  if (variant === "historic") {
    return (
      <CampaignCardHistoric
        situation={situation}
        goal={goal}
        raised={raised}
        creatorName={creatorName}
        title={title}
        className={className}
        lastDonation={lastDonation}
      />
    );
  }

  if (variant === "list") {
    return (
      <CampaignCardList
        situation={situation}
        goal={goal}
        raised={raised}
        creatorName={creatorName}
        title={title}
        className={className}
        progressPercent={percent}
      />
    );
  }

  if (variant === "profile_compact") {
    return (
      <CampaignCardProfileCompact
        profileName={donorName ?? "Usuário"}
        role={role ?? "donor"}
        className={className}
      />
    );
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
              <div className="h-5 w-5 flex-shrink-0">
                <img src={blueHeart} alt="Coração azul" className="h-5 w-5" />
              </div>
              <h3 className="text-3xl font-semibold text-[#034d6b] leading-tight truncate">
                {title}
              </h3>
            </div>
            {creatorName && (
              <p className="mt-1 text-base text-[#f68537] font-semibold text-center">
                {" "}
                por {creatorName}
              </p>
            )}
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
