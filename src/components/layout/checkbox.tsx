import clsx from "clsx";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ id, label, checked, onChange }: CheckboxProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onChange?.(checked);
    }
  };

  return (
    <label htmlFor={id} className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        onKeyDown={handleKeyDown}
        className={clsx(
          "h-4 w-4 rounded border-gray-300 cursor-pointer focus:outline-none focus:ring-2",
          checked ? "text-blue-600 focus:ring-blue-500" : "text-gray-400 focus:ring-gray-300"
        )}
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
};

export default Checkbox;
