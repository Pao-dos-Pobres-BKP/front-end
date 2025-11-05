import api from "./api";
import type { PageableResponse } from "./types";

export type DonorCampaignsAPI = {
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
  creatorName: string;
};

export async function getDonorCampaigns(page: number, pageSize: number) {
  const response = await api.get<PageableResponse<DonorCampaignsAPI>>(
    `/campaigns/donor/all-donations`,
    {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
      },
    }
  );

  return response.data;
}
