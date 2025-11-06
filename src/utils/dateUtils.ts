import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function formatDate(date: Date) {
  return format(date, "dd/MM/yyyy");
}

function formatCompleteDate(date: Date) {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export const dateUtils = {
  formatDate,
  formatCompleteDate,
};
