// tests/components/Hero.spec.jsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Ajusta estas rutas si tu estructura es distinta:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



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

// Mock de la imagen importada por el componente
vi.mock("../../src/assets/ded249ac27d6056cd3d951830b0cbdf1.jpg", () => ({ default: "mock://pasteleria.jpg" }));

// Importa el componente con la misma ruta que resolvimos arriba
// (import dinámico para respetar el mock de arriba)
const importHero = async () => (await import("../../src/components/Hero.jsx")).default;

describe("<Hero />", () => {
  it("renderiza el título y el párrafo descriptivo", async () => {
    const Hero = await importHero();
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Pasteleria Mil Sabores/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Somos una pasteleria que ofrece experiencias dulces/i)
    ).toBeInTheDocument();
  });

  it("muestra los links de login, registro y el botón 'Ver Productos'", async () => {
    const Hero = await importHero();
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    // Links de la UL
    const loginLink = screen.getByRole("link", { name: /inicio de sesion/i });
    const registroLink = screen.getByRole("link", { name: /registro/i });
    expect(loginLink).toHaveAttribute("href", "/login");
    expect(registroLink).toHaveAttribute("href", "/registro");

    // NavLink a /productos
    const productosLink = screen.getByRole("link", { name: /ver productos/i });
    expect(productosLink).toHaveAttribute("href", "/productos");
  });

  it("renderiza la imagen con alt y tamaños esperados", async () => {
    const Hero = await importHero();
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const img = screen.getByAltText(/Pasteleria/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "mock://pasteleria.jpg");
    expect(img).toHaveAttribute("width", "40%");
    expect(img).toHaveAttribute("height", "100%");
  });

  it("aplica clases del CSS Module en contenedores clave", async () => {
    const Hero = await importHero();
    const { container } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const outer = container.querySelector("div");
    expect(outer?.classList.contains("hero")).toBe(true);

    const ul = container.querySelector("ul");
    expect(ul?.classList.contains("hero_links")).toBe(true);

    // botón de NavLink
    const productosLink = screen.getByRole("link", { name: /ver productos/i });
    expect(productosLink.classList.contains("btn")).toBe(true);
  });
});
