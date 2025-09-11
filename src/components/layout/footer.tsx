import { Link } from "react-router-dom";

export function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="bg-[#CCDFE5] px-6 py-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 mb-4">
        <div className="min-h-[120px]">
          <Link to="/">
            <img width={178} src="src/assets/Logo.svg" />
          </Link>
        </div>
        <div className="min-h-[120px] text-left flex flex-col gap-6">
          <strong className="">Endereço:</strong>
          <p className="font-semibold">
            Rua da República, 801
            <br />
            Cidade Baixa
            <br />
            Porto Alegre / RS
            <br />
            CEP 90050-321
          </p>
        </div>
        <div className="min-h-[120px] text-left flex flex-col gap-6">
          <strong className="">Contatos:</strong>
          <p className="font-semibold">
            de Segunda à Sexta das 8h às 12h
            <br />
            e das 13h às 17h20min.
            <br />
            <a href="tel:555134336900">(51) 3433-6900</a> |{" "}
            <a href="tel:555134336902">(51) 3433-6902</a>
            <br />
            <a href="email:relacaoinstitucional@paodospobres.com.br">
              relacaoinstitucional@paodospobres.com.br
            </a>
          </p>
        </div>
        <div className="min-h-[120px] text-left flex flex-col">
          <strong className="">Envie seu currículo:</strong>
          <a href="#" className="underline font-semibold">
            Acesse aqui
          </a>
          <p className="mt-6 font-semibold">
            <br />
            Seja um voluntário
            <br />
            <a href="email:voluntarios@paodospobres.com.br">voluntarios@paodospobres.com.br</a>
          </p>
        </div>
      </div>
      <p className="font-semibold">Copyright &copy; {year} - Pão dos Pobres</p>
    </div>
  );
}
