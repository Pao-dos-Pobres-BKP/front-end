import { SearchBar } from "@/components/ui/search-bar";
import Button from "@/components/ui/button";
import PlusIcon from "@/assets/Plus.svg";
import { Tabs } from "@/components/ui/tabs";
import CampaignCard from "../components/ui/campaignCard/campaignCard";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

interface User {
  profileName: string;
  role: UserRole;
}

type UserRole = "admin" | "donor";

const users: User[] = [
  { profileName: "Fulano de Tal", role: "admin" },
  { profileName: "Maria Silva", role: "donor" },
  { profileName: "João Santos", role: "donor" },
  { profileName: "Ana Lima", role: "admin" },
  { profileName: "Pedro Costa", role: "donor" },
];


export default function NewsEvents() {

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
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

     const totalPages = Math.ceil(mockDonors.length / cardsPerPage);

  return (
    <div className="w-full py-5 px-6">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex-1">
          <SearchBar />
        </div>
        <Button
          variant="quinary"
          size="extraSmall"
        >
          Pesquisar
        </Button>
        <div className="flex items-center">
          <Button variant="quinary" size="extraSmall" className="ml-2 sm:ml-4 flex-shrink-0">
            <img src={PlusIcon} alt="Icone-plus" />
          </Button>
        </div>
      </div>

      <div>
        <Tabs tabs={["Pendentes", "Ativos", "Todas"]} variant="secondary">
          <div className=" flex-wrap space-y-3 w-full space-x-10 justify-center">
            {users
              .filter((u) => u.role === "donor")
              .map((u, index) => (
                <CampaignCard
                  key={index}
                  //profileName={u.profileName}
                  role={u.role}
                />
              ))}
          </div>

          <div className=" flex-wrap space-y-3 w-full space-x-10">
            {users
              .filter((u) => u.role === "admin")
              .map((u, index) => (
                <CampaignCard
                  key={index}
                  //campaigns={ }
                  role={u.role}
                />
              ))}
          </div>

          <div className=" flex-wrap space-y-3 w-full space-x-10">
            {users.map((u, index) => (
              <CampaignCard
                key={index}
                //profileName={u.profileName}
                role={u.role}
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
};
