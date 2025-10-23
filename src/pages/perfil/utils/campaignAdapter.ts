import type { DonorCampaignDonationAPI } from "@/services/campaign";
import type { CampaignDonation, SituationType } from "../types";

function toCampaignDonation(campaign: DonorCampaignDonationAPI): CampaignDonation {
  return {
    creatorName: campaign.createdBy,
    title: campaign.title,
    raised: Number(campaign.currentAmount),
    goal: Number(campaign.targetAmount),
    situation: campaign.status as SituationType,
    donationAmount: parseFloat(campaign.currentAmount),
  };
}

export const campaignAdapter = {
  toCampaignDonation,
};
