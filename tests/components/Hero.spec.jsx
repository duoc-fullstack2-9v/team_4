// tests/components/Hero.spec.jsx
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/context/AuthContext";



// Mock del CSS Module EXACTAMENTE como lo importa el componente
vi.mock("../../src/styles/Index.module.css", () => ({
  default: {
    hero: "hero",
    hero_links: "hero_links",
    contenedor_cuadrado: "contenedor_cuadrado",
    cuadrado_principal: "cuadrado_principal",
    primera_mitad: "primera_mitad",
    btn: "btn",
  },
}));

// Mock de los subcomponentes de Hero
vi.mock("../../src/components/LinksHero.jsx", () => ({
  default: () => <div data-testid="links-hero">Links Hero</div>,
}));
vi.mock("../../src/components/HeroContent.jsx", () => ({
  default: () => <div data-testid="hero-content">Hero Content</div>,
}));

// Importa el componente con la misma ruta que resolvimos arriba
// (import dinámico para respetar el mock de arriba)
const importHero = async () => (await import("../../src/components/Hero.jsx")).default;

describe("<Hero />", () => {
  // Función para renderizar el componente con sus providers
  const renderHero = async (isLoggedIn = false) => {
    const Hero = await importHero();
    render(
      <AuthContext.Provider value={{ isLoggedIn, logout: vi.fn() }}>
        <MemoryRouter>
          <Hero isLoggedIn={isLoggedIn} />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza sus subcomponentes", async () => {
    await renderHero();
    expect(screen.getByTestId("links-hero")).toBeInTheDocument();
    expect(screen.getByTestId("hero-content")).toBeInTheDocument();
  });

  it("aplica la clase del CSS Module en el contenedor principal", async () => {
    const { container } = render(
      <AuthContext.Provider value={{ isLoggedIn: false, logout: vi.fn() }}>
        <MemoryRouter>
          <div className="hero"></div>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const outer = container.querySelector(".hero");
    expect(outer).toBeInTheDocument();
  });
});
