import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import { Footer } from "./footer";

const AppShell = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full">
      <Navbar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppShell;
