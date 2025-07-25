document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById('content');
    const navLinks = document.querySelectorAll('.navigation a');

    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');

    const userDropdown = document.getElementById('userDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');

    // ✅ Sidebar toggle
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        // Optional: Hide sidebar on outside click
        window.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    // ✅ User dropdown toggle
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

    // ✅ Load default page (Dashboard) on main.html
    if (window.location.pathname.endsWith("main.html") && content) {
        loadPage("./Pages/dashboardPage.html");
    }

    // ✅ Handle sidebar nav links
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const pageUrl = link.getAttribute("data-page");

            loadPage(pageUrl);

            // Active state
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // ✅ Load external page content into #content
    function loadPage(url) {
        fetch(url)
            .then(res => res.text())
            .then(html => {
                content.innerHTML = html;

                // Load dynamic script if required
                if (url.includes("dashboardPage")) {
                    loadScript("./js/dashboard.js");
                }
                if (url.includes("profilePage")) {
                    loadScript("./js/profile.js");
                }
            })
            .catch(err => {
                content.innerHTML = `<p>Error loading page: ${err}</p>`;
            });
    }

    // ✅ Load external JS
    function loadScript(scriptPath) {
        const existingScript = document.querySelector(`script[src="${scriptPath}"]`);
        if (existingScript) existingScript.remove();

        const script = document.createElement("script");
        script.src = scriptPath;
        script.defer = true;
        document.body.appendChild(script);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const nameSpan = document.getElementById("userNameDisplay");

    if (user && user.name) {
        nameSpan.textContent = user.name;
    } else {
        nameSpan.textContent = "Guest";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const settingsTrigger = document.getElementById("settingsTrigger");
    const settingsPopup = document.getElementById("settingsPopup");

    settingsTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        settingsPopup.classList.toggle("hidden");
    });

    window.addEventListener("click", (e) => {
        if (!settingsPopup.contains(e.target) && !settingsTrigger.contains(e.target)) {
            settingsPopup.classList.add("hidden");
        }
    });
});