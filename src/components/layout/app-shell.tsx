import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const AppShell = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
