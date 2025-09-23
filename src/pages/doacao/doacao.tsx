import logoLogin from "@/assets/logo-pp-login.png";
import bgLogin from "@/assets/fundo-pp.png";
import FormContent from "./formContent";
import { FormActions } from "./formActions";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button";

type FormStep = "donation" | "postDonation";
type FormContent = {
  title: string;
  subTitle: string;
  content: React.ReactNode;
  actions: React.ReactNode;
};

export const Doacao = () => {
  const [formStep, setFormStep] = useState<FormStep>("donation");
  const formMapper: Record<FormStep, FormContent> = {
    donation: {
      title: "Doação",
      subTitle: "Preencha os dados abaixo para realizar sua doação.",
      content: <FormContent />,
      actions: <FormActions onConfirm={handleContinue} />,
    },
    postDonation: {
      title: "Doação realizada com sucesso!",
      subTitle:
        "Obrigado, saiba que doações como a sua fazem a diferença na vida de incontáveis jovens e crianças acolhidos pela fundação...",
      content: <p className="text-[var(--color-text-special-2)]">Todo dia, um novo futuro!</p>,
      actions: (
        <Link to="/">
          <Button className="w-full">Retornar ao início</Button>
        </Link>
      ),
    },
  };
  const formContentMap = formMapper[formStep];
  function handleContinue() {
    setFormStep("postDonation");
  }

  return (
    <div
      className="w-full flex items-center justify-center overflow-y-auto h-screen"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 57, 80, 0.6) 66.98%, rgba(0, 81, 114, 0.6) 100%), url(${bgLogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex items-center justify-center min-h-full px-9 py-4">
        <main
          className="
            w-full max-w-[400px]
            bg-[#D2D2D2E0] backdrop-blur
            shadow-2xl
            py-4 px-9 sm:py-6 sm:px-5
            rounded-xl
          "
          aria-label="Card de Login"
        >
          <div className="flex flex-col items-center gap-2 my-2">
            <img src={logoLogin} alt="Pão dos Pobres" className="h-8 sm:h-10" />
            <h1 className="text-2xl sm:text-3xl font-bold text-sky-900">{formContentMap.title}</h1>
            <p className="text-xs sm:text-sm text-sky-900/80 text-center font-bold">
              {formContentMap.subTitle}
            </p>
          </div>
          {formContentMap.content}
          <div className="mt-8">{formContentMap.actions}</div>
        </main>
      </div>
    </div>
  );
};
export default Doacao;
