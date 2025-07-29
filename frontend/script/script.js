// Main Page Scripting and Logics...

document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById('content');
    const navLinks = document.querySelectorAll('.navigation a');
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    const userDropdown = document.getElementById('userDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const settingsTrigger = document.getElementById("settingsTrigger");
    const settingsPanel = document.getElementById("settingsPanel");
    const themeToggleCheckbox = document.getElementById("themeToggle");
    const nameSpan = document.getElementById("userNameDisplay");

    // ✅ Sidebar toggle
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        window.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    // ✅ User dropdown
    if (userDropdown && dropdownMenu) {
        userDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('hidden');
        });

        window.addEventListener('click', (e) => {
            if (!userDropdown.contains(e.target)) {
                dropdownMenu.classList.add('hidden');
            }
        });
    }

    // ✅ Default load dashboard
    if (window.location.pathname.endsWith("main.html") && content) {
        loadPage("./Pages/dashboardPage.html");
    }

    // ✅ Handle sidebar link navigation
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const pageUrl = link.getAttribute("data-page");

            loadPage(pageUrl);

            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    function loadPage(url) {
        fetch(url)
            .then(res => res.text())
            .then(html => {
                content.innerHTML = html;

                if (url.includes("dashboardPage")) loadScript("./js/dashboard.js");
                if (url.includes("profilePage")) loadScript("./js/profile.js");
            })
            .catch(err => {
                content.innerHTML = `<p>Error loading page: ${err}</p>`;
            });
    }

    function loadScript(scriptPath) {
        const existingScript = document.querySelector(`script[src="${scriptPath}"]`);
        if (existingScript) existingScript.remove();

        const script = document.createElement("script");
        script.src = scriptPath;
        script.defer = true;
        document.body.appendChild(script);
    }

    // ✅ Load user name from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
        nameSpan.textContent = user.name;
    } else {
        nameSpan.textContent = "Guest";
    }

    // ✅ Settings panel toggle like WhatsApp
    settingsTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        settingsPanel.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
        if (
            !settingsPanel.contains(e.target) &&
            !settingsTrigger.contains(e.target)
        ) {
            settingsPanel.classList.remove("show");
        }
    });

    // ✅ Theme from localStorage
    function applyThemeFromStorage() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            themeToggleCheckbox.checked = true;
        } else {
            document.body.classList.remove("dark-mode");
            themeToggleCheckbox.checked = false;
        }
    }

    applyThemeFromStorage();

    // ✅ Theme toggle change
    themeToggleCheckbox.addEventListener("change", () => {
        if (themeToggleCheckbox.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    });
});

let cartItems = [];

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        if (cartItems.length > 0) {
            badge.textContent = cartItems.length;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
}