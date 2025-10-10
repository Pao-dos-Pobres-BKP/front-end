import { Progress } from "@/components/ui/progress";
import CampaignCard from "@/components/ui/campaignCard/campaignCard";
import Input from "@/components/ui/input";
import exemplo_foto_perfil from "@/assets/exemplo_foto_perfil.jpg";
import { EditSquare } from "react-iconly";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useState } from "react";
import EditUserModal from "@/components/ui/edit-user-modal";
import ConfirmLogoutModal from "@/components/ui/confirm-logout-modal";


export default function Perfil() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const [dados, setDados] = useState({
    nome: "Fulano de Tal",
    nascimento: "12 de Agosto de 1971",
    genero: "Masculino",
    cpf: "123.456.789-00",
    telefone: "(51) 9 9999-8888",
    email: "fulanodetal@email.com.br",
    totalDonated: 2000,
    percentageAchieved: 75,
    foto: exemplo_foto_perfil,
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

  type SituationType = "approved" | "pending" | "rejected" | "recurring";
  const campanhasHistorico: {
    title: string;
    creatorName: string;
    raised: number;
    goal: number;
    situation: SituationType;
  }[] = [
      { title: "Campanha de Santo Antônio", creatorName: " Fundação Pão dos Pobres Santo Antônio", raised: 81825.33, goal: 90000, situation: "recurring" },
      { title: "Campanha de Santo Antônio", creatorName: " Fundação Pão dos Pobres Santo Antônio", raised: 5000, goal: 10000, situation: "recurring" },
      { title: "Campanha de Santo Antônio", creatorName: " Fundação Pão dos Pobres Santo Antônio", raised: 15000, goal: 20000, situation: "approved" },
      { title: "Campanha de Santo Antônio", creatorName: " Fundação Pão dos Pobres Santo Antônio", raised: 2500, goal: 3000, situation: "approved" },
      { title: "Campanha de Santo Antônio", creatorName: " Fundação Pão dos Pobres Santo Antônio", raised: 7000, goal: 10000, situation: "approved" },
      { title: "Campanha de Santo Antônio", creatorName: " Fundação Pão dos Pobres Santo Antônio", raised: 9000, goal: 15000, situation: "approved" },
      { title: "Campanha de Santo Antônio", creatorName: " Fundação Pão dos Pobres Santo Antônio", raised: 1200, goal: 2000, situation: "approved" },
      { title: "Campanha de Santo Antônio", creatorName: " Fundação Pão dos Pobres Santo Antônio", raised: 4500, goal: 5000, situation: "approved" },
      { title: "Campanha de Santo Antônio", creatorName: " Fundação Pão dos Pobres Santo Antônio", raised: 800, goal: 1000, situation: "approved" },
    ];

  const totalPages = Math.ceil(campanhasHistorico.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = campanhasHistorico.slice(indexOfFirstCard, indexOfLastCard);

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
      <div className="flex justify-center px-6 py-6">
        <div className="w-full max-w-6md bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-lg gap-4 p-4 mb-6">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={dados.foto || "https://via.placeholder.com/80"}
                alt="Foto do usuário"
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div className="flex flex-col flex-1">
                <div className="flex items-center">
                  <h2 className="text-[22px] sm:text-[27px] font-bold text-[#005172]">
                    {dados.nome}
                  </h2>
                </div>
                <div className="flex items-center mt-2">
                  <p className="text-xs sm:text-sm font-inter text-[#005172]">
                    Membro desde 12 de Agosto de 2023
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex-1 sm:flex-none px-6 py-2 text-sm border rounded-xl text-[#005172] hover:bg-[#e6f3f5] transition-colors"
              >
                Sair da Conta
              </button>
              <button
                className="p-2 rounded-md bg-[#005172] text-white hover:bg-[#24434f] flex items-center justify-center"
                onClick={handleEditarConta}
              >
                <EditSquare size="medium" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-0.5/3 flex flex-col gap-4">
              <div className="bg-white rounded-lg p-6 flex-1 min-h-[420px]">
                <div className="flex flex-col space-y-10">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">
                      Data de Nascimento:
                    </label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.nascimento}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">
                      Gênero:
                    </label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.genero}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">
                      CPF:
                    </label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.cpf}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">
                      Telefone:
                    </label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.telefone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[#005172] text-left">
                      E-mail:
                    </label>
                    <span className="w-60 py-2 pl-0 pr-3 text-sm text-[#94A3B8] text-left">
                      {dados.email}
                    </span>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-2">
                  <span className="text-sm text-[#005172] whitespace-nowrap">
                    Quanto doou até agora:
                  </span>
                  <Progress value={dados.percentageAchieved} variant="blue" size="medium" className="flex-1" />
                  <span className="text-sm text-[#005172] whitespace-nowrap">
                    {dados.totalDonated.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
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

              <div className="relative w-full md:w-1/3">
                <select
                  id="filtro-doacoes"
                  className="w-full appearance-none bg-[#F68537] text-white py-2 pl-3 pr-10 rounded-md shadow-sm focus:outline-none"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <button className="w-full md:w-auto px-4 py-2 rounded-lg bg-[#F68537] text-white hover:bg-orange-600">
                Pesquisar
              </button>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {currentCards.map((campanha, index) => (
                <CampaignCard
                  key={index}
                  title={campanha.title}
                  creatorName={campanha.creatorName}
                  raised={campanha.raised}
                  goal={campanha.goal}
                  variant="historic"
                  situation={campanha.situation}
                  lastDonation={80}
                  className="border border-[#005172] rounded-lg text-sm p-3"
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={currentPage === 1 ? undefined : () => setCurrentPage(currentPage - 1)}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      Anterior
                    </PaginationPrevious>
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={currentPage === totalPages ? undefined : () => setCurrentPage(currentPage + 1)}
                      className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      Próximo
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
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
    </div>
  );
}
