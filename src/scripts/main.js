// main.js
import { handleLogin } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');

    // Simple event listener for login simulation
    // Ensure you have an element with id="login-form" in your index.html
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = event.target.username.value;
            const password = event.target.password.value;
            
            handleLogin(username, password);
        });
    }
});