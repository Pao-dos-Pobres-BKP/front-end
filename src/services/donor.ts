import api from "./api";
import type { PageableResponse } from "./types";

export type DonorAPI = {
  id: string;
  email: string;
  fullName: string;
  birthdate: Date;
  gender: string;
  phone: string;
  cpf: string;
  raised?: number;
  totalDonated?: number;
  createdAt: Date;
  campaigns: string[];
};

export async function getDonors(page: number, pageSize: number) {
  try {
    const response = await api.get<PageableResponse<DonorAPI>>("/donors", {
      params: {page: page.toString(), pageSize: pageSize.toString()}
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}