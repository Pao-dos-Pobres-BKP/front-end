import { createContext } from "react";

export type RoleEnum = "ADMIN" | "USER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleEnum;
  accessToken: string;
  avatarUrl?: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
