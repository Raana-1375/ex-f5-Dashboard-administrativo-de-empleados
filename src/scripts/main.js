// src/scripts/main.js
import { handleLogin, handleLogout } from './auth.js';
import { showDashboard, showLogin } from './ui.js';
import { fetchData } from './api.js';

let allEmployees = [];

const loadEmployees = async () => {
    const listContainer = document.getElementById('employee-list');
    const errorBanner = document.getElementById('error-message');
    
    try {
        listContainer.innerHTML = '<tr><td colspan="5">Loading employees...</td></tr>';
        
        const employees = await fetchData('https://jsonplaceholder.typicode.com/users');
        
        if (employees && listContainer) {
            allEmployees = employees;
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
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
        loadEmployees();
    } else {
        showLogin();
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = event.target.email.value;
            const password = event.target.password.value;
            
            if (handleLogin(email, password)) {
                showDashboard(); 
                loadEmployees();
            }
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            handleLogout();
            showLogin();
        });
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterEmployees(e.target.value);
        });
    }

    // Modal interaction logic
    const modal = document.getElementById('add-employee-modal');
    const addBtn = document.getElementById('add-btn');
    const closeBtn = document.getElementById('close-modal-btn');

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            try {
                modal.classList.remove('hidden');
            } catch (error) {
                console.error('Failed to open modal:', error);
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            try {
                modal.classList.add('hidden');
            } catch (error) {
                console.error('Failed to close modal:', error);
            }
        });
    }
});