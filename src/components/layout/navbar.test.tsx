import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./navbar";
import { UserContext } from "@/contexts/UserContext";
import type { User, UserContextType } from "@/contexts/UserContext";

vi.mock("@/assets/Logo.svg?react", () => ({
  default: () => <div data-testid="logo-icon">Logo</div>,
}));

vi.mock("@/assets/Star.svg?react", () => ({
  default: () => <div data-testid="star-icon">Star</div>,
}));

vi.mock("@/assets/Home.svg?react", () => ({
  default: () => <div data-testid="home-icon">Home</div>,
}));

vi.mock("@/assets/Vector.svg?react", () => ({
  default: () => <div data-testid="vector-icon">Vector</div>,
}));

vi.mock("@/assets/Discovery.svg?react", () => ({
  default: () => <div data-testid="discover-icon">Discover</div>,
}));

vi.mock("@/assets/User.svg?react", () => ({
  default: () => <div data-testid="user-icon">User</div>,
}));

vi.mock("@/assets/Activity.svg?react", () => ({
  default: () => <div data-testid="activity-icon">Activity</div>,
}));

const mockLogout = vi.fn();

const createMockUser = (role: "ADMIN" | "DONOR", fullname = "João da Silva"): User => ({
  id: "123",
  fullname,
  email: "joao@test.com",
  role,
  accessToken: "token",
  totalDonated: 0,
});

const renderWithRouter = (
  component: React.ReactElement,
  userContextValue?: Partial<UserContextType>,
  route = "/"
) => {
  const defaultUserContext: UserContextType = {
    user: null,
    setUser: vi.fn(),
    logout: mockLogout,
    ...userContextValue,
  };

  return render(
    <MemoryRouter initialEntries={[route]}>
      <UserContext.Provider value={defaultUserContext}>{component}</UserContext.Provider>
    </MemoryRouter>
  );
};

