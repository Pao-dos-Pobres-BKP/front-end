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
  showRole = true,
}: CampaignCardProfileCompactProps) {
  const roleConfig = {
    donor: { 
      long: "Doador", 
      bg: "bg-[var(--color-text-success)]",
      text: "text-[var(--color-text-1)]"
    },
    admin: { 
      long: "Administrador", 
      bg: "bg-[var(--color-text-special-2)]",
      text: "text-[var(--color-text-1)]"
    },
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
        "flex flex-col sm:flex-row w-full",
        "bg-[var(--color-background)] border border-[var(--color-components-2)]",
        "rounded-2xl p-4 gap-3 sm:items-center",
        className
      )}
      aria-label={`Card perfil compacto ${profileName}`}
    >
      <div className="flex items-center flex-1 min-w-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
          <img
            src={fulano_de_tal_profile_pic}
            alt={`Foto de ${profileName}`}
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 ml-3">
          <div className="font-semibold text-[var(--color-brand-dark)] truncate text-sm sm:text-base lg:text-lg text-left">
            {profileName}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 justify-end">
        {showRole && (
          <div className="w-[110px] sm:w-[120px] flex-shrink-0">
            <div
              className={cn(
                "font-semibold rounded-lg py-2 px-3 text-xs sm:text-sm text-center whitespace-nowrap",
                roleConfig.bg,
                roleConfig.text
              )}
            >
              {roleConfig.long}
            </div>
          </div>
        )}

        <div
          role="button"
          tabIndex={0}
          onClick={onAction}
          onKeyDown={handleActionKeyDown}
          className={cn(
            "inline-flex items-center justify-center rounded-xl transition-colors cursor-pointer flex-shrink-0",
            "w-10 h-10 sm:w-12 sm:h-12",
            "bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-light)] text-[var(--color-text-1)]"
          )}
        >
          <Category set="bold" size={20} />
        </div>
      </div>
    </article>
  );
}
