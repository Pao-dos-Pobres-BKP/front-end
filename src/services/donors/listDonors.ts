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

export async function listDonors(page = 1, pageSize = 50): Promise<PaginatedDonors> {
  const { data } = await api.get<PaginatedDonors>("/donors", {
    params: { page, pageSize },
  });
  return data;
}

export async function listAllDonors(maxPages = 5, pageSize = 50): Promise<DonorItem[]> {
  const items: DonorItem[] = [];
  let page = 1;
  for (let i = 0; i < maxPages; i++) {
    const res = await listDonors(page, pageSize);
    items.push(...res.data);
    if (page >= res.lastPage) break;
    page += 1;
  }
  return items;
}
