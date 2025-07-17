// Payment Functionality--

const codSection = document.getElementById('cod-section');
const onlineSection = document.getElementById('online-section');
const paymentOptions = document.getElementsByName('payment');

paymentOptions.forEach((option) => {
    option.addEventListener('change', () => {
        if (option.value === 'cod') {
            codSection.classList.remove('hidden');
            onlineSection.classList.add('hidden');
        } else if (option.value === 'online') {
            onlineSection.classList.remove('hidden');
            codSection.classList.add('hidden');
        }
    });
});

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