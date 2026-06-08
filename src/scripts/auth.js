// src/scripts/auth.js
import { showDashboard, showLogin } from './ui.js';

/**
 * Validates login credentials and updates authentication state.
 * Password policy: Minimum 8 characters and at least one digit.
 */
export const handleLogin = (username, password) => {
    // Regex explanation:
    // (?=.*\d) : Ensures at least one digit is present.
    // .{8,}    : Ensures a minimum length of 8 characters.
    const passwordRegex = /^(?=.*\d).{8,}$/;

    if (username === 'admin@hr.com' && passwordRegex.test(password)) {
        localStorage.setItem('isLoggedIn', 'true');
        showDashboard();
        return true;
    } else {
        alert('Invalid credentials! Password must be at least 8 characters long and contain at least one number.');
        return false;
    }
};

/**
 * Removes the authentication state and redirects to the login view.
 */
export const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    showLogin();
};