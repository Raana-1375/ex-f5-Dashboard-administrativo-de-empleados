// src/scripts/main.js
import { handleLogin, handleLogout } from './auth.js';
import { showDashboard, showLogin } from './ui.js';
import { fetchData } from './api.js';

let allEmployees = [];

const loadEmployees = async () => {
    const listContainer = document.getElementById('employee-list');
    const errorBanner = document.getElementById('error-message');
    
    try {
        if (listContainer) listContainer.innerHTML = '<tr><td colspan="5">Loading employees...</td></tr>';
        
        const employees = await fetchData('https://jsonplaceholder.typicode.com/users');
        
        if (employees && listContainer) {
            allEmployees = employees;
            if (errorBanner) errorBanner.classList.add('hidden');
            renderEmployees(employees);
        }
    } catch (error) {
        console.error('Error loading employees:', error);
        if (errorBanner) errorBanner.classList.remove('hidden');
    }
};

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
    // 1. Auth Durum Kontrolü
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
        loadEmployees();
    } else {
        showLogin();
    }

    // 2. Login Form İşlemleri
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

    // 3. Logout İşlemi
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            handleLogout();
            showLogin();
        });
    }

    // 4. Arama Çubuğu
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterEmployees(e.target.value);
        });
    }

    // 5. Modal İşlemleri
    const modal = document.getElementById('add-employee-modal');
    const addBtn = document.getElementById('add-btn');
    const closeBtn = document.getElementById('close-modal-btn');

    if (addBtn && modal) {
        addBtn.addEventListener('click', () => {
            try {
                modal.classList.remove('hidden');
            } catch (error) {
                console.error('Failed to open modal:', error);
            }
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            try {
                modal.classList.add('hidden');
            } catch (error) {
                console.error('Failed to close modal:', error);
            }
        });
    }
});
// Add Employee Form Yönetimi
const addEmployeeForm = document.getElementById('add-employee-form');
if (addEmployeeForm) {
    addEmployeeForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Sayfa yenilenmesin

        // Formdan verileri çek
        const formData = new FormData(addEmployeeForm);
        const newEmployee = {
            id: Date.now(), // Basit bir benzersiz ID
            name: formData.get('name'),
            email: formData.get('email'),
            company: { name: formData.get('department') }, // API yapısına uygun tutuyoruz
            address: { city: formData.get('address') }
        };

        // Listeye ekle
        allEmployees.push(newEmployee);
        
        // Listeyi güncelle
        renderEmployees(allEmployees);
        
        // Modalı kapat ve formu temizle
        document.getElementById('add-employee-modal').classList.add('hidden');
        addEmployeeForm.reset();
    });
}