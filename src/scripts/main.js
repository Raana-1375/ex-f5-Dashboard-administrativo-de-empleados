// main.js
import { handleLogin } from './auth.js';
import { showDashboard, showLogin } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Oturum kontrolü
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
    } else {
        showLogin();
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = event.target.username.value;
            const password = event.target.password.value;
            handleLogin(username, password);
        });
    }

    // Logout butonunu bağlayalım
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            import('./auth.js').then(module => module.handleLogout());
        });
    }
});