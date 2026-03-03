import React, { useContext } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, AuthContext } from '../../src/context/AuthContext';

// Componente de prueba para consumir el contexto
const TestComponent = () => {
  const { isLoggedIn, user, login, logout } = useContext(AuthContext);

  return (
    <div>
      {/* Mostramos el estado para poder verificarlo */}
      <div data-testid="isLoggedIn">{isLoggedIn.toString()}</div>
      <div data-testid="user">{JSON.stringify(user)}</div>
      
      {/* Botones para interactuar con el contexto */}
      <button onClick={() => login({ nombre: 'Test User', email: 'test@example.com' })}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  
  const renderWithProvider = () => {
    return render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  };

  beforeEach(() => {
    // Limpiamos localStorage antes de cada prueba
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('debe tener un estado inicial con isLoggedIn en false y sin usuario', () => {
    renderWithProvider();
    expect(screen.getByTestId('isLoggedIn').textContent).toBe('false');
    expect(screen.getByTestId('user').textContent).toBe('null'); // El estado inicial de user ahora es null
  });

  it('debe actualizar el estado a isLoggedIn true y guardar el usuario al llamar a login', () => {
    renderWithProvider();
    
    // Hacemos clic en el botón de login
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });

    expect(screen.getByTestId('isLoggedIn').textContent).toBe('true');
    expect(screen.getByTestId('user').textContent).toContain('Test User');
  });

  it('debe actualizar el estado a isLoggedIn false y limpiar el usuario al llamar a logout', () => {
    renderWithProvider();

    // Primero, hacemos login para cambiar el estado inicial
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });

    // Luego, hacemos logout para revertir el estado
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    });

    expect(screen.getByTestId('isLoggedIn').textContent).toBe('false');
    expect(screen.getByTestId('user').textContent).toBe('null'); // Al hacer logout, user vuelve a ser null
  });
});