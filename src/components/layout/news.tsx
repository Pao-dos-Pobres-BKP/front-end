import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const News = () => {
  return (
    <div
      className="bg-[#06B3C0] flex flex-col items-center 
    px-6 md:px-12 lg:px-24 
    pt-2 md:pt-4 lg:pt-6 
    pb-4 md:pb-6 lg:pb-8 
    gap-6 md:gap-12 h-70 w-full"
    >
      <h2
        className="
      text-[#005172] font-manrope font-bold 
      text-3xl leading-[48px] tracking-[0.5px] 
      self-center md:self-start
      text-center md:text-start hidden md:block"
      >
        O QUE ACONTENCE NO PÃO DOS POBRES?
      </h2>
      <Carousel
        className="w-full max-w"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
              <div className="p-1">{index + 1}</div>
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
