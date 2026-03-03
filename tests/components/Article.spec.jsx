// Article.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import Article from "../../src/components/Article.jsx";

// Mock del CSS Module para que la clase exista en test
vi.mock("../../src/styles/Index.module.css", () => ({
  default: { unidad: "unidad" },
}));

describe("<Article />", () => {
  const productos = {
    imagen: "https://example.com/foto.jpg",
    alt: "Foto del producto",
    nombre: "Producto Demo",
    descripcion: "Descripción breve del producto.",
    precio: "$9.990",
  };

  it("renderiza el artículo con el contenido correcto", () => {
    render(<Article productos={productos} />);

    // Título (h2)
    expect(
      screen.getByRole("heading", { level: 2, name: productos.nombre })
    ).toBeInTheDocument();

    // Descripción y precio
    expect(screen.getByText(productos.descripcion)).toBeInTheDocument();
    expect(screen.getByText(productos.precio)).toBeInTheDocument();
  });

  it("muestra la imagen con src y alt correctos y mantiene los atributos de tamaño", () => {
    render(<Article productos={productos} />);
    const img = screen.getByAltText(productos.alt);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", productos.imagen);
    expect(img).toHaveAttribute("alt", productos.alt);
    // Los atributos se pasan como strings en el JSX original
    expect(img).toHaveAttribute("width", "40%");
    expect(img).toHaveAttribute("height", "50%");
  });

  it("aplica la clase del CSS Module en <article>", () => {
    const { container } = render(<Article productos={productos} />);
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
    expect(article?.classList.contains("unidad")).toBe(true);
  });

  it("renderiza de forma estable (snapshot básico)", () => {
    const { container } = render(<Article productos={productos} />);
  });
});
