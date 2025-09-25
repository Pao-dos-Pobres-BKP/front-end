/**
 * Utilitários para formatação e validação de dados
 *
 * @example
 * ```typescript
 * import { formatCPF, formatPhone, isValidCPF, isValidPhone } from '@/utils/formatters';
 *
 * // Formatação de CPF
 * formatCPF('12345678901') // '123.456.789-01'
 * formatCPF('123456789')   // '123.456.789'
 *
 * // Validação de CPF
 * isValidCPF('123.456.789-01') // false (inválido)
 * isValidCPF('111.444.777-35') // true (válido)
 *
 * // Formatação de telefone
 * formatPhone('11999887766') // '(11) 99988-7766' (celular)
 * formatPhone('1133334444')  // '(11) 3333-4444' (fixo)
 *
 * // Validação de telefone
 * isValidPhone('(11) 99999-9999') // true
 * isValidPhone('(11) 3333-4444')  // true
 * ```
 */

/**
 * Formata o CPF com pontos e traço (XXX.XXX.XXX-XX)
 * @param value - String contendo apenas números
 * @returns String formatada ou valor original se inválido
 */
export const formatCPF = (value: string): string => {
  // Remove todos os caracteres que não são números
  const numbers = value.replace(/\D/g, "");

  // Limita a 11 dígitos
  const limitedNumbers = numbers.slice(0, 11);

  // Aplica a formatação conforme o número de dígitos
  if (limitedNumbers.length <= 3) {
    return limitedNumbers;
  } else if (limitedNumbers.length <= 6) {
    return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(3)}`;
  } else if (limitedNumbers.length <= 9) {
    return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(3, 6)}.${limitedNumbers.slice(6)}`;
  } else {
    return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(3, 6)}.${limitedNumbers.slice(6, 9)}-${limitedNumbers.slice(9)}`;
  }
};

/**
 * Remove a formatação do CPF, deixando apenas números
 * @param cpf - CPF formatado
 * @returns String contendo apenas números
 */
export const unformatCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, "");
};

/**
 * Valida se o CPF é válido
 * @param cpf - CPF para validar (com ou sem formatação)
 * @returns boolean indicando se é válido
 */
export const isValidCPF = (cpf: string): boolean => {
  const numbers = unformatCPF(cpf);

  // Verifica se tem 11 dígitos
  if (numbers.length !== 11) return false;

  // Verifica se não são todos iguais (111.111.111-11, etc.)
  if (/^(.)\1{10}$/.test(numbers)) return false;

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 >= 10) digit1 = 0;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 >= 10) digit2 = 0;

  // Verifica se os dígitos conferem
  return digit1 === parseInt(numbers[9]) && digit2 === parseInt(numbers[10]);
};

/**
 * Formata o telefone brasileiro (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 * @param value - String contendo apenas números
 * @returns String formatada ou valor original se inválido
 */
export const formatPhone = (value: string): string => {
  // Remove todos os caracteres que não são números
  const numbers = value.replace(/\D/g, "");

  // Limita a 11 dígitos (celular) ou 10 (fixo)
  const limitedNumbers = numbers.slice(0, 11);

  // Aplica a formatação conforme o número de dígitos
  if (limitedNumbers.length <= 2) {
    return limitedNumbers;
  } else if (limitedNumbers.length <= 6) {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
  } else if (limitedNumbers.length <= 10) {
    // Telefone fixo: (XX) XXXX-XXXX
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
  } else {
    // Celular: (XX) XXXXX-XXXX
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
  }
};

/**
 * Remove a formatação do telefone, deixando apenas números
 * @param phone - Telefone formatado
 * @returns String contendo apenas números
 */
export const unformatPhone = (phone: string): string => {
  return phone.replace(/\D/g, "");
};

/**
 * Valida se o telefone brasileiro é válido
 * @param phone - Telefone para validar (com ou sem formatação)
 * @returns boolean indicando se é válido
 */
export const isValidPhone = (phone: string): boolean => {
  const numbers = unformatPhone(phone);

  // Telefone deve ter 10 ou 11 dígitos
  if (numbers.length < 10 || numbers.length > 11) return false;

  // Primeiro dígito deve ser entre 1 e 9 (código de área)
  const areaCode = parseInt(numbers.slice(0, 2));
  if (areaCode < 11 || areaCode > 99) return false;

  // Para celulares (11 dígitos), o terceiro dígito deve ser 9
  if (numbers.length === 11 && numbers[2] !== "9") return false;

  // Para fixos (10 dígitos), o terceiro dígito deve ser entre 2 e 5
  if (numbers.length === 10) {
    const thirdDigit = parseInt(numbers[2]);
    if (thirdDigit < 2 || thirdDigit > 5) return false;
  }

  return true;
};

/**
 * Detecta automaticamente se é celular ou fixo e formata adequadamente
 * @param value - Número de telefone
 * @returns Objeto com tipo e valor formatado
 */
export const detectAndFormatPhone = (
  value: string
): { type: "mobile" | "landline" | "unknown"; formatted: string } => {
  const numbers = unformatPhone(value);
  const formatted = formatPhone(value);

  if (numbers.length === 11 && numbers[2] === "9") {
    return { type: "mobile", formatted };
  } else if (numbers.length === 10) {
    return { type: "landline", formatted };
  } else {
    return { type: "unknown", formatted };
  }
};
