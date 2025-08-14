# Pão dos Pobres Frontend

# Documentação do Projeto

Este projeto utiliza React, TypeScript, Vite e Tailwind CSS. Abaixo está uma explicação de cada pasta e arquivo principal, além de instruções para rodar e desenvolver o projeto.

## Estrutura de Pastas e Arquivos

- **build/**: Arquivos gerados após o build do projeto (CSS, HTML, JS, imagens). Não edite manualmente.
- **public/**: Arquivos estáticos públicos, como imagens. São servidos diretamente pelo servidor.
- **src/**: Código-fonte principal do projeto.
  - **App.tsx**: Componente principal da aplicação.
  - **App.css / index.css**: Estilos globais e do app.
  - **main.tsx**: Ponto de entrada da aplicação React.
  - **assets/**: Imagens e ícones usados no projeto.
  - **components/**: Componentes reutilizáveis.
    - **layout/**: Componentes de layout, como Navbar e AppShell.
    - **ui/**: Componentes de interface, como botões.
  - **constant/**: Constantes globais, como rotas.
  - **hooks/**: Hooks personalizados do React.
  - **pages/**: Páginas da aplicação (ex: Home, NotFound).
  - **services/**: Serviços para chamadas de API.
  - **skeletons/**: Componentes de loading/skeleton.
  - **types/**: Tipos TypeScript usados no projeto.
  - **utils/**: Funções utilitárias.
- **index.html**: HTML principal usado pelo Vite.
- **package.json**: Gerenciamento de dependências e scripts do projeto.
- **README.md**: Documentação do projeto.
- **tailwind.config.js**: Configuração do Tailwind CSS.
- **tsconfig.json / tsconfig.app.json / tsconfig.node.json**: Configurações do TypeScript.
- **vite.config.ts**: Configuração do Vite.
- **eslint.config.js**: Configuração do ESLint.

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Rode o projeto em modo desenvolvimento:
   ```bash
   npm run dev
   ```
3. Para build de produção:
   ```bash
   npm run build
   ```

## Observações
- Edite apenas arquivos dentro de `src/` para modificar o funcionamento da aplicação.
- Os arquivos de configuração (`*.config.js`, `tsconfig*.json`, etc.) normalmente não precisam ser alterados, exceto para ajustes avançados.
- Para adicionar novas páginas, crie arquivos em `src/pages/` e configure as rotas em `src/constant/routes.ts`.
- Componentes reutilizáveis devem ser criados em `src/components/ui/`.
- Para estilos, utilize as classes do Tailwind CSS.

---

Se tiver dúvidas, consulte a documentação oficial das ferramentas utilizadas:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