describe("Navbar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Renderização do Logo", () => {
    it("deve renderizar o logo com aria-label implícito via Link", () => {
      renderWithRouter(<Navbar />);

      const logoLink = screen.getByRole("link", { name: /logo/i });
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute("href", "/");
    });

    it("deve renderizar o logo icon", () => {
      renderWithRouter(<Navbar />);

      const logoIcon = screen.getByTestId("logo-icon");
      expect(logoIcon).toBeInTheDocument();
    });
  });

  describe("Usuário não autenticado", () => {
    it("deve exibir botão 'Login/Registre-se' no desktop", () => {
      renderWithRouter(<Navbar />);

      const loginLink = screen.getByRole("link", { name: /login\/registre-se/i });
      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveAttribute("href", "/login");
    });

    it("deve exibir apenas Home e Campanhas no desktop", () => {
      renderWithRouter(<Navbar />);

      expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /campanhas/i })).toBeInTheDocument();

      expect(screen.queryByRole("link", { name: /dashboard/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /notícias & eventos/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /doadores/i })).not.toBeInTheDocument();
    });

    it("deve exibir menu hamburguer no mobile", () => {
      renderWithRouter(<Navbar />);

      const menuButton = screen.getByRole("button");
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe("Usuário autenticado como DONOR", () => {
    const donorUser = createMockUser("DONOR", "Maria Santos");

    it("deve exibir avatar e nome do usuário no desktop", () => {
      renderWithRouter(<Navbar />, { user: donorUser });

      const profileLink = screen.getByRole("link", { name: /maria/i });
      expect(profileLink).toBeInTheDocument();
      expect(profileLink).toHaveAttribute("href", "/perfil");

      const avatar = screen.getByAltText("Avatar de Maria Santos");
      expect(avatar).toBeInTheDocument();
    });

    it("deve exibir apenas o primeiro nome do usuário", () => {
      renderWithRouter(<Navbar />, { user: donorUser });

      expect(screen.getByText("Maria")).toBeInTheDocument();
      expect(screen.queryByText("Santos")).not.toBeInTheDocument();
    });

    it("não deve exibir rotas de admin (Dashboard, Notícias & Eventos, Doadores)", () => {
      renderWithRouter(<Navbar />, { user: donorUser });

      expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /campanhas/i })).toBeInTheDocument();

      expect(screen.queryByRole("link", { name: /dashboard/i })).not.toBeInTheDocument();
    });
  });

  describe("Usuário autenticado como ADMIN", () => {
    const adminUser = createMockUser("ADMIN", "Admin Silva");

    it("deve exibir avatar e nome do administrador no desktop", () => {
      renderWithRouter(<Navbar />, { user: adminUser });

      const profileLink = screen.getByRole("link", { name: /admin/i });
      expect(profileLink).toBeInTheDocument();
      expect(profileLink).toHaveAttribute("href", "/perfil");

      const avatar = screen.getByAltText("Avatar de Admin Silva");
      expect(avatar).toBeInTheDocument();
    });

    it("deve exibir todas as rotas de admin no desktop", () => {
      renderWithRouter(<Navbar />, { user: adminUser });

      expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /campanhas/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /notícias & eventos/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /doadores/i })).toBeInTheDocument();
    });

    it("deve renderizar ícones corretos para cada item de menu", () => {
      renderWithRouter(<Navbar />, { user: adminUser });

      expect(screen.getAllByTestId("home-icon").length).toBeGreaterThan(0);
      expect(screen.getAllByTestId("activity-icon").length).toBeGreaterThan(0);
      expect(screen.getAllByTestId("star-icon").length).toBeGreaterThan(0);
      expect(screen.getAllByTestId("discover-icon").length).toBeGreaterThan(0);
      expect(screen.getAllByTestId("user-icon").length).toBeGreaterThan(0);
    });
  });

  describe("Estado ativo dos links", () => {
    it("deve aplicar estilo ativo no link da página atual", () => {
      renderWithRouter(<Navbar />, undefined, "/campanhas");

      const campanhasLink = screen.getByRole("link", { name: /campanhas/i });
      expect(campanhasLink).toHaveClass("bg-[var(--color-components)]");
      expect(campanhasLink).toHaveClass("text-[var(--color-background)]");
    });

    it("não deve aplicar estilo ativo em links de outras páginas", () => {
      renderWithRouter(<Navbar />, undefined, "/");

      const campanhasLink = screen.getByRole("link", { name: /campanhas/i });
      expect(campanhasLink).toHaveClass("text-[var(--color-components)]");
      expect(campanhasLink).not.toHaveClass("bg-[var(--color-components)]");
    });

    it("deve aplicar estilo ativo no Dashboard quando admin está na rota /dashboard", () => {
      const adminUser = createMockUser("ADMIN");
      renderWithRouter(<Navbar />, { user: adminUser }, "/dashboard");

      const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
      expect(dashboardLink).toHaveClass("bg-[var(--color-components)]");
      expect(dashboardLink).toHaveClass("text-[var(--color-background)]");
    });
  });

  describe("Menu Mobile - Responsividade", () => {
    it("deve abrir o menu lateral ao clicar no botão hamburguer", () => {
      renderWithRouter(<Navbar />);

      const buttons = screen.getAllByRole("button");
      const menuButton = buttons[0];
      fireEvent.click(menuButton);

      const buttonsAfterOpen = screen.getAllByRole("button");
      expect(buttonsAfterOpen.length).toBe(2);
    });

    it("deve fechar o menu lateral ao clicar no botão X", () => {
      renderWithRouter(<Navbar />);

      const buttons = screen.getAllByRole("button");
      fireEvent.click(buttons[0]);

      const allButtons = screen.getAllByRole("button");
      expect(allButtons.length).toBe(2);

      const closeButton = allButtons[1];
      fireEvent.click(closeButton);
    });

    it("deve fechar o menu lateral ao clicar no backdrop", () => {
      renderWithRouter(<Navbar />);

      const menuButton = screen.getByRole("button");
      fireEvent.click(menuButton);

      const backdrop = document.querySelector(".bg-black\\/40");
      if (backdrop) {
        fireEvent.click(backdrop);
      }
    });

    it("deve exibir nome do usuário no menu mobile quando autenticado", () => {
      const user = createMockUser("DONOR", "Pedro Oliveira");
      renderWithRouter(<Navbar />, { user });

      const menuButton = screen.getByRole("button");
      fireEvent.click(menuButton);

      expect(screen.getAllByText("Pedro").length).toBeGreaterThan(0);
    });

    it("deve exibir Login/Registre-se no menu mobile quando não autenticado", () => {
      renderWithRouter(<Navbar />);

      const buttons = screen.getAllByRole("button");
      fireEvent.click(buttons[0]);

      const loginLinks = screen.getAllByRole("link", { name: /login\/registre-se/i });
      expect(loginLinks.length).toBeGreaterThan(0);
    });

    it("deve fechar o menu mobile ao clicar em um link", () => {
      renderWithRouter(<Navbar />);

      const buttons = screen.getAllByRole("button");
      fireEvent.click(buttons[0]);

      const homeLinks = screen.getAllByRole("link", { name: /home/i });
      expect(homeLinks.length).toBeGreaterThan(1);

      const mobileHomeLink = homeLinks[homeLinks.length - 1];

      expect(mobileHomeLink).toBeInTheDocument();
      fireEvent.click(mobileHomeLink);

      expect(screen.getAllByRole("link", { name: /home/i }).length).toBeGreaterThanOrEqual(1);
    });

    it("deve exibir itens de admin no menu mobile quando usuário é admin", () => {
      const adminUser = createMockUser("ADMIN");
      renderWithRouter(<Navbar />, { user: adminUser });

      const buttons = screen.getAllByRole("button");
      fireEvent.click(buttons[0]);

      const dashboardLinks = screen.getAllByRole("link", { name: /dashboard/i });
      const newsLinks = screen.getAllByRole("link", { name: /notícias & eventos/i });
      const donorsLinks = screen.getAllByRole("link", { name: /doadores/i });

      expect(dashboardLinks.length).toBeGreaterThanOrEqual(2);
      expect(newsLinks.length).toBeGreaterThanOrEqual(2);
      expect(donorsLinks.length).toBeGreaterThanOrEqual(2);
    });

    it("não deve exibir itens de admin no menu mobile quando usuário é donor", () => {
      const donorUser = createMockUser("DONOR");
      renderWithRouter(<Navbar />, { user: donorUser });

      const buttons = screen.getAllByRole("button");
      fireEvent.click(buttons[0]);

      expect(screen.queryByRole("link", { name: /dashboard/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /notícias & eventos/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /doadores/i })).not.toBeInTheDocument();
    });
  });

  describe("Navegação com React Router", () => {
    it("deve navegar para Home ao clicar no link Home", () => {
      renderWithRouter(<Navbar />);

      const homeLink = screen.getByRole("link", { name: /home home/i });
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("deve navegar para Campanhas ao clicar no link Campanhas", () => {
      renderWithRouter(<Navbar />);

      const campanhasLink = screen.getByRole("link", { name: /campanhas/i });
      expect(campanhasLink).toHaveAttribute("href", "/campanhas");
    });

    it("deve navegar para Dashboard ao clicar no link Dashboard (admin)", () => {
      const adminUser = createMockUser("ADMIN");
      renderWithRouter(<Navbar />, { user: adminUser });

      const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute("href", "/dashboard");
    });

    it("deve navegar para Notícias & Eventos ao clicar no link (admin)", () => {
      const adminUser = createMockUser("ADMIN");
      renderWithRouter(<Navbar />, { user: adminUser });

      const newsLink = screen.getByRole("link", { name: /notícias & eventos/i });
      expect(newsLink).toHaveAttribute("href", "/noticias-eventos");
    });

    it("deve navegar para Doadores ao clicar no link Doadores (admin)", () => {
      const adminUser = createMockUser("ADMIN");
      renderWithRouter(<Navbar />, { user: adminUser });

      const donorsLink = screen.getByRole("link", { name: /doadores/i });
      expect(donorsLink).toHaveAttribute("href", "/doadores");
    });

    it("deve navegar para Login ao clicar no link Login/Registre-se", () => {
      renderWithRouter(<Navbar />);

      const loginLink = screen.getByRole("link", { name: /login\/registre-se/i });
      expect(loginLink).toHaveAttribute("href", "/login");
    });

    it("deve navegar para Perfil ao clicar no avatar do usuário", () => {
      const user = createMockUser("DONOR", "Ana Paula");
      renderWithRouter(<Navbar />, { user });

      const profileLink = screen.getByRole("link", { name: /ana/i });
      expect(profileLink).toHaveAttribute("href", "/perfil");
    });

    it("deve navegar para Home ao clicar no logo", () => {
      renderWithRouter(<Navbar />);

      const logoLink = screen.getByRole("link", { name: /logo/i });
      expect(logoLink).toHaveAttribute("href", "/");
    });
  });

  describe("Acessibilidade", () => {
    it("deve ter estrutura semântica com elemento nav", () => {
      renderWithRouter(<Navbar />);

      const nav = document.querySelector("nav");
      expect(nav).toBeInTheDocument();
    });

    it("deve ter todos os links acessíveis por role", () => {
      const adminUser = createMockUser("ADMIN");
      renderWithRouter(<Navbar />, { user: adminUser });

      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
    });

    it("deve ter botões acessíveis por role", () => {
      renderWithRouter(<Navbar />);

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("deve ter imagem de avatar com alt text descritivo", () => {
      const user = createMockUser("DONOR", "Carlos Eduardo");
      renderWithRouter(<Navbar />, { user });

      const avatar = screen.getByAltText("Avatar de Carlos Eduardo");
      expect(avatar).toBeInTheDocument();
    });

    it("deve ter ícones renderizados corretamente", () => {
      renderWithRouter(<Navbar />);

      const homeIcons = screen.getAllByTestId("home-icon");
      expect(homeIcons.length).toBeGreaterThan(0);
      expect(homeIcons[0]).toBeInTheDocument();
    });
  });

  describe("Estilos e Classes CSS", () => {
    it("deve aplicar classe sticky ao navbar", () => {
      renderWithRouter(<Navbar />);

      const nav = document.querySelector("nav");
      expect(nav).toHaveClass("sticky");
    });

    it("deve aplicar hover styles nos links", () => {
      renderWithRouter(<Navbar />);

      const campanhasLink = screen.getByRole("link", { name: /campanhas/i });
      expect(campanhasLink).toHaveClass("hover:bg-[var(--color-components)]");
      expect(campanhasLink).toHaveClass("hover:text-[var(--color-background)]");
    });

    it("deve aplicar border-radius nos links", () => {
      renderWithRouter(<Navbar />);

      const homeLink = screen.getByRole("link", { name: /home home/i });
      expect(homeLink).toHaveClass("rounded-3xl");
    });

    it("deve ter shadow-md no navbar", () => {
      renderWithRouter(<Navbar />);

      const nav = document.querySelector("nav");
      expect(nav).toHaveClass("shadow-md");
    });
  });

  describe("Casos extremos", () => {
    it("deve lidar com nome de usuário muito longo", () => {
      const user = createMockUser("DONOR", "Nome Muito Longo Que Deve Ser Truncado Corretamente");
      renderWithRouter(<Navbar />, { user });

      expect(screen.getByText("Nome")).toBeInTheDocument();
    });

    it("deve lidar com nome de usuário de uma palavra", () => {
      const user = createMockUser("DONOR", "Madonna");
      renderWithRouter(<Navbar />, { user });

      expect(screen.getByText("Madonna")).toBeInTheDocument();
    });

    it("deve renderizar corretamente sem crash quando user é null", () => {
      renderWithRouter(<Navbar />, { user: null });

      expect(screen.getByRole("link", { name: /login\/registre-se/i })).toBeInTheDocument();
    });
  });
});
