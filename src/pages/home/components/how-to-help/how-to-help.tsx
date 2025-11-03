import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import Button from "@/components/ui/button";
import { Edit } from "lucide-react";
import { WhatsAppIcon } from "@/icons/whatsappIcon";
import { useUser } from "@/hooks/useUser";
import { useHowToHelp } from "./useHowToHelp";
import type { HowToHelpAPI } from "@/services/how-to-help";

const WhatsAppButton = () => {
  const handleContactClick = () => {
    window.open("https://wa.me/5551989719615", "_blank");
  };
  return (
    <Button
      onClick={handleContactClick}
      className="bg-[var(--color-text-contact)] text-white w-full flex items-center justify-center gap-2 hover:bg-[var(--color-text-contact)] hover:opacity-95"
    >
      <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
      Entrar em Contato
    </Button>
  );
};

export default function HowToHelpSection() {
  //simula api
  const metaCampanha = 1000;
  const arrecadado = 750;
  const percentual = Math.min((arrecadado / metaCampanha) * 100, 100);
  const { user } = useUser();
  const { howToHelpList, updateHowToHelp } = useHowToHelp();

  const userIsAdmin = useMemo(() => user?.role === "ADMIN", [user]);

  const [editingId, setEditingId] = useState<string>("");
  const [editText, setEditText] = useState("");

  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const handleEdit = (howToHelp: HowToHelpAPI) => {
    setOpenAccordionId(howToHelp.id);
    setEditingId(howToHelp.id);
    setEditText(howToHelp.description);
  };

  const handleSave = async () => {
    await updateHowToHelp(editingId, editText);
    setEditingId("");
    setEditText("");
  };

  const handleCancel = () => {
    setEditingId("");
    setEditText("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSave();
    }
    if (event.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-left text-[#024b5a]">COMO AJUDAR?</h2>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#024b5a] text-left">
            Campanha 130 anos do Pão
          </h3>
          <Progress value={Math.round(percentual)} variant="blue" />
          <div className="flex justify-end">
            <span className="text-sm font-medium text-[#024b5a]">
              {percentual.toFixed(0)}% atingida
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 relative">
          <div className="flex-1 lg:pr-72">
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
              value={openAccordionId ?? ""}
              onValueChange={setOpenAccordionId}
            >
              {howToHelpList.map((howToHelp) => (
                <AccordionItem key={howToHelp.id} value={howToHelp.id}>
                  <AccordionTrigger variant="secondary" className="w-full [&>svg]:hidden">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <span className="text-[#024b5a] font-medium text-lg">
                          <span className="accordion-icon"></span>
                        </span>
                        <span className="text-base text-[#024b5a]">{howToHelp.title}</span>
                      </div>
                      {userIsAdmin && (
                        <button
                          type="button"
                          aria-label={`Editar ${howToHelp.title}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(howToHelp);
                          }}
                          className="p-2 rounded-md hover:bg-gray-100 mr-4"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent variant="secondary">
                    <div className="py-4">
                      {editingId === howToHelp.id ? (
                        <div>
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                            className="w-full p-2 border border-gray-300 rounded-md min-h-[120px]"
                            autoFocus
                          />
                          <small className="text-gray-500 mt-1 block">
                            Pressione <b>Enter</b> para salvar ou <b>Esc</b> para cancelar.
                          </small>
                        </div>
                      ) : (
                        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
                          <p className="flex-1 text-sm leading-relaxed">{howToHelp.description}</p>
                          <div className="w-full lg:w-52 flex-shrink-0">
                            <WhatsAppButton />
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="lg:absolute lg:top-16 lg:right-0 lg:w-52 flex flex-col gap-2 mt-6 lg:mt-0">
            <Button
              onClick={() => (window.location.href = "/doacao")} //simula rota de /doacoes
              className="bg-[var(--color-text-special)] text-white w-full hover:bg-[var(--color-text-special)] hover:opacity-95"
            >
              Faça sua doação!
            </Button>
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-xs text-gray-500">OU</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <WhatsAppButton />
          </div>
        </div>
      </div>

      <style>{`
        .accordion-icon { display: inline-block; }
        .accordion-icon::before { content: "+"; }
        [data-state="open"] .accordion-icon::before { content: "-"; }
      `}</style>
    </section>
  );
}
