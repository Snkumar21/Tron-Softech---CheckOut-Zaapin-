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
const codSection = document.getElementById('cod-section');
const onlineSection = document.getElementById('online-section');

document.querySelectorAll('input[name="payment"]').forEach((input) => {
    input.addEventListener('change', function () {
        if (this.value === 'cod') {
            codSection.classList.remove('hidden');
            onlineSection.classList.add('hidden');
        } else {
            codSection.classList.add('hidden');
            onlineSection.classList.remove('hidden');
        }
    });
});