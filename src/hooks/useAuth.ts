import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Exemplo simples: verifica se existe token no localStorage
    const token = localStorage.getItem("auth_token");
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
}
