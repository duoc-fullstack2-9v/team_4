import { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Login from './pages/Login.jsx'
import Registro from "./pages/Registro.jsx"
import AdminUsuarios from "./pages/AdminUsuarios.jsx"; 
import AdminProductos from "./pages/AdminProductos.jsx"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn}></Home>}></Route>
        <Route path="/productos" element={<Productos></Productos>}></Route>
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />}></Route>
        <Route path="/login" element={<Login onLogin={handleLoginSuccess}/>}></Route>
        <Route path="/registro" element={<Registro />}></Route>
        <Route path="/adminUsuarios" element={<AdminUsuarios />} />
        <Route path="/adminProductos" element={<AdminProductos />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;
