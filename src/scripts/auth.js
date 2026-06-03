// auth.js
import { showDashboard, showLogin } from './ui.js';

export const handleLogin = (username, password) => {
    // Check if password has at least 8 characters
    if (username === 'admin' && password === '12345678') {
        showDashboard(); 
        return true;
    } else {
        alert('Invalid credentials or password too short!');
        return false;
    }
};

export const handleLogout = () => {
    showLogin();
};