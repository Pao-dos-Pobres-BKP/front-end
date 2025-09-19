import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NewsItem from "@/components/ui/news-item";
import type { newsInformations } from "@/types/news";

const News = (cardItens: newsInformations[]) => {
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
        className="w-full max-w"
        opts={{
          align: "start",
          loop: true,
          
        }}
      >
        <CarouselContent className="-ml-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className=" sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
              <NewsItem 
                  id="1" 
                  title="Sample News Titleeeeee " 
                  link="https://example.com" 
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

export default News;
