import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchUsers, deleteUser, createUser, loginUser } from '../../src/services/usersApi';
import { API_BASE_URL } from '../../src/services/apiConfig';

// Mock del módulo axios
vi.mock('axios');

const USERS_URL = `${API_BASE_URL}/api/users`;

describe('usersApi service', () => {
    const mockUsers = [
        { id: 1, email: 'test@example.com', password: 'password123', nombre: 'Test User' },
        { id: 2, email: 'another@example.com', password: 'password456', nombre: 'Another User' },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Pruebas para fetchUsers
    describe('fetchUsers', () => {
        it('debe devolver los usuarios si la respuesta es ok', async () => {
            axios.get.mockResolvedValue({ data: mockUsers });

            const users = await fetchUsers();
            expect(axios.get).toHaveBeenCalledWith(USERS_URL);
            expect(users).toEqual(mockUsers);
        });

        it('debe lanzar un error si la respuesta no es ok', async () => {
            axios.get.mockRejectedValue(new Error('Network Error'));
            await expect(fetchUsers()).rejects.toThrow('Error al obtener usuarios');
        });
    });

    // Pruebas para deleteUser
    describe('deleteUser', () => {
        it('debe llamar a axios.delete con la URL correcta', async () => {
            axios.delete.mockResolvedValue({});
            const userId = 1;
            await deleteUser(userId);

            expect(axios.delete).toHaveBeenCalledWith(`${USERS_URL}/${userId}`);
        });

        it('debe lanzar un error si la respuesta no es ok', async () => {
            axios.delete.mockRejectedValue(new Error('Network Error'));
            await expect(deleteUser(1)).rejects.toThrow('Error al eliminar usuario');
        });
    });

    // Pruebas para createUser
    describe('createUser', () => {
        it('debe llamar a axios.post con los datos del usuario', async () => {
            const newUser = { email: 'new@example.com', password: 'new' };
            const createdUser = { id: 3, ...newUser };
            axios.post.mockResolvedValue({ data: createdUser });

            const result = await createUser(newUser);

            expect(axios.post).toHaveBeenCalledWith(USERS_URL, newUser, {
                headers: { 'Content-Type': 'application/json' },
            });
            expect(result).toEqual(createdUser);
        });
    });

    // Pruebas para loginUser
    describe('loginUser', () => {
        it('debe devolver el usuario si las credenciales son correctas', async () => {
            // Hacemos que fetchUsers (llamado dentro de loginUser) devuelva los usuarios mock
            axios.get.mockResolvedValue({ data: mockUsers });

            const user = await loginUser('test@example.com', 'password123');
            expect(user).toEqual(mockUsers[0]);
        });

        it('debe devolver undefined si la contraseña es incorrecta', async () => {
            axios.get.mockResolvedValue({ data: mockUsers });

            const user = await loginUser('test@example.com', 'wrongpassword');
            expect(user).toBeUndefined();
        });
    });
});