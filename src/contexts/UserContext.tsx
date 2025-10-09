import { createContext } from "react";

export type RoleEnum = "ADMIN" | "DONOR";
export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface User {
  id: string;
  fullname: string;
  email: string;
  birthDate?: Date;
  root?: boolean;
  gender?: Gender;
  phone?: string;
  cpf?: string;
  role: RoleEnum;
  accessToken: string;
  foto?: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
