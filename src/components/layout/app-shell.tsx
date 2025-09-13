import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import { Footer } from "./footer";
import PartnerCompanies from "./partnerCompanies";

const AppShell = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
        <PartnerCompanies />
        <Footer />
      </main>
    </div>
  );
};

export default AppShell;
