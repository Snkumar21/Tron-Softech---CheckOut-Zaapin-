document.addEventListener('DOMContentLoaded', function () {

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

    // 📄 Handle page switching
    const navLinks = document.querySelectorAll('.navigation a');
    const pages = document.querySelectorAll('.page-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-page');

            pages.forEach(page => page.classList.add('hidden'));
            document.getElementById(targetId).classList.remove('hidden');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 💳 Payment Method Toggle
    const paymentInputs = document.querySelectorAll('input[name="payment"]');
    const codSection = document.getElementById('cod-section');
    const onlineSection = document.getElementById('online-section');

    paymentInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value === 'cod') {
                codSection.classList.remove('hidden');
                onlineSection.classList.add('hidden');
            } else {
                onlineSection.classList.remove('hidden');
                codSection.classList.add('hidden');
            }
        });
    });

    // ✅ Confirm COD Order
    const confirmBtn = document.querySelector('.confirm-btn');
    confirmBtn.addEventListener('click', () => {
        const address = document.querySelector('#cod-section textarea').value.trim();
        if (!address) {
            alert("Please enter your delivery address.");
            return;
        }

        document.getElementById('checkoutPage').classList.add('hidden');
        document.getElementById('orderSuccess').classList.remove('hidden');
    });

    // 🔁 Go back to home
    function goToHome() {
        document.getElementById('orderSuccess').classList.add('hidden');
        document.getElementById('homePage').classList.remove('hidden');

        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', function () {
                document.querySelectorAll('.page-section').forEach(p => p.classList.add('hidden'));
                document.getElementById(this.dataset.page).classList.remove('hidden');
            });
        });
    }

});