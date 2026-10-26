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

// Navigation //
document.querySelectorAll('[data-target]').forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');

        console.log('clicked:', targetId);

        document.querySelectorAll('.view-pane').forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(targetId);

        if (targetPage) {
            targetPage.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sidebarButtons = document.querySelectorAll('.nav-item[data-target]');
    const viewPanels = document.querySelectorAll('.view-pane');
    const allNavTriggers = document.querySelectorAll('[data-target]');

    document.querySelectorAll('[data-target]').forEach(item => {
        item.addEventListener('click', () => {
            console.log(item.getAttribute('data-target'));
        });
    });

    function navigateTo(targetId) {
        viewPanels.forEach(pane => pane.classList.remove('active'));
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
            targetPane.classList.add('active');
        }

        sidebarButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                btn.classList.remove('active');
            }
        });

        allNavTriggers.forEach(element => {
            element.addEventListener('click', () => {
                console.log("Clicked target:", targetId);
                console.log("JS loaded!");
                const targetId = element.getAttribute('data-target');
                if (targetId) {
                    navigateTo(targetId);
                }
            });
        });
    }
});

// Calendar //
let currentDate = new Date();
const today = new Date();

const monthYearLabel = document.getElementById('month-year-label');
const datesContainer = document.getElementById('dates-container');
const selectedDateDisplay = document.getElementById('selected-date-display');
const prevBtn = document.getElementById('prev-month-btn');
const nextBtn = document.getElementById('next-month-btn');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYearLabel.textContent = `${monthNames[month]} ${year}`;
    datesContainer.innerHTML = '';
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement('span');
        emptyCell.className = 'date-cell empty';
        datesContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= totalDays; day++) {
        const dateBtn = document.createElement('button');
        dateBtn.className = 'date-cell';
        dateBtn.textContent = day;

        const isToday = (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );

        if (isToday) {
            dateBtn.classList.add('active');
            updateDateSidebar(new Date(year, month, day));
        }

        dateBtn.addEventListener('click', () => {
            document.querySelectorAll('.date-cell').forEach(c => c.classList.remove('active'));
            dateBtn.classList.add('active');
            updateDateSidebar(newDate(year, month, day));
        });

        datesContainer.appendChild(dateBtn);
    }
}

function updateDateSidebar(dateObj) {
    const dayName = dayNames[dateObj.getDay()];
    const monthName = monthNames[dateObj.getMonth()];
    const dateNum = dateObj.getDate();

    if (selectedDateDisplay) {
        selectedDateDisplay.textContent = `${dayName}, ${monthName} ${dateNum}`;
    }
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
});

// Year //
const currentYear = new Date().getFullYear();

document.querySelector('.year').textContent = currentYear;

// Store //
