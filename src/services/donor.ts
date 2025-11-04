import api from "./api";

export type DonorAPI = {
  id: string;
  email: string;
  fullname: string;
  birthdate: Date;
  gender: string;
  phone: string;
  cpf: string;
  raised: number;
  createdAt: Date;
  campaigns: string[];
};

export async function getDonors() {
  try {
    const response = await api.get("/donors");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}