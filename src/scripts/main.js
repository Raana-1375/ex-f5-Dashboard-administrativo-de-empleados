// src/scripts/main.js
import { handleLogin, handleLogout } from './auth.js';
import { showDashboard, showLogin } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Session check on page load
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
    } else {
        showLogin();
    }

    // 2. Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Ensure these match your HTML input IDs
            const email = event.target.email.value;
            const password = event.target.password.value;
            handleLogin(email, password);
        });
    }

    // 3. Logout button click
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            handleLogout();
        });
    }
});