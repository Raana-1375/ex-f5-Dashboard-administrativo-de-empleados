import { showDashboard, showLogin } from './ui.js';
import { fetchData } from './api.js';

const renderEmployees = (employees) => {
    const listContainer = document.getElementById('employee-list');
    if (!listContainer) return;
    
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

const loadEmployees = async () => {
    const listContainer = document.getElementById('employee-list');
    const errorBanner = document.getElementById('error-message');
    
    try {
        listContainer.innerHTML = '<tr><td colspan="5">Loading employees...</td></tr>';
        const employees = await fetchData('https://jsonplaceholder.typicode.com/users');
        
        if (employees) {
            errorBanner.classList.add('hidden');
            renderEmployees(employees);
        }
    } catch (error) {
        console.error('Error:', error);
        if (errorBanner) errorBanner.classList.remove('hidden');
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
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basit bir başarılı giriş simülasyonu
            localStorage.setItem('isLoggedIn', 'true');
            showDashboard();
            loadEmployees();
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            showLogin();
        });
    }
});