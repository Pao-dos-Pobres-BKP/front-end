import { SearchBar } from "@/components/ui/search-bar";
import Button from "@/components/ui/button";
import PlusIcon from "@/assets/Plus.svg";
import { Tabs } from "@/components/ui/tabs";
import { CampaignCardEventAndNews } from "@/components/ui/campaignCard/campaingCardEventAndNews";
import { DatePicker } from "@/components/ui/Calendar/date-picker";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function NewsEvents() {
  const mockEventsAndNews = [
    {
      title: "Campanha de Doação de Roupas",
      date: new Date(2025, 8, 15),
      type: "news" as const,
    },
    {
      title: "Evento de Adoção de Animais",
      date: new Date(2025, 9, 25),
      type: "event" as const,
    },
    {
      title: "Mutirão de Arrecadação de Alimentos",
      date: new Date(2025, 10, 3),
      type: "news" as const,
    },
    {
      title: "Mutirão de Arrecadação de Alimentos",
      date: new Date(2025, 10, 3),
      type: "event" as const,
    },
    {
      title: "Mutirão de Arrecadação de Alimentos",
      date: new Date(2025, 10, 3),
      type: "news" as const,
    },
    {
      title: "Mutirão de Arrecadação de Alimentos",
      date: new Date(2025, 10, 3),
      type: "event" as const,
    },
    {
      title: "Mutirão de Arrecadação de Alimentos",
      date: new Date(2025, 10, 3),
      type: "event" as const,
    },
    {
      title: "Mutirão de Arrecadação de Alimentos",
      date: new Date(2025, 10, 3),
      type: "news" as const,
    },
    {
      title: "Mutirão de Arrecadação de Alimentos",
      date: new Date(2025, 10, 3),
      type: "event" as const,
    },
    {
      title: "Mutirão de Arrecadação de Alimentos",
      date: new Date(2025, 10, 3),
      type: "news" as const,
    },
    {
      title: "Mutirão de Arrecadação de Alimentos",
      date: new Date(2025, 10, 3),
      type: "event" as const,
    },
    {
      title: "Mutirão de Arrecadação de Alimentos",
      date: new Date(2025, 10, 3),
      type: "news" as const,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const cardsPerPage = 10;

  const filteredData =
    activeTabIndex === 0
      ? mockEventsAndNews.filter((e) => e.type === "news")
      : activeTabIndex === 1
        ? mockEventsAndNews.filter((e) => e.type === "event")
        : mockEventsAndNews;

  const totalPages = Math.ceil(filteredData.length / cardsPerPage);
  const shouldShowPagination = totalPages > 1;

  const searchHeader = (
    <div className="flex flex-wrap w-full items-center gap-3 my-5">
      <div className="flex-1 min-w-[200px]">
        <SearchBar />
      </div>
      <div>
        <DatePicker className="!bg-[var(--color-text-special-2)] !text-[var(--color-background)] [&_*]:!text-[var(--color-background)]" />
      </div>
      <Button variant="quinary" size="extraSmall">
        Pesquisar
      </Button>
      <Button
        variant="quinary"
        size="extraSmall"
        className="flex items-center justify-center flex-shrink-0"
      >
        <img src={PlusIcon} alt="Icone-plus" className="w-8 h-8 translate-y-[4px]" />
      </Button>
    </div>
  );

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-10 flex flex-col gap-8 bg-[#2F5361]">
      <div className="w-full flex flex-col">
        <Tabs
          tabs={["Notícias", "Eventos", "Todos"]}
          variant="secondary"
          headerContent={searchHeader}
          onTabChange={(_, index) => {
            setActiveTabIndex(index);
            setCurrentPage(1);
          }}
        >
          <div className="flex flex-col gap-3 w-full">
            {mockEventsAndNews
              .filter((e) => e.type === "news")
              .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
              .map((item, index) => (
                <CampaignCardEventAndNews
                  key={index}
                  title={item.title}
                  date={item.date}
                  type={item.type}
                  onDelete={() => console.log(`Excluir: ${item.title}`)}
                  onEdit={() => console.log(`Editar: ${item.title}`)}
                />
              ))}
          </div>

          <div className="flex flex-col gap-3 w-full">
            {mockEventsAndNews
              .filter((e) => e.type === "event")
              .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
              .map((item, index) => (
                <CampaignCardEventAndNews
                  key={index}
                  title={item.title}
                  date={item.date}
                  type={item.type}
                  onDelete={() => console.log(`Excluir: ${item.title}`)}
                  onEdit={() => console.log(`Editar: ${item.title}`)}
                />
              ))}
          </div>

          <div className="flex flex-col gap-3 w-full">
            {mockEventsAndNews
              .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
              .map((item, index) => (
                <CampaignCardEventAndNews
                  key={index}
                  title={item.title}
                  date={item.date}
                  type={item.type}
                  onDelete={() => console.log(`Excluir: ${item.title}`)}
                  onEdit={() => console.log(`Editar: ${item.title}`)}
                />
              ))}
          </div>
        </Tabs>
      </div>

      {shouldShowPagination && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious
                  size="sm"
                  onClick={currentPage === 1 ? undefined : () => setCurrentPage(currentPage - 1)}
                  className={cn(
                    "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors",
                    currentPage === 1
                      ? "bg-white text-[#F68537] border-[#F68537] opacity-50 cursor-not-allowed"
                      : "bg-[#F68537] text-white border-[#F68537]"
                  )}
                >
                  Anterior
                </PaginationPrevious>
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    size="icon"
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className={`px-3 py-1 border rounded-full transition-colors ${currentPage === i + 1
                        ? "bg-white text-[#F68537] border-[#F68537]"
                        : "bg-[#F68537] text-white border-[#F68537]"
                      }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  size="sm"
                  onClick={
                    currentPage === totalPages ? undefined : () => setCurrentPage(currentPage + 1)
                  }
                  className={cn(
                    "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors",
                    currentPage === totalPages
                      ? "bg-white text-[#F68537] border-[#F68537] opacity-50 cursor-not-allowed"
                      : "bg-[#F68537] text-white border-[#F68537]"
                  )}
                >
                  Próximo
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
