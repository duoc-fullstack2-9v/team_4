import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../../src/pages/Login';
import { AuthContext } from '../../src/context/AuthContext';
import { useUsers } from '../../src/components/utils';

// Mock del hook useUsers
vi.mock('../../src/components/utils', () => ({
  useUsers: vi.fn(),
}));

// Mock de react-router-dom
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockedNavigate,
}));

describe('Login Page', () => {
  const mockLogin = vi.fn();
  const mockUsers = [
    { email: 'test@example.com', nombre: 'Test User', pass: 'password123' },
  ];

  beforeEach(() => {
    // Limpiamos los mocks antes de cada prueba
    vi.clearAllMocks();
    useUsers.mockReturnValue(mockUsers);
    window.alert = vi.fn(); // Mock de window.alert
  });

  const renderComponent = () => {
    return render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  it('debe renderizar el formulario de inicio de sesión', () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
  });

  it('debe mostrar una alerta si el correo no está registrado', () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/correo electrónico/i, { selector: 'input' }), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i, { selector: 'input' }), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    expect(window.alert).toHaveBeenCalledWith('Ese correo no está registrado.');
  });

  it('debe mostrar una alerta si la contraseña es incorrecta', () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/correo electrónico/i, { selector: 'input' }), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i, { selector: 'input' }), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    expect(window.alert).toHaveBeenCalledWith('Contraseña incorrecta.');
  });

  it('debe iniciar sesión y redirigir al home con credenciales correctas', async () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/correo electrónico/i, { selector: 'input' }), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i, { selector: 'input' }), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', nombre: 'Test User' });
      expect(mockedNavigate).toHaveBeenCalledWith('/home', { replace: true });
    });

    expect(window.alert).not.toHaveBeenCalled();
  });
});