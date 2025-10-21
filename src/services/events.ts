import api from "./api";
import type { PageableResponse } from "./types";

export type EventAPI = {
  id: string;
  title: string;
  description: string;
  location: string;
  url: string;
  dateStart: string;
  dateEnd: string;
  createdAt: string;
  updatedAt: string;
};

export async function getEvents(pageSize: number = 10) {
  try {
    const response = await api.get<PageableResponse<EventAPI>>("/events", {
      params: {
        pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
