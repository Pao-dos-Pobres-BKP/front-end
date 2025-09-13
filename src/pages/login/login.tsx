import { useState } from "react";
import LoginContent from "./components/loginContent";
import PersonalFields from "./components/personalFields";
import AccessFields from "./components/accessFields";
import SuccessRegistration from "./components/successRegistration";
import LoginLayout from "./components/loginLayout";
import type { PersonalFormData } from "./components/shared/PersonalFormFields";
import type { AccessFormData } from "./components/shared/AccessFormFields";

type FormStep = "login" | "personal" | "access" | "success";

type RegistrationData = PersonalFormData & AccessFormData;

export default function Login() {
  const [currentStep, setCurrentStep] = useState<FormStep>("login");
  const [registrationData, setRegistrationData] = useState<Partial<RegistrationData>>({});

  const handleNextFromPersonal = (data: PersonalFormData) => {
    setRegistrationData((prev) => ({ ...prev, ...data }));
    setCurrentStep("access");
  };

  const handleRegister = (data: AccessFormData) => {
    const finalData = { ...registrationData, ...data };
    console.log("Dados finais para cadastro:", finalData);
    // CHAMADA DA API VAI AQUIIIIIIIII!!!
    setCurrentStep("success");
  };

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
            onNext={handleNextFromPersonal}
          />
        );
      case "access":
        return (
          <AccessFields onBack={() => setCurrentStep("personal")} onRegister={handleRegister} />
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
