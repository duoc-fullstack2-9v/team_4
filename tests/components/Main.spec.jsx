// tests/components/Main.spec.jsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";

// ⚠️ Usa rutas LITERALES que coincidan con los imports reales del componente
vi.mock("../../src/components/Hero.jsx", () => ({
  default: () => <div data-testid="hero">HERO</div>,
}));

vi.mock("../../src/components/ListaProductos.jsx", () => ({
  // imprimimos el contenido de la prop para poder asertar orden/props
  default: ({ productos }) => (
    <div data-testid="lista-productos">
      {typeof productos === "string"
        ? productos
        : JSON.stringify(productos)}
    </div>
  ),
}));

// Importar DESPUÉS de declarar los mocks
import Main from "../../src/components/Main.jsx";

describe("<Main />", () => {
  const productosMock = [
    [{ nombre: "A" }, { nombre: "B" }],
    [{ nombre: "C" }],
    "lote_manual" // demostración: puede ser cualquier item, el mock lo muestra tal cual
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

  it("renderiza un <ListaProductos> por cada item de props.productos", () => {
    render(<Main showHero={false} productos={productosMock} />);
    const listas = screen.getAllByTestId("lista-productos");
    expect(listas).toHaveLength(productosMock.length);
  });

  it("pasa correctamente cada item a <ListaProductos> y mantiene el orden", () => {
    render(<Main showHero={false} productos={productosMock} />);
    const listas = screen.getAllByTestId("lista-productos");

    // 1º item: array [{A},{B}]
    expect(
      within(listas[0]).getByText(JSON.stringify(productosMock[0]))
    ).toBeInTheDocument();

    // 2º item: array [{C}]
    expect(
      within(listas[1]).getByText(JSON.stringify(productosMock[1]))
    ).toBeInTheDocument();

    // 3º item: string "lote_manual"
    expect(within(listas[2]).getByText("lote_manual")).toBeInTheDocument();
  });

  it("con lista vacía no renderiza <ListaProductos>", () => {
    render(<Main showHero={true} productos={[]} />);
    expect(screen.queryByTestId("lista-productos")).toBeNull();
    // pero sí el hero, por si acaso
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });
});
