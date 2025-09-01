import cn from "../../utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
  label?: string;
};

const Input = ({ 
  className, 
  fullWidth = false,
  label,
  ...props 
}: InputProps) => {
  return (
    <div className={fullWidth ? "w-full" : "w-80"}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        className={cn(
          "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500",
          fullWidth ? "w-full" : "w-80",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
