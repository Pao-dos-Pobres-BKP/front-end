export default function CampaignCardSkeleton() {
  return (
    <div className="flex w-full bg-white border border-[#e6e8eb] rounded-2xl p-4 md:p-5 gap-3 animate-pulse">
      {/* Coluna 1: Ícone + Título/Creator/Datas */}
      <div className="flex items-start gap-2 flex-shrink-0 min-w-0 w-full md:w-[320px]">
        {/* Ícone do coração */}
        <div className="h-6 w-6 bg-gray-300 rounded-full flex-shrink-0"></div>
        
        {/* Título, criador e datas */}
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>

      {/* Coluna 2: Valores + Progress Bar */}
      <div className="flex flex-col flex-1 min-w-0 justify-center gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded-full w-full"></div>
      </div>

      {/* Coluna 3: Botão de ação */}
      <div className="flex-shrink-0 flex items-center">
        <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
}

