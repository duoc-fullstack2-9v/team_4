// tests/components/Nav.spec.jsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mockea el CSS Module EXACTO que importa el componente
vi.mock("../../src/styles/Index.module.css", () => ({
  default: {
    navbar: "navbar",
    nav_links: "nav_links",
    button: "button",
  },
}));

// Mockea las imágenes que importa el componente
vi.mock(
  "../../src/assets/icono_PMS-removebg-preview.png",
  () => ({ default: "mock://logo.png" }),
);
vi.mock(
  "../../src/assets/Carrito-removebg-preview.png",
  () => ({ default: "mock://carrito.png" }),
);

// Importa después de mockear
import Nav from "../../src/components/Nav.jsx";

describe("<Nav />", () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

  it("renderiza <nav> con la clase del CSS Module", () => {
    const { container } = setup();
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
    expect(nav?.classList.contains("navbar")).toBe(true);
  });

  it("muestra el logo con alt, src y width correctos", () => {
    setup();
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "mock://logo.png");
    expect(logo).toHaveAttribute("width", "80px");
  });

  it("muestra el título de la marca", () => {
    setup();
    expect(
      screen.getByRole("heading", { level: 2, name: /Pasteleria Mil Sabores/i })
    ).toBeInTheDocument();
  });

  it("renderiza la lista de navegación con su clase y 5 items", () => {
    const { container } = setup();
    const ul = container.querySelector("ul");
    expect(ul).toBeInTheDocument();
    expect(ul?.classList.contains("nav_links")).toBe(true);

    const lis = within(ul).getAllByRole("listitem");
    expect(lis).toHaveLength(5);
  });

  it("genera href correctos para los NavLink ('Home' y 'Productos')", () => {
    setup();
    const home = screen.getByRole("link", { name: /home/i });
    const productos = screen.getByRole("link", { name: /productos/i });
    expect(home).toHaveAttribute("href", "/home");
    expect(productos).toHaveAttribute("href", "/productos");
  });

  it("los elementos 'Nosotros', 'Blogs' y 'Contacto' existen pero no tienen href", () => {
    setup();
    // No se registran como 'role="link"' si no tienen href, así que verificamos el elemento <a>
    const nosotros = screen.getByText("Nosotros");
    const blogs = screen.getByText("Blogs");
    const contacto = screen.getByText("Contacto");

    expect(nosotros.tagName).toBe("A");
    expect(blogs.tagName).toBe("A");
    expect(contacto.tagName).toBe("A");

    expect(nosotros).not.toHaveAttribute("href");
    expect(blogs).not.toHaveAttribute("href");
    expect(contacto).not.toHaveAttribute("href");
  });

  it("renderiza el botón del carrito con clase y la imagen correcta", () => {
    const { container } = setup();
    const button = container.querySelector("button");
    expect(button).toBeInTheDocument();
    expect(button?.classList.contains("button")).toBe(true);

    const img = screen.getByAltText("Carrito");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "mock://carrito.png");
    expect(img).toHaveAttribute("width", "30px");
  });
});
