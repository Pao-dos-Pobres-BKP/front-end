import "./App.css";
import Perfil from "./pages/perfil";
import Login from "./pages/login/login";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
