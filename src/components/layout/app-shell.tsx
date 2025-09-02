import { Outlet } from "react-router-dom";
// import Navbar from "./navbar";

const AppShell = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
