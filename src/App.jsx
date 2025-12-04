import { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Login from './pages/Login.jsx'
import Registro from "./pages/Registro.jsx"
import AdminUsuarios from "./pages/AdminUsuarios.jsx";
import AdminProductos from "./pages/AdminProductos.jsx";
import AgregarProducto from "./pages/AgregarProducto.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn}></Home>}></Route>
          <Route path="/productos" element={<Productos></Productos>}></Route>
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />}></Route>
          <Route path="/login" element={<Login onLogin={handleLoginSuccess} />}></Route>
          <Route path="/registro" element={<Registro />}></Route>
          <Route path="/adminUsuarios" element={<AdminUsuarios />}></Route>
          <Route path="/adminProductos" element={<AdminProductos />}></Route>
          <Route path="/agregarProducto" element={<AgregarProducto />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
