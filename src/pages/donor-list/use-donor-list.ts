import { getDonors } from "@/services/donor";
import { donorAdapter } from "./donorAdapter";
import { useCallback, useEffect, useState } from "react";
import type { Donor } from "./donorAdapter";

export function useDonorList(page: number) {
  const [donors, setDonorList] = useState<Donor[]>([]);
  const [total, setTotal] = useState(0);
  const PER_PAGE = 10;

  const fetchDonors = useCallback(async () => {
    try {
      const response = await getDonors(page, PER_PAGE);
      const adapted = response.data.map(donorAdapter.toDonor);
      setDonorList(adapted);
      setTotal(response.lastPage);
    } catch (error) {
      console.error("Erro ao carregar doadores:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  return { donors, total };
}
