import Navbar from "@/components/layout/navbar";
import type { ReactElement } from "react";
import exemplo_foto_perfil from "@/assets/exemplo_foto_perfil.jpg";
import { EditSquare } from "react-iconly";


export default function Perfil(): ReactElement {

  const handleSairDaConta = () => {
    alert("Sair da Conta clicado");
  };

  const handleEditarConta = () => {
    alert("Editar Conta clicado");
  };

  return (
    <div className="min-h-screen bg-[#2F5361] font-inter">
      <Navbar />
      <div className="flex justify-center px-6 py-6">
        <div className="w-full max-w-6md bg-white rounded-xl shadow-lg p-4">  
          <div className="flex items-center justify-between bg-white rounded-lg p-4 mb-6">
            <div className="flex items-start gap-4">
              <img
                src={exemplo_foto_perfil}
                alt="Foto do usuário"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex flex-col flex-1">
                <h2 className="text-xl font-bold text-[#005172] text-left whitespace-normal break-words">
                  Fulano de Tal
                </h2>
                <p className="text-sm text-[#005172]">
                  Membro desde 12 de Agosto de 2023
                </p>
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

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-100 flex flex-col gap-4">
              <div className="bg-blue-200 rounded-lg p-4 flex-1 min-h-[220px]">
                Dados do Usuário
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <div className="bg-yellow-200 rounded-lg p-4 flex-1 min-h-[320px]">
                Campanhas
              </div>
            </div>
          </div>

          <div className="mt-8 bg-purple-200 rounded-lg p-6 min-h-[580px]">
            Histórico de Doações
          </div>
        </div>
      </div>
    </div>
  );
}
