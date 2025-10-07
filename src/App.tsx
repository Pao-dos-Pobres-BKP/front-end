import "./App.css";
import Navigation from "./constant";
import { Toaster } from "sonner";

function App() {
    return (
    <>
      <Toaster richColors position="top-center" />
      <Navigation />
    </>
  );
}

export default App;
