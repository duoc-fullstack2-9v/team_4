// ListaProductos.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ListaProductos from "../../src/components/ListaProductos.jsx";

// ⚠️ Mockeamos el CSS Module con el nombre esperado por el componente
vi.mock("../../src/styles/Index.module.css", () => ({
  default: { productos: "productos" },
}));

/**
 * Mock del componente Article:
 * - Mostramos el nombre del producto dentro de un <div data-testid="article">
 * - Así podemos contar cuántos se renderizan y verificar el contenido
 */
vi.mock("../../src/components/Article.jsx", () => ({
  default: ({ productos }) => (
    <div data-testid="article">{productos?.nombre}</div>
  ),
}));

describe("<ListaProductos />", () => {
  const productos = [
    {
      imagen: "https://example.com/a.jpg",
      alt: "A",
      nombre: "Producto A",
      descripcion: "Desc A",
      precio: "$1.000",
    },
    {
      imagen: "https://example.com/b.jpg",
      alt: "B",
      nombre: "Producto B",
      descripcion: "Desc B",
      precio: "$2.000",
    },
    {
      imagen: "https://example.com/c.jpg",
      alt: "C",
      nombre: "Producto C",
      descripcion: "Desc C",
      precio: "$3.000",
    },
  ];

  it("renderiza el contenedor con la clase del CSS Module", () => {
    const { container } = render(<ListaProductos productos={productos} />);
    const div = container.querySelector("div");
    expect(div).toBeInTheDocument();
    // la clase 'productos' viene del mock del CSS Module
    expect(div?.classList.contains("productos")).toBe(true);
  });

  it("renderiza un <Article> por cada producto", () => {
    render(<ListaProductos productos={productos} />);
    const articles = screen.getAllByTestId("article");
    expect(articles).toHaveLength(productos.length);
  });

  it("pasa correctamente los datos a cada <Article> (orden y nombre)", () => {
    render(<ListaProductos productos={productos} />);
    // El mock de <Article> imprime productos.nombre
    expect(screen.getByText("Producto A")).toBeInTheDocument();
    expect(screen.getByText("Producto B")).toBeInTheDocument();
    expect(screen.getByText("Producto C")).toBeInTheDocument();
  });

  it("con lista vacía no renderiza artículos", () => {
    render(<ListaProductos productos={[]} />);
    expect(screen.queryByTestId("article")).toBeNull();
  });
});
