import { useEffect } from "react";
import Button from "./button";

type ModalVariant =
  | "logout"
  | "whatsapp-redirect"
  | "main-site-redirect"
  | "newsletter-success"
  | "newsletter-error"
  | "delete-account";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: ModalVariant;
  onConfirm?: () => void;
  onRetry?: () => void;
}

const modalConfig = {
  logout: {
    title: "Deseja sair da sua conta?",
    description:
      "Após realizar essa ação, você precisará fazer login novamente para acessar sua conta.",
    actions: [
      { label: "Voltar", variant: "senary" as const, action: "close" },
      { label: "Continuar", variant: "primary" as const, action: "confirm" },
    ],
  },
  "whatsapp-redirect": {
    title: "Redirecionamento para WhatsApp",
    description:
      "Você será redirecionado para uma conversa via WhatsApp com um de nossos atendentes. Deseja continuar?",
    actions: [
      { label: "Voltar", variant: "senary" as const, action: "close" },
      { label: "Continuar", variant: "primary" as const, action: "confirm" },
    ],
  },
  "main-site-redirect": {
    title: "Redirecionamento para Site Principal",
    description: "Você será redirecionado para o site principal. Deseja continuar?",
    actions: [
      { label: "Voltar", variant: "senary" as const, action: "close" },
      { label: "Continuar", variant: "primary" as const, action: "confirm" },
    ],
  },
  "newsletter-success": {
    title: "Newsletter assinada!",
    description: "Agora você receberá e-mails recorrentes com as nossas novidades!",
    actions: [{ label: "Fechar", variant: "senary" as const, action: "close" }],
  },
  "newsletter-error": {
    title: "Ops! Deu erro na assinatura da newsletter...",
    description: "Tente novamente para não perder as novidades!",
    actions: [{ label: "Fechar", variant: "senary" as const, action: "close" }],
  },
  "delete-account": {
    title: "Tem certeza que deseja excluir sua conta?",
    description:
      "Essa ação é irreversível e resultará na perda de todos os seus dados. Por favor, confirme se deseja continuar.",
    actions: [
      { label: "Cancelar", variant: "senary" as const, action: "close" },
      { label: "Excluir", variant: "destructive" as const, action: "confirm" },
    ],
  },
};

const Modal = ({ isOpen, onClose, variant, onConfirm, onRetry }: ModalProps) => {
  const config = modalConfig[variant];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleActionClick = (action: string) => {
    switch (action) {
      case "close":
        onClose();
        break;
      case "confirm":
        onConfirm?.();
        break;
      case "retry":
        onRetry?.();
        break;
      default:
        onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      <div
        className="
        relative bg-white rounded-lg border border-slate-300
        inline-flex flex-col items-start
        max-w-md w-full mx-4 
        p-6 gap-4
        shadow-lg
      "
      >
        <div className="w-full">
          <h3
            className="
            text-slate-900 font-inter
            text-lg font-semibold leading-7
            mb-2
          "
          >
            {config.title}
          </h3>

          <p
            className="
            text-slate-500 font-inter
            text-sm font-normal leading-5
          "
          >
            {config.description}
          </p>
        </div>

        <div className="flex justify-end gap-3 w-full mt-2">
          {config.actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              size="extraSmall"
              onClick={() => handleActionClick(action.action)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
