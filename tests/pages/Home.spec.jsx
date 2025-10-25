// tests/pages/Home.spec.jsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";

// 1) Mock de componentes hijos EXACTAMENTE como los importa Home.jsx
vi.mock("../../src/components/Nav.jsx", () => ({
  default: () => <div data-testid="nav">NAV</div>,
}));
vi.mock("../../src/components/Main.jsx", () => ({
  default: (props) => (
    <div data-testid="main">
      <div data-testid="main-props">{JSON.stringify(props)}</div>
    </div>
  ),
}));
vi.mock("../../src/components/Footer.jsx", () => ({
  default: () => <div data-testid="footer">FOOTER</div>,
}));

// 2) Mock de TODAS las imágenes que Home importa
vi.mock(
  "../../src/assets/torta cuadrada chocolate.jpg",
  () => ({ default: "mock://torta-choco.jpg" }),
);
vi.mock(
  "../../src/assets/torta cuadrada de frutas.jpg",
  () => ({ default: "mock://torta-frutas.jpg" }),
);
vi.mock(
  "../../src/assets/torta circular de vainilla.jpg",
  () => ({ default: "mock://torta-vainilla.jpg" }),
);
vi.mock(
  "../../src/assets/Triple Chocolate Mousse Cake – A Chocolate Lover’s Dream Come True!.jpg",
  () => ({ default: "mock://mousse-choco.jpg" }),
);
vi.mock(
  "../../src/assets/torta circular de manjar.jpg",
  () => ({ default: "mock://torta-manjar.jpg" }),
);
vi.mock(
  "../../src/assets/Tiramisu Classique _ Recette Originale.jpg",
  () => ({ default: "mock://tiramisu.jpg" }),
);
vi.mock(
  "../../src/assets/Orange Cake with Zesty Cream Cheese Frosting.jpg",
  () => ({ default: "mock://sin-azucar-naranja.jpg" }),
);
vi.mock(
  "../../src/assets/Cheesecake Factory Cheesecake.jpg",
  () => ({ default: "mock://cheesecake-sin-azucar.jpg" }),
);

// 3) Importa Home DESPUÉS de definir todos los mocks
import Home from "../../src/pages/Home.jsx";

describe("<Home />", () => {
  it("renderiza Nav, Main y Footer", () => {
    render(<Home />);
    expect(screen.getByTestId("nav")).toBeInTheDocument();
    expect(screen.getByTestId("main")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("pasa showHero=true a <Main /> y entrega el array de productos", () => {
    render(<Home />);

    // Leemos el JSON de props que imprimió el mock de Main
    const propsJson = within(screen.getByTestId("main")).getByTestId("main-props")
      .textContent;
    const props = JSON.parse(propsJson || "{}");

    // Verifica flag showHero
    expect(props.showHero).toBe(true);

    // Verifica estructura de productos: 2 grupos, 4 items cada uno
    expect(Array.isArray(props.productos)).toBe(true);
    expect(props.productos).toHaveLength(2);
    expect(props.productos[0]).toHaveLength(4);
    expect(props.productos[1]).toHaveLength(4);

    // Verifica algunos nombres clave para confirmar contenido y orden
    const nombresGrupo1 = props.productos[0].map((p) => p.nombre);
    const nombresGrupo2 = props.productos[1].map((p) => p.nombre);

    expect(nombresGrupo1).toEqual([
      "Torta Cuadrada de Chocolate",
      "Torta Cuadrada de Frutas",
      "Torta Circular de Vainilla",
      "Torta Circular de Manjar",
    ]);

    expect(nombresGrupo2).toEqual([
      "Mousse de Chocolate",
      "Tiramisú Clásico",
      "Torta Sin Azúcar de Naranja",
      "Cheesecake Sin Azúcar",
    ]);
  });
});
