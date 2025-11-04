import api from "./api";
import type { PageableResponse } from "./types";

export type Periodicity = "MONTHLY" | "QUARTERLY" | "SEMI_ANNUAL" | "YEARLY";

export type DonationAPI = {
  id: string;
  campaignId: string;
  donorId: string;
  amount: number;
  periodicity: Periodicity | null;
  createdAt: string;
};

export type GetDonationsParams = {
  page?: number;
  pageSize?: number;
};

export async function getUserDonations(
  params?: GetDonationsParams
): Promise<PageableResponse<DonationAPI>> {
  try {
    const response = await api.get<PageableResponse<DonationAPI>>("/donations", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
