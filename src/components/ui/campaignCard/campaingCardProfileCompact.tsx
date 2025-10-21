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
    donor: { 
      long: "Doador", 
      bg: "bg-[#4CAF50]",
      text: "text-white"
    },
    admin: { 
      long: "Administrador", 
      bg: "bg-[#FF9800]",
      text: "text-white"
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
        "flex flex-row w-full bg-white border border-[#e6e8eb] rounded-2xl p-4 items-center",
        className
      )}
      aria-label={`Card perfil compacto ${profileName}`}
    >
      <div className="flex items-center flex-1 min-w-0 mr-3">
        <div className="w-14 h-14 flex-shrink-0">
          <img
            src={fulano_de_tal_profile_pic}
            alt={`Foto de ${profileName}`}
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="w-[200px] flex-shrink-0 ml-3">
          <div className="font-semibold text-[#034d6b] truncate text-lg text-left">
            {profileName}
          </div>
        </div>
      </div>

      <div className="w-[140px] flex-shrink-0 mr-3">
        <div
          className={cn(
            "font-semibold rounded-lg py-2 whitespace-nowrap text-sm w-full text-center",
            roleConfig.bg,
            roleConfig.text
          )}
        >
          {roleConfig.long}
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={onAction}
        onKeyDown={handleActionKeyDown}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-colors cursor-pointer flex-shrink-0",
          "w-12 h-12",
          "bg-[#034d6b] hover:bg-[#023a50] text-white"
        )}
      >
        <Category set="bold" size={20} />
      </div>
    </article>
  );
}