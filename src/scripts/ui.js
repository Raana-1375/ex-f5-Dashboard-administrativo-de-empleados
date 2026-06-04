// ui.js - Handles UI transitions and element visibility

/**
 * Shows the login section and hides the dashboard.
 * Used when the user is not authenticated or logs out.
 */
export const showLogin = () => {
    // Reveal the login form container
    document.getElementById('login-section').classList.remove('hidden');
    // Hide the employee gallery/dashboard
    document.getElementById('employee-gallery').classList.add('hidden');
    
    // Hide the logout button since the user is not logged in
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.classList.add('hidden');
};

/**
 * Hides the login section and reveals the dashboard.
 * Used upon successful authentication.
 */
export const showDashboard = () => {
    // Hide the login form container
    document.getElementById('login-section').classList.add('hidden');
    // Reveal the employee gallery/dashboard
    document.getElementById('employee-gallery').classList.remove('hidden');
    
    // Display the logout button for authenticated sessions
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
};