// src/scripts/main.js
import { handleLogin, handleLogout } from './auth.js';
import { showDashboard, showLogin } from './ui.js';
import { fetchData } from './api.js';

/**
 * Fetches employee data from the API and renders it into the table.
 * Displays an error banner if the request fails.
 */
const loadEmployees = async () => {
    const listContainer = document.getElementById('employee-list');
    const errorBanner = document.getElementById('error-message');
    
    // UI feedback: Loading indicator could be added here
    const employees = await fetchData('https://jsonplaceholder.typicode.com/users');

    if (employees && listContainer) {
        // Hide error banner and render the list
        errorBanner.classList.add('hidden');
        listContainer.innerHTML = employees.map(user => `
            <tr>
                <td>${user.name}<br><small>${user.email}</small></td>
                <td>Staff Member</td>
                <td>${user.company.name}</td>
                <td>${user.address.city}</td>
                <td><button>Edit</button> <button>Delete</button></td>
            </tr>
        `).join('');
    } else {
        // Show error banner on failure
        errorBanner.classList.remove('hidden');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Session check on page load
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
        loadEmployees();
    } else {
        showLogin();
    }

    // 2. Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = event.target.email.value;
            const password = event.target.password.value;
            
            // Updated: Ensure Dashboard is shown BEFORE loading data
            if (handleLogin(email, password)) {
                showDashboard(); 
                loadEmployees();
            }
        });
    }

    // 3. Logout button click
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            handleLogout();
            showLogin(); // Add this to reset UI on logout
        });
    }
    
    // Search functionality - Wrapped in a check to avoid errors if not on dashboard
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#employee-list tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
});