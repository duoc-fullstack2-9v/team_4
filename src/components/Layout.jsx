import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <Nav />
      <Outlet /> {/* Aquí se renderizarán las páginas de las rutas */}
      <Footer />
    </>
  );
}

export default Layout;