import { getNews, type NewsAPI } from "@/services/news";
import { useEffect, useState } from "react";

export function useHome() {
  const [latestNews, setLatestNews] = useState<NewsAPI[]>([]);

  useEffect(() => {
    getLatestNews();
  }, []);

  async function getLatestNews() {
    const response = await getNews();

    if (response.data) {
      setLatestNews(response.data);
    }
  }

  return {
    latestNews,
  };
}
