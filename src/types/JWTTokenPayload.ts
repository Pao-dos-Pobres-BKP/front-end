import type { RoleEnum } from "@/contexts/UserContext";

export interface JWTTokenPayload {
  id: string;
  email: string;
  name: string;
  role: RoleEnum;
  avatarUrl?: string;
  accessToken: string;
  exp: number;
  iat: number;
}
