// tests/pages/Login.spec.jsx
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";


// 🔧 Mock del CSS Module EXACTO que importa la página
vi.mock("../../src/styles/Login.module.css", () => ({
  default: {
    main: "main",
    contenedor_login: "contenedor_login",
    logo: "logo",
    titulo: "titulo",
    caja: "caja",
    input_pass: "input_pass",
    btn: "btn",
    ayuda: "ayuda",
  },
}));


// 🔧 Mock de useNavigate (manteniendo el resto real)
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});


// ⬇️ Importa la página DESPUÉS de declarar los mocks
import Login from "../../src/pages/Login.jsx";


const LS_USERS_KEY = "pms_users";
const LS_LOGGED_KEY = "pms_logged_user";


describe("<Login />", () => {
  let alertSpy;


  const setup = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );


  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockReset();
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });


it("renderiza el formulario, labels, inputs, botón y el link a registro", () => {
  setup();


  // Título
  expect(
    screen.getByRole("heading", { level: 1, name: /Iniciar Sesión/i })
  ).toBeInTheDocument();


  // Inputs: selección robusta
  const emailInput = screen.getByRole("textbox", { name: /correo electrónico/i });
  const passInput  = screen.getByLabelText(/^Contraseña$/i, { selector: "input" });
  // (alternativa: screen.getByPlaceholderText(/Ingrese su contraseña/i))


  expect(emailInput).toBeInTheDocument();
  expect(passInput).toBeInTheDocument();


  // Atributos clave
  expect(emailInput).toHaveAttribute("type", "email");
  expect(emailInput).toHaveAttribute("id", "email");
  expect(passInput).toHaveAttribute("id", "password");
  expect(passInput).toHaveAttribute("minLength", "8");
  expect(passInput).toHaveAttribute("maxLength", "20");


  // Botón
  expect(screen.getByRole("button", { name: /Ingresar/i })).toBeInTheDocument();


  // Link a /registro
  const linkRegistro = screen.getByRole("link", { name: /Regístrate/i });
  expect(linkRegistro).toHaveAttribute("href", "/registro");
});




it("toggle de visibilidad de contraseña: click y teclado", () => {
  setup();


  // Selecciona el INPUT por su label exacto y restringe a 'input'
  const passInput = screen.getByLabelText(/^Contraseña$/i, { selector: "input" });


  // Selecciona el botón/ícono por rol y aria-label (evita conflicto con el label del input)
  const toggle = screen.getByRole("button", { name: /Mostrar contraseña/i });


  // Estado inicial
  expect(passInput).toHaveAttribute("type", "password");
  expect(toggle).toHaveAttribute("aria-label", "Mostrar contraseña");
  expect(toggle.className).toMatch(/fa-eye-slash/);


  // Click → mostrar
  fireEvent.click(toggle);
  expect(passInput).toHaveAttribute("type", "text");
  expect(toggle).toHaveAttribute("aria-label", "Ocultar contraseña");
  expect(toggle.className).toMatch(/fa-eye/);


  // Enter → ocultar
  fireEvent.keyDown(toggle, { key: "Enter" });
  expect(passInput).toHaveAttribute("type", "password");
  expect(toggle).toHaveAttribute("aria-label", "Mostrar contraseña");
  expect(toggle.className).toMatch(/fa-eye-slash/);


  // Space → mostrar
  fireEvent.keyDown(toggle, { key: " " });
  expect(passInput).toHaveAttribute("type", "text");
});




  it("valida campos vacíos y alerta sin navegar ni guardar", () => {
  setup();


  // dispara el submit directamente sobre el <form>
  const form = document.getElementById("login-form");
  expect(form).toBeTruthy();
  fireEvent.submit(form);


  // ahora sí debería entrar al onSubmit y disparar la validación
  expect(alertSpy).toHaveBeenCalledWith("Completa correo y contraseña.");
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(localStorage.getItem(LS_LOGGED_KEY)).toBeNull();
});




  it("alerta si el correo no está registrado", () => {
    // Prepara lista de usuarios vacía (o diferente a lo que se ingresa)
    localStorage.setItem(LS_USERS_KEY, JSON.stringify([{ email: "a@b.com", nombre: "A", pass: "12345678" }]));
    setup();


    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "otro@dominio.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i, { selector: 'input' }), {
      target: { value: "12345678" },
    });


    fireEvent.submit(screen.getByRole("button", { name: /Ingresar/i }).closest("form"));


    expect(alertSpy).toHaveBeenCalledWith("Ese correo no está registrado.");
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(localStorage.getItem(LS_LOGGED_KEY)).toBeNull();
  });


  it("alerta si la contraseña es incorrecta", () => {
    // Usuario existente con pass distinta
    localStorage.setItem(
      LS_USERS_KEY,
      JSON.stringify([{ email: "test@gmail.com", nombre: "Test", pass: "abcdef12" }])
    );
    setup();


    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i, { selector: 'input' }), {
      target: { value: "12345678" },
    });


    fireEvent.submit(screen.getByRole("button", { name: /Ingresar/i }).closest("form"));


    expect(alertSpy).toHaveBeenCalledWith("Contraseña incorrecta.");
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(localStorage.getItem(LS_LOGGED_KEY)).toBeNull();
  });


  it("flujo exitoso: guarda sesión y navega a /home", () => {
    localStorage.setItem(
      LS_USERS_KEY,
      JSON.stringify([{ email: "user@duocuc.cl", nombre: "User", pass: "abcd1234" }])
    );


    setup();


    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "user@duocuc.cl" },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i, { selector: 'input' }), {
      target: { value: "abcd1234" },
    });


    fireEvent.submit(screen.getByRole("button", { name: /Ingresar/i }).closest("form"));


    // Guarda en localStorage bajo la KEY correcta
    const saved = JSON.parse(localStorage.getItem(LS_LOGGED_KEY) || "null");
    expect(saved).toEqual({ email: "user@duocuc.cl", nombre: "User" });


    // Navega a /home con replace
    expect(mockNavigate).toHaveBeenCalledWith("/home", { replace: true });
  });
});
