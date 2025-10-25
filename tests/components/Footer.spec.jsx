// tests/components/Footer.spec.jsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";

// Mock del CSS Module EXACTO que importa el componente
vi.mock("../../src/styles/Index.module.css", () => ({
  default: { footer: "footer" },
}));

// Importa después de mockear
import Footer from "../../src/components/Footer.jsx";

describe("<Footer />", () => {
  const categorias = [
    "Tortas Cuadradas",
    "Tortas Circulares",
    "Postres Individuales",
    "Productos Sin Azucar",
    "Pasteleria Tradicional",
    "Producto Sin Gluten",
    "Productos Veganos",
    "Tortas Especiales",
  ];

  const setup = () => render(<Footer />);

  it("renderiza <footer> y la estructura principal con clases esperadas", () => {
    const { container } = setup();

    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();

    const contenedor = footer.querySelector("div");
    expect(contenedor).toBeInTheDocument();
    // clase proveniente del CSS Module mockeado
    expect(contenedor?.classList.contains("footer")).toBe(true);

    const side = footer.querySelector(".side_name");
    expect(side).toBeInTheDocument();
  });

  it("muestra el nombre de la tienda y el texto de contacto", () => {
    setup();
    expect(
      screen.getByText(/Tienda de Reposteria 'Pasteleria Mil Sabores'/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Contactenos a este numero \+56 952367087/i)
    ).toBeInTheDocument();
  });

  it("renderiza 8 categorías como <a> sin href", () => {
  const { container } = setup();

  // Contenedor lateral donde están las categorías (ajusta si tu clase cambia)
  const side = container.querySelector(".side_name");
  expect(side).toBeInTheDocument();

  // Anclas directas (no usan rol link si no tienen href)
  const anchors = side.querySelectorAll("a");
  expect(anchors.length).toBe(8);

  const categorias = [
    "Tortas Cuadradas",
    "Tortas Circulares",
    "Postres Individuales",
    "Productos Sin Azucar",
    "Pasteleria Tradicional",
    "Producto Sin Gluten",
    "Productos Veganos",
    "Tortas Especiales",
  ];

  // Verifica texto, tag y ausencia de href
  categorias.forEach((texto, i) => {
    const a = anchors[i];
    expect(a).toBeInTheDocument();
    expect(a.tagName).toBe("A");
    expect(a).not.toHaveAttribute("href");
    expect(a).toHaveTextContent(texto);
  });
});

});
