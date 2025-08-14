import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../constant/routes";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
      <div className="container h-14 flex items-center justify-between">
        <Link to={ROUTES.home} className="font-semibold">
          App
        </Link>
        <nav className="flex gap-4 text-sm">
          <NavLink to={ROUTES.home} className={({ isActive }) => (isActive ? "font-medium" : "")}>
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
