import type { RegistrationData } from "../pages/login/login";
import api from "./api";

export async function signIn(credentials: RegistrationData) {
  const requestBody = {
    email: credentials.email,
    password: credentials.password,
    fullName: credentials.nomeCompleto,
    birthDate: credentials.dataNascimento,
    gender: credentials.genero,
    phone: credentials.telefone,
    cpf: credentials.cpf,
  };

  try {
    const response = await api.post("/donors", requestBody);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Falha no cadastro. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro no cadastro:", error);
    throw error;
  }
}
