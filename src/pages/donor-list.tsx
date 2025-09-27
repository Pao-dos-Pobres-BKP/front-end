import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@/components/ui/accordion";
import { SearchBar } from "@/components/layout/search-bar";
import Button from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Link from "@/components/ui/link";
import { Label } from "@/components/ui/label";
import { Popover } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@/components/ui/popover";
import Input from "@/components/ui/input";

const DonorList = () => {
  return (
    <div className="w-full px-4 sm:px-8 py-10 flex flex-col gap-4 bg-[#2F5361]">
      <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
        <div className="flex-1 w-full">
          <SearchBar />
        </div>
        <Button variant="quinary" size="extraSmall">
          Pesquisar
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="usuario" className="w-full">
          <AccordionTrigger
            size="large"
            variant="secondary"
            className="flex items-center gap-3 sm:p-2 min-h-[88px] sm:min-h-[56px] overflow-hidden"
          >
            <Avatar imgUrl="../assets/User.svg" />

            <div className="flex flex-col sm:flex-row sm:justify-between flex-1 min-w-0">
              <div className="flex flex-col min-w-0">
                <Label className="font-semibold mt-1 leading-tight whitespace-normal">
                  Fulano de Tal
                </Label>
                <Label className="font-semibold text-sm break-words whitespace-normal">
                  user.email@pucrs.br
                </Label>
              </div>
              <div className="flex flex-col justify-center mt-2 sm:mt-0">
                <Label className="font-semibold">+50</Label>
                <Label className="text-[var(--color-text-special-2)] text-sm break-words">
                  para Campanha Santo Antônio
                </Label>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent variant="secondary" className="w-full bg-gray-200">
            <div className="flex flex-col sm:flex-row sm-gap-4 w-full justify-between">
              <Label className="font-semibold mb-2">Quanto doou:</Label>
              <Progress value={80} variant="blue" size="large" />
              <Label>R$ 2.000</Label>
            </div>
            <br />
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
              <Label className="font-semibold mb-2">Campanhas:</Label>
              <div>
                <Label className="font-color-">Campanha de Santo Antônio</Label>
                <br />
                <Label>Campanha de Aniversário de 130 anos do Pão</Label>
                <br />
                <Label>Campanha de Natal Solidário</Label>
                <br />
                <Link href="">Ver mais</Link>
              </div>
            </div>
            <br />
            <Label className="font-semibold mb-2">Membro desde:</Label>
            <Label>20/05/2025</Label>
            <div className="flex w-full justify-end mt-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tertiary" size="small">
                    Adicionar Dados
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="center" className="w-100 bg-white">
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold">Adicione dados a um usuário</span>
                    <span>
                      Adicione dados de doações realizadas por um usuário conforme seu comprovante
                      de pagamento.
                    </span>
                    <div className="justify-left flex items-center gap-2">
                      <Label>Valor:</Label>
                      <Input placeholder="R$ 00,00" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4 w-full gap-2">
                      <Button size="small" variant="tertiary">
                        Cancelar
                      </Button>
                      <Button size="small" variant="primary">
                        Continuar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="usuario" className="w-full">
          <AccordionTrigger
            size="large"
            variant="secondary"
            className="flex items-center gap-3 sm:p-2 min-h-[88px] sm:min-h-[56px] overflow-hidden"
          >
            <Avatar imgUrl="../assets/User.svg" />

            <div className="flex flex-col sm:flex-row sm:justify-between flex-1 min-w-0">
              <div className="flex flex-col min-w-0">
                <Label className="font-semibold mt-1 leading-tight whitespace-normal">
                  Fulano de Tal
                </Label>
                <Label className="font-semibold text-sm break-words whitespace-normal">
                  user.email@pucrs.br
                </Label>
              </div>
              <div className="flex flex-col justify-center mt-2 sm:mt-0">
                <Label className="font-semibold">+50</Label>
                <Label className="text-[var(--color-text-special-2)] text-sm break-words">
                  para Campanha Santo Antônio
                </Label>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent variant="secondary" className="w-full bg-gray-200">
            <div className="flex flex-col sm:flex-row sm-gap-4 w-full justify-between">
              <Label className="font-semibold mb-2">Quanto doou:</Label>
              <Progress value={80} variant="blue" size="large" />
              <Label>R$ 2.000</Label>
            </div>
            <br />
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
              <Label className="font-semibold mb-2">Campanhas:</Label>
              <div>
                <Label className="font-color-">Campanha de Santo Antônio</Label>
                <br />
                <Label>Campanha de Aniversário de 130 anos do Pão</Label>
                <br />
                <Label>Campanha de Natal Solidário</Label>
                <br />
                <Link href="">Ver mais</Link>
              </div>
            </div>
            <br />
            <Label className="font-semibold mb-2">Membro desde:</Label>
            <Label>20/05/2025</Label>
            <div className="flex w-full justify-end mt-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tertiary" size="small">
                    Adicionar Dados
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="center" className="w-100 bg-white">
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold">Adicione dados a um usuário</span>
                    <span>
                      Adicione dados de doações realizadas por um usuário conforme seu comprovante
                      de pagamento.
                    </span>
                    <div className="justify-left flex items-center gap-2">
                      <Label>Valor:</Label>
                      <Input placeholder="R$ 00,00" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4 w-full gap-2">
                      <Button size="small" variant="tertiary">
                        Cancelar
                      </Button>
                      <Button size="small" variant="primary">
                        Continuar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="usuario" className="w-full">
          <AccordionTrigger
            size="large"
            variant="secondary"
            className="flex items-center gap-3 sm:p-2 min-h-[88px] sm:min-h-[56px] overflow-hidden"
          >
            <Avatar imgUrl="../assets/User.svg" />

            <div className="flex flex-col sm:flex-row sm:justify-between flex-1 min-w-0">
              <div className="flex flex-col min-w-0">
                <Label className="font-semibold mt-1 leading-tight whitespace-normal">
                  Fulano de Tal
                </Label>
                <Label className="font-semibold text-sm break-words whitespace-normal">
                  user.email@pucrs.br
                </Label>
              </div>
              <div className="flex flex-col justify-center mt-2 sm:mt-0">
                <Label className="font-semibold">+50</Label>
                <Label className="text-[var(--color-text-special-2)] text-sm break-words">
                  para Campanha Santo Antônio
                </Label>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent variant="secondary" className="w-full bg-gray-200">
            <div className="flex flex-col sm:flex-row sm-gap-4 w-full justify-between">
              <Label className="font-semibold mb-2">Quanto doou:</Label>
              <Progress value={80} variant="blue" size="large" />
              <Label>R$ 2.000</Label>
            </div>
            <br />
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
              <Label className="font-semibold mb-2">Campanhas:</Label>
              <div>
                <Label className="font-color-">Campanha de Santo Antônio</Label>
                <br />
                <Label>Campanha de Aniversário de 130 anos do Pão</Label>
                <br />
                <Label>Campanha de Natal Solidário</Label>
                <br />
                <Link href="">Ver mais</Link>
              </div>
            </div>
            <br />
            <Label className="font-semibold mb-2">Membro desde:</Label>
            <Label>20/05/2025</Label>
            <div className="flex w-full justify-end mt-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tertiary" size="small">
                    Adicionar Dados
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="center" className="w-100 bg-white">
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold">Adicione dados a um usuário</span>
                    <span>
                      Adicione dados de doações realizadas por um usuário conforme seu comprovante
                      de pagamento.
                    </span>
                    <div className="justify-left flex items-center gap-2">
                      <Label>Valor:</Label>
                      <Input placeholder="R$ 00,00" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4 w-full gap-2">
                      <Button size="small" variant="tertiary">
                        Cancelar
                      </Button>
                      <Button size="small" variant="primary">
                        Continuar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="usuario" className="w-full">
          <AccordionTrigger
            size="large"
            variant="secondary"
            className="flex items-center gap-3 sm:p-2 min-h-[88px] sm:min-h-[56px] overflow-hidden"
          >
            <Avatar imgUrl="../assets/User.svg" />

            <div className="flex flex-col sm:flex-row sm:justify-between flex-1 min-w-0">
              <div className="flex flex-col min-w-0">
                <Label className="font-semibold mt-1 leading-tight whitespace-normal">
                  Fulano de Tal
                </Label>
                <Label className="font-semibold text-sm break-words whitespace-normal">
                  user.email@pucrs.br
                </Label>
              </div>
              <div className="flex flex-col justify-center mt-2 sm:mt-0">
                <Label className="font-semibold">+50</Label>
                <Label className="text-[var(--color-text-special-2)] text-sm break-words">
                  para Campanha Santo Antônio
                </Label>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent variant="secondary" className="w-full bg-gray-200">
            <div className="flex flex-col sm:flex-row sm-gap-4 w-full justify-between">
              <Label className="font-semibold mb-2">Quanto doou:</Label>
              <Progress value={80} variant="blue" size="large" />
              <Label>R$ 2.000</Label>
            </div>
            <br />
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
              <Label className="font-semibold mb-2">Campanhas:</Label>
              <div>
                <Label className="font-color-">Campanha de Santo Antônio</Label>
                <br />
                <Label>Campanha de Aniversário de 130 anos do Pão</Label>
                <br />
                <Label>Campanha de Natal Solidário</Label>
                <br />
                <Link href="">Ver mais</Link>
              </div>
            </div>
            <br />
            <Label className="font-semibold mb-2">Membro desde:</Label>
            <Label>20/05/2025</Label>
            <div className="flex w-full justify-end mt-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tertiary" size="small">
                    Adicionar Dados
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="center" className="w-100 bg-white">
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold">Adicione dados a um usuário</span>
                    <span>
                      Adicione dados de doações realizadas por um usuário conforme seu comprovante
                      de pagamento.
                    </span>
                    <div className="justify-left flex items-center gap-2">
                      <Label>Valor:</Label>
                      <Input placeholder="R$ 00,00" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4 w-full gap-2">
                      <Button size="small" variant="tertiary">
                        Cancelar
                      </Button>
                      <Button size="small" variant="primary">
                        Continuar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="usuario" className="w-full">
          <AccordionTrigger
            size="large"
            variant="secondary"
            className="flex items-center gap-3 sm:p-2 min-h-[88px] sm:min-h-[56px] overflow-hidden"
          >
            <Avatar imgUrl="../assets/User.svg" />

            <div className="flex flex-col sm:flex-row sm:justify-between flex-1 min-w-0">
              <div className="flex flex-col min-w-0">
                <Label className="font-semibold mt-1 leading-tight whitespace-normal">
                  Fulano de Tal
                </Label>
                <Label className="font-semibold text-sm break-words whitespace-normal">
                  user.email@pucrs.br
                </Label>
              </div>
              <div className="flex flex-col justify-center mt-2 sm:mt-0">
                <Label className="font-semibold">+50</Label>
                <Label className="text-[var(--color-text-special-2)] text-sm break-words">
                  para Campanha Santo Antônio
                </Label>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent variant="secondary" className="w-full bg-gray-200">
            <div className="flex flex-col sm:flex-row sm-gap-4 w-full justify-between">
              <Label className="font-semibold mb-2">Quanto doou:</Label>
              <Progress value={80} variant="blue" size="large" />
              <Label>R$ 2.000</Label>
            </div>
            <br />
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
              <Label className="font-semibold mb-2">Campanhas:</Label>
              <div>
                <Label className="font-color-">Campanha de Santo Antônio</Label>
                <br />
                <Label>Campanha de Aniversário de 130 anos do Pão</Label>
                <br />
                <Label>Campanha de Natal Solidário</Label>
                <br />
                <Link href="">Ver mais</Link>
              </div>
            </div>
            <br />
            <Label className="font-semibold mb-2">Membro desde:</Label>
            <Label>20/05/2025</Label>
            <div className="flex w-full justify-end mt-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tertiary" size="small">
                    Adicionar Dados
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="center" className="w-100 bg-white">
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold">Adicione dados a um usuário</span>
                    <span>
                      Adicione dados de doações realizadas por um usuário conforme seu comprovante
                      de pagamento.
                    </span>
                    <div className="justify-left flex items-center gap-2">
                      <Label>Valor:</Label>
                      <Input placeholder="R$ 00,00" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4 w-full gap-2">
                      <Button size="small" variant="tertiary">
                        Cancelar
                      </Button>
                      <Button size="small" variant="primary">
                        Continuar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="usuario" className="w-full">
          <AccordionTrigger
            size="large"
            variant="secondary"
            className="flex items-center gap-3 sm:p-2 min-h-[88px] sm:min-h-[56px] overflow-hidden"
          >
            <Avatar imgUrl="../assets/User.svg" />

            <div className="flex flex-col sm:flex-row sm:justify-between flex-1 min-w-0">
              <div className="flex flex-col min-w-0">
                <Label className="font-semibold mt-1 leading-tight whitespace-normal">
                  Fulano de Tal
                </Label>
                <Label className="font-semibold text-sm break-words whitespace-normal">
                  user.email@pucrs.br
                </Label>
              </div>
              <div className="flex flex-col justify-center mt-2 sm:mt-0">
                <Label className="font-semibold">+50</Label>
                <Label className="text-[var(--color-text-special-2)] text-sm break-words">
                  para Campanha Santo Antônio
                </Label>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent variant="secondary" className="w-full bg-gray-200">
            <div className="flex flex-col sm:flex-row sm-gap-4 w-full justify-between">
              <Label className="font-semibold mb-2">Quanto doou:</Label>
              <Progress value={80} variant="blue" size="large" />
              <Label>R$ 2.000</Label>
            </div>
            <br />
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
              <Label className="font-semibold mb-2">Campanhas:</Label>
              <div>
                <Label className="font-color-">Campanha de Santo Antônio</Label>
                <br />
                <Label>Campanha de Aniversário de 130 anos do Pão</Label>
                <br />
                <Label>Campanha de Natal Solidário</Label>
                <br />
                <Link href="">Ver mais</Link>
              </div>
            </div>
            <br />
            <Label className="font-semibold mb-2">Membro desde:</Label>
            <Label>20/05/2025</Label>
            <div className="flex w-full justify-end mt-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tertiary" size="small">
                    Adicionar Dados
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="center" className="w-100 bg-white">
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold">Adicione dados a um usuário</span>
                    <span>
                      Adicione dados de doações realizadas por um usuário conforme seu comprovante
                      de pagamento.
                    </span>
                    <div className="justify-left flex items-center gap-2">
                      <Label>Valor:</Label>
                      <Input placeholder="R$ 00,00" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4 w-full gap-2">
                      <Button size="small" variant="tertiary">
                        Cancelar
                      </Button>
                      <Button size="small" variant="primary">
                        Continuar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DonorList;
