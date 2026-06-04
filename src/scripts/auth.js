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
        // Save the login state to localStorage
        localStorage.setItem('isLoggedIn', 'true');
        showDashboard();
        return true;
    } else {
        // Display error if credentials are wrong or policy is not met
        alert('Invalid credentials! Password must be at least 8 characters long and contain at least one number.');
        return false;
    }
};

/**
 * Removes the authentication state and redirects to the login view.
 */
export const handleLogout = () => {
    // Remove the session record from localStorage
    localStorage.removeItem('isLoggedIn');
    showLogin();
};