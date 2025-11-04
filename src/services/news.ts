import api from "./api";
import type { PageableResponse } from "./types";

export type NewsAPI = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  url: string;
};

export async function getNews(): Promise<PageableResponse<NewsAPI>> {
  try {
    const response = await api.get<PageableResponse<NewsAPI>>("/news");

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
