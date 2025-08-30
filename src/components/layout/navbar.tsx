import { NavLink, Link } from "react-router-dom";
import LogoIcon from "../../assets/Logo.svg?react";
import StarIcon from "../../assets/Star.svg?react";
import HomeIcon from "../../assets/Home.svg?react";
import VectorIcon from "../../assets/Vector.svg?react";
import DiscoverIcon from "../../assets/Discovery.svg?react";
import UserIcon from "../../assets/User.svg?react";
import ActivityIcon from "../../assets/Activity.svg?react";

function Navbar() {
  const isAuthenticated = true;

  const linkStyles = "flex items-center gap-2.5 px-4 py-2 rounded-3xl transition-colors";
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `${linkStyles} ${
      isActive
        ? "bg-[var(--color-components)] text-[var(--color-background)]"
        : "text-[var(--color-components)] hover:bg-[var(--color-components)] hover:text-[var(--color-background)]"
    }`;
  };

  return (
    <div className="bg-[var(--color-components-2)] fixed top-0 left-0 w-full z-50 h-16">
      <div className="px-7 flex justify-between items-center h-full text-[var(--color-components)]">
        <div>
          <Link to="/">
            <LogoIcon className="h-12 w-auto fill-current" />
          </Link>
        </div>

        <NavLink to="/" className={getNavLinkClass}>
          <HomeIcon className="h-5 w-5 fill-current" />
          <strong>Home</strong>
        </NavLink>

        <NavLink to="/campanhas" className={getNavLinkClass}>
          <StarIcon className="h-5 w-5 fill-current" />
          <strong>Campanhas</strong>
        </NavLink>

        {!isAuthenticated && (
          <NavLink to="/login" className={getNavLinkClass}>
            <strong>Login/Registre-se</strong>
            <VectorIcon className="h-5 w-5 fill-current" />
          </NavLink>
        )}

        {isAuthenticated && (
          <>
            <NavLink to="/dashboard" className={getNavLinkClass}>
              <ActivityIcon className="h-5 w-5 fill-current" />
              <strong>Dashboard</strong>
            </NavLink>
            <NavLink to="/doacao" className={getNavLinkClass}>
              <DiscoverIcon className="h-5 w-5 fill-current" />
              <strong>Comunicados</strong>
            </NavLink>
            <NavLink to="/doadores" className={getNavLinkClass}>
              <UserIcon className="h-5 w-5 fill-current" />
              <strong>Doadores</strong>
            </NavLink>
            <NavLink to="/perfil" className={getNavLinkClass}>
              <VectorIcon className="h-5 w-5 fill-current" />
              <strong>Profile</strong>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
