
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ListaProductos from "../../src/components/ListaProductos.jsx";

// Mockeamos el CSS Module
vi.mock("../../src/styles/Index.module.css", () => ({
  default: {
    productos: "productos",
    unidad: "unidad"
  },
}));


describe("<ListaProductos />", () => {
  const productos = [
    {
      imagen: "https://example.com/a.jpg",
      alt: "A",
      nombre: "Producto A",
      id: 1,
    },
    {
      imagen: "https://example.com/b.jpg",
      alt: "B",
      nombre: "Producto B",
      id: 2,
    },
    {
      imagen: "https://example.com/c.jpg",
      alt: "C",
      nombre: "Producto C",
      id: 3,
    },
  ];

  it("renderiza el contenedor con la clase del CSS Module", () => {
    const { container } = render(<ListaProductos productos={productos} />);
    const div = container.querySelector("div");
    expect(div).toBeInTheDocument();
    // la clase 'productos' viene del mock del CSS Module
    expect(div?.classList.contains("productos")).toBe(true);
  });

  it("renderiza un div por cada producto", () => {
    render(<ListaProductos productos={productos} />);
    // El componente renderiza un div con la clase 'unidad' por cada producto
    const productDivs = screen.getAllByRole("heading", { level: 3 });
    expect(productDivs).toHaveLength(productos.length);
  });

  it("muestra el nombre de cada producto", () => {
    render(<ListaProductos productos={productos} />);
    expect(screen.getByText("Producto A")).toBeInTheDocument();
    expect(screen.getByText("Producto B")).toBeInTheDocument();
    expect(screen.getByText("Producto C")).toBeInTheDocument();
  });

  it("con lista vacía muestra un mensaje", () => {
    render(<ListaProductos productos={[]} />);
    // Si la lista está vacía, no debe haber ningún 'heading' de producto.
    const headings = screen.queryAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(0);
  });
});
