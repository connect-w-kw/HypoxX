// Authentication & Access Guard //
const isLoggedIn = localStorage.getItem("isLoggedIn");
const currentUser = localStorage.getItem("currentUser");

const guestView = document.getElementById("guest-view");
const dashboardView = document.getElementById("dashboard-view");
const navActions = document.getElementById("nav-actions");

if (isLoggedIn === "true" && currentUser) {
    if (guestView) guestView.style.display = "none";
    if (dashboardView) dashboardView.style.display = "grid";

    navActions.innerHTML = `
        <span class="user-tag">${currentUser}</span>
        <button id="logout-btn" class="btn-danger btn-sm">Log Out</button>
    `;

    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        window.location.reload();
    });
} else {
    if (guestView) guestView.style.display = "grid";
    if (dashboardView) dashboardView.style.display = "none";
}

// View Panes //
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const viewPanes = document.querySelectorAll('.view-pane');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            viewPanes.forEach(pane => pane.classList.remove('active'));
            const activePane = document.getElementById(targetId);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });
});

// Year //
const currentYear = new Date().getFullYear();

document.querySelector('.year').textContent = currentYear;

// Store //
