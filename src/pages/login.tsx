// pages/Login.tsx
import Button from "../components/ui/button";
import Link from "../components/ui/link";
import { InputWithLabel } from "../components/ui/input-with-label";

import logoLogin from "@/assets/logo-login-pp.svg";
import Divider from "@/components/ui/divider";
import bgLogin from "@/assets/fundo-pp.png";

export default function Login() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 57, 80, 0.6) 66.98%, rgba(0, 81, 114, 0.6) 100%), url(${bgLogin})`,
        }}
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <main
          className="
          w-full max-w-[560px]
          rounded-2xl bg-white/90 backdrop-blur
          shadow-2xl
          p-6 sm:p-8
        "
          aria-label="Card de Login"
        >
          <div className="flex flex-col items-center gap-2">
            <img src={logoLogin} alt="Pão dos Pobres" className="h-10 sm:h-12" />
            <h1 className="text-3xl sm:text-4xl font-bold text-sky-900">Login</h1>
            <p className="text-sm sm:text-base text-sky-900/80 text-center font-bold">
              Preencha os dados abaixo para acessar sua conta.
            </p>
          </div>

          <div className="mt-6 mx-auto w-full max-w-[420px] text-center">
            <form noValidate className="space-y-4">
              <div className="flex flex-col gap-3">
                <InputWithLabel
                  id="email"
                  labelText="E-mail"
                  placeholder="Digite seu e-mail"
                  type="email"
                />

                <InputWithLabel
                  id="senha"
                  labelText="Senha"
                  placeholder="Digite sua senha"
                  type="password"
                  helperText={
                    <Link href="/esqueci-senha" variant="blue">
                      Esqueceu sua senha?
                    </Link>
                  }
                />
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <Button type="button" variant="confirm" className="w-full">
                  Entrar
                </Button>

                <Button type="button" variant="secondary" className="w-full">
                  Entrar com o Google
                </Button>

                <Divider text="ou" variant="secondary" className="mt-4" />

                <Button
                  type="button"
                  variant="primary"
                  data-testid="btn-cadastrar"
                  className="w-full"
                >
                  Cadastre-se
                </Button>

                <Link href="/doacao" className="w-full text-center text-xs">
                  Fazer doação anônima
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
