import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";

interface TabsProps extends VariantProps<typeof tabButtonVariants> {
  tabs: string[];
  children: React.ReactNode[];
}

const tabsContainerVariants = cva("flex items-center p-1 rounded-[6px] mb-2 w-fit", {
  variants: {
    variant: {
      default: "bg-[var(--color-components)]",
      secondary: "bg-[var(--color-components-2)]",
    },
  },
  defaultVariants: { variant: "default" },
});

const tabButtonVariants = cva(
  "cursor-pointer px-2 sm:px-3 py-[6px] rounded text-xs sm:text-sm whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        active: true,
        class: "bg-white text-[var(--color-components)]",
      },
      {
        variant: "default",
        active: false,
        class: "bg-[var(--color-components)] text-white",
      },

      {
        variant: "secondary",
        active: true,
        class: "bg-white text-[var(--color-components-2)]",
      },
      {
        variant: "secondary",
        active: false,
        class: "bg-[var(--color-components-2)] text-white",
      },
    ],
    defaultVariants: {
      variant: "default",
      active: false,
    },
  }
);

export const Tabs = ({ tabs, children, variant }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      <div className={tabsContainerVariants({ variant })}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={index}
              className={tabButtonVariants({ variant, active: isActive })}
              onClick={() => setActiveTab(index)}
            >
              <span className="font-medium">{tab}</span>
            </button>
          );
        })}
      </div>

      <div className="w-full flex flex-col items-start">{children[activeTab]}</div>
    </div>
  );
};
