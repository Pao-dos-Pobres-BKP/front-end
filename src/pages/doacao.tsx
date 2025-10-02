import { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import CurrencyInput from "../components/ui/currencyInput";
import Button from "../components/ui/button";
import StepHeader from "../components/ui/stepHeader";
import { Select } from "../components/ui/select";
import { mockCampaigns } from "../mocks/campaigns";
import PaymentMethodSelector from "../components/ui/paymentMethodSelector";
import PixPaymentDisplay from "../components/ui/pixPaymentDisplay";
import CreditCardForm from "../components/ui/creditCardForm";
import BoletoPaymentDisplay from "../components/ui/boletoPaymentDisplay";

const Doacao = () => {
  const [currentStep, setCurrentStep] = useState("item-1");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [donationValue, setDonationValue] = useState("0");
  const [step3Value, setStep3Value] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<
    "Pendente" | "Confirmado" | "Negado" | "Cancelado"
  >("Pendente");
  const [paymentId] = useState<string | null>(null);
  // const [paymentId, setPaymentId] = useState<string | null>(null);
  const [timer, setTimer] = useState(600);
  const [isCampaignConfirmed, setIsCampaignConfirmed] = useState(false);
  const [isValueConfirmed, setIsValueConfirmed] = useState(false);
  const [isStep3Confirmed, setIsStep3Confirmed] = useState(false);
  const [isStep4Confirmed, setIsStep4Confirmed] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentSubStep, setPaymentSubStep] = useState<"form" | "pending">("form");
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [valueError, setValueError] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    if (currentStep === "item-4" && step3Value === "Pix" && !paymentId && !isCreatingPayment) {
      console.log("Iniciando pagamento Pix automaticamente...");
      createPaymentInApi();
    }
  }, [currentStep, step3Value, paymentId, isCreatingPayment]);

  useEffect(() => {
    setPaymentSubStep("form");
    setPaymentStatus("Pendente");
    setTimer(600);
  }, [step3Value]);

  useEffect(() => {
    const isTimerActive =
      paymentStatus === "Pendente" &&
      (step3Value === "Pix" ||
        step3Value === "Boleto" ||
        (step3Value === "Crédito" && paymentSubStep === "pending"));

    if (isTimerActive) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setPaymentStatus("Cancelado");
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step3Value, paymentSubStep, paymentStatus]);

  useEffect(() => {
    /*
    if (!paymentId) return;

    // Conexão de eventos com backend
    const eventSource = new EventSource(`http://localhost:3001/api/payment-events/${paymentId}`);

    console.log(`Escutando eventos para o pagamento: ${paymentId}`);

    // Define o que fazer quando uma mensagem chegar
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Evento de pagamento recebido:", data);

      if (data.status) {
        setPaymentStatus(data.status);
        setIsStep4Confirmed(true);
        setCurrentStep("");

        // 3. Fecha a conexão depois de receber a atualização final
        eventSource.close();
        setPaymentId(null);
      }
    };

    // Lidar com erros de conexão
    eventSource.onerror = (err) => {
      console.error("Erro na conexão EventSource:", err);
      setPaymentStatus("Negado");
      eventSource.close();
      setPaymentId(null);
    };

    // 4. Garante que a conexão será fechada se o componente for desmontado
    return () => {
      console.log("Fechando conexão de eventos.");
      eventSource.close();
    };
    */
  }, [paymentId]);

  // ===== SIMULAÇÃO DE PAGAMENTO =====

  const simulatePaymentConfirmation = useCallback(() => {
    console.log("Simulando processamento do pagamento...");
    if (step3Value === "Crédito") setPaymentSubStep("pending");

    setTimeout(() => {
      console.log("Simulação concluída: Pagamento Confirmado");
      setPaymentStatus("Confirmado");
      setIsStep4Confirmed(true);
      setCurrentStep("");
    }, 3000);
  }, [step3Value]);

  useEffect(() => {
    if (
      currentStep === "item-4" &&
      step3Value === "Pix" &&
      !isCreatingPayment &&
      !isStep4Confirmed
    ) {
      setIsCreatingPayment(true);
      simulatePaymentConfirmation();
    }
  }, [currentStep, step3Value, isCreatingPayment, isStep4Confirmed, simulatePaymentConfirmation]);

  const handleConfirmCampaign = () => {
    if (selectedCampaign) {
      setIsCampaignConfirmed(true);
      setCurrentStep("item-2");
    }
  };

  const handleDirectDonation = () => {
    setSelectedCampaign("pao-dos-pobres");
    setIsCampaignConfirmed(true);
    setCurrentStep("item-2");
  };

  const handleConfirmValue = () => {
    const valueInCents = parseInt(donationValue, 10);
    if (valueInCents < 500) {
      setValueError("O valor mínimo para doação é de R$ 5,00.");
      return;
    }
    setValueError("");
    setIsValueConfirmed(true);
    setCurrentStep("item-3");
  };

  const handleDonationValueChange = (value: string) => {
    if (valueError) {
      setValueError("");
    }
    setDonationValue(value);
  };

  const handleConfirmStep3 = () => {
    if (step3Value) {
      setIsStep3Confirmed(true);
      setCurrentStep("item-4");
    }
  };

  const handleConfirmStep4 = () => {
    setPaymentStatus("Confirmado");
    setIsStep4Confirmed(true);
    setCurrentStep("");
  };

  const handleConfirmCardDetails = async () => {
    simulatePaymentConfirmation();
    // setPaymentSubStep("pending");
    // await createPaymentInApi("Crédito");
  };

  const createPaymentInApi = async () => {
    /*
  const createPaymentInApi = async (method: string) => {
    setIsCreatingPayment(true);
    try {
      const response = await fetch("http://localhost:3001/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseInt(donationValue, 10) / 100,
          method: method,
        }),
      });
      const data = await response.json();
      setPaymentId(data.internalId);
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
      setPaymentStatus("Negado");
    } finally {
      setIsCreatingPayment(false);
    }
  };
    */
  };

  const shouldShowPaymentTag =
    isStep3Confirmed &&
    (step3Value === "Pix" ||
      step3Value === "Boleto" ||
      (step3Value === "Crédito" && paymentSubStep === "pending"));

  const campaignOptions = mockCampaigns.map((campaign) => ({
    value: campaign.id,
    label: campaign.name,
  }));
  const mockPixCode =
    "00020126360014br.gov.bcb.pix0114+55119999999995204000053039865802BR5913NOME COMPLETO6009SAO PAULO62070503***6304E2E1";
  const mockQrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example";
  const mockBoletoCode = "34191.79001 01043.510047 91020.101014 1 98470000123456";
  const mockBarcodeUrl =
    "https://barcode.tec-it.com/barcode.ashx?data=" +
    mockBoletoCode.replace(/\D/g, "") +
    "&code=Code128";

  const showTimer =
    (step3Value === "Pix" ||
      step3Value === "Boleto" ||
      (step3Value === "Crédito" && paymentSubStep === "pending")) &&
    paymentStatus === "Pendente";

  return (
    <div className="relative min-h-screen w-full bg-black flex items-center justify-center">
      <img
        src="/src/assets/quadra-pp.jpg"
        alt="Imagem de fundo de uma quadra de esportes"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-blue-800/30 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 container py-10 flex flex-col items-center px-6">
        <div className="container py-10 w-full max-w-lg mx-auto flex flex-col gap-6 items-center">
          <Accordion
            type="single"
            className="w-full"
            value={currentStep}
            onValueChange={setCurrentStep}
          >
            {/* Passo 1 */}
            <AccordionItem
              value="item-1"
              className={`mb-4 rounded-md relative ${isSelectOpen ? "overflow-visible" : "overflow-hidden"}`}
            >
              <AccordionTrigger variant="secondary" size="large">
                <StepHeader
                  stepNumber="1"
                  title="Seleção de Campanha"
                  isActive={isCampaignConfirmed}
                  value={
                    isCampaignConfirmed
                      ? campaignOptions.find((c) => c.value === selectedCampaign)?.label
                      : undefined
                  }
                  valueType="text"
                />
              </AccordionTrigger>
              <AccordionContent variant="secondary">
                <div className="flex flex-col gap-4">
                  <Select
                    options={campaignOptions}
                    value={selectedCampaign}
                    onChange={setSelectedCampaign}
                    onOpenChange={setIsSelectOpen}
                    placeholder="Escolha uma campanha para doar"
                    label="Campanha"
                    fullWidth
                  />
                  <Button
                    variant="confirm"
                    size="small"
                    onClick={handleConfirmCampaign}
                    className="self-end"
                    disabled={!selectedCampaign}
                  >
                    Confirmar Campanha
                  </Button>
                  <div className="text-center my-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Caso queira apenas fazer uma doação à "Fundação O Pão dos Pobres" sem vínculo
                      a alguma campanha:
                    </p>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={handleDirectDonation}
                      className="w-auto px-4"
                    >
                      Doar para Pão dos Pobres
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Passo 2 */}
            <AccordionItem
              value="item-2"
              className="mb-4 rounded-md overflow-hidden"
              disabled={!isCampaignConfirmed}
            >
              <AccordionTrigger variant="secondary" size="large" disabled={!isCampaignConfirmed}>
                <StepHeader
                  stepNumber="2"
                  title="Valor"
                  isActive={isValueConfirmed}
                  value={
                    isValueConfirmed ? (parseInt(donationValue, 10) / 100).toString() : undefined
                  }
                  valueType="currency"
                />
              </AccordionTrigger>
              <AccordionContent variant="secondary">
                <div className="flex flex-col gap-4">
                  <CurrencyInput
                    value={donationValue}
                    onValueChange={handleDonationValueChange}
                    error={valueError}
                  />
                  <Button
                    variant="confirm"
                    size="small"
                    onClick={handleConfirmValue}
                    className="self-end"
                    disabled={parseInt(donationValue, 10) <= 0}
                  >
                    Confirmar
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Passo 3 */}
            <AccordionItem
              value="item-3"
              className="mb-4 rounded-md overflow-hidden"
              disabled={!isValueConfirmed}
            >
              <AccordionTrigger variant="secondary" size="large" disabled={!isValueConfirmed}>
                <StepHeader
                  stepNumber="3"
                  title="Método de Pagamento"
                  isActive={isStep3Confirmed}
                  value={isStep3Confirmed ? step3Value : undefined}
                  valueType="text"
                />
              </AccordionTrigger>
              <AccordionContent variant="secondary">
                <div className="flex flex-col gap-4">
                  <PaymentMethodSelector selectedValue={step3Value} onSelect={setStep3Value} />
                  <Button
                    variant="confirm"
                    size="small"
                    onClick={handleConfirmStep3}
                    className="self-end"
                    disabled={!step3Value}
                  >
                    Confirmar
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Passo 4 */}
            <AccordionItem
              value="item-4"
              className="mb-4 rounded-md overflow-hidden"
              disabled={!isStep3Confirmed}
            >
              <AccordionTrigger variant="secondary" size="large" disabled={!isStep3Confirmed}>
                <StepHeader
                  stepNumber="4"
                  title="Pagamento"
                  isActive={isStep4Confirmed}
                  value={shouldShowPaymentTag ? paymentStatus : undefined}
                  valueType="status"
                />
              </AccordionTrigger>
              <AccordionContent variant="secondary">
                <div className="flex flex-col gap-4">
                  {step3Value === "Pix" && (
                    <PixPaymentDisplay pixCode={mockPixCode} qrCodeImageUrl={mockQrCodeUrl} />
                  )}
                  {step3Value === "Boleto" && (
                    <BoletoPaymentDisplay
                      boletoCode={mockBoletoCode}
                      barcodeImageUrl={mockBarcodeUrl}
                    />
                  )}
                  {step3Value === "Crédito" && (
                    <CreditCardForm
                      disabled={paymentSubStep === "pending"}
                      cardNumber={cardNumber}
                      setCardNumber={setCardNumber}
                      cardName={cardName}
                      setCardName={setCardName}
                      expiryDate={expiryDate}
                      setExpiryDate={setExpiryDate}
                      cvv={cvv}
                      setCvv={setCvv}
                      onSubmit={handleConfirmCardDetails}
                    />
                  )}

                  {showTimer && (
                    <div className="text-center p-2 rounded-lg bg-yellow-50 border border-yellow-300">
                      <p className="font-semibold text-yellow-700">Aguardando pagamento...</p>
                      <p className="text-lg font-mono text-yellow-800">
                        {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                      </p>
                    </div>
                  )}
                  {step3Value === "Boleto" && (
                    <Button
                      variant="confirm"
                      size="small"
                      onClick={handleConfirmStep4}
                      className="self-end"
                      disabled={paymentStatus !== "Pendente"}
                    >
                      Confirmar Pagamento
                    </Button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            variant="primary"
            size="large"
            onClick={() => (window.location.href = "/")}
            disabled={paymentStatus !== "Confirmado"}
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Doacao;
