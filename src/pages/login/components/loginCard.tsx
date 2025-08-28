import logoHorizontal from "../../../assets/logo-horizontal.png";

function LoginCard({children}: {children: React.ReactNode}) {
  return (
    <div
      className="bg-[#D2D2D2E0] rounded-lg shadow-lg opacity-100 
                    py-6 px-5 gap-2.5
                    md:px-3
                    flex items-center justify-center flex-col"
    >
      <img src={logoHorizontal} alt="Pão dos Pobres Logo" className="w-75 h-auto" />
      {children}
    </div>
  );
};

export default LoginCard;
