import { useEffect, useState } from "react";

import { getDonorDonations } from "@/services/campaign";
import type { CampaignDonation } from "./types";
import { campaignAdapter } from "./utils/campaignAdapter";

export function usePerfil() {
  const [campaigns, setCampaigns] = useState<CampaignDonation[]>([]);

  useEffect(() => {
    getCampaignDonations();
  }, []);

  async function getCampaignDonations() {
    const response = await getDonorDonations();
    if (response.data) {
      setCampaigns(response.data.map(campaignAdapter.toCampaignDonation));
    }
  }

  return {
    campaigns,
  };
}
