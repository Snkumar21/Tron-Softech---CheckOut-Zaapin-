// User Dropdown Functionality--
const userDropdown = document.getElementById('userDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');

    userDropdown.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });

    // Close dropdown if clicked outside
    window.addEventListener('click', (e) => {
        if (!userDropdown.contains(e.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

// Handle page switching
const navLinks = document.querySelectorAll('.navigation a');
const pages = document.querySelectorAll('.page-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-page');

        pages.forEach(page => {
            page.classList.add('hidden');
        });

        document.getElementById(targetId).classList.remove('hidden');

        // Highlight active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Handle COD/Online toggle in checkout
const codRadio = document.querySelector('input[value="cod"]');
const onlineRadio = document.querySelector('input[value="online"]');
const codSection = document.getElementById('cod-section');
const onlineSection = document.getElementById('online-section');

codRadio.addEventListener('change', () => {
    codSection.classList.remove('hidden');
    onlineSection.classList.add('hidden');
});

onlineRadio.addEventListener('change', () => {
    onlineSection.classList.remove('hidden');
    codSection.classList.add('hidden');
});

// Confirm COD Order
const confirmBtn = document.querySelector('.confirm-btn');
confirmBtn.addEventListener('click', () => {
    const address = document.querySelector('#cod-section textarea').value.trim();

    if (!address) {
        alert("Please enter your delivery address.");
        return;
    }

    // Hide Checkout Page
    document.getElementById('checkoutPage').classList.add('hidden');

    // Show Order Success Page
    document.getElementById('orderSuccess').classList.remove('hidden');
});

// Go Back to Home
function goToHome() {
    document.getElementById('orderSuccess').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
}

// 🎯 Handle COD Confirm Button
document.querySelector('.confirm-btn').addEventListener('click', function () {
    const address = document.querySelector('#cod-section textarea').value.trim();

    if (address === "") {
        alert("Please enter your delivery address.");
        return;
    }

    // Hide checkout page
    document.getElementById('checkoutPage').classList.add('hidden');

    // Show order success section
    document.getElementById('orderSuccess').classList.remove('hidden');
});

// 🔁 Go back to home after success
function goToHome() {
    document.getElementById('orderSuccess').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');

    // Update active sidebar (optional)
    document.querySelectorAll('.navigation a').forEach(link => link.classList.remove('active'));
    document.querySelector('[data-page="homePage"]').classList.add('active');
}