// --- Index Page Script ---
// 🔽 User dropdown toggle
const userDropdown = document.getElementById('userDropdown');
const dropdownMenu = document.getElementById('dropdownMenu');

userDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('hidden');
});

window.addEventListener('click', () => {
    dropdownMenu.classList.add('hidden');
});

// Main Page Content Fetcher...
const content = document.getElementById('content');
const navLinks = document.querySelectorAll('.navigation a');

// Load default page (dashboard) on first load
window.addEventListener('DOMContentLoaded', () => {
    loadPage('dashboardPage.html');
});

// Function to load pages
function loadPage(url) {
    fetch(url)
        .then(res => res.text())
        .then(data => {
            content.innerHTML = data;
        })
        .catch(err => {
            content.innerHTML = `<p>Error loading page: ${err}</p>`;
        });
}

// Handle sidebar navigation
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const pageUrl = link.getAttribute('data-page');
        loadPage(pageUrl);

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// --- Dashboard Page Script ---

let activeCategory = 'all'; // keep track of selected category

function searchAndFilter() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesCategory = (activeCategory === 'all' || category === activeCategory);
        const matchesSearch = name.includes(query);

        card.style.display = (matchesCategory && matchesSearch) ? 'block' : 'none';
    });
}

function filterCategory(event, category) {
    activeCategory = category;

    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    searchAndFilter(); // apply current filter + search
}