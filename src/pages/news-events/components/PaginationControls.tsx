import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 5;
const INITIAL_PAGE = 1;

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const renderPaginationItems = () => {
    const items = [];
    let startPage = Math.max(INITIAL_PAGE, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (endPage - startPage < MAX_VISIBLE_PAGES - 1) {
      startPage = Math.max(INITIAL_PAGE, endPage - MAX_VISIBLE_PAGES + 1);
    }

    if (startPage > INITIAL_PAGE) {
      items.push(
        <PaginationItem key={INITIAL_PAGE}>
          <PaginationLink onClick={() => onPageChange(INITIAL_PAGE)}>{INITIAL_PAGE}</PaginationLink>
        </PaginationItem>
      );
      if (startPage > INITIAL_PAGE + 1) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink onClick={() => onPageChange(page)} isActive={page === currentPage}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - INITIAL_PAGE) {
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => onPageChange(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationPrevious
          onClick={() => currentPage > INITIAL_PAGE && onPageChange(currentPage - 1)}
          className={
            currentPage === INITIAL_PAGE ? "pointer-events-none opacity-50" : "cursor-pointer"
          }
        />
        {renderPaginationItems()}
        <PaginationNext
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          className={
            currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
          }
        />
      </PaginationContent>
    </Pagination>
  );
}
