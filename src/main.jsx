import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Login from './pages/Login.jsx'
import Registro from "./pages/Registro.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home></Home>}></Route>
        <Route path = "/productos" element={<Productos></Productos>}></Route>
        <Route path = "/home" element = {<Home/>}></Route>
        <Route path = "/login" element = {<Login/>}></Route>
                <Route path = "/registro" element = {<Registro/>}></Route>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
