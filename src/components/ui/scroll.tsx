import cn from "../../utils/cn";
import React from "react";

type ScrollContainerProps = {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string | number;
  showScrollbar?: boolean;
};

const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  className,
  maxHeight = 300,
  showScrollbar = true
}) => {
  const scrollbarClasses = showScrollbar 
    ? 'scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100' 
    : 'scrollbar-hide';

  const heightStyle = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

  return (
    <div
      className={cn(
        "inline-flex flex-col items-start gap-4 rounded-md border border-slate-200 p-4 overflow-auto",
        "bg-[#005172]",
        scrollbarClasses,
        className
      )}
      style={{ maxHeight: heightStyle }}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;