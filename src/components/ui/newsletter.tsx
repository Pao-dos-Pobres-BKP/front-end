import { z } from "zod";
import { useState } from "react";
import Checkbox from "../layout/checkbox";
import Button from "./button";
import Input from "./input";
import { Modal } from "../layout/modal";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  isChecked: z.boolean({ message: "Aceite os termos e condições" }),
});

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSubmit() {
    const result = newsletterSchema.safeParse({ email, isChecked });

    if (!result.success) {
      setErrorMessage(result.error.issues[0].message);
      return;
    }

    setErrorMessage("");
    setIsModalOpen(true);
    setEmail("");
    setIsChecked(false);
  }

  return (
    <div className="p-6 flex flex-col gap-6 w-full bg-[#CCE0E6] items-start">
      <h3 className="uppercase text-[32px] leading-[110%] font-bold">Fique por dentro do futuro</h3>
      <p className="text-center max-w-[1312px] mx-auto font-bold md:leading-[150%]">
        A newsletter do Pão dos Pobres é um canal de conexão entre você e nossas ações. Nela,
        compartilhamos histórias de transformação, resultados de impacto, campanhas em andamento e
        formas de participar. Assine e acompanhe de perto como sua ajuda faz a diferença na vida de
        crianças, adolescentes e jovens em situação de vulnerabilidade.
      </p>

      <div className="flex gap-4 w-full">
        <div className="w-full ">
          <div className="flex w-full gap-2 items-center mb-6">
            <Input
              placeholder="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <Button
              size="extraSmall"
              disabled={!email || !isChecked}
              onClick={handleSubmit}
              variant="quinary"
              className="whitespace-nowrap"
            >
              Inscrever-se
            </Button>
          </div>
          <div className="w-fit">
            <Checkbox
              label="Aceito os termos e condições"
              id="newsletter"
              onChange={() => setIsChecked((prev) => !prev)}
              checked={isChecked}
            />
          </div>
          {errorMessage && (
            <div className="w-full flex mt-2">
              <span className="text-red-500 text-sm text-left">{errorMessage}</span>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Newsletter assinada!"
        footer={
          <>
            <Button variant="tertiary" size="extraSmall" onClick={() => setIsModalOpen(false)}>
              Fechar
            </Button>
          </>
        }
        onOpenChange={setIsModalOpen}
        open={isModalOpen}
        message="Agora você receberá e-mails recorrentes com as nossas novidades!"
      />
    </div>
  );
};
