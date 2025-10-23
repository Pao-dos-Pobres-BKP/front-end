import type { DonorCampaignsAPI } from "@/services/campaign";
import type { CampaignCard, CampaignDonation, SituationType } from "../types";

function toCampaignDonation(campaign: DonorCampaignsAPI): CampaignDonation {
  return {
    creatorName: campaign.createdBy,
    title: campaign.title,
    raised: Number(campaign.currentAmount),
    goal: Number(campaign.targetAmount),
    situation: campaign.status as SituationType,
    donationAmount: parseFloat(campaign.currentAmount),
  };
}

function toCampaignCard(campaign: DonorCampaignsAPI): CampaignCard {
  return {
    title: campaign.title,
    raised: Number(campaign.currentAmount),
    goal: Number(campaign.targetAmount),
    situation: campaign.status as SituationType,
    donationAmount: parseFloat(campaign.currentAmount),
    creatorName: campaign.createdBy,
  };
}

export const campaignAdapter = {
  toCampaignDonation,
  toCampaignCard,
};
