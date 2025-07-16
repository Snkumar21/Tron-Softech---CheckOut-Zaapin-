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