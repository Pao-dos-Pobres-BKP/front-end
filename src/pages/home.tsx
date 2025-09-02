import Button from "../components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const Home = () => {
  return (
    <div className="container py-10 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Button variant="primary" size="small">
          Salvar
        </Button>
        <Button variant="secondary" size="medium">
          Salvar
        </Button>
        <Button variant="destructive" size="large">
          Salvar
        </Button>
        <Button variant="confirm" size="large">
          Salvar
        </Button>
        <Button variant="primary" desactive size="large">
          Salvar
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger variant="primary" size="large">Fulano de tal</AccordionTrigger>
          <AccordionContent>
            Editar dados
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger variant="primary" size="large" >Beltrano de tal</AccordionTrigger>
          <AccordionContent>
            Editar dados
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger variant="primary" size="large">Ciclano de tal</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <span>Editar dados</span>
              <span>Editar informações</span>
              <span>Editar cadastro</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

            <Accordion type="single" collapsible className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger variant="secondary" size="medium">Fulano de tal</AccordionTrigger>
          <AccordionContent variant="secondary">
            Editar dados
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger variant="secondary" size="medium" >Beltrano de tal</AccordionTrigger>
          <AccordionContent variant="secondary">
            Editar dados
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger variant="secondary" size="medium">Ciclano de tal</AccordionTrigger>
          <AccordionContent variant="secondary">
            <div className="flex flex-col gap-2">
              <span>Editar dados</span>
              <span>Editar informações</span>
              <span>Editar cadastro</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Home;