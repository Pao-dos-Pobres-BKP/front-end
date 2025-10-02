import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { PasswordStep } from './steps';

interface DeleteCampaignModalProps {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    campaignId: string | null;
    onDelete: (data: { id: string; password: string }) => Promise<void> | void;
}

export const DeleteCampaignModal: React.FC<DeleteCampaignModalProps> = ({ open, onOpenChange, campaignId, onDelete }) => {
    const [password, setPassword] = React.useState('');

    function resetAll() {
        setPassword('');
    }

    async function handleDelete() {
        if (!campaignId) return;
        await onDelete({ id: campaignId, password });
        resetAll();
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={(o: boolean) => { if (!o) resetAll(); onOpenChange(o); }}>
            <DialogContent className="bg-white border-none max-w-3xl" showCloseButton={false}>
                <DialogTitle className="text-2xl font-semibold text-[var(--color-components)]">Excluir Campanha</DialogTitle>
                <PasswordStep
                    password={password}
                    onChange={setPassword}
                    onBack={() => onOpenChange(false)}
                    onSubmit={handleDelete}
                    confirmLabel="Excluir"
                    destructive
                />
            </DialogContent>
        </Dialog>
    );
};
export default DeleteCampaignModal;
