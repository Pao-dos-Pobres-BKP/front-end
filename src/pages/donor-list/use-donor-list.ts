import { getDonors, type DonorAPI } from "@/services/donor";
import { useCallback, useEffect, useState } from "react";

export function useDonorList() {
  const [donors, setDonorList] = useState<DonorAPI[]>([]);

  const fetchDonors = useCallback(async () => {
    await getDonorList();
  }, []);
  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  async function getDonorList() {
    const response = await getDonors();
    if (response.data.length > 0) {
      setDonorList(response.data);
    }
  }

  return { donors };
}