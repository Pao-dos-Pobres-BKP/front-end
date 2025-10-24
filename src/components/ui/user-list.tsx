import { useState, useMemo, useEffect } from "react";
import { CampaignCardProfileCompact } from "./campaignCard/campaingCardProfileCompact";
import Input from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type UserRole = "admin" | "donor";

interface User {
  id?: string | number;
  profileName: string;
  role: UserRole;
}

interface UserListProps {
  users: User[];
  onUserAction?: (user: User) => void;
}

const ITEMS_PER_PAGE = 20;

export default function UserList({ users, onUserAction }: UserListProps) {
  const [searchTermAll, setSearchTermAll] = useState("");
  const [searchTermAdmins, setSearchTermAdmins] = useState("");
  const [searchTermDonors, setSearchTermDonors] = useState("");
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPageAdmins, setCurrentPageAdmins] = useState(1);
  const [currentPageDonors, setCurrentPageDonors] = useState(1);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchTermAll("");
        setSearchTermAdmins("");
        setSearchTermDonors("");
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) =>
      a.profileName.localeCompare(b.profileName, "pt-BR", { sensitivity: "base" })
    );
  }, [users]);

  const filteredAllUsers = useMemo(() => {
    if (!searchTermAll.trim()) return sortedUsers;

    const searchLower = searchTermAll.toLowerCase().trim();
    return sortedUsers.filter((user) => user.profileName.toLowerCase().includes(searchLower));
  }, [sortedUsers, searchTermAll]);

  const filteredAdmins = useMemo(() => {
    const allAdmins = sortedUsers.filter((u) => u.role === "admin");

    if (!searchTermAdmins.trim()) return allAdmins;

    const searchLower = searchTermAdmins.toLowerCase().trim();
    return allAdmins.filter((user) => user.profileName.toLowerCase().includes(searchLower));
  }, [sortedUsers, searchTermAdmins]);

  const filteredDonors = useMemo(() => {
    const allDonors = sortedUsers.filter((u) => u.role === "donor");

    if (!searchTermDonors.trim()) return allDonors;

    const searchLower = searchTermDonors.toLowerCase().trim();
    return allDonors.filter((user) => user.profileName.toLowerCase().includes(searchLower));
  }, [sortedUsers, searchTermDonors]);

  const totalPagesAll = Math.max(1, Math.ceil(filteredAllUsers.length / ITEMS_PER_PAGE));
  const paginatedAll = useMemo(() => {
    const startIndex = (currentPageAll - 1) * ITEMS_PER_PAGE;
    return filteredAllUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAllUsers, currentPageAll]);

  const totalPagesAdmins = Math.max(1, Math.ceil(filteredAdmins.length / ITEMS_PER_PAGE));
  const paginatedAdmins = useMemo(() => {
    const startIndex = (currentPageAdmins - 1) * ITEMS_PER_PAGE;
    return filteredAdmins.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAdmins, currentPageAdmins]);

  const totalPagesDonors = Math.max(1, Math.ceil(filteredDonors.length / ITEMS_PER_PAGE));
  const paginatedDonors = useMemo(() => {
    const startIndex = (currentPageDonors - 1) * ITEMS_PER_PAGE;
    return filteredDonors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDonors, currentPageDonors]);

  useMemo(() => {
    setCurrentPageAll(1);
    setCurrentPageAdmins(1);
    setCurrentPageDonors(1);
  }, []);

  const renderPagination = (
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
  ) => {
    return (
      <Pagination className="mt-4">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              size="sm"
              onClick={currentPage === 1 ? undefined : () => onPageChange(currentPage - 1)}
              className={cn(
                "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors border",
                currentPage === 1
                  ? "bg-[var(--color-background)] text-[var(--color-text-special-2)] border-[var(--color-text-special-2)] cursor-not-allowed"
                  : "bg-[var(--color-text-special-2)] text-[var(--color-text-1)] border-[var(--color-text-special-2)]"
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
                className={cn(
                  "px-3 py-1 border rounded-full transition-colors",
                  currentPage === i + 1
                    ? "bg-[var(--color-background)] text-[var(--color-text-special-2)] border-[var(--color-text-special-2)]"
                    : "bg-[var(--color-text-special-2)] text-[var(--color-text-1)] border-[var(--color-text-special-2)]"
                )}
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
                "px-3 py-1 text-xs h-7 w-fit rounded-full transition-colors border",
                currentPage === totalPages
                  ? "bg-[var(--color-background)] text-[var(--color-text-special-2)] border-[var(--color-text-special-2)] cursor-not-allowed"
                  : "bg-[var(--color-text-special-2)] text-[var(--color-text-1)] border-[var(--color-text-special-2)]"
              )}
            >
              Próximo
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  const renderUserList = (
    userList: User[],
    emptyMessage: string,
    keyPrefix: string,
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
    searchValue: string,
    onSearchChange: (value: string) => void,
    showRole: boolean = true
  ) => (
    <div className="flex flex-col gap-3 w-full">
      <Input
        placeholder="Buscar usuários..."
        fullWidth
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {userList.length > 0 ? (
        <>
          <div className="flex flex-col gap-3">
            {userList.map((user, index) => (
              <CampaignCardProfileCompact
                key={user.id ?? `${keyPrefix}-${index}`}
                profileName={user.profileName}
                role={user.role}
                onAction={() => onUserAction?.(user)}
                className="w-full"
                showRole={showRole}
              />
            ))}
          </div>
          {renderPagination(currentPage, totalPages, onPageChange)}
        </>
      ) : (
        <>
          <p className="text-center text-[var(--color-text-2)] py-8">{emptyMessage}</p>
          {renderPagination(currentPage, totalPages, onPageChange)}
        </>
      )}
    </div>
  );

  return (
    <div className="max-h-[450px] overflow-y-auto overflow-x-hidden p-2 sm:p-4 bg-[var(--color-background)] text-[var(--color-components)]">
      <Tabs tabs={["Todos", "Administradores", "Doadores"]} variant="secondary">
        {renderUserList(
          paginatedAll,
          searchTermAll ? "Nenhum usuário encontrado para sua busca" : "Nenhum usuário encontrado",
          "all",
          currentPageAll,
          totalPagesAll,
          setCurrentPageAll,
          searchTermAll,
          setSearchTermAll,
          true
        )}

        {renderUserList(
          paginatedAdmins,
          searchTermAdmins
            ? "Nenhum administrador encontrado para sua busca"
            : "Nenhum administrador encontrado",
          "admin",
          currentPageAdmins,
          totalPagesAdmins,
          setCurrentPageAdmins,
          searchTermAdmins,
          setSearchTermAdmins,
          false
        )}

       {renderUserList(
          paginatedDonors,
          searchTermDonors
            ? "Nenhum doador encontrado para sua busca"
            : "Nenhum doador encontrado",
          "donor",
          currentPageDonors,
          totalPagesDonors,
          setCurrentPageDonors,
          searchTermDonors,
          setSearchTermDonors,
          false
        )}
      </Tabs>
    </div>
  );
}
