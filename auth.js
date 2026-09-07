let users = JSON.parse(localStorage.getItem("users")) || [];

const regForm = document.getElementById("reg-form");
if (regForm) {
    regForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("reg-name").value.trim();
        const pass = document.getElementById("reg-pass").value.trim();
        const msg = document.getElementById("reg-message");
        if (!name || !pass) {
        msg.textContent = "Please fill out all fields.";
        msg.style.color = "red";
        return;
        }

        const existing = users.find(u => u.name === name);
        if (existing) {
        msg.textContent = "Username already exists!";
        msg.style.color = "red";
        return;
        }

        users.push({ name: name, password: pass });
        localStorage.setItem("users", JSON.stringify(users));
        msg.textContent = "Regestration successful! You can now login.";
        msg.style.color = "green";
        regForm.reset();
    });
}


const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("login-name").value.trim();
        const pass = document.getElementById("login-pass").value.trim();
        const msg = document.getElementById("login-message");

        const user = users.find(u => u.name === name && u.password === pass);
        if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", name);
        msg.textContent = "Login successful! Redirecting...";
        msg.style.color = "green";
        setTimeout(() => (window.location.href = "index.html"), 1000);
        } else {
        msg.textContent = "Invalid username or password.";
        msg.style.color = "red";
        }
    });
}