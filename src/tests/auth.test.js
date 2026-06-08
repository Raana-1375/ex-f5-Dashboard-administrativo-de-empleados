import { describe, it, expect, vi } from 'vitest';
import { handleLogin } from '../scripts/auth.js';

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
global.localStorage = localStorageMock;

global.alert = vi.fn();
// ----------------------

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