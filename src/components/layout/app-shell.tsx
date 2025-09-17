import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import { Footer } from "./footer";
import PartnerCompanies from "./partner-companies";
import News from "./news";

const AppShell = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
        <News />
        <PartnerCompanies />
      </main>
      <Footer />
    </div>
  );
};

export default AppShell;
