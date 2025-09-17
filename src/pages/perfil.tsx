import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import exemplo_foto_perfil from "@/assets/exemplo_foto_perfil.jpg";
import { EditSquare } from "react-iconly";

import { useState } from "react";
import EditUserModal from "@/components/ui/edit-user-modal";



export default function Perfil() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dados, setDados] = useState({
    nome: "Fulano de Tal",
    nascimento: "12 de Agosto de 1971",
    genero: "Masculino",
    cpf: "123.456.789-00",
    telefone: "(51) 9 9999-8888",
    email: "fulanodetal@email.com.br"
  });

  const handleSairDaConta = () => {
    alert("Sair da Conta clicado");
  };

  const handleEditarConta = () => {
    setIsModalOpen(true);
  };

  const handleSalvarPerfil = (novosDados: any) => {
    setDados(novosDados);
    console.log("Dados salvos:", novosDados);
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
                onClick={handleSairDaConta}
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
                      value= {dados.nascimento}
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

            {/*  <CampaignCard
                variant="compact"
                title="Campanha de Santo Antônio"
                raised={81825.33}
                goal={90000}
                creatorName="Fundação Pão dos Pobres Santo Antônio"
                situation="approved"
                donorName=""
                donorEmail=""
                memberSince=""
                campaigns={[]}
                onAction={() => alert("Remover apoio")}
                className="border border-[#005172] rounded-lg text-sm p-3"
              />

              <CampaignCard
                variant="compact"
                title="Campanha de Santo Antônio"
                raised={81825.33}
                goal={90000}
                creatorName="Fundação Pão dos Pobres Santo Antônio"
                situation="approved"
                donorName=""
                donorEmail=""
                memberSince=""
                campaigns={[]}
                onAction={() => alert("Remover apoio")}
                className="border border-[#005172] rounded-lg text-sm p-3"
              />

              <CampaignCard
                variant="compact"
                title="Campanha de Santo Antônio"
                raised={81825.33}
                goal={90000}
                creatorName="Fundação Pão dos Pobres Santo Antônio"
                situation="approved"
                donorName=""
                donorEmail=""
                memberSince=""
                campaigns={[]}
                onAction={() => alert("Remover apoio")}
                className="border border-[#005172] rounded-lg text-sm p-3"
              />

              <CampaignCard
                variant="compact"
                title="Campanha de Santo Antônio"
                raised={81825.33}
                goal={90000}
                creatorName="Fundação Pão dos Pobres Santo Antônio"
                situation="approved"
                donorName=""
                donorEmail=""
                memberSince=""
                campaigns={[]}
                onAction={() => alert("Remover apoio")}
                className="border border-[#005172] rounded-lg text-sm p-3"
              /> */}
            </div>
          </div>

          <hr className="border-t border-[#266D88CC] mx-50 my-8" />
          
          <div className="mt-2 bg-purple-200 rounded-lg p-4 min-h-[580px]">
            Histórico de Doações
          </div>
        </div>
      </div>
      
      <EditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSalvarPerfil}
        initialData={dados}
      />
      <Footer />
    </div>
  );
}
