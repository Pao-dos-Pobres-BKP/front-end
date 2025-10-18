import { CampaignCardProfileCompact } from "./campaignCard/campaingCardProfileCompact";
import { Tabs } from "@/components/ui/tabs";

type UserRole = "admin" | "donor";

interface User {
  profileName: string;
  role: UserRole;
}

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="max-h-[450px] overflow-y-auto p-4">
      <Tabs tabs={["Doadores", "Administradores", "Todos"]} variant="secondary">
        <div className="flex flex-col gap-3">
          {users
            .filter((u) => u.role === "donor")
            .map((u, index) => (
              <CampaignCardProfileCompact
                key={index}
                profileName={u.profileName}
                role={u.role}
              />
            ))}
        </div>

        <div className="flex flex-col gap-3">
          {users
            .filter((u) => u.role === "admin")
            .map((u, index) => (
              <CampaignCardProfileCompact
                key={index}
                profileName={u.profileName}
                role={u.role}
              />
            ))}
        </div>

        <div className="flex flex-col gap-3">
          {users.map((u, index) => (
            <CampaignCardProfileCompact
              key={index}
              profileName={u.profileName}
              role={u.role}
            />
          ))}
        </div>
      </Tabs>
    </div>
  );
}