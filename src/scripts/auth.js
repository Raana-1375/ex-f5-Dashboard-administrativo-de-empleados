// auth.js
import { showDashboard, showLogin } from './ui.js';

export const handleLogin = (username, password) => {
    if (username === 'admin' && password === '12345678') {
        localStorage.setItem('isLoggedIn', 'true'); // Oturumu kaydet
        showDashboard();
        return true;
    } else {
        alert('Invalid credentials or password too short!');
        return false;
    }
};

export const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Oturumu sil
    showLogin();
};