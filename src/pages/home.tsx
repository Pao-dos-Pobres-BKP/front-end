<<<<<<< HEAD
import { Avatar } from "@/components/ui/avatar";
=======
import { Progress } from "../components/ui/progress";
>>>>>>> b7e9444fd06b6f9bd13982e7e007cc907e445310
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
<<<<<<< HEAD
        </Button>
    <Avatar imgUrl="https://github.com/arturbschultz.png" size="small"/>    
    <Avatar imgUrl="https://github.com/arturbschultz.png"/>    
    <Avatar imgUrl="https://github.com/arturbschultz.png" size="large"/>    
=======
      </Button>
      <Progress value={100} />
      <Progress value={75} variant="lightBlue" size="small" />
      <Progress value={50} variant="cian" size="medium" />
      <Progress value={25} />
>>>>>>> b7e9444fd06b6f9bd13982e7e007cc907e445310
    </div>
  );
};

export default Home;
