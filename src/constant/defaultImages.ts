import DefaultUserAvatar from "@/assets/sem-perfil.png";

/**
 * Default avatar for users (admin and donor) without profile photo
 */
export const DEFAULT_AVATAR = DefaultUserAvatar;

/**
 * Returns the URL of the user's photo or the default avatar
 * Used for admin and donor profiles in the entire system
 */
export const getUserAvatar = (imageUrl?: string | null): string => {
  return imageUrl || DEFAULT_AVATAR;
};
