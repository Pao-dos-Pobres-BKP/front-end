import Button from "../components/ui/button";

const Home = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold mb-4">Welcome</h1>
      <p className="mb-6">Test</p>
      <div className="flex items-center gap-3">
        <Button onClick={() => console.log("first")}>First</Button>
        <Button variant="ghost" onClick={() => console.log("second")}>
          Second
        </Button>
      </div>
    </div>
  );
};

export default Home;
