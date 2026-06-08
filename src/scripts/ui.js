// ui.js - Handles UI transitions and element visibility

/**
 * Shows the login section and hides the dashboard.
 */
export const showLogin = () => {
    // Reveal the login form container
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('employee-gallery').classList.add('hidden');

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.classList.add('hidden');
};

/**
 * Hides the login section and reveals the dashboard.
 */
export const showDashboard = () => {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('employee-gallery').classList.remove('hidden');
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
};
export const renderEmployees = (employees) => {
    const employeeList = document.getElementById('employee-list');
    
    employeeList.innerHTML = employees.map(emp => `
        <tr data-id="${emp.id}">
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.address?.street || '-'}</td>
            <td>${emp.address?.suite || '-'}</td>
            <td>${emp.address?.city || '-'}</td>
            <td>${emp.address?.zipcode || '-'}</td>
            <td>
                <button onclick="window.editEmployee(${emp.id})">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        </tr>
    `).join('');
};