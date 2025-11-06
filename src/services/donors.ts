import api from "@/services/api";

export type DonorGender = "MALE" | "FEMALE" | "OTHER";

export interface DonorItem {
  id: string;
  fullName: string;
  email: string;
  birthDate: string;
  gender: DonorGender;
  phone: string;
  cpf: string;
}

export interface PaginatedDonors {
  data: DonorItem[];
  page: number;
  lastPage: number;
  total: number;
}

export async function getDonors(page = 1, pageSize = 50): Promise<PaginatedDonors> {
  const { data } = await api.get<PaginatedDonors>("/donors", {
    params: { page, pageSize },
  });
  return data;
}

export async function getAllDonors(maxPages = 5, pageSize = 50): Promise<DonorItem[]> {
  const items: DonorItem[] = [];
  let page = 1;
  for (let i = 0; i < maxPages; i++) {
    const res = await getDonors(page, pageSize);
    items.push(...res.data);
    if (page >= res.lastPage) break;
    page += 1;
  }
  return items;
}

export interface UpdateDonorData {
  email?: string;
  password?: string;
  fullName?: string;
  birthDate?: string;
  gender?: DonorGender;
  phone?: string;
  cpf?: string;
}

export async function updateDonor(id: string, data: UpdateDonorData): Promise<void> {
  await api.patch(`/donors/${id}`, data);
}
