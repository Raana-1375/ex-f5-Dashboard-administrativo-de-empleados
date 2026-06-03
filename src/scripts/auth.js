// auth.js
import { showDashboard, showLogin } from './ui.js';

export const handleLogin = (username, password) => {
    // Basic validation for now; will be replaced by API calls later
    if (username === 'admin' && password === '1234') {
        showDashboard(); 
        return true;
    } else {
        alert('Invalid username or password!');
        return false;
    }
};

export const handleLogout = () => {
    showLogin();
};