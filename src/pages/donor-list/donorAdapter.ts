import type { DonorAPI } from "@/services/donor";
import { format } from "date-fns";

export type Donor = {
  id: string;
  donorName: string;
  donorEmail: string;
  raised: number;
  memberSince: string;
  campaigns: string[];
};

function toDonor(donor: DonorAPI): Donor {
  return {
    id: donor.id,
    donorName: donor.fullName,
    donorEmail: donor.email,
    raised: donor.raised,
    memberSince: format(new Date(donor.createdAt), "dd/MM/yyyy"),
    campaigns: donor.campaigns,
  };
}

export const donorAdapter = { toDonor };
