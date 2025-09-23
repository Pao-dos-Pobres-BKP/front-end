import Button from "@/components/ui/button";
import { Link } from "react-router-dom";

type FormActionProps = {
  onConfirm: () => void;
};

export const FormActions = ({ onConfirm }: FormActionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Button className="w-full" variant="confirm" onClick={onConfirm}>
        Continuar
      </Button>
      <Link to="/">
        <Button className="w-full" variant="tertiary">
          Cancelar
        </Button>
      </Link>
    </div>
  );
};
