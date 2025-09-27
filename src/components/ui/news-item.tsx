import type { newsInformations } from "@/types/news";

export default function NewsItem(news: newsInformations) {
  return (
    <div className="bg-[var(--color-components)] flex flex-col items-center w-46 h-46 rounded-md shadow-md hover:shadow-lg ">
      <a
        href={news.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center w-full h-full rounded-md overflow-hidden"
      >
        {news.imageUrl ? (
          <img src={news.imageUrl} alt={news.title} className="w-full h-32 object-cover" />
        ) : (
          <div className="h-32 bg-gray-200"></div>
        )}
        <div className="h-18 w-full bg-[var(--color-background)] flex items-center justify-center break-words ">
          <h3 className="text-sm font-semibold text-center text-[var(--color-components)] ">
            {news.title}
          </h3>
        </div>
      </a>
    </div>
  );
}
