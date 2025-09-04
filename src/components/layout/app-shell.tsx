import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

const AppShell = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/perfil");
    }
  }, []);

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
