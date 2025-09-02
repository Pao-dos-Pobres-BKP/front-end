import cn from "../../utils/cn";

type LabelPosition = 'left' | 'center' | 'right';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
  label?: string;
  labelPosition?: LabelPosition;
};

const Input = ({ 
  className, 
  fullWidth = false,
  label,
  labelPosition = 'left',
  ...props 
}: InputProps) => {
  
  const getLabelClasses = () => {
    const baseClasses = "block mb-1 text-sm font-medium text-slate-700";
    
    const positionClasses = {
      left: "text-left",
      center: "text-center", 
      right: "text-right"
    };

    return cn(baseClasses, positionClasses[labelPosition]);
  };

  return (
    <div className="w-full">
      {label && ( 
        <label className={getLabelClasses()}>
          {label}
        </label>
      )}
      
      <input
        className={cn(
          "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-black shadow-sm outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500",
          fullWidth ? "w-full" : "w-80",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;