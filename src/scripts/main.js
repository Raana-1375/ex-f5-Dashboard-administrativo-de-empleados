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
import { handleLogin } from './auth.js';

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    
    handleLogin(email, password);
});