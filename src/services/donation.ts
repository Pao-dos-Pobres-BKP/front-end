import api from "./api";
import type { PageableResponse } from "./types";

type Periodicity = "MONTHLY" | "QUARTERLY" | "SEMI_ANNUAL" | "YEARLY";

export type DonorDonationsAPI = {
  amount: number;
  campaignCreatedBy: string;
  campaignId: string;
  createdAt: string;
  donorId: string;
  id: string;
  periodicity: Periodicity | null;
  campaignName: string;
};

export async function getDonorDonations(page: number, pageSize: number) {
  const response = await api.get<PageableResponse<DonorDonationsAPI>>("/donations", {
    params: {
      page: page.toString(),
      pageSize: pageSize.toString(),
    },
  });

  return response.data;
}
