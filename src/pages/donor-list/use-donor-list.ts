import { getDonors } from "@/services/donor";
import { donorAdapter } from "./donorAdapter";
import { useCallback, useEffect, useState } from "react";
import type { Donor } from "./donorAdapter";

export function useDonorList() {
  const [donors, setDonorList] = useState<Donor[]>([]);

  const fetchDonors = useCallback(async () => {
    try {
      const response = await getDonors();
      const adapted = response.data.map(donorAdapter.toDonor);
      setDonorList(adapted);
    } catch (error) {
      console.error("Erro ao carregar doadores:", error);
    }
  }, []);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  return { donors };
}
