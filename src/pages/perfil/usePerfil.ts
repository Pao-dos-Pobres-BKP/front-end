import { useEffect, useState } from "react";

import { getDonorCampaigns } from "@/services/campaign";
import type { CampaignDonation } from "./types";
import { campaignAdapter } from "./utils/campaignAdapter";

export function usePerfil(page: number, pageSize: number) {
  const [campaigns, setCampaigns] = useState<CampaignDonation[]>([]);
  const [campaignsTotalPages, setCampaignsTotalPages] = useState(0);
  useEffect(() => {
    getCampaignDonations(page, pageSize);
  }, [page, pageSize]);

  async function getCampaignDonations(page: number, pageSize: number) {
    const response = await getDonorCampaigns(page, pageSize);
    setCampaigns(response.data.map(campaignAdapter.toCampaignCard));
    setCampaignsTotalPages(Math.ceil(response.total / pageSize));
    return response.data;
  }
  return { campaigns, campaignsTotalPages };
}
