import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const AppShell = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <Outlet />
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        vite + react + tailwind
      </footer>
    </div>
  );
};

export default AppShell;
