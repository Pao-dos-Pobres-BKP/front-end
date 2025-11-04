import CampaignCard from "@/components/ui/campaignCard/campaignCard";
import Input from "@/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useState } from "react";
import { useDonorList } from "./use-donor-list";
//import { donorAdapter } from "./donorAdapter";

export default function DonorList() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const { donors } = useDonorList();

  const donorListItems = donors
  // const mockDonors = [
  //   {
  //     id: 1,
  //     donorName: "Fulano de Tal",
  //     donorEmail: "email@email.com",
  //     donationAmount: 1500,
  //     title: "Campanha Santo Antônio",
  //     raised: 1500,
  //     goal: 2000,
  //     memberSince: "12/08/2023",
  //     campaigns: [
  //       "Campanha Santo Antônio",
  //       "Campanha de Aniversário 130 anos do Pão",
  //       "Campanha de Natal Solidário",
  //     ],
  //   },
  //   {
  //     id: 1,
  //     donorName: "Fulano de Tal",
  //     donorEmail: "email@email.com",
  //     donationAmount: 1500,
  //     title: "Campanha Santo Antônio",
  //     raised: 1500,
  //     goal: 2000,
  //     memberSince: "12/08/2023",
  //     campaigns: [
  //       "Campanha Santo Antônio",
  //       "Campanha de Aniversário 130 anos do Pão",
  //       "Campanha de Natal Solidário",
  //     ],
  //   },
  //   {
  //     id: 1,
  //     donorName: "Fulano de Tal",
  //     donorEmail: "email@email.com",
  //     donationAmount: 1500,
  //     title: "Campanha Santo Antônio",
  //     raised: 1500,
  //     goal: 2000,
  //     memberSince: "12/08/2023",
  //     campaigns: [
  //       "Campanha Santo Antônio",
  //       "Campanha de Aniversário 130 anos do Pão",
  //       "Campanha de Natal Solidário",
  //     ],
  //   },
  //   {
  //     id: 1,
  //     donorName: "Fulano de Tal",
  //     donorEmail: "email@email.com",
  //     donationAmount: 1500,
  //     title: "Campanha Santo Antônio",
  //     raised: 1500,
  //     goal: 2000,
  //     memberSince: "12/08/2023",
  //     campaigns: [
  //       "Campanha Santo Antônio",
  //       "Campanha de Aniversário 130 anos do Pão",
  //       "Campanha de Natal Solidário",
  //     ],
  //   },
  //   {
  //     id: 1,
  //     donorName: "Fulano de Tal",
  //     donorEmail: "email@email.com",
  //     donationAmount: 1500,
  //     title: "Campanha Santo Antônio",
  //     raised: 1500,
  //     goal: 2000,
  //     memberSince: "12/08/2023",
  //     campaigns: [
  //       "Campanha Santo Antônio",
  //       "Campanha de Aniversário 130 anos do Pão",
  //       "Campanha de Natal Solidário",
  //     ],
  //   },
  //   {
  //     id: 1,
  //     donorName: "Fulano de Tal",
  //     donorEmail: "email@email.com",
  //     donationAmount: 1500,
  //     title: "Campanha Santo Antônio",
  //     raised: 1500,
  //     goal: 2000,
  //     memberSince: "12/08/2023",
  //     campaigns: [
  //       "Campanha Santo Antônio",
  //       "Campanha de Aniversário 130 anos do Pão",
  //       "Campanha de Natal Solidário",
  //     ],
  //   },
  //   {
  //     id: 1,
  //     donorName: "Fulano de Tal",
  //     donorEmail: "email@email.com",
  //     donationAmount: 1500,
  //     title: "Campanha Santo Antônio",
  //     raised: 1500,
  //     goal: 2000,
  //     memberSince: "12/08/2023",
  //     campaigns: [
  //       "Campanha Santo Antônio",
  //       "Campanha de Aniversário 130 anos do Pão",
  //       "Campanha de Natal Solidário",
  //     ],
  //   },
  //   {
  //     id: 1,
  //     donorName: "Fulano de Tal",
  //     donorEmail: "email@email.com",
  //     donationAmount: 1500,
  //     title: "Campanha Santo Antônio",
  //     raised: 1500,
  //     goal: 2000,
  //     memberSince: "12/08/2023",
  //     campaigns: [
  //       "Campanha Santo Antônio",
  //       "Campanha de Aniversário 130 anos do Pão",
  //       "Campanha de Natal Solidário",
  //     ],
  //   },
  //   {
  //     id: 1,
  //     donorName: "Fulano de Tal",
  //     donorEmail: "email@email.com",
  //     donationAmount: 1500,
  //     title: "Campanha Santo Antônio",
  //     raised: 1500,
  //     goal: 2000,
  //     memberSince: "12/08/2023",
  //     campaigns: [
  //       "Campanha Santo Antônio",
  //       "Campanha de Aniversário 130 anos do Pão",
  //       "Campanha de Natal Solidário",
  //     ],
  //   },
  // ];

  // const totalPages = Math.ceil(mockDonors.length / cardsPerPage);
  const totalPages = Math.ceil(donorListItems.length / cardsPerPage);
  // const indexOfLastCard = currentPage * cardsPerPage;
  // const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  // const currentCards = mockDonors.slice(indexOfFirstCard, indexOfLastCard);
  // const currentCards = donorListItems.slice(indexOfFirstCard, indexOfLastCard);
  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-10 flex flex-col gap-8 bg-[#2F5361]">
      <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
        <Input placeholder="Buscar..." fullWidth />
        <button className="w-full md:w-auto px-4 py-2.5 rounded-lg bg-[#F68537] text-white hover:bg-orange-600">
          Pesquisar
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {donorListItems.map((donor, index) => (
          <CampaignCard
            key={index}
            variant="profile"
            donorName={donor.fullname}
            donorEmail={donor.email}
            raised={donor.raised}
            // memberSince={`${donor.createdAt.getDay()}/${donor.createdAt.getMonth()}/${donor.createdAt.getFullYear()}`}
            campaigns={donor.campaigns}
          />
        ))}
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