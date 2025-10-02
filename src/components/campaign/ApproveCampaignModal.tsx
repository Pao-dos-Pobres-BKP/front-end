import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { PasswordStep, ReviewApproveStep } from './steps';
import type { CampaignBase } from '@/types/Campaign';
import { passwordSchema } from '@/schemas/campaign';
import { z } from 'zod';

interface ApproveCampaignModalProps {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    campaign: CampaignBase | null;
    onDecision: (data: { id: string; approve: boolean; password: string }) => Promise<void> | void;
}

export const ApproveCampaignModal: React.FC<ApproveCampaignModalProps> = ({ open, onOpenChange, campaign, onDecision }) => {
    const [step, setStep] = React.useState<1 | 2>(1);
    const [password, setPassword] = React.useState('');
    const [approveFlag, setApproveFlag] = React.useState<boolean | null>(null);
    const [, setError] = React.useState<string>('');

    function resetAll() {
        setStep(1);
        setPassword('');
        setApproveFlag(null);
        setError('');
    }

    async function handleSubmit() {
        try {
            passwordSchema.parse({ password });
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(e.issues[0]?.message || 'Senha inválida');
                return;
            }
        }
        if (!campaign || approveFlag === null) return;
        await onDecision({ id: campaign.id!, approve: approveFlag, password });
        resetAll();
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={(o: boolean) => { if (!o) resetAll(); onOpenChange(o); }}>
            <DialogContent className="bg-white border-none max-w-3xl" showCloseButton={false}>
                <DialogTitle className="text-2xl font-semibold text-[var(--color-components)]">Campanha Pendente</DialogTitle>
                {step === 1 && campaign && (
                    <ReviewApproveStep
                        campaign={campaign}
                        onReject={() => { setApproveFlag(false); setStep(2); }}
                        onApprove={() => { setApproveFlag(true); setStep(2); }}
                        step={1}
                    />
                )}
                {step === 2 && (
                    <PasswordStep
                        password={password}
                        onChange={setPassword}
                        onBack={() => setStep(1)}
                        onSubmit={handleSubmit}
                        confirmLabel={approveFlag ? 'Aprovar' : 'Rejeitar'}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
export default ApproveCampaignModal;
