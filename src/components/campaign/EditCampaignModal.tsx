import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { FormStep, PasswordStep } from './steps';
import { updateCampaignSchema, passwordSchema } from '@/schemas/campaign';
import { z } from 'zod';
import type { CampaignBase } from '@/types/Campaign';

interface EditCampaignModalProps {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    campaign: CampaignBase | null; // preloaded campaign
    onSave: (data: { id: string; title: string; description: string; targetValue: number; image?: File | null; password: string; }) => Promise<void> | void;
    onDeleteRequest: () => void; // triggers external delete modal
}

const currencyMask = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const number = (parseInt(digits, 10) || 0) / 100;
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const EditCampaignModal: React.FC<EditCampaignModalProps> = ({ open, onOpenChange, campaign, onSave, onDeleteRequest }) => {
    const [step, setStep] = React.useState<1 | 2>(1);
    const [form, setForm] = React.useState({ title: '', description: '', targetValue: '', imageName: '' as string | null });
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    const [password, setPassword] = React.useState('');
    const [, setErrors] = React.useState<Record<string, string>>({});

    React.useEffect(() => {
        if (campaign && open) {
            setForm({
                title: campaign.title,
                description: campaign.description,
                targetValue: currencyMask(String(campaign.targetValue * 100)), // assume value already numeric
                imageName: campaign.image?.name || campaign.image?.url || '',
            });
        }
    }, [campaign, open]);

    function resetAll() {
        setStep(1);
        setPassword('');
        setErrors({});
    }
    function handleChange(field: string, value: string) {
        if (field === 'targetValue') value = currencyMask(value);
        setForm((f) => ({ ...f, [field]: value }));
    }
    function handleImage(file: File | null) {
        setImageFile(file);
        setForm((f) => ({ ...f, imageName: file?.name || '' }));
    }

    function validateForm() {
        if (!campaign) return null;
        try {
            const parsed = updateCampaignSchema.parse({
                id: campaign.id,
                title: form.title,
                description: form.description,
                targetValue: Number(form.targetValue.replace(/[^0-9,-]/g, '').replace(',', '.')),
                image: imageFile ?? null,
            });
            return parsed;
        } catch (e) {
            if (e instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                e.issues.forEach((i) => { if (i.path[0]) fieldErrors[i.path[0] as string] = i.message; });
                setErrors(fieldErrors);
            }
            return null;
        }
    }
    function validatePassword() {
        try { passwordSchema.parse({ password }); return true; } catch (e) { if (e instanceof z.ZodError) setErrors({ password: e.issues[0]?.message || 'Senha inválida' }); return false; }
    }
    async function handleSubmit() {
        const parsed = validateForm();
        if (!parsed) return;
        if (!validatePassword()) return;
        await onSave({
            id: parsed.id,
            title: parsed.title,
            description: parsed.description,
            targetValue: parsed.targetValue,
            image: imageFile ?? null,
            password,
        });
        resetAll();
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={(o: boolean) => { if (!o) resetAll(); onOpenChange(o); }}>
            <DialogContent className="bg-white border-none max-w-3xl" showCloseButton={false}>
                <DialogTitle className="text-2xl font-semibold text-[var(--color-components)]">Editar Campanha</DialogTitle>
                {step === 1 && (
                    <>
                        <FormStep
                            form={form}
                            onChange={handleChange}
                            onImageSelect={handleImage}
                            onBack={() => { resetAll(); onOpenChange(false); }}
                            onNext={() => { const ok = validateForm(); if (ok) setStep(2); }}
                            stepOverride={1}
                            totalStepsOverride={2}
                        />
                        <div className="mt-4 text-center">
                            <button type="button" onClick={onDeleteRequest} className="text-sm text-red-600 hover:cursor-pointer underline">Excluir esta campanha</button>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <PasswordStep
                        password={password}
                        onChange={setPassword}
                        onBack={() => setStep(1)}
                        onSubmit={handleSubmit}
                        confirmLabel="Salvar"
                        stepOverride={2}
                        totalStepsOverride={2}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
export default EditCampaignModal;
