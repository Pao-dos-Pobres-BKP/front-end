import Button from "../components/ui/button";
import Link from "../components/ui/link";
import { InputWithLabel } from "../components/ui/input-with-label";
import { useState } from "react";
import logoLogin from "@/assets/logo-login-pp.svg";
import Divider from "@/components/ui/divider";
import bgLogin from "@/assets/fundo-pp.png";
import type { LoginInput } from "@/schemas/auth";
import { loginSchema } from "@/schemas/auth";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});
  const handleChange = (field: keyof LoginInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação Zod
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof LoginInput] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    // Login
    setIsLoading(true);
  };
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
            <form noValidate onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-3">
                <InputWithLabel
                  id="email"
                  labelText="E-mail"
                  placeholder="Digite seu e-mail"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                />

                <InputWithLabel
                  id="senha"
                  labelText="Senha"
                  placeholder="Digite sua senha"
                  type="password"
                  value={form.password}
                  onChange={handleChange("password")}
                  error={errors.password}
                  helperText={
                    <Link href="/esqueci-senha" variant="blue">
                      Esqueceu sua senha?
                    </Link>
                  }
                />
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <Button type="submit" variant="confirm" className="w-full">
                  {isLoading ? "Carregando..." : "Entrar"}
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
