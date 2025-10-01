import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NewsItem from "@/components/ui/news-item";
import type { newsInformations } from "@/types/news";
import excluir1 from "@/assets/excluir1.jpg";
import excluir2 from "@/assets/excluir2.png";
import Autoplay from "embla-carousel-autoplay";

//const News = (cardItens?: newsInformations[]) => { -> MUDAR QUANDO TIVER INTEGRAÇÃO COM BACKEND
const News = () => {
  return (
    <div
      className="bg-[var(--color-components-2)] flex flex-col items-center 
    px-6 md:px-12 lg:px-24 
    pt-2 md:pt-4 lg:pt-6 
    gap-10 h-80 w-full"
    >
      <h2
        className="
      text-[var(--color-components)] font-manrope font-bold 
      text-3xl leading-[48px] tracking-[0.5px] 
      self-center md:self-start
      text-center md:text-start md:block hidden"
      >
        O QUE ACONTENCE NO PÃO DOS POBRES?
      </h2>
      <h2
        className="
      text-[var(--color-components)] font-manrope font-bold 
      text-3xl leading-[48px] tracking-[0.5px] 
      self-center md:self-start
      text-center md:text-start block md:hidden"
      >
        NOTÍCIAS:
      </h2>

      <Carousel
        className="w-full max-w max-md:overflow-hidden"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className=" max-[23.5rem]:ml-14 max-[22rem]:ml-8 ">
          {mockedNewsInformations.map((news) => (
            <CarouselItem className=" basis-full min-[23.5rem]:basis-1/2 min-[38rem]:basis-1/3  min-[52rem]:basis-1/4  min-[70rem]:basis-1/5 min-[82rem]:basis-1/6 min-[98rem]:basis-1/7">
              <NewsItem id={news.id} title={news.title} link={news.link} imageUrl={news.imageUrl} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

const mockedNewsInformations: newsInformations[] = [
  {
    id: "1",
    title: "Pão dos Pobres celebra 130 anos de história e dedicação",
    link: "https://example.com",
    imageUrl: excluir1,
  },
  {
    id: "2",
    title: "Nova oficina de robótica inspira jovens a criarem o futuro",
    link: "https://example.com",
    imageUrl: excluir2,
  },
  {
    id: "3",
    title: "Campanha do agasalho de 2025 supera todas as metas",
    link: "https://example.com",
    imageUrl: excluir1,
  },
  {
    id: "4",
    title: "Alunos se destacam na feira de ciências com projetos inovadores",
    link: "https://example.com",
    imageUrl: excluir2,
  },
  {
    id: "5",
    title: "Parceria com empresa de tecnologia irá oferecer novos cursos",
    link: "https://example.com",
    imageUrl: excluir1,
  },
  {
    id: "6",
    title: "Tradicional Festa de São João anima a comunidade e arrecada fundos",
    link: "https://example.com",
    imageUrl: excluir2,
  },
  {
    id: "7",
    title: "Inscrições abertas para o concorrido curso de marcenaria",
    link: "https://example.com",
    imageUrl: excluir1,
  },
];

export default News;
