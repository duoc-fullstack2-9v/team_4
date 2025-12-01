// tests/pages/Productos.spec.jsx
import React from "react";
import { describe, it, expect, vi } from "vitest"; // Importación de herramientas de test (describe, it, expect, vi)
import { render, screen, within } from "@testing-library/react"; // Herramientas para renderizar y consultar la UI

// 1) Mock de subcomponentes EXACTAMENTE como los importa Productos.jsx
// Simulamos los subcomponentes de la página Productos (Nav, Main, Footer) para evitar dependencias reales durante las pruebas.
vi.mock("../../src/components/Nav.jsx", () => ({
  default: () => <div data-testid="nav">NAV</div>, // Mock del componente Nav
}));
vi.mock("../../src/components/Main.jsx", () => ({
  default: (props) => (
    <div data-testid="main">
      <div data-testid="main-props">{JSON.stringify(props)}</div> // Mock del componente Main mostrando las props
    </div>
  ),
}));
vi.mock("../../src/components/Footer.jsx", () => ({
  default: () => <div data-testid="footer">FOOTER</div>, // Mock del componente Footer
}));

// 2) Mock de TODAS las imágenes importadas
// Simulamos las imágenes para evitar que se carguen realmente en las pruebas.
vi.mock("../../src/assets/torta cuadrada chocolate.jpg", () => ({ default: "mock://torta-choco.jpg" }));
vi.mock("../../src/assets/torta cuadrada de frutas.jpg", () => ({ default: "mock://torta-frutas.jpg" }));
vi.mock("../../src/assets/torta circular de vainilla.jpg", () => ({ default: "mock://torta-vainilla.jpg" }));
vi.mock("../../src/assets/Triple Chocolate Mousse Cake – A Chocolate Lover’s Dream Come True!.jpg", () => ({ default: "mock://mousse-choco.jpg" }));
vi.mock("../../src/assets/torta circular de manjar.jpg", () => ({ default: "mock://torta-manjar.jpg" }));
vi.mock("../../src/assets/Tiramisu Classique _ Recette Originale.jpg", () => ({ default: "mock://tiramisu.jpg" }));
vi.mock("../../src/assets/Orange Cake with Zesty Cream Cheese Frosting.jpg", () => ({ default: "mock://sin-azucar-naranja.jpg" }));
vi.mock("../../src/assets/Cheesecake Factory Cheesecake.jpg", () => ({ default: "mock://cheesecake-sin-azucar.jpg" }));
vi.mock("../../src/assets/Empanadas de Manzana.jpg", () => ({ default: "mock://empanada-manzana.jpg" }));
vi.mock("../../src/assets/13889883-5a9d-4cb8-82ec-94290e043b49.jpg", () => ({ default: "mock://tarta-santiago.jpg" }));
vi.mock("../../src/assets/8f33506f-a806-4097-b03e-85b904914aaf.jpg", () => ({ default: "mock://brownie-sin-gluten.jpg" }));
vi.mock("../../src/assets/fb32f73a-d0c2-44f2-8320-063eb573f7b7.jpg", () => ({ default: "mock://pan-sin-gluten.jpg" }));
vi.mock("../../src/assets/6 Ingredient Vegan Flourless Chocolate Cake Recipe (EASY!).jpg", () => ({ default: "mock://choco-vegan.jpg" }));
vi.mock("../../src/assets/Galletas de Avena con 3 ingredientes - Loli….jpg", () => ({ default: "mock://galletas-avena.jpg" }));
vi.mock("../../src/assets/356e6f80-7f65-4841-b8a3-bd4a43e74015.jpg", () => ({ default: "mock://especial-cumple.jpg" }));
vi.mock("../../src/assets/d3ce09b3-8155-4534-a4ad-26f02ab6de2e.jpg", () => ({ default: "mock://especial-boda.jpg" }));

// 3) Importa la página DESPUÉS de definir los mocks
// Importamos la página Productos luego de haber mockeado los subcomponentes e imágenes para evitar efectos colaterales
import Productos from "../../src/pages/Productos.jsx";

describe("<Productos />", () => {
  // Test 1: Verificamos que los componentes Nav, Main y Footer se renderizan correctamente
  it("renderiza Nav, Main y Footer", () => {
    render(<Productos />); // Renderizamos el componente Productos
    expect(screen.getByTestId("nav")).toBeInTheDocument(); // Verificamos que el componente Nav esté en el documento
    expect(screen.getByTestId("main")).toBeInTheDocument(); // Verificamos que el componente Main esté en el documento
    expect(screen.getByTestId("footer")).toBeInTheDocument(); // Verificamos que el componente Footer esté en el documento
  });

  // Test 2: Verificamos que el componente Main reciba el array 'productos' con 4 grupos de 4 elementos
  it("pasa a <Main /> un array 'productos' con 4 grupos de 4 items", () => {
    render(<Productos />); // Renderizamos el componente Productos
    const propsJson = within(screen.getByTestId("main")).getByTestId("main-props").textContent; // Obtenemos las props del componente Main
    const props = JSON.parse(propsJson || "{}"); // Convertimos el texto JSON en objeto

    expect(Array.isArray(props.productos)).toBe(true); // Verificamos que productos sea un array
    expect(props.productos).toHaveLength(4); // Verificamos que tenga 4 grupos
    props.productos.forEach((grupo) => {
      expect(Array.isArray(grupo)).toBe(true); // Verificamos que cada grupo sea un array
      expect(grupo).toHaveLength(4); // Verificamos que cada grupo tenga 4 elementos
    });
  });

  // Test 3: Verificamos que los nombres de los productos sean los correctos y estén en el orden esperado
  it("incluye nombres clave y orden esperado en los grupos", () => {
    render(<Productos />); // Renderizamos el componente Productos
    const propsJson = within(screen.getByTestId("main")).getByTestId("main-props").textContent; // Obtenemos las props de Main
    const { productos } = JSON.parse(propsJson || "{}"); // Extraemos el array 'productos' de las props

    // Verificamos los nombres de los productos en cada grupo
    const nombres0 = productos[0].map((p) => p.nombre);
    const nombres1 = productos[1].map((p) => p.nombre);
    const nombres2 = productos[2].map((p) => p.nombre);
    const nombres3 = productos[3].map((p) => p.nombre);

    // Verificamos que los nombres estén en el orden correcto
    expect(nombres0).toEqual([
      "Torta Cuadrada de Chocolate",
      "Torta Cuadrada de Frutas",
      "Torta Circular de Vainilla",
      "Torta Circular de Manjar",
    ]);

    expect(nombres1).toEqual([
      "Mousse de Chocolate",
      "Tiramisú Clásico",
      "Torta Sin Azúcar de Naranja",
      "Cheesecake Sin Azúcar",
    ]);

    expect(nombres2).toEqual([
      "Empanada de Manzana",
      "Tarta de Santiago",
      "Brownie Sin Gluten",
      "Pan Sin Gluten",
    ]);

    expect(nombres3).toEqual([
      "Torta Vegana de Chocolate",
      "Galletas Veganas de Avena",
      "Torta Especial de Cumpleaños",
      "Torta Especial de Boda",
    ]);
  });
});
