// tests/pages/Registro.spec.jsx
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";


// Mock del CSS Module EXACTO que importa Registro.jsx
vi.mock("../../src/styles/Registro.module.css", () => ({
  default: {
    main: "main",
    contenedor_login: "contenedor_login",
    caja: "caja",
    msg: "msg",
    btn: "btn",
    ayuda: "ayuda",
  },
}));


// Mock de useNavigate, manteniendo el resto real (Link, etc.)
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


// Importa después de definir los mocks
import Register from "../../src/pages/Registro.jsx";


const LS_KEY = "pms_users";


describe("<Registro />", () => {
  let alertSpy;




  beforeEach(() => {
    // limpiar estado entre tests
    localStorage.removeItem(LS_KEY);
    mockNavigate.mockReset();
    // evita que window.alert corte el test runner
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });


  const setup = () =>
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );


  it("renderiza el formulario con sus campos y el botón", () => {
    setup();


    expect(screen.getByRole("heading", { level: 1, name: /Crear cuenta/i }))
      .toBeInTheDocument();


    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Edad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Código promocional/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar contraseña/i)).toBeInTheDocument();


    expect(screen.getByRole("button", { name: /Regístrate/i }))
      .toBeInTheDocument();


    // link a /login
    const loginLink = screen.getByRole("link", { name: /Inicia sesión/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });


  it("muestra errores cuando faltan datos obligatorios o email de dominio no permitido", () => {
    setup();


    // Enviar vacío
    fireEvent.click(screen.getByRole("button", { name: /Regístrate/i }));


    // Nombre obligatorio
    expect(screen.getByText(/❌\s*El nombre es obligatorio/i)).toBeInTheDocument();
    // Email obligatorio
    expect(screen.getByText(/❌\s*El correo es obligatorio/i)).toBeInTheDocument();


    // Corrige nombre y pone email con dominio no permitido
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "juan@notallowed.com" },
    });
    // contraseña inválida (demasiado corta) para gatillar ese error también
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: "123" },
    });


    fireEvent.click(screen.getByRole("button", { name: /Regístrate/i }));


    expect(screen.getByText(/❌\s*Dominio no permitido/i)).toBeInTheDocument();
    expect(screen.getByText(/❌\s*Contraseña 8 a 20 caracteres/i)).toBeInTheDocument();
    // No debería navegar ni alertar
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();
  });


  it("muestra beneficios cuando edad ≥ 50 y al usar el código FELICES50", () => {
    setup();


    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "ana@gmail.com" }, // dominio permitido
    });
    fireEvent.change(screen.getByLabelText(/Edad/i), { target: { value: "55" } });
    fireEvent.change(screen.getByLabelText(/Código promocional/i), {
      target: { value: "FELICES50" },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: "12345678" },
    });


    fireEvent.click(screen.getByRole("button", { name: /Regístrate/i }));


    // Beneficio por edad
    expect(
      screen.getByText(/✅\s*Beneficio: 50% de descuento por ser mayor de 50/i)
    ).toBeInTheDocument();


    // Beneficio por código
    expect(
      screen.getByText(/✅\s*Beneficio: 10% descuento de por vida/i)
    ).toBeInTheDocument();


    // Como el flujo continúa y se intenta registrar, puede navegar/alertar:
    expect(alertSpy).toHaveBeenCalledWith("Cuenta creada correctamente.");
    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });


  it("impide registrar si el email ya existe en localStorage", () => {
    // Pre-carga un usuario existente
    localStorage.setItem(
      LS_KEY,
      JSON.stringify([{ nombre: "Pepe", email: "pepe@gmail.com", pass: "abcd1234" }])
    );


    setup();


    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Pepe" } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "pepe@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: "abcd1234" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: "abcd1234" },
    });


    fireEvent.click(screen.getByRole("button", { name: /Regístrate/i }));


    // Debe marcar error de duplicado y NO navegar NI alertar
    expect(
      screen.getByText(/❌\s*Ese correo ya está registrado/i)
    ).toBeInTheDocument();


    expect(mockNavigate).not.toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();
  });


  it("flujo exitoso: guarda en localStorage, alerta y navega al login", () => {
    setup();


    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Luz" } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "luz@duocuc.cl" }, // dominio permitido
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: "12345678" },
    });


    fireEvent.click(screen.getByRole("button", { name: /Regístrate/i }));


    // Se guarda el usuario
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    expect(saved).toEqual([
      { nombre: "Luz", email: "luz@duocuc.cl", pass: "12345678" },
    ]);


    // Alerta y navegación a /login
    expect(alertSpy).toHaveBeenCalledWith("Cuenta creada correctamente.");
    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
