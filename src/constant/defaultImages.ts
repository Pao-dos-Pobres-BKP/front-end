import DefaultUserAvatar from "@/assets/sem-perfil.png";

/**
 * Avatar padrão para usuários (admin e donor) sem foto de perfil
 */
export const DEFAULT_AVATAR = DefaultUserAvatar;

/**
 * Retorna a URL da foto do usuário ou o avatar padrão
 * Usado para perfis de admins e donors em todo o sistema
 */
export const getUserAvatar = (imageUrl?: string | null): string => {
  return imageUrl || DEFAULT_AVATAR;
};
