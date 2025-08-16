import cn from "../../utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "default" | "ghost";
};

const Button = ({ className, variant = "default", ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        variant === "default" && "bg-gray-900 text-white hover:opacity-90",
        variant === "ghost" && "bg-transparent border border-gray-300 hover:bg-gray-50",
        className
      )}
      {...props}
    />
  );
};

export default Button;
