import api from "./api";
import type { PageableResponse } from "./types";

type NewsResponse = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  url: string;
};

export async function getNews(): Promise<PageableResponse<NewsResponse>> {
  try {
    const response = await api.get<PageableResponse<NewsResponse>>("/news");

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
