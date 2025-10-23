export type CampaignStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "FINISHED"
  | "DELETED";

export interface CampaignImage {
  id?: string;
  url?: string; // remote URL if stored
  file?: File; // local file while creating/editing
  name: string;
}

export interface CampaignBase {
  id?: string;
  title: string;
  description: string;
  targetValue: number;
  image?: CampaignImage | null;
  status?: CampaignStatus;
  authorName?: string;
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCampaignInput {
  title: string;
  description: string;
  targetValue: number;
  image?: File | null;
}

export interface UpdateCampaignInput extends CreateCampaignInput {
  id: string;
}

export interface ApproveCampaignInput {
  id: string;
  password: string;
  approve: boolean;
}

export interface DeleteCampaignInput {
  id: string;
  password: string;
}

export interface PasswordConfirmInput {
  password: string;
}
