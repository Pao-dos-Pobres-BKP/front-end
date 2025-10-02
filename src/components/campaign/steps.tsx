import React from 'react';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import type { CampaignBase } from '@/types/Campaign';
import { formatCurrency } from '@/utils/formatCurrency';

interface StepProps {
    onNext?: () => void;
    onBack?: () => void;
    onSubmit?: () => void;
    isSubmitting?: boolean;
    disableNext?: boolean;
}

export const StepIndicators: React.FC<{ step: number; total: number }> = ({ step, total }) => {
    const dots = Array.from({ length: total }, (_, i) => i + 1);
    return (
        <div className="flex gap-2 items-center justify-center mt-4" aria-label={`Passo ${step} de ${total}`}>
            {dots.map((d) => (
                <span
                    key={d}
                    className={`size-2 rounded-full ${d === step ? 'bg-[var(--color-components)]' : 'bg-gray-300'}`}
                />
            ))}
        </div>
    );
};

export const AgreementStep: React.FC<StepProps> = ({ onNext }) => {
    return (
        <div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-components)]">Termo de Concordância</label>
                <textarea
                    readOnly
                    className="w-full h-40 rounded-md border border-[var(--color-components)]/30 p-3 text-sm bg-white text-black resize-none outline-none"
                    value={`Este é um termo de concordância com as diretrizes da criação de uma campanha.\n\nVocê está prestes a criar uma campanha, ou seja, um valor significativo será arrecadado a uma causa específica...`}
                />
            </div>
            <div className="flex justify-center gap-4 mt-6">
                <Button variant="tertiary" size="extraSmall" onClick={() => onNext?.()}>Concordo</Button>
            </div>
            <StepIndicators step={1} total={3} />
        </div>
    );
};

interface FormStepProps extends StepProps {
    form: {
        title: string;
        description: string;
        targetValue: string; // masked currency string
        imageName?: string | null;
    };
    onChange: (field: string, value: string) => void;
    onImageSelect: (file: File | null) => void;
}

export const FormStep: React.FC<FormStepProps> = ({ form, onChange, onImageSelect, onBack, onNext }) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        onImageSelect(file || null);
    }

    return (
        <div>
            <div className="flex flex-col gap-4">
                <Input id="campaign-title" label="Título*" placeholder="Título" fullWidth value={form.title} onChange={(e) => onChange('title', e.target.value)} />
                <div>
                    <label className="text-sm font-medium text-[var(--color-components)] mb-1 block">Descrição*</label>
                    <textarea
                        placeholder="Descreva a motivação da sua campanha"
                        value={form.description}
                        onChange={(e) => onChange('description', e.target.value)}
                        className="w-full h-40 rounded-md border border-[var(--color-components)]/30 p-3 text-sm bg-white text-black resize-none outline-none placeholder:text-gray-400"
                    />
                    <div className={(form.description.length < 10 || form.description.length > 200) ? "text-xs text-red-500 mt-1" : "text-xs text-gray-500 mt-1"}>{form.description.length}/200</div>
                </div>
                <Input
                    id="campaign-target"
                    label="Valor Pretendido*"
                    placeholder="R$ 00,00"
                    fullWidth
                    value={form.targetValue}
                    onChange={(e) => onChange('targetValue', e.target.value)}
                />
                <div>
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="w-full h-16 border border-[var(--color-components)]/50 rounded-md flex items-center justify-center gap-2 text-sm text-[var(--color-components)] hover:bg-[var(--color-components)] hover:text-white transition-colors"
                    >
                        {form.imageName ? (
                            <span>{form.imageName} ×</span>
                        ) : (
                            <>📷 Anexar Imagem</>
                        )}
                    </button>
                    <p hidden={true}>Por favor, insira um título</p>
                    <input ref={inputRef} type="file" className="hidden" accept="image/*" onChange={handleFile} />
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
                {onBack && (
                    <Button variant="tertiary" size="extraSmall" onClick={onBack}>
                        Voltar
                    </Button>
                )}
                <Button variant="primary" size="extraSmall" onClick={(form.title && form.description && form.targetValue) ? () => onNext?.() : () => alert("teste")} disabled={!(form.title && form.description && form.targetValue)}>
                    Salvar
                </Button>
            </div>
            <StepIndicators step={2} total={3} />
        </div>
    );
};

interface PasswordStepProps extends StepProps {
    onChange: (value: string) => void;
    password: string;
    confirmLabel?: string;
    destructive?: boolean;
}

export const PasswordStep: React.FC<PasswordStepProps> = ({ password, onChange, onBack, onSubmit, confirmLabel = 'Confirmar', destructive }) => {
    return (
        <div>
            <div className="flex flex-col gap-4">
                <Input id="campaign-password" label="Confirme com sua senha" placeholder="Senha" type="password" fullWidth value={password} onChange={(e) => onChange(e.target.value)} />
            </div>
            <div className="flex justify-center gap-4 mt-6">
                {onBack && <Button variant="tertiary" size="extraSmall" onClick={onBack}>Voltar</Button>}
                <Button variant={destructive ? 'destructive' : 'primary'} size="extraSmall" onClick={onSubmit}>{confirmLabel}</Button>
            </div>
            <StepIndicators step={3} total={3} />
        </div>
    );
};

interface ReviewProps extends StepProps {
    campaign: CampaignBase;
}

export const ReviewApproveStep: React.FC<ReviewProps & { onReject: () => void; onApprove: () => void; step: number; }> = ({ campaign, onReject, onApprove, step }) => {
    return (
        <div className="flex flex-col gap-4">
            <Input fullWidth label="Título" value={campaign.title} readOnly />
            <div>
                <label className="text-sm font-medium text-[var(--color-components)] mb-1 block">Autor</label>
                <input value={campaign.authorName} readOnly className="w-full rounded-md border border-[var(--color-components)]/30 bg-gray-50 px-3 py-2 text-sm" />
            </div>
            <div>
                <label className="text-sm font-medium text-[var(--color-components)] mb-1 block">Descrição</label>
                <textarea readOnly value={campaign.description} className="w-full h-32 rounded-md border border-[var(--color-components)]/30 p-3 text-sm bg-gray-50 text-black resize-none" />
                <div className="text-xs text-gray-500 mt-1">{campaign.description?.length}/200</div>
            </div>
            <Input fullWidth label="Valor Pretendido" value={formatCurrency(campaign.targetValue || 0)} readOnly />
            {campaign.image?.name && (
                <div className="w-full h-16 rounded-md border border-dashed border-[var(--color-components)] flex items-center justify-center text-white bg-[var(--color-components)] text-sm">{campaign.image.name} ×</div>
            )}
            <div className="flex justify-center gap-4 mt-4">
                <Button variant="tertiary" size="extraSmall" onClick={onReject}>Rejeitar</Button>
                <Button variant="primary" size="extraSmall" onClick={onApprove}>Aprovar</Button>
            </div>
            <StepIndicators step={step} total={2} />
        </div>
    );
};
