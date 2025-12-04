import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdminUsuarios from '../../src/pages/AdminUsuarios';
import { AuthContext } from '../../src/context/AuthContext';
import { fetchUsers, deleteUser } from '../../src/services/usersApi';

// Mock de la API de usuarios
vi.mock('../../src/services/usersApi');

// Mock de react-router-dom para la navegación
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockedNavigate,
}));

describe('AdminUsuarios Page', () => {
  const mockUsers = [
    { id: 1, nombre: 'Usuario Uno', email: 'uno@example.com' },
    { id: 2, nombre: 'Usuario Dos', email: 'dos@example.com' },
  ];

  // Función para renderizar el componente con sus providers
  const renderComponent = () => {
    fetchUsers.mockResolvedValue(mockUsers);
    return render(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <BrowserRouter>
          <AdminUsuarios />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true); // Aceptamos siempre la confirmación de eliminar
  });

  it('debe renderizar la tabla con los usuarios', async () => {
    renderComponent();

    expect(screen.getByRole('heading', { name: /administración de usuarios/i })).toBeInTheDocument();
    // Esperamos a que aparezca el primer usuario para confirmar que la carga terminó
    expect(await screen.findByText('Usuario Uno')).toBeInTheDocument();
    expect(screen.getByText('uno@example.com')).toBeInTheDocument();
    expect(screen.getByText('Usuario Dos')).toBeInTheDocument();
    expect(screen.getByText('dos@example.com')).toBeInTheDocument();
  });

  it('debe eliminar un usuario al hacer clic en "Eliminar"', async () => {
    deleteUser.mockResolvedValue({}); // Simulamos que la eliminación es exitosa
    renderComponent();

    // Esperamos a que la tabla se renderice
    const deleteButtons = await screen.findAllByRole('button', { name: /eliminar/i });
    // Hacemos clic en el botón de eliminar del primer usuario
    fireEvent.click(deleteButtons[0]);

    // Verificamos que se pida confirmación
    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que quieres eliminar este usuario?');
    });

    // Verificamos que se llamó a la función de la API para eliminar
    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith(1);
    });
    
    // Para verificar la actualización en la UI, podríamos re-mockear fetchUsers y re-renderizar,
    // pero verificar la llamada a la API es una prueba más robusta y aislada.
  });

  it('debe navegar a la página de registro al hacer clic en "Agregar Nuevo Usuario"', async () => {
    renderComponent();

    // Esperamos a que el botón aparezca después de la carga
    const addButton = await screen.findByRole('button', { name: /agregar nuevo usuario/i });
    fireEvent.click(addButton);

    // Verificamos que navegue a la página de registro
    expect(mockedNavigate).toHaveBeenCalledWith('/Registro');
  });
});