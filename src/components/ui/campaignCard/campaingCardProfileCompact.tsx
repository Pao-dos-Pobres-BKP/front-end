import { cn } from "@/lib/utils";
import { Category } from "react-iconly";
import fulano_de_tal_profile_pic from "@/assets/fulano_de_tal_profile_pic.jpg";

export type CampaignCardProfileCompactProps = {
  profileName: string;
  role: "donor" | "admin";
  onAction?: () => void;
  className?: string;
};

export function CampaignCardProfileCompact({
  profileName,
  role,
  onAction,
  className,
}: CampaignCardProfileCompactProps) {

  const roleConfig = {
    donor: { label: "Doador", bg: "bg-[#24A254]" },
    admin: { label: "Administrador", bg: "bg-[#F68537]" },
  }[role];

  const handleActionKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onAction?.();
    }
  };

  return (
    <article
      className={cn(
        "flex flex-col sm:flex-row w-full bg-white border border-[#e6e8eb] rounded-2xl p-4 sm:p-5 items-center justify-between gap-3 sm:gap-0",
        className
      )}
      aria-label={`Card perfil compacto ${profileName}`}
    >
      <div className="flex items-center min-w-0 w-full sm:w-auto">
        <div className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
          <img
            src={fulano_de_tal_profile_pic}
            alt={`Foto de ${profileName}`}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="font-semibold flex flex-col items-start ml-4 min-w-0 flex-1">
          <div className="text-[#034d6b] truncate text-base sm:text-2xl">
            {profileName}
          </div>
        </div>
      </div>

      <div className="flex sm:hidden items-center justify-between w-full gap-3">
        <div
          className={cn(
            "text-sm sm:text-base font-semibold text-white rounded-full px-3 py-1",
            roleConfig.bg
          )}
        >
          {roleConfig.label}
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={onAction}
          onKeyDown={handleActionKeyDown}
          className={cn(
            "inline-flex items-center justify-center text-sm font-semibold rounded-[10px] transition-colors shadow-sm hover:shadow-lg focus:outline-none cursor-pointer min-w-[44px] h-10 px-3",
            "bg-[#034d6b] hover:bg-[#023a50] text-white"
          )}
        >
          <Category set="bold" />
        </div>
      </div>


      <div className="hidden sm:flex items-center flex-1 justify-center">
        <div
          className={cn(
            "text-sm sm:text-base font-semibold text-white rounded-full px-2 py-0.5",
            roleConfig.bg
          )}
        >
          {roleConfig.label}
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={onAction}
        onKeyDown={handleActionKeyDown}
        className={cn(
          "hidden sm:inline-flex items-center justify-center text-sm font-semibold rounded-[10px] transition-colors shadow-sm hover:shadow-lg focus:outline-none cursor-pointer min-w-[44px] h-11 md:h-12 px-3",
          "bg-[#034d6b] hover:bg-[#023a50] text-white"
        )}
      >
        <Category set="bold" />
      </div>
    </article>
  );
}
