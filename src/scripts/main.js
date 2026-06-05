// src/scripts/main.js
import { handleLogin, handleLogout } from './auth.js';
import { showDashboard, showLogin } from './ui.js';
import { fetchData } from './api.js';

// Global variable to store employee data for filtering
let allEmployees = [];

const loadEmployees = async () => {
    const listContainer = document.getElementById('employee-list');
    const errorBanner = document.getElementById('error-message');
    
    try {
        // UI feedback: Loading...
        listContainer.innerHTML = '<tr><td colspan="5">Loading employees...</td></tr>';
        
        const employees = await fetchData('https://jsonplaceholder.typicode.com/users');
        
        if (employees && listContainer) {
            allEmployees = employees; // Save data globally
            errorBanner.classList.add('hidden');
            renderEmployees(employees);
        }
    } catch (error) {
        console.error('Error loading employees:', error);
        errorBanner.classList.remove('hidden');
    }
};

const renderEmployees = (employees) => {
    const listContainer = document.getElementById('employee-list');
    listContainer.innerHTML = employees.map(user => `
        <tr>
            <td>${user.name}<br><small>${user.email}</small></td>
            <td>Staff Member</td>
            <td>${user.company.name}</td>
            <td>${user.address.city}</td>
            <td><button>Edit</button> <button>Delete</button></td>
        </tr>
    `).join('');
};

// New Filter Function with Error Handling
const filterEmployees = (term) => {
    try {
        const filtered = allEmployees.filter(user => 
            user.name.toLowerCase().startsWith(term.toLowerCase())
        );
        renderEmployees(filtered);
    } catch (error) {
        console.error('Filtering error:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Session check...
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
        loadEmployees();
    } else {
        showLogin();
    }

    // Search event listener
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterEmployees(e.target.value);
        });
    }

    // ... (diğer login/logout event'leri aynen kalacak)
});