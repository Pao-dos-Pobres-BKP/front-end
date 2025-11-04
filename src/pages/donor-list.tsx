import CampaignCard from "@/components/ui/campaignCard/campaignCard";
import Input from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useState } from "react";

export default function DonorList() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const mockDonors = [
    {
      id: 1,
      donorName: "Fulano de Tal",
      donorEmail: "email@email.com",
      donationAmount: 1500,
      title: "Campanha Santo Antônio",
      raised: 1500,
      goal: 2000,
      memberSince: "12/08/2023",
      campaigns: [
        "Campanha Santo Antônio",
        "Campanha de Aniversário 130 anos do Pão",
        "Campanha de Natal Solidário",
      ],
    },
    {
      id: 1,
      donorName: "Fulano de Tal",
      donorEmail: "email@email.com",
      donationAmount: 1500,
      title: "Campanha Santo Antônio",
      raised: 1500,
      goal: 2000,
      memberSince: "12/08/2023",
      campaigns: [
        "Campanha Santo Antônio",
        "Campanha de Aniversário 130 anos do Pão",
        "Campanha de Natal Solidário",
      ],
    },
    {
      id: 1,
      donorName: "Fulano de Tal",
      donorEmail: "email@email.com",
      donationAmount: 1500,
      title: "Campanha Santo Antônio",
      raised: 1500,
      goal: 2000,
      memberSince: "12/08/2023",
      campaigns: [
        "Campanha Santo Antônio",
        "Campanha de Aniversário 130 anos do Pão",
        "Campanha de Natal Solidário",
      ],
    },
    {
      id: 1,
      donorName: "Fulano de Tal",
      donorEmail: "email@email.com",
      donationAmount: 1500,
      title: "Campanha Santo Antônio",
      raised: 1500,
      goal: 2000,
      memberSince: "12/08/2023",
      campaigns: [
        "Campanha Santo Antônio",
        "Campanha de Aniversário 130 anos do Pão",
        "Campanha de Natal Solidário",
      ],
    },
    {
      id: 1,
      donorName: "Fulano de Tal",
      donorEmail: "email@email.com",
      donationAmount: 1500,
      title: "Campanha Santo Antônio",
      raised: 1500,
      goal: 2000,
      memberSince: "12/08/2023",
      campaigns: [
        "Campanha Santo Antônio",
        "Campanha de Aniversário 130 anos do Pão",
        "Campanha de Natal Solidário",
      ],
    },
    {
      id: 1,
      donorName: "Fulano de Tal",
      donorEmail: "email@email.com",
      donationAmount: 1500,
      title: "Campanha Santo Antônio",
      raised: 1500,
      goal: 2000,
      memberSince: "12/08/2023",
      campaigns: [
        "Campanha Santo Antônio",
        "Campanha de Aniversário 130 anos do Pão",
        "Campanha de Natal Solidário",
      ],
    },
  ];

  const totalPages = Math.ceil(mockDonors.length / cardsPerPage);
  const shouldShowPagination = totalPages > 1;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = mockDonors.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-10 flex flex-col gap-8 bg-[#2F5361]">
      <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
        <Input placeholder="Buscar..." fullWidth />
        <button className="w-full md:w-auto px-4 py-2.5 rounded-lg bg-[#F68537] text-white hover:bg-orange-600">
          Pesquisar
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {currentCards.map((donor, index) => (
          <CampaignCard
            key={index}
            variant="profile"
            donorName={donor.donorName}
            donorEmail={donor.donorEmail}
            donationAmount={donor.donationAmount}
            memberSince={donor.memberSince}
            campaigns={donor.campaigns}
            title={donor.title}
            raised={donor.raised}
            goal={donor.goal}
          />
        ))}
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
                    className={`px-3 py-1 border rounded-full transition-colors ${
                      currentPage === i + 1
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
