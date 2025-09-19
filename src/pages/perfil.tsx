import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import CampaignCard from "@/components/ui/campaignCard/campaignCard";
import Input from "@/components/ui/input";
import exemplo_foto_perfil from "@/assets/exemplo_foto_perfil.jpg";
import { EditSquare } from "react-iconly";

import { useState } from "react";
import EditUserModal from "@/components/ui/edit-user-modal";
import ConfirmLogoutModal from "@/components/ui/confirm-logout-modal";


export default function Perfil() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [dados, setDados] = useState({
    nome: "Fulano de Tal",
    nascimento: "12 de Agosto de 1971",
    genero: "Masculino",
    cpf: "123.456.789-00",
    telefone: "(51) 9 9999-8888",
    email: "fulanodetal@email.com.br"
  });

  //const campanhas: any[] = [];      // para testar quando não tiver campanhas apoiando.

  const campanhas = [
    {
      title: "Campanha de Santo Antônio",
      creatorName: "Fundação Pão dos Pobres Santo Antônio",
      raised: 81825.33,
      goal: 90000,
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: "Fundação Pão dos Pobres Santo Antônio",
      raised: 81825.33,
      goal: 90000,
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: "Fundação Pão dos Pobres Santo Antônio",
      raised: 81825.33,
      goal: 90000,
    },
    {
      title: "Campanha de Santo Antônio",
      creatorName: "Fundação Pão dos Pobres Santo Antônio",
      raised: 81825.33,
      goal: 90000,
    },

  ];

  const handleEditarConta = () => {
    setIsModalOpen(true);
  };

  const handleSalvarPerfil = (novosDados: any) => {
    setDados(novosDados);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#2F5361] font-inter">
      <Navbar />
      <div className="flex justify-center px-6 py-6">
        <div className="w-full max-w-6md bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between bg-white rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <img
                src={exemplo_foto_perfil}
                alt="Foto do usuário"
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div className="flex flex-col flex-1">
                <div className="h-7 flex items-center">
                  <h2 className="text-[27px] font-bold text-[#005172]">
                    {dados.nome}
                  </h2>
                </div>
                <div className="h-6 flex items-center">
                  <p className="text-xs font-inter text-[#005172]">
                    Membro desde 12 de Agosto de 2023
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="px-6 py-2 text-sm border rounded-xl text-[#005172] hover:bg-[#e6f3f5] transition-colors"
              >
                Sair da Conta
              </button>
              <button className="p-2 rounded-md bg-[#005172] text-white hover:bg-[#24434f] flex items-center justify-center"
                onClick={handleEditarConta}>
                <EditSquare size="medium" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-0.5/3 flex flex-col gap-4">
              <div className="bg-white rounded-lg p-6 flex-1 min-h-[420px]">

                <div className="flex flex-col space-y-10">

                  <div className="flex items-center gap-2">
                    <label className=" text-sm font-medium text-[#005172] text-left">
                      Data de Nascimento
                    </label>
                    <input
                      type="text"
                      value={dados.nascimento}
                      className={`w-60 px-3 py-2 border rounded-xl 
                        : "bg-white text-[#94A3B8] border-[#CBD5E1] cursor-not-allowed"
                        }`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className=" text-sm font-medium text-[#005172] text-left">
                      Gênero
                    </label>
                    <input
                      type="text"
                      value={dados.genero}
                      className={`w-60 px-3 py-2 border rounded-xl 
                        : "bg-white text-[#94A3B8] border-[#CBD5E1] cursor-not-allowed"
                        }`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className=" text-sm font-medium text-[#005172] text-left">
                      CPF
                    </label>
                    <input
                      type="text"
                      value={dados.cpf}
                      className={`w-60 px-3 py-2 border rounded-xl 
                        : "bg-white text-[#94A3B8] border-[#CBD5E1] cursor-not-allowed"
                        }`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className=" text-sm font-medium text-[#005172] text-left">
                      Telefone
                    </label>
                    <input
                      type="text"
                      value={dados.telefone}
                      className={`w-60 px-3 py-2 border rounded-xl 
                        : "bg-white text-[#94A3B8] border-[#CBD5E1] cursor-not-allowed"
                        }`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className=" text-sm font-medium text-[#005172] text-left">
                      E-mail
                    </label>
                    <input
                      type="text"
                      value={dados.email}
                      className={`w-60 px-3 py-2 border rounded-xl 
                        : "bg-white text-[#94A3B8] border-[#CBD5E1] cursor-not-allowed"
                        }`}
                    />
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-2">
                  <span className="text-sm text-[#005172] whitespace-nowrap">
                    Quanto doou até agora:
                  </span>
                  <Progress value={75} variant="blue" size="medium" className="flex-1" />
                  <span className="text-sm text-[#005172] whitespace-nowrap">
                    R$ 2.000,00
                  </span>
                </div>

              </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 items-start">
              <h3 className="text-sm font-semibold text-[#005172]">
                Campanhas que apoia
              </h3>

              {campanhas.length > 0 ? (
                campanhas.map((campanha, index) => (
                  <CampaignCard
                    key={index}
                    title={campanha.title}
                    creatorName={campanha.creatorName}
                    raised={campanha.raised}
                    goal={campanha.goal}
                    actionLabel="Acessar"
                    variant="compact"
                    situation="recurring"
                    className="border border-[#005172] rounded-lg text-sm p-3"
                  />
                ))
              ) : (
                <div className="w-full mx-auto py-8 rounded-lg bg-blue-100 text-[#005172] text-center font-medium border border-[#005172] rounded-lg">
                  Você ainda não apoia nenhuma campanha.
                </div>
              )}
            </div>
          </div>

          <hr className="border-t border-[#266D88CC] mx-50 my-8" />
          <h2 className="text-2xl font-bold text-[#005172] mt-2 mb-4">
            Histórico de Doações
          </h2>

          <div className="mt-2 bg-white rounded-lg p-6 min-h-[580px] flex flex-col">
            <div className="flex flex-col md:flex-row gap-3 items-center mb-6 w-full">
              <Input
                placeholder="Buscar..."
                fullWidth
              />

              <div className="relative">
                <label
                  htmlFor="filtro-doacoes"
                  className="absolute -top-5 left-0 text-xs text-white"
                >
                  Filtro
                </label>
                <select
                  id="filtro-doacoes"
                  className="appearance-none bg-[#F68537] hover:bg-orange-600 font-thin text-white py-2 pl-3 pr-12 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
                >
                  <option value="" disabled>
                    Selecione uma data
                  </option>
                  <option value="30">Últimos 30 dias</option>
                  <option value="60">Últimos 60 dias</option>
                  <option value="120">Últimos 120 dias</option>
                </select>
                <svg
                  className="w-4 h-4 text-white absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              <button className="px-4 py-2 rounded-lg bg-[#F68537] text-white font-thin hover:bg-orange-600 transition-colors">
                Pesquisar
              </button>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {campanhas.map((campanha, index) => (
                <CampaignCard
                  key={index}
                  title={campanha.title}
                  creatorName={campanha.creatorName}
                  raised={campanha.raised}
                  goal={campanha.goal}
                  actionLabel="Ver detalhes"
                  variant="compact"
                  situation="pending"
                  className="border border-[#005172] rounded-lg text-sm p-3"
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-6">
              <button className="px-3 py-1 border rounded-md text-[#005172] hover:bg-gray-100">1</button>
              <button className="px-3 py-1 border rounded-md text-[#005172] hover:bg-gray-100">2</button>
              <button className="px-3 py-1 border rounded-md text-[#005172] hover:bg-gray-100">3</button>
              <span className="px-2">...</span>
              <button className="px-3 py-1 border rounded-md text-[#005172] hover:bg-gray-100">10</button>
            </div>
          </div>
        </div>
      </div>

      <EditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSalvarPerfil}
        initialData={dados}
      />

      <ConfirmLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
      <Footer />
    </div>
  );
}
