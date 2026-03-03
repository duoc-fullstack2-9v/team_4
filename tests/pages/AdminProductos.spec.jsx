import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdminProductos from '../../src/pages/AdminProductos';
import { AuthContext } from '../../src/context/AuthContext';
import { fetchProducts, deleteProduct } from '../../src/services/productsApi';

// Mock de las APIs
vi.mock('../../src/services/productsApi');

// Mock de react-router-dom
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockedNavigate,
}));

describe('AdminProductos Page', () => {
  const mockProducts = [
    { id: 1, nombre: 'Torta de Chocolate', precio: 15000, stock: 10 },
    { id: 2, nombre: 'Pie de Limón', precio: 12000, stock: 5 },
  ];

  const renderComponent = () => {
    return render(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <BrowserRouter>
          <AdminProductos />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    fetchProducts.mockResolvedValue(mockProducts);
    window.confirm = vi.fn(() => true); // Mock de window.confirm para aceptar siempre
  });

  it('debe renderizar la tabla con productos', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Torta de Chocolate')).toBeInTheDocument();
      expect(screen.getByText('Pie de Limón')).toBeInTheDocument();
    });
  });

  it('debe llamar a navigate cuando se hace clic en "Agregar Nuevo Producto"', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Torta de Chocolate')).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: /agregar nuevo producto/i });
    fireEvent.click(addButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/agregarProducto');
  });

  it('debe llamar a navigate para editar un producto', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Torta de Chocolate')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByRole('button', { name: /editar/i });
    fireEvent.click(editButtons[0]);

    expect(mockedNavigate).toHaveBeenCalledWith('/editarProducto/1');
  });

  it('debe llamar a deleteProduct al eliminar un producto', async () => {
    deleteProduct.mockResolvedValue({});
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Torta de Chocolate')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => expect(deleteProduct).toHaveBeenCalledWith(1));
  });
});