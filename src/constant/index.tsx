import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/not-found";
import AppShell from "../components/layout/app-shell";
import { ROUTES } from "./routes";

const Navigation = () => {
  return (
    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH || "/"}>
      <Routes>
        <Route element={<AppShell />} path="/">
          <Route path={ROUTES.home} element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
