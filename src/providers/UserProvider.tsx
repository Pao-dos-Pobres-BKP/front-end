import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { UserContext } from "../contexts/UserContext";
import type { RoleEnum } from "../contexts/UserContext";
import type { User } from "../contexts/UserContext";
import type { UserContextType } from "../contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import type { JWTTokenPayload } from "../types/JWTTokenPayload";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JWTTokenPayload>(token);

        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Expired token, logging out user.");
          setUser(null);
        } else {
          setUserState({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            avatarUrl: decoded.avatarUrl,
            accessToken: decoded.accessToken,
            role: decoded.role as RoleEnum,
          });
        }
      } catch (err) {
        console.error("Token inválido:", err);
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("authToken", user.accessToken);
    } else {
      localStorage.removeItem("authToken");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const contextValue: UserContextType = {
    user,
    setUser,
    logout,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
