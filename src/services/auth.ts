// src/services/auth.ts

import type { LoginInput } from "@/schemas/auth";
import api from "./api";
import type { User } from "@/contexts/UserContext";

export interface LoginResponse {
  accessToken: string;
}

export const login = async (credentials: LoginInput): Promise<User> => {
  const { accessToken } = await getToken(credentials);
  const payload = JSON.parse(atob(accessToken.split(".")[1]));
  const { id, role } = payload;

  if (role === "DONOR") {
    return await getDonor(id, accessToken);
  } else if (role === "ADMIN") {
    return await getAdmin(id, accessToken);
  } else {
    throw new Error("Invalid role");
  }
};

async function getToken(credentials: LoginInput): Promise<LoginResponse> {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

async function getDonor(id: string, accessToken: string): Promise<User> {
  const { data } = await api.get(`/donors/${id}`);
  const user: User = {
    id: data.id,
    email: data.email,
    fullname: data.fullName,
    birthDate: data.birthDate,
    gender: data.gender,
    phone: data.phone,
    cpf: data.cpf,
    accessToken: accessToken,
    role: "DONOR",
  };
  return user;
}

async function getAdmin(id: string, accessToken: string): Promise<User> {
  const { data } = await api.get(`/admin/${id}`);
  const user: User = {
    id: data.id,
    email: data.email,
    fullname: data.fullName,
    root: data.root,
    accessToken: accessToken,
    role: "ADMIN",
  };
  return user;
}
