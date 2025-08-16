import { Outlet } from "react-router-dom";

const AppShell = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      <Outlet />
    </div>
  );
};

export default AppShell;
