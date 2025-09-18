import type { RegistrationData } from "../pages/login/login";
import api from "./api";

export function formatCPF(cpfValue: string): string {
  const cleanCPF = cpfValue.replace(/\D/g, "");
  return cleanCPF;
}

export function formatPhone(phoneValue: string): string {
  const cleanPhone = phoneValue.replace(/\D/g, "");
  return `+55${cleanPhone}`;
}

export async function signIn(credentials: RegistrationData) {
  const formattedCPF = formatCPF(credentials.cpf || "");
  const formattedPhone = formatPhone(credentials.telefone || "");

  const requestBody = {
    email: credentials.email,
    password: credentials.password,
    fullName: credentials.nomeCompleto,
    birthDate: credentials.dataNascimento,
    gender: credentials.genero,
    phone: formattedPhone,
    cpf: formattedCPF,
  };

  try {
    const response = await api.post("/donors", requestBody);
    console.log("Resposta do servidor:", response);
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
