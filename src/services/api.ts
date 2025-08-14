import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // attach auth token if you have one
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // global error handling
    return Promise.reject(err);
  }
);
