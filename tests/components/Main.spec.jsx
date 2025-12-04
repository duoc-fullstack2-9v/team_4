// tests/components/Main.spec.jsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// ⚠️ Usa rutas LITERALES que coincidan con los imports reales del componente
vi.mock("../../src/components/Hero.jsx", () => ({
  default: () => <div data-testid="hero">HERO</div>,
}));

// Mock de ListaProductos que renderiza un div por cada producto para poder contarlos.
vi.mock("../../src/components/ListaProductos.jsx", () => ({
  default: ({ productos }) => {
    // Si no hay productos, no renderizamos nada (null).
    if (!productos || productos.length === 0) return null;

    return ( // Si hay productos, renderizamos la lista.
      <div data-testid="lista-productos">
        {productos.map((p, i) => <div key={i}>{JSON.stringify(p)}</div>)}
      </div>
    );
  },
}));

// Importar DESPUÉS de declarar los mocks
import Main from "../../src/components/Main.jsx";

describe("<Main />", () => {
  const productosMock = [
    { id: 1, nombre: "A" }, { id: 2, nombre: "B" }, { id: 3, nombre: "C" }
  ];

  it("renderiza el contenedor <main>", () => {
    const { container } = render(
      <Main showHero={false} productos={[]} />
    );
    expect(container.querySelector("main")).toBeInTheDocument();
  });

  it("muestra <Hero> cuando showHero=true y lo oculta cuando es false", () => {
    // Con hero
    const { rerender } = render(
      <Main showHero={true} productos={[]} />
    );
    expect(screen.getByTestId("hero")).toBeInTheDocument();

    // Sin hero
    rerender(<Main showHero={false} productos={[]} />);
    expect(screen.queryByTestId("hero")).toBeNull();
  });

  it("renderiza <ListaProductos> con los productos pasados", () => {
    render(<Main showHero={false} productos={productosMock} />);
    const lista = screen.getByTestId("lista-productos");
    // Verifica que la lista de productos se renderice
    expect(lista).toBeInTheDocument();
    // Verifica que se rendericen todos los productos dentro de la lista
    expect(lista.children).toHaveLength(productosMock.length);
  });

  it("con lista vacía no renderiza <ListaProductos>", () => {
    render(<Main showHero={true} productos={[]} />);
    // Si no hay productos, el componente ListaProductos no debería renderizarse.
    expect(screen.queryByTestId("lista-productos")).not.toBeInTheDocument();
  });
});
