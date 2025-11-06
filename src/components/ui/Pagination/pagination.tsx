import { PaginationNavigation } from "./PaginationNavigation";
import { PaginationContent } from "./PaginationContent";
import { PaginationItem } from "./PaginationItem";
import { PaginationLink } from "./PaginationLink";
import { PaginationPrevious } from "./PaginationPrevious";
import { PaginationNext } from "./PaginationNext";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Standard pagination component for use in the entire application.
 *
 * @param currentPage - Current page (starts at 1)
 * @param totalPages - Total pages
 * @param onPageChange - Callback called when the page changes
 * @param className - Additional CSS classes for the container
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */
export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  // Não renderiza o componente se houver apenas 1 página ou menos
  useEffect(() => {console.log({currentPage})}, [currentPage])
  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationNavigation className={className}>
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationPrevious
            size="sm"
            onClick={currentPage === 1 ? undefined : () => onPageChange(currentPage - 1)}
            className={cn(
              "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors",
              currentPage === 1
                ? "bg-white text-[#F68537] border-[#F68537] cursor-not-allowed"
                : "bg-[#F68537] text-white border-[#F68537]"
            )}
          >
            Anterior
          </PaginationPrevious>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              size="icon"
              onClick={() => onPageChange(i + 1)}
              isActive={currentPage === i + 1}
              className={`px-3 py-1 border rounded-full transition-colors ${
                currentPage === i + 1
                  ? "bg-white text-[#F68537] border-[#F68537]"
                  : "bg-[#F68537] text-white border-[#F68537]"
              }`}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            size="sm"
            onClick={currentPage === totalPages ? undefined : () => onPageChange(currentPage + 1)}
            className={cn(
              "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors",
              currentPage === totalPages
                ? "bg-white text-[#F68537] border-[#F68537] cursor-not-allowed"
                : "bg-[#F68537] text-white border-[#F68537]"
            )}
          >
            Próximo
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </PaginationNavigation>
  );
}
