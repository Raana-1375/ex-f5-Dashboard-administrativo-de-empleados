// src/scripts/main.js
import { showLogin, showDashboard, renderEmployees } from './ui.js';
import { handleLogin, handleLogout } from './auth.js';
import { fetchData } from './api.js';

let allEmployees = [];
let editingEmployeeId = null;
/**
 * Loads employees from localStorage if available, 
 * otherwise fetches from the API.
 */
const loadEmployees = async () => {
    const listContainer = document.getElementById('employee-list');
    const errorBanner = document.getElementById('error-message');

    // Show loading state
    listContainer.innerHTML = '<tr><td colspan="7">Loading employees...</td></tr>';

    try {
        // 1. Check if data exists in localStorage
        const savedEmployees = localStorage.getItem('myEmployees');

        if (savedEmployees) {
            allEmployees = JSON.parse(savedEmployees);
            renderEmployees(allEmployees);
            console.log("Data loaded from localStorage.");
        } else {
            // 2. Otherwise, fetch from API
            const employees = await fetchData('https://jsonplaceholder.typicode.com/users');
            allEmployees = employees;
            localStorage.setItem('myEmployees', JSON.stringify(allEmployees));
            renderEmployees(allEmployees);
            console.log("Data fetched from API and cached.");
        }

        // Hide error banner if successful
        if (errorBanner) errorBanner.classList.add('hidden');
        
    } catch (error) {
        console.error('Error loading employees:', error);
        if (errorBanner) errorBanner.classList.remove('hidden');
    }
};

// Event delegation for the table actions (Delete and Edit)
const listContainer = document.getElementById('employee-list');
if (listContainer) {
    listContainer.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        if (!row) return;
        const id = row.dataset.id;

        // Handle Delete action
        if (e.target.classList.contains('delete-btn')) {
            if (confirm("Are you sure you want to delete this employee?")) {
                allEmployees = allEmployees.filter(emp => emp.id != id);
                localStorage.setItem('myEmployees', JSON.stringify(allEmployees));
                renderEmployees(allEmployees);
            }
        }

        // Handle Edit action
        if (e.target.classList.contains('edit-btn')) {
            const employee = allEmployees.find(emp => emp.id == id);
            if (employee) {
                console.log("Editing employee:", employee);
                // Future: Modal logic will be implemented here
            }
        }
    });
}

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

    const modal = document.getElementById('add-employee-modal');
    const addBtn = document.getElementById('add-btn');
    const closeBtn = document.getElementById('close-modal-btn');

   if (addBtn && modal) {
        addBtn.addEventListener('click', () => {
            document.getElementById('modal-title').innerText = 'Add New Employee'; // BAŞLIĞI SIFIRLA
            modal.classList.remove('hidden');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }
});

const addEmployeeForm = document.getElementById('add-employee-form');
if (addEmployeeForm) {
    addEmployeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);

    if (editingEmployeeId) {
        // GÜNCELLEME İŞLEMİ
        allEmployees = allEmployees.map(emp => emp.id == editingEmployeeId ? {
            ...emp,
            name: formData.get('name'),
            email: formData.get('email'),
            address: {
            street: formData.get('street'),
            suite: formData.get('suite'),
            city: formData.get('city'),
            zipcode: formData.get('zipcode')
    }
} : emp);
        editingEmployeeId = null; // İş bitince hafızayı temizle
    } else {
        // YENİ EKLEME İŞLEMİ
        const newEmployee = {
            id: Date.now(),
            name: formData.get('name'),
            email: formData.get('email'),
                address: {
            street: formData.get('street'),
            suite: formData.get('suite'),
            city: formData.get('city'),
            zipcode: formData.get('zipcode')
    }
        };
        allEmployees.push(newEmployee);
    }

    localStorage.setItem('myEmployees', JSON.stringify(allEmployees));
    renderEmployees(allEmployees);
    document.getElementById('add-employee-modal').classList.add('hidden');
    addEmployeeForm.reset();
});
}

window.deleteEmployee = (id) => {
    if (confirm("Are you sure?")) {
        allEmployees = allEmployees.filter(emp => emp.id != id);
        localStorage.setItem('myEmployees', JSON.stringify(allEmployees));
        renderEmployees(allEmployees);
    }
};

window.editEmployee = (id) => {
    const employee = allEmployees.find(emp => emp.id == id);
    if (employee) {
        editingEmployeeId = id; 
        
        document.getElementById('modal-title').innerText = 'Edit Employee';
        document.getElementById('add-employee-modal').classList.remove('hidden');
        
        const form = document.getElementById('add-employee-form');
        
        // Temel bilgiler
        form.name.value = employee.name;
        form.email.value = employee.email;
        
        // Yeni adres yapısı (Eğer veri yoksa boş string atar)
        form.street.value = employee.address?.street || '';
        form.suite.value = employee.address?.suite || '';
        form.city.value = employee.address?.city || '';
        form.zipcode.value = employee.address?.zipcode || '';
    }
};