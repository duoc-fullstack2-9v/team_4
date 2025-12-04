import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EditarProducto from '../../src/pages/EditarProducto';
import { AuthContext } from '../../src/context/AuthContext';
import axios from 'axios';

// Mock de axios
vi.mock('axios');

// Mock de react-router-dom para la navegación
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('EditarProducto Page', () => {
  const mockProduct = {
    id: 1,
    nombre: 'Pastel de Chocolate',
    precio: 25000,
    stock: 20,
  };

  // Usamos MemoryRouter para simular la ruta con un ID de producto
  const renderComponent = () => {
    return render(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <MemoryRouter initialEntries={['/editar/1']}>
          <Routes>
            <Route path="/editar/:id" element={<EditarProducto />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockProduct }); // Simulamos la carga inicial del producto
    window.alert = vi.fn();
  });

  it('debe cargar y mostrar los datos del producto en el formulario', async () => {
    renderComponent();

    // Esperamos a que los campos se rellenen con los datos del producto
    expect(await screen.findByDisplayValue('Pastel de Chocolate')).toBeInTheDocument();
    expect(screen.getByDisplayValue('25000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
  });

  it('debe llamar a la API para actualizar el producto y redirigir', async () => {
    axios.put.mockResolvedValue({}); // Simulamos una actualización exitosa
    renderComponent();

    // Esperamos a que el formulario se cargue
    const nombreInput = await screen.findByDisplayValue('Pastel de Chocolate');

    // Modificamos un campo
    fireEvent.change(nombreInput, { target: { name: 'nombre', value: 'Pastel de Chocolate Premium' } });

    // Enviamos el formulario
    fireEvent.click(screen.getByRole('button', { name: /actualizar/i }));

    // Verificamos que se llamó a la API de actualización con los datos correctos
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('/api/products/1', {
        nombre: 'Pastel de Chocolate Premium',
        precio: 25000,
        stock: 20,
        id: 1
      });
    });

    // Verificamos la alerta y la redirección
    expect(window.alert).toHaveBeenCalledWith('Producto actualizado correctamente');
    expect(mockedNavigate).toHaveBeenCalledWith('/adminProductos');
  });
});