import { cn } from "@/lib/utils";
import { Category } from "react-iconly";
import fulano_de_tal_profile_pic from "@/assets/fulano_de_tal_profile_pic.jpg";

export type CampaignCardProfileCompactProps = {
  profileName: string;
  role: "donor" | "admin";
  onAction?: () => void;
  className?: string;
  showRole?: boolean;
};

export function CampaignCardProfileCompact({
  profileName,
  role,
  onAction,
  className,
}: CampaignCardProfileCompactProps) {
  const roleConfig = {
    donor: { long: "Doador", short: "Doador", bg: "bg-[var(--color-text-success)]" },
    admin: { long: "Administrador", short: "Admin", bg: "bg-[var(--color-text-special-2)]" },
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
        "flex flex-row w-full bg-white border border-[#e6e8eb] rounded-2xl p-4 sm:p-5 items-center",
        className
      )}
      aria-label={`Card perfil compacto ${profileName}`}
    >
      <div className="flex items-center min-w-0 flex-shrink-0">
        <div className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
          <img
            src={fulano_de_tal_profile_pic}
            alt={`Foto de ${profileName}`}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="font-semibold flex flex-col items-start ml-4 min-w-0">
          <div className="text-[#034d6b] truncate text-base sm:text-2xl">{profileName}</div>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <div
          role="button"
          tabIndex={0}
          onClick={onAction}
          onKeyDown={handleActionKeyDown}
          className={cn(
            "text-xs sm:text-sm md:text-base font-semibold text-white rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 whitespace-nowrap",
            roleConfig.bg
          )}
        >
          <span className="sm:hidden">{roleConfig.short}</span>
          <span className="hidden sm:inline">{roleConfig.long}</span>
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={onAction}
        onKeyDown={handleActionKeyDown}
        className={cn(
          "inline-flex items-center justify-center text-sm font-semibold rounded-[10px] transition-colors shadow-sm hover:shadow-lg focus:outline-none cursor-pointer flex-shrink-0",
          "min-w-[40px] h-9 sm:min-w-[44px] sm:h-11 md:h-12 px-2 sm:px-3",
          "bg-[#034d6b] hover:bg-[#023a50] text-white"
        )}
      >
        <Category set="bold" />
      </div>
    </article>
  );
}
