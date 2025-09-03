import type { LoginInput } from "@/schemas/auth";
import { api } from "./api";
import type { User } from "@/contexts/UserContext";

export const login = async (credentials: LoginInput): Promise<User> => {
  const { data } = await api.post("/login", credentials);
  return data;
};
