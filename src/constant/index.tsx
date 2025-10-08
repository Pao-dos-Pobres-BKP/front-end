import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import NotFound from "../pages/not-found";
import AppShell from "../components/layout/app-shell";
import { ROUTES } from "./routes";
import Login from "@/pages/login/login";
import Doacao from "@/pages/doacao";
import Campanhas from "@/pages/campanhas";
import Perfil from "@/pages/perfil";
import Dashboard from "@/pages/dashboard";
import DonorList from "@/pages/donor-list";
import Partners from "@/pages/empresas-parceiras";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />} path="/">
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.doacao} element={<Doacao />} />
          <Route path={ROUTES.campanhas} element={<Campanhas />} />
          <Route path={ROUTES.perfil} element={<Perfil />} />
          <Route path={ROUTES.perfilAdmin} element={<PerfilAdmin />} />
          <Route path={ROUTES.dashboard} element={<Dashboard />} />
          <Route path={ROUTES.donorList} element={<DonorList />} />
          <Route path={ROUTES.partners} element={<Partners />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
