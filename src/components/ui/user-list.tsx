import { CampaignCardProfileCompact } from "./campaignCard/campaingCardProfileCompact";
import { Tabs } from "@/components/ui/tabs";

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

export default function UserList({ users, onUserAction }: UserListProps) {
  const donors = users.filter((u) => u.role === "donor");
  const admins = users.filter((u) => u.role === "admin");

  return (
    <div className="max-h-[450px] overflow-y-auto overflow-x-hidden p-4">
      <Tabs tabs={["Doadores", "Administradores", "Todos"]} variant="secondary">
        <div className="flex flex-col gap-3 w-full">
          {donors.length > 0 ? (
            donors.map((user, index) => (
              <CampaignCardProfileCompact
                key={user.id ?? `donor-${index}`}
                profileName={user.profileName}
                role={user.role}
                onAction={() => onUserAction?.(user)}
                className="w-full"
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              Nenhum doador encontrado
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full">
          {admins.length > 0 ? (
            admins.map((user, index) => (
              <CampaignCardProfileCompact
                key={user.id ?? `admin-${index}`}
                profileName={user.profileName}
                role={user.role}
                onAction={() => onUserAction?.(user)}
                className="w-full"
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              Nenhum administrador encontrado
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full">
          {users.length > 0 ? (
            users.map((user, index) => (
              <CampaignCardProfileCompact
                key={user.id ?? `all-${index}`}
                profileName={user.profileName}
                role={user.role}
                onAction={() => onUserAction?.(user)}
                className="w-full"
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              Nenhum usuário encontrado
            </p>
          )}
        </div>
      </Tabs>
    </div>
  );
}