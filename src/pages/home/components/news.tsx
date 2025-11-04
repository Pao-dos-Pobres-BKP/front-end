import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NewsItem from "@/components/ui/news-item";
import type { NewsAPI } from "@/services/news";
import excluir1 from "@/assets/excluir1.jpg";

interface NewsProps {
  news: NewsAPI[];
}

export const News = ({ news }: NewsProps) => {
  return (
    <div
      className="bg-[var(--color-components-2)] flex flex-col items-center 
    px-6 md:px-12 lg:px-24 
    pt-2 md:pt-4 lg:pt-6 
    pb-6 md:pb-12 lg:pb-24
    gap-10 h-full w-full"
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
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent>
          {news.map((news) => (
            <CarouselItem key={news.id}>
              <NewsItem
                imageUrl={excluir1}
                title={news.title}
                link={"https://www.paodospobres.org.br/categorias-noticias/noticias/"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
