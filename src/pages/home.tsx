import { Avatar } from "@/components/ui/avatar";
import Button from "../components/ui/button";

const Home = () => {
  return (
    <div className="container py-10 flex flex-col gap-4 ">
      <Button variant="primary" size="small" className="">
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
    <Avatar imgUrl="https://github.com/arturbschultz.png" size="small"/>    
    <Avatar imgUrl="https://github.com/arturbschultz.png"/>    
    <Avatar imgUrl="https://github.com/arturbschultz.png" size="large"/>    
    </div>
  );
};

export default Home;
