import { useState } from "react";
import LoginContent from "./components/loginContent";
import PersonalFields from "./components/personalFields";
import AccessFields from "./components/accessFields";
import SuccessRegistration from "./components/successRegistration";
import LoginLayout from "./components/loginLayout";

type FormStep = "login" | "personal" | "access" | "success";

export default function Login() {
  const [currentStep, setCurrentStep] = useState<FormStep>("login");

  const getHeaderConfig = () => {
    switch (currentStep) {
      case "login":
        return {
          headerText: "Login",
          headerSubtext: "Preencha os dados abaixo para acessar sua conta.",
          FooterHref: "/doacao",
        };
      case "personal":
        return {
          headerText: "Cadastro",
          headerSubtext: "Preencha seus dados pessoais para continuar.",
          FooterHref: "/login",
        };
      case "access":
        return {
          headerText: "Cadastro",
          headerSubtext: "Crie suas credenciais de acesso.",
          FooterHref: "/login",
        };
      case "success":
        return {
          headerText: "Sucesso!",
          headerSubtext: "Sua conta foi criada com sucesso.",
        };
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "login":
        return <LoginContent onRegisterClick={() => setCurrentStep("personal")} />;
      case "personal":
        return (
          <PersonalFields
            onCancel={() => setCurrentStep("login")}
            onNext={() => setCurrentStep("access")}
          />
        );
      case "access":
        return (
          <AccessFields
            onBack={() => setCurrentStep("personal")}
            onRegister={() => setCurrentStep("success")}
          />
        );
      case "success":
        return <SuccessRegistration onBackToLogin={() => setCurrentStep("login")} />;
    }
  };

  return (
    <LoginLayout {...getHeaderConfig()}>
      <div className="relative overflow-hidden">
        <div
          key={currentStep}
          className="animate-in slide-in-from-right-5 fade-in duration-300 ease-in-out"
        >
          {renderCurrentStep()}
        </div>
      </div>
    </LoginLayout>
  );
}
