export function handleLogout() {
    console.log("User logged out");
    // We will handle localStorage clearing and redirection here later
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('employee-gallery').style.display = 'none';
}