import { useState } from "react";
import Button from "@/components/ui/button";
import CampaignModal from "@/pages/campanhas/components/CampaignModal";



const Campanhas = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold mb-4">Página de Campanhas</h1>

      <Button variant="primary" size="medium" onClick={() => setOpen(true)}>
        Abrir Campanha
      </Button>

      <CampaignModal open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default Campanhas;
