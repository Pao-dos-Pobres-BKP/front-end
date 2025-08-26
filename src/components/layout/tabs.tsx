import clsx from "clsx";
import { useState } from "react";

interface TabsProps {
  tabs: string[];
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      <div className="flex items-center bg-[var(--color-components)] p-1 rounded-[6px] ">
        {tabs.map((tab, index) => (
          <button
            className={clsx(
              "cursor-pointer px-3 py-[6px] rounded",
              activeTab === index
                ? "bg-white text-[var(--color-components)]"
                : "bg-[var(--color-components)] text-white"
            )}
            onClick={() => setActiveTab(index)}
          >
            <span className="text-sm font-medium">{tab}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
