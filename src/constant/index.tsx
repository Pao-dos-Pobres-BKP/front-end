import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/not-found";
import AppShell from "../components/layout/app-shell";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />} path="/">
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
