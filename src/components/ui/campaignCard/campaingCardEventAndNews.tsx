import { cn } from "@/lib/utils";
import excluir2 from "@/assets/excluir2.png";
import editIcon from "@/assets/editIcon.svg";
import { Delete } from "react-iconly";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export type CampaignCardEventAndNewsProps = {
  title: string;
  date: Date;
  type: "event" | "news";
  className?: string;
  onDelete?: () => void;
  onEdit?: () => void;
};

export function CampaignCardEventAndNews({
  title,
  date,
  type,
  className,
  onDelete,
  onEdit,
}: CampaignCardEventAndNewsProps) {
  const typeConfig = {
    event: { label: "Evento", color: "#24A254" },
    news: { label: "Notícia", color: "#F68537" },
  }[type];

  const formattedDate =
    date instanceof Date ? format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR }) : date;

  return (
    <article
      className={cn(
        "flex flex-row w-full bg-white border border-[#e6e8eb] rounded-xl overflow-hidden h-28",
        "items-stretch",
        className
      )}
      aria-label={`Card ${typeConfig.label}: ${title}`}
    >
      <div className="w-28 h-full flex-shrink-0 relative">
        <img
          src={excluir2}
          alt="Imagem de fundo"
          className="h-full w-full object-cover opacity-90"
          style={{
            WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 95%)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskImage: "linear-gradient(to right, black 50%, transparent 95%)",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
          }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 py-3 overflow-hidden">
        <h3
          className="text-lg sm:text-2xl font-semibold text-[#034d6b] leading-tight text-left line-clamp-2"
          title={title}
        >
          {title}
        </h3>
        <div className="flex items-center mt-2">
          <span className="text-xs font-medium" style={{ color: typeConfig.color }}>
            {formattedDate}
          </span>
          <span
            className="text-[10px] sm:text-sm text-white px-2 py-0.5 rounded-xl ml-2 sm:ml-8"
            style={{ backgroundColor: typeConfig.color }}
          >
            {typeConfig.label}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pr-4">
        <button
          onClick={onDelete}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-[#D65E5E] hover:bg-[#c44f4f] transition"
          aria-label="Excluir"
        >
          <Delete set="light" primaryColor="#ffffff" size={22} />
        </button>

        <button
          onClick={onEdit}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-[#034d6b] hover:bg-[#023a50] transition"
          aria-label="Editar"
        >
          <img src={editIcon} alt="Editar" className="w-5 h-5" />
        </button>
      </div>
    </article>
  );
}
