import { useEffect, useState } from "react";

import { getDonorCampaigns } from "@/services/campaign";
import {
  getDonorDonations as getDonorDonationsService,
  type DonorDonationsAPI,
} from "@/services/donation";
import type { CampaignDonation } from "./types";
import { campaignAdapter } from "./utils/campaignAdapter";

interface UsePerfilOptions {
  campaignsPage: number;
  campaignsPageSize: number;
  donationsPage: number;
  donationsPageSize: number;
}

export function usePerfil({
  campaignsPage,
  campaignsPageSize,
  donationsPage,
  donationsPageSize,
}: UsePerfilOptions) {
  const [campaigns, setCampaigns] = useState<CampaignDonation[]>([]);
  const [campaignsTotalPages, setCampaignsTotalPages] = useState(0);
  const [donations, setDonations] = useState<DonorDonationsAPI[]>([]);
  const [donationsTotalPages, setDonationsTotalPages] = useState(0);

  useEffect(() => {
    getCampaignDonations(campaignsPage, campaignsPageSize);
    getDonorDonations(donationsPage, donationsPageSize);
  }, [campaignsPage, campaignsPageSize, donationsPage, donationsPageSize]);

  async function getCampaignDonations(campaignsPage: number, campaignsPageSize: number) {
    const response = await getDonorCampaigns(campaignsPage, campaignsPageSize);
    setCampaigns(response.data.map(campaignAdapter.toCampaignCard));
    setCampaignsTotalPages(Math.ceil(response.total / campaignsPageSize));
  }

  async function getDonorDonations(donationsPage: number, donationsPageSize: number) {
    const response = await getDonorDonationsService(donationsPage, donationsPageSize);
    setDonations(response.data);
    setDonationsTotalPages(Math.ceil(response.total / donationsPageSize));
  }

  return { campaigns, campaignsTotalPages, donations, donationsTotalPages };
}
