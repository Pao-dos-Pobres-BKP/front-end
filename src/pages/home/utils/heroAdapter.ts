import type { EventAPI } from "@/services/events";
import type { HeroItem } from "../components/hero";

import festaImg from "@/assets/festa-junina-pp.jpg";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function eventToHeroItem(event: EventAPI): HeroItem {
  return {
    imageUrl: festaImg,
    title: event.title,
    description: event.description,
    location: event.location,
    date: format(event.dateStart, "d 'de' MMMM 'de' yyyy", { locale: ptBR }),
    buttonLabel: "Ir para o evento",
    buttonLink: event.url,
    id: event.id,
    imageAlt: event.title,
    time: format(event.dateStart, "HH:mm", { locale: ptBR }),
  };
}

export const heroAdapter = {
  eventToHeroItem,
};
