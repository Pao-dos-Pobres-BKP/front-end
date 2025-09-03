import cn from "../../utils/cn";
import React from "react";

type ScrollAreaProps = {
  children: React.ReactNode;
  className?: string;
  height?: string;
  showScrollbar?: boolean;
};

const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className,
  height = "400px",
  showScrollbar = true
}) => {
  const scrollbarClasses = showScrollbar 
    ? "scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
    : "scrollbar-none";

  return (
    <div
      className={cn(
        "inline-flex flex-col items-start gap-4 p-4",
        "overflow-auto",
        scrollbarClasses,
        "dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500",
        className
      )}
      style={{ 
        height,
        borderRadius: '6px',
        border: '1px solid #E2E8F0',
        background: '#FFF'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollArea;