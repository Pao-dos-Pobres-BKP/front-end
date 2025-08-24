
import React, { useState, useRef, useEffect } from "react";
import cn from "../../utils/cn";

interface Option {
    value: string;
    label: string;
    disabled?: boolean;
}

type SelectSize = "small" | "medium" | "large";

interface SelectProps {
    options: Option[];
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    size?: SelectSize;
    disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
    options,
    placeholder = "Selecione uma opção",
    value,
    onChange,
    className = "",
    size = "medium",
    disabled = false,
}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | undefined>(value);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelected(value);
    }, [value]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (option: Option) => {
        if (option.disabled) return;
        setSelected(option.value);
        setOpen(false);
        onChange?.(option.value);
    };

    const selectedLabel = options.find(o => o.value === selected)?.label;

    const baseContainer = "relative";
    const baseButton = "flex items-center justify-between bg-white border border-gray-300 rounded-[10px] shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-150";
    const baseButtonOpen = "ring-2 ring-primary-500";
    const baseButtonDisabled = "bg-gray-100 text-gray-400 cursor-not-allowed";
    const baseIcon = "text-gray-400 transition-transform";
    const baseIconOpen = "rotate-180";
    const baseList = "absolute z-10 mt-1 bg-white border border-gray-200 rounded-[10px] shadow-lg max-h-60 overflow-y-auto py-1";
    const baseOption = "px-4 py-2 cursor-pointer select-none flex items-center text-gray-900 hover:bg-gray-100 transition";
    const baseOptionSelected = "bg-gray-100 font-semibold";
    const baseOptionDisabled = "text-gray-300 cursor-not-allowed";
    const basePlaceholder = "text-gray-400";
    const baseCheckIcon = "mr-2 text-primary-500";

    const selectVariants = {
        small: {
            container: cn(baseContainer, "max-w-xs text-sm"),
            button: cn(baseButton, "px-4 py-2 w-50 h-8"),
            buttonOpen: baseButtonOpen,
            buttonDisabled: baseButtonDisabled,
            icon: cn(baseIcon, "h-4 w-4"),
            iconOpen: baseIconOpen,
            list: cn(baseList, "w-50"),
            option: baseOption,
            optionSelected: baseOptionSelected,
            optionDisabled: baseOptionDisabled,
            placeholder: basePlaceholder,
            checkIcon: cn(baseCheckIcon, "h-4 w-4"),
        },
        medium: {
            container: cn(baseContainer, "max-w-md w-75 text-base"),
            button: cn(baseButton, "px-4 py-2 w-75 h-10"),
            buttonOpen: baseButtonOpen,
            buttonDisabled: baseButtonDisabled,
            icon: cn(baseIcon, "h-4 w-4"),
            iconOpen: baseIconOpen,
            list: cn(baseList, "w-75"),
            option: baseOption,
            optionSelected: baseOptionSelected,
            optionDisabled: baseOptionDisabled,
            placeholder: basePlaceholder,
            checkIcon: cn(baseCheckIcon, "h-4 w-4"),
        },
        large: {
            container: cn(baseContainer, "max-w-lg w-100 text-lg"),
            button: cn(baseButton, "px-4 py-2 w-100 h-12"),
            buttonOpen: baseButtonOpen,
            buttonDisabled: baseButtonDisabled,
            icon: cn(baseIcon, "h-4 w-4"),
            iconOpen: baseIconOpen,
            list: cn(baseList, "w-100"),
            option: baseOption,
            optionSelected: baseOptionSelected,
            optionDisabled: baseOptionDisabled,
            placeholder: basePlaceholder,
            checkIcon: cn(baseCheckIcon, "h-4 w-4"),
        },
    };

    const variant = selectVariants[size];

    return (
        <div ref={ref} className={cn(variant.container, className, disabled ? "opacity-50 pointer-events-none" : "opacity-100 pointer-events-auto")}>
            <button
                type="button"
                className={cn(
                    variant.button,
                    open && variant.buttonOpen,
                    disabled && variant.buttonDisabled
                )}
                onClick={() => !disabled && setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
                disabled={disabled}
            >
                <span className={selectedLabel ? "" : "text-gray-400"}>
                    {selectedLabel || placeholder}
                </span>
                <svg
                    className={cn(variant.icon, open && variant.iconOpen)}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && !disabled && (
                <ul className={variant.list} role="listbox">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={cn(
                                variant.option,
                                option.disabled && variant.optionDisabled,
                                selected === option.value && variant.optionSelected
                            )}
                            aria-selected={selected === option.value}
                            onClick={() => handleSelect(option)}
                        >
                            {selected === option.value && (
                                <svg className={cn(variant.checkIcon, variant.icon)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
