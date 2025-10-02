import React from 'react';
import Button from '@/components/ui/button';
import {
    DonorCreateCampaignModal,
    AdminCreateCampaignModal,
    ApproveCampaignModal,
    EditCampaignModal,
    DeleteCampaignModal,
} from '@/components/campaign';
import type { CampaignBase } from '@/types/Campaign';

const mockCampaign: CampaignBase = {
    id: '1',
    title: 'Meu Aniversário',
    description: 'Quero comemorar o meu aniversário.',
    targetValue: 8000,
    authorName: 'Fulano de Tal',
    image: { name: 'IMG_0431' },
    status: 'PENDING',
};

const CampaignModalsSandbox: React.FC = () => {
    const [openDonor, setOpenDonor] = React.useState(false);
    const [openAdmin, setOpenAdmin] = React.useState(false);
    const [openApprove, setOpenApprove] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    async function fakeWait(label: string, data: unknown) {
        // eslint-disable-next-line no-console
        console.log(label, data);
        await new Promise((r) => setTimeout(r, 500));
    }

    return (
        <div className="mt-10 p-4 rounded-lg border border-dashed border-gray-400 bg-white/70 text-sm space-y-4">
            <p className="font-semibold text-gray-700">Sandbox de Modais de Campanha (DEV)</p>
            <div className="flex flex-wrap gap-2">
                <Button size="extraSmall" onClick={() => setOpenDonor(true)}>Nova (Doador)</Button>
                <Button size="extraSmall" variant="secondary" onClick={() => setOpenAdmin(true)}>Nova (Admin)</Button>
                <Button size="extraSmall" variant="tertiary" onClick={() => setOpenApprove(true)}>Aprovar</Button>
                <Button size="extraSmall" variant="quaternary" onClick={() => setOpenEdit(true)}>Editar</Button>
                <Button size="extraSmall" variant="destructive" onClick={() => setOpenDelete(true)}>Excluir</Button>
            </div>

            <DonorCreateCampaignModal
                open={openDonor}
                onOpenChange={setOpenDonor}
                onSubmit={(d) => fakeWait('donor-create', d)}
            />
            <AdminCreateCampaignModal
                open={openAdmin}
                onOpenChange={setOpenAdmin}
                onSubmit={(d) => fakeWait('admin-create', d)}
            />
            <ApproveCampaignModal
                open={openApprove}
                onOpenChange={setOpenApprove}
                campaign={mockCampaign}
                onDecision={(d) => fakeWait('approve-decision', d)}
            />
            <EditCampaignModal
                open={openEdit}
                onOpenChange={setOpenEdit}
                campaign={mockCampaign}
                onSave={(d) => fakeWait('edit-save', d)}
                onDeleteRequest={() => { setOpenEdit(false); setOpenDelete(true); }}
            />
            <DeleteCampaignModal
                open={openDelete}
                onOpenChange={setOpenDelete}
                campaignId={mockCampaign.id!}
                onDelete={(d) => fakeWait('delete', d)}
            />
        </div>
    );
};

export default CampaignModalsSandbox;


// ## Modais de Campanha

// Foram adicionados componentes reutilizáveis para criação, aprovação, edição e exclusão de campanhas.

// Componentes exportados de `src/components/campaign`:

// - `DonorCreateCampaignModal`
// - `AdminCreateCampaignModal`
// - `ApproveCampaignModal`
// - `EditCampaignModal`
// - `DeleteCampaignModal`

// ### Exemplo de Uso (Criar Campanha - Doador)

// ```tsx
// import { useState } from 'react';
// import { DonorCreateCampaignModal } from '@/components/campaign';

// export function NovaCampanhaButton() {
//    const [open, setOpen] = useState(false);

//    async function handleSubmit(data: { title: string; description: string; targetValue: number; image?: File | null; password: string; }) {
//       // Chamar API de criação
//       // await api.createCampaign(data)
//       console.log('submit', data);
//    }

//    return (
//       <>
//          <button onClick={() => setOpen(true)}>Nova Campanha</button>
//          <DonorCreateCampaignModal open={open} onOpenChange={setOpen} onSubmit={handleSubmit} />
//       </>
//    );
// }
// ```

// As versões de administrador eliminam o passo de termo de concordância. O modal de aprovação recebe a campanha a ser aprovada e dispara `onDecision({ id, approve, password })`.

// O modal de edição dispara `onSave` e expõe um callback `onDeleteRequest` para abrir o modal de exclusão. O modal de exclusão recebe `campaignId` e chama `onDelete({ id, password })`.

// Cada modal cuida de máscara de moeda e fluxo de etapas; a validação usa Zod (ver `src/schemas/campaign.ts`).