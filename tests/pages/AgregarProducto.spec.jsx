import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AgregarProducto from '../../src/pages/AgregarProducto';
import { AuthContext } from '../../src/context/AuthContext';
import { createProduct } from '../../src/services/productsApi';

// Mock de la API de productos
vi.mock('../../src/services/productsApi'); // Se mockea el módulo completo

// Mock de react-router-dom para la navegación
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockedNavigate,
}));

describe('AgregarProducto Page', () => {
  
  const renderComponent = () => {
    return render(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <BrowserRouter>
          <AgregarProducto />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn(); // Mock de window.alert para evitar popups
  });

  it('debe renderizar el formulario para agregar un producto', () => {
    renderComponent();
    
    expect(screen.getByRole('heading', { name: /agregar producto/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/stock/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url de la imagen/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear producto/i })).toBeInTheDocument();
  });

  it('debe llamar a la API para agregar un producto y redirigir al enviar el formulario', async () => {
    createProduct.mockResolvedValue({ id: 100, nombre: 'Nuevo Pastel' }); // Simulamos una respuesta exitosa
    renderComponent();

    // Rellenamos el formulario
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Nuevo Pastel' } });
    fireEvent.change(screen.getByLabelText(/descripción/i), { target: { value: 'Un pastel delicioso' } });
    fireEvent.change(screen.getByLabelText(/precio/i), { target: { value: 20000 } });
    fireEvent.change(screen.getByLabelText(/stock/i), { target: { value: 15 } });
    fireEvent.change(screen.getByLabelText(/url de la imagen/i), { target: { value: '/img/nuevo-pastel.jpg' } });

    // Enviamos el formulario
    fireEvent.click(screen.getByRole('button', { name: /crear producto/i }));

    // Verificamos que se llamó a la API con los datos correctos
    await waitFor(() => {
      expect(createProduct).toHaveBeenCalledWith({
        nombre: 'Nuevo Pastel',
        descripcion: 'Un pastel delicioso',
        precio: "20000",
        stock: "15",
        imagen: '/img/nuevo-pastel.jpg',
      });
    });

    // Verificamos la alerta y la redirección
    expect(window.alert).toHaveBeenCalledWith('Producto creado correctamente.');
    expect(mockedNavigate).toHaveBeenCalledWith('/adminProductos');
  });
});