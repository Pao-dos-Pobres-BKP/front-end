import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar";
import { Footer } from "./footer";

const AppShell = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 w-full ${isDashboard ? "bg-[#2F5361]" : ""}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppShell;
