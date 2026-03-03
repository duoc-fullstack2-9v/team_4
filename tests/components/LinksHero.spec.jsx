import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthContext } from '../../src/context/AuthContext';
import LinksHero from '../../src/components/LinksHero';

// Mock de useNavigate para verificar la redirección
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock del CSS Module
vi.mock("../../src/styles/Index.module.css", () => ({
  default: {
    hero_links: "hero_links",
    leftLinks: "leftLinks",
    rightLinks: "rightLinks",
  },
}));

describe('<LinksHero />', () => {
    const mockLogout = vi.fn();

    const renderComponent = (isLoggedIn) => {
        return render(
            <AuthContext.Provider value={{ isLoggedIn, logout: mockLogout }}>
                <MemoryRouter>
                    <LinksHero />
                </MemoryRouter>
            </AuthContext.Provider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('cuando el usuario no está logueado (isLoggedIn = false)', () => {
        it('debe mostrar los enlaces de "Inicio de Sesión" y "Registro"', () => {
            renderComponent(false);

            expect(screen.getByRole('link', { name: /inicio de sesión/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /registro/i })).toBeInTheDocument();
        });

        it('no debe mostrar los enlaces de administración ni de cerrar sesión', () => {
            renderComponent(false);

            expect(screen.queryByRole('link', { name: /cerrar sesión/i })).not.toBeInTheDocument();
            expect(screen.queryByRole('link', { name: /administrar usuarios/i })).not.toBeInTheDocument();
            expect(screen.queryByRole('link', { name: /administrar productos/i })).not.toBeInTheDocument();
        });
    });

    describe('cuando el usuario está logueado (isLoggedIn = true)', () => {
        it('debe mostrar los enlaces de administración y de cerrar sesión', () => {
            renderComponent(true);

            expect(screen.getByRole('link', { name: /cerrar sesión/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /administrar usuarios/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /administrar productos/i })).toBeInTheDocument();
        });

        it('debe llamar a logout y navegar al login al hacer clic en "Cerrar sesión"', () => {
            renderComponent(true);
            fireEvent.click(screen.getByRole('link', { name: /cerrar sesión/i }));
            expect(mockLogout).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });
});