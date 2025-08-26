import bgLogin from "../assets/bg-login.png";

const Login = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 57, 80, 0.6) 66.98%, rgba(0, 81, 114, 0.6) 100%), url(${bgLogin})`,
        }}
      />
      {/* Conteúdo da página */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div className="text-white text-center">
          <h1 className="text-3xl font-semibold mb-4">Página de Login</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
