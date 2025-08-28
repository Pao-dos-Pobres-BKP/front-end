import clsx from "clsx";
import { useState } from "react";

interface TabsProps {
  tabs: string[];
  children: React.ReactNode[];
}

export const Tabs = ({ tabs, children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      <div className="flex items-center bg-[var(--color-components)] p-1 rounded-[6px] mb-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={clsx(
              "cursor-pointer px-3 py-[6px] rounded min-w-[80px]",
              activeTab === index
                ? "bg-white text-[var(--color-components)]"
                : "bg-[var(--color-components)] text-white"
            )}
            onClick={() => setActiveTab(index)}
          >
            <span className="text-sm font-medium text">{tab}</span>
          </button>
        ))}
      </div>

      <div className="w-full">{children[activeTab]}</div>
    </div>
  );
};
