import CampaignCard from "@/components/ui/campaignCard/campaignCard";
import Input from "@/components/ui/input";

import {
  Pagination
} from "@/components/ui/Pagination";

import { useState } from "react";
import { useDonorList } from "./use-donor-list";

export default function DonorList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { donors, total } = useDonorList(currentPage);
  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-10 flex flex-col gap-8 bg-[#2F5361]">
      <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
        <Input placeholder="Buscar..." fullWidth />
        <button className="w-full md:w-auto px-4 py-2.5 rounded-lg bg-[#F68537] text-white hover:bg-orange-600">
          Pesquisar
        </button>
      </div>

      <div className="flex flex-col gap-4">
        { donors.length === 0 ? (
          <p className="text-white text-center mt-6">Nenhum doador encontrado.</p>
        ) : (
          donors.map((donor, index) => (
          <CampaignCard
            key={index}
            variant="profile"
            donorName={donor.donorName}
            donorEmail={donor.donorEmail}
            raised={donor.raised}
            memberSince={donor.memberSince}
            campaigns={donor.campaigns}
          />
        ))
        ) }
      </div>
      <div className="flex justify-center items-center gap-2 mt-6">
        <Pagination onPageChange={setCurrentPage} currentPage={currentPage} totalPages={total}/>
      </div>
    </div>
  );
}