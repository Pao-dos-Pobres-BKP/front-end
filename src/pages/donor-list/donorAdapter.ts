import type { DonorAPI } from "@/services/donor";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function toDonor(donor: DonorAPI) {
  return {
    id: donor.id,
    donorName: donor.fullname,
    donorEmail: donor.email,
    birthdate: format(new Date(donor.birthdate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
    raised: donor.raised,
    memberSince: format(new Date(donor.createdAt), "dd/MM/yyyy"),
    campaigns: donor.campaigns,
  };
}

export const donorAdapter = {
  toDonor,
};