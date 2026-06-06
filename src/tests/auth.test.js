import { describe, it, expect, vi } from 'vitest';
import { handleLogin } from '../scripts/auth.js';

// --- MOCKING BÖLÜMÜ ---
// localStorage'ı test için taklit ediyoruz
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
global.localStorage = localStorageMock;

// alert'i test için taklit ediyoruz
global.alert = vi.fn();
// ----------------------

// UI fonksiyonlarını mock'luyoruz
vi.mock('../scripts/ui.js', () => ({
    showDashboard: vi.fn(),
    showLogin: vi.fn()
}));

describe('Authentication Flow', () => {
    it('should return true for valid credentials', () => {
        const result = handleLogin('admin@hr.com', 'password123');
        expect(result).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
    });

    it('should return false for invalid password', () => {
        const result = handleLogin('admin@hr.com', 'password');
        expect(result).toBe(false);
        expect(global.alert).toHaveBeenCalled();
    });
});