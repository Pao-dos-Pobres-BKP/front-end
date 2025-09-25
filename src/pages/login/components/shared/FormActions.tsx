import Button from "@/components/ui/button";

interface FormActionsProps {
  primaryAction: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "tertiary" | "destructive" | "confirm";
    disabled?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "tertiary" | "destructive" | "confirm";
    disabled?: boolean;
  };
}

export default function FormActions({ primaryAction, secondaryAction }: FormActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant={primaryAction.variant || "primary"}
        className="w-full"
        onClick={primaryAction.onClick}
        disabled={primaryAction.disabled}
      >
        {primaryAction.label}
      </Button>

      {secondaryAction && (
        <Button
          type="button"
          variant={secondaryAction.variant || "tertiary"}
          className="w-full"
          onClick={secondaryAction.onClick}
          disabled={secondaryAction.disabled}
        >
          {secondaryAction.label}
        </Button>
      )}
    </div>
  );
}
