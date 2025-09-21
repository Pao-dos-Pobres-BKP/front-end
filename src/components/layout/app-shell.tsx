import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import { Footer } from "./footer";

const AppShell = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <main className="">
    
        <Footer />
      <Outlet />
      <Footer />
      </main>
    </div>
  );
};

export default AppShell;