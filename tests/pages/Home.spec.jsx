import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../../src/pages/Home';
import { fetchProducts } from '../../src/services/productsApi';

// Mock de la API de productos
vi.mock('../../src/services/productsApi');

// Mock de los componentes hijos para aislarlos de la prueba
vi.mock('../../src/components/Nav', () => ({ default: () => <div>Nav Mock</div> }));
vi.mock('../../src/components/Main', () => ({ default: ({ showHero, productos }) => (
  <div>
    <h1>Main Mock</h1>
    <div data-testid="product-list">
      {productos.map(p => <div key={p.id}>{p.nombre}</div>)}
    </div>
  </div>
 )}));
vi.mock('../../src/components/Footer', () => ({ default: () => <div>Footer Mock</div> }));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe mostrar el mensaje de carga inicialmente', () => {
    fetchProducts.mockReturnValue(new Promise(() => {})); // Promesa pendiente
    render(<BrowserRouter><Home /></BrowserRouter>);
    expect(screen.getByText(/cargando productos.../i)).toBeInTheDocument();
  });

  it('debe mostrar un mensaje de error si la carga de productos falla', async () => {
    const errorMessage = 'No se pudieron cargar los productos.';
    fetchProducts.mockRejectedValue(new Error(errorMessage));
    render(<BrowserRouter><Home /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('debe renderizar los productos cuando la carga es exitosa', async () => {
    const mockProducts = [
      { id: 1, nombre: 'Torta de Chocolate' },
      { id: 2, nombre: 'Torta de Vainilla' },
    ];
    fetchProducts.mockResolvedValue(mockProducts);

    render(<BrowserRouter><Home /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.queryByText(/cargando productos.../i)).not.toBeInTheDocument();
      expect(screen.getByText('Torta de Chocolate')).toBeInTheDocument();
      expect(screen.getByText('Torta de Vainilla')).toBeInTheDocument();
    });
  });
});