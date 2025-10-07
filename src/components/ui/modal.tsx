import { useEffect } from "react";
import Button from "./button";
import camera from "@/assets/camera.svg";
import { cn } from "@/lib/utils";

type ModalVariant =
  | "logout"
  | "whatsapp-redirect"
  | "main-site-redirect"
  | "newsletter-success"
  | "newsletter-error"
  | "delete-account"
  | "avatar-change";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: ModalVariant;
  onConfirm?: () => void;
  onRetry?: () => void;
  avatarUrl?: string;
  onAvatarSelect?: () => void;
}

type ModalConfig = Record<ModalVariant, { title: string; description: string; actions: { label: string; variant: string; action: string }[] }>;

const modalConfig: ModalConfig = {
  logout: {
    title: "Deseja sair da sua conta?",
    description:
      "Após realizar essa ação, você precisará fazer login novamente para acessar sua conta.",
    actions: [
      { label: "Voltar", variant: "senary", action: "close" },
      { label: "Continuar", variant: "primary", action: "confirm" },
    ],
  },
  "whatsapp-redirect": {
    title: "Redirecionamento para WhatsApp",
    description:
      "Você será redirecionado para uma conversa via WhatsApp com um de nossos atendentes. Deseja continuar?",
    actions: [
      { label: "Voltar", variant: "senary", action: "close" },
      { label: "Continuar", variant: "primary", action: "confirm" },
    ],
  },
  "main-site-redirect": {
    title: "Redirecionamento para Site Principal",
    description: "Você será redirecionado para o site principal. Deseja continuar?",
    actions: [
      { label: "Voltar", variant: "senary", action: "close" },
      { label: "Continuar", variant: "primary", action: "confirm" },
    ],
  },
  "newsletter-success": {
    title: "Newsletter assinada!",
    description: "Agora você receberá e-mails recorrentes com as nossas novidades!",
    actions: [{ label: "Fechar", variant: "senary", action: "close" }],
  },
  "newsletter-error": {
    title: "Ops! Deu erro na assinatura da newsletter...",
    description: "Tente novamente para não perder as novidades!",
    actions: [{ label: "Fechar", variant: "senary", action: "close" }],
  },
  "delete-account": {
    title: "Tem certeza que deseja excluir sua conta?",
    description:
      "Essa ação é irreversível e resultará na perda de todos os seus dados. Por favor, confirme se deseja continuar.",
    actions: [
      { label: "Cancelar", variant: "senary", action: "close" },
      { label: "Excluir", variant: "destructive", action: "confirm" },
    ],
  },
  "avatar-change": {
    title: "Alterar foto de perfil",
    description: "",
    actions: [
      { label: "Voltar", variant: "senary", action: "close" },
      { label: "Salvar", variant: "primary", action: "confirm" },
    ],
  },
};

function ModalOverlay(props: { onClick: () => void }) {
  return (
    <div
      className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity"
      onClick={props.onClick}
    />
  );
}

function ModalActions(props: { actions: typeof modalConfig.logout.actions; handleActionClick: (action: string) => void; centered?: boolean }) {
  return (
    <div className={cn("flex gap-3 w-full mt-2", props.centered ? "justify-center" : "justify-end")}>
      {props.actions.map(function (action, index) {
        return (
          <Button
            key={index}
            variant={action.variant as "primary" | "senary" | "destructive"}
            size="extraSmall"
            onClick={function () {
              props.handleActionClick(action.action);
            }}
          >
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}

function AvatarPicker(props: { avatarUrl?: string; onAvatarSelect?: () => void }) {
  if (props.avatarUrl) {
    return (
      <div className="flex items-center justify-center flex-1 relative">
        <div className="w-[220px] h-[220px] rounded-full overflow-hidden border-4 border-slate-200 relative group">
          <img src={props.avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
          {props.onAvatarSelect && (
            <button
              onClick={props.onAvatarSelect}
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <img src={camera} alt="Camera icon" className="h-12 w-12 text-white opacity-80" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-1 relative">
      <div className="w-[220px] h-[220px] rounded-full overflow-hidden border-4 border-slate-200">
        <button
          onClick={props.onAvatarSelect}
          className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <img src={camera} alt="Camera icon" className="h-12 w-12" />
        </button>
      </div>
    </div>
  );
}

export default function Modal(props: ModalProps) {
  const { isOpen, onClose, variant, onConfirm, onRetry, avatarUrl, onAvatarSelect } = props;
  const config = modalConfig[variant];
  const isAvatarModal = variant === "avatar-change";

  useEffect(function () {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return function () {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleActionClick(action: string) {
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
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <ModalOverlay onClick={onClose} />

      <div
        className={cn(
          "relative bg-white rounded-lg border border-slate-300 shadow-lg",
          isAvatarModal ? "flex flex-col items-center justify-between w-[400px] max-h-[90vh] h-auto min-h-[500px] p-8 mx-4" : "inline-flex flex-col items-start max-w-md w-full mx-4 p-6 gap-4"
        )}
      >
        <h3 className={cn("text-slate-900 font-inter text-lg font-semibold leading-7 text-center", !isAvatarModal ? "mb-2" : "")}>
          {config.title}
        </h3>

        {!isAvatarModal && config.description && (
          <p className="text-slate-500 font-inter text-sm font-normal leading-5">{config.description}</p>
        )}

        {isAvatarModal && <AvatarPicker avatarUrl={avatarUrl} onAvatarSelect={onAvatarSelect} />}

        <ModalActions actions={config.actions} handleActionClick={handleActionClick} centered={isAvatarModal} />
      </div>
    </div>
  );
}