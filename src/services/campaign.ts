import api from "./api";
import type { PageableResponse } from "./types";

export type DonorCampaignDonationAPI = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  targetAmount: string;
  currentAmount: string;
  startDate: string;
  endDate: string;
  status: string;
  createdBy: string;
};

export async function getDonorDonations() {
  const response = await api.get<PageableResponse<DonorCampaignDonationAPI>>(
    `/campaigns/donor/all-donations`
  );

  return response.data;
}
