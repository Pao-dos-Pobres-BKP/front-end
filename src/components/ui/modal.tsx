import { useEffect, useRef, useState, type ReactNode } from "react";
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

type InterfaceProps = {
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onRetry?: () => void;
  variant?: ModalVariant | "custom";
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;

  avatarUrl?: string;
  onAvatarSelect?: (file: File) => void;
  donorId?: string;
};

type ModalConfig = Record<
  ModalVariant,
  {
    title: string;
    description: string;
    actions: { label: string; variant: string; action: string }[];
  }
>;

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

function AvatarPicker(props: { 
  avatarUrl?: string; 
  onAvatarSelect?: (file: File) => void;
  previewUrl: string | null;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && props.onAvatarSelect) {
      props.onAvatarSelect(file);
    }
  }

  const displayUrl = props.previewUrl || props.avatarUrl;

  if (displayUrl) {
    return (
      <div className="flex items-center justify-center flex-1 relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-[220px] h-[220px] rounded-full overflow-hidden border-4 border-slate-200 relative group">
          <img src={displayUrl} alt="Avatar preview" className="w-full h-full object-cover" />
          {props.onAvatarSelect && (
            <button
              onClick={handleButtonClick}
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              type="button"
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
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="w-[220px] h-[220px] rounded-full overflow-hidden border-4 border-slate-200">
        <button
          onClick={handleButtonClick}
          className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
          type="button"
        >
          <img src={camera} alt="Camera icon" className="h-12 w-12" />
        </button>
      </div>
    </div>
  );
}

export default function Modal(props: InterfaceProps) {
  const { isOpen, onClose, variant, onConfirm, onRetry, avatarUrl, onAvatarSelect, donorId } = props;
  const config =
    variant && variant !== "custom"
      ? modalConfig[variant as ModalVariant]
      : {
          title: props.title ?? "",
          description: props.description ?? "",
          actions: [],
        };

  const isAvatarModal = variant === "avatar-change";
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  useEffect(function () {
    if (!isOpen) {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  }, [isOpen]);

  useEffect(function () {
    return function () {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!isOpen) return null;

  function handleAvatarFileSelect(file: File) {
    setSelectedFile(file);
    
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
    
    if (onAvatarSelect) {
      onAvatarSelect(file);
    }
  }

  async function uploadAvatar() {
    if (!selectedFile || !donorId) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch(`/donors/${donorId}/avatar`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      onConfirm?.();
      onClose();
    }
  }

  function handleActionClick(action: string) {
    switch (action) {
      case "close":
        onClose();
        break;
      case "confirm":
        if (isAvatarModal && selectedFile) {
          uploadAvatar();
        } else {
          onConfirm?.();
        }
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

        {isAvatarModal && (
          <AvatarPicker 
            avatarUrl={avatarUrl} 
            onAvatarSelect={handleAvatarFileSelect}
            previewUrl={previewUrl}
          />
        )}

        <ModalActions actions={config.actions} handleActionClick={handleActionClick} centered={isAvatarModal} />
      </div>
    </div>
  );
}