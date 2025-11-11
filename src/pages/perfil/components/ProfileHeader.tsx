import { Setting } from "react-iconly";

interface ProfileHeaderProps {
  photo?: string;
  fullname?: string;
  email?: string;
  isAdmin: boolean;
  isViewingAnotherProfile: boolean;
  onEditarConta: () => void;
  onOpenCreateAdmin: () => void;
  onLogout: () => void;
}

export function ProfileHeader({
  photo,
  fullname,
  email,
  isAdmin,
  isViewingAnotherProfile,
  onEditarConta,
  onOpenCreateAdmin,
  onLogout,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-lg gap-4 p-4 lg:p-0 mb-6 lg:mb-8">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={photo || "https://via.placeholder.com/80"}
          alt="Foto do usuário"
          className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
        />
        <div className="flex flex-col flex-1">
          <div className="flex items-center">
            <h2 className="text-[22px] sm:text-[27px] font-bold text-[#005172]">
              {fullname}
            </h2>
          </div>
          <div className="flex items-center mt-2">
            <p className="text-xs sm:text-sm font-inter text-[#005172]">
              {email}
            </p>
          </div>
        </div>
      </div>

      {!isViewingAnotherProfile && (
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {isAdmin && (
            <button
              onClick={onOpenCreateAdmin}
              className="flex-1 sm:flex-none px-6 py-2 text-sm border rounded-xl bg-[#005172] text-white hover:bg-[#24434f] transition-colors"
            >
              Criar administrador
            </button>
          )}
          <button
            onClick={onLogout}
            className="flex-1 sm:flex-none px-6 py-2 text-sm border rounded-xl text-[#005172] hover:bg-[#e6f3f5] transition-colors"
          >
            Sair da Conta
          </button>
          <button
            className="p-2 rounded-md bg-[#005172] text-white hover:bg-[#24434f] flex items-center justify-center"
            onClick={onEditarConta}
            title="Configurações do perfil"
          >
            <Setting set="bold" size="medium" />
          </button>
        </div>
      )}
    </div>
  );
}

