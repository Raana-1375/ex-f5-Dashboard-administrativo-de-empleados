// ui.js

export const showLogin = () => {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('employee-gallery').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'none';
};

export const showDashboard = () => {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('employee-gallery').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'block';
};