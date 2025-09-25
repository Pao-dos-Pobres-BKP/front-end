interface ConfirmCancelRecurringModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmCancelRecurringModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmCancelRecurringModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 px-2">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg mx-4 sm:mx-0">
        <h2 className="text-xl font-bold text-[#005172] mb-4">
          Você deseja cancelar sua recorrência?
        </h2>
        <p className="text-sm text-gray-700 mb-6">
          Ao cancelar sua assinatura recorrente, não haverá novas cobranças e
          você perderá acesso aos benefícios relacionados. Deseja realmente
          prosseguir?
        </p>

        <div className="flex justify-end gap-4">
          <button
            className="px-6 py-2 text-black font-semibold"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-6 py-2 bg-[#D65E5E] text-white rounded-lg"
            onClick={onConfirm}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
