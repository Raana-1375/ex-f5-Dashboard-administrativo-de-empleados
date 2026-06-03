import { handleLogout } from './auth.js';
import { showLogin } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    showLogin();
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
});