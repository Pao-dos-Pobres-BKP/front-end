import { SearchBar } from "@/components/ui/search-bar";
import Button from "@/components/ui/button";
import PlusIcon from "@/assets/Plus.svg";
import { Tabs } from "@/components/ui/tabs";
import { CampaignCardEventAndNews } from "@/components/ui/campaignCard/campaingCardEventAndNews";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

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
  const cardsPerPage = 10;


  const totalPages = Math.ceil(mockEventsAndNews.length / cardsPerPage);

  return (
    <div className="w-full py-5 px-6 bg-[#2F5361]">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex-1">
          <SearchBar />
        </div>
        <Button variant="quinary" size="extraSmall">
          Pesquisar
        </Button>
        <div className="flex items-center">
          <Button variant="quinary" size="extraSmall" className="ml-2 sm:ml-4 flex-shrink-0">
            <img src={PlusIcon} alt="Icone-plus" />
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col py-5">
        <Tabs tabs={["Notícias", "Eventos", "Todos"]} variant="secondary">
          <div className="flex flex-col gap-3 py-5 w-full">
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

          <div className="flex flex-col gap-3 py-5 w-full">
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

          <div className="flex flex-col gap-3 py-5 w-full">
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

      <div className="flex justify-center items-center gap-2 mt-6">
        <Pagination>
          <PaginationContent className="text-white">
            <PaginationItem>
              <PaginationPrevious
                onClick={currentPage === 1 ? undefined : () => setCurrentPage(currentPage - 1)}
                className={currentPage === 1 ? "opacity-30 cursor-not-allowed" : ""}
              >
                Anterior
              </PaginationPrevious>
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={
                  currentPage === totalPages ? undefined : () => setCurrentPage(currentPage + 1)
                }
                className={currentPage === totalPages ? "opacity-30 cursor-not-allowed" : ""}
              >
                Próximo
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
