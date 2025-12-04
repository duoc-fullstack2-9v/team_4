import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import HeroContent from '../../src/components/HeroContent';

// Mock del CSS Module
vi.mock("../../src/styles/Index.module.css", () => ({
  default: {
    contenedor_cuadrado: "contenedor_cuadrado",
    cuadrado_principal: "cuadrado_principal",
    primera_mitad: "primera_mitad",
    btn: "btn",
  },
}));

// Mock de la imagen
vi.mock("../../src/assets/ded249ac27d6056cd3d951830b0cbdf1.jpg", () => ({
  default: "mock-pasteleria.jpg",
}));

describe('<HeroContent />', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <HeroContent />
      </MemoryRouter>
    );
  };

  it('debe renderizar el título, el párrafo y el botón "Ver Productos"', () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: /pasteleria mil sabores/i })).toBeInTheDocument();
    expect(screen.getByText(/somos una pasteleria que ofrece experiencias dulces/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver productos/i })).toHaveAttribute('href', '/productos');
  });

  it('debe renderizar la imagen con el alt y src correctos', () => {
    renderComponent();
    const image = screen.getByAltText('Pasteleria');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mock-pasteleria.jpg');
  });
});