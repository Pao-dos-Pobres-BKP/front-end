import { getDonors } from "@/services/donor";
import { donorAdapter } from "./donorAdapter";
import { useCallback, useEffect, useState } from "react";
import type { Donor } from "./donorAdapter";
import api from "@/services/api";

export function useDonorList(page: number) {
  const [donors, setDonorList] = useState<Donor[]>([]);
  const [total, setTotal] = useState(0);
  const PER_PAGE = 10;

  const fetchDonors = useCallback(async () => {
    try {
      const response = await getDonors(page, PER_PAGE);
      const donorsWithCampaigns = await Promise.all(
        response.data.map(async (donor) => {
          const campaignResponse = await api.get(`/donors/${donor.id}/informations`);
          const campaignsTitles = campaignResponse.data.campaignsTitles;

          const adaptedDonor = donorAdapter.toDonor(donor);
          adaptedDonor.campaigns = [...campaignsTitles];

          return adaptedDonor;
        })
      );
      setDonorList(donorsWithCampaigns);
      setTotal(response.lastPage);
    } catch (error) {
      console.error("Erro ao carregar doadores:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  return { donors, total };
}
