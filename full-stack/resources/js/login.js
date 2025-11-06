const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
    };

    if (!null) {
        await updateComponent(formData);
    } else {
        await createComponent(formData);
    }
});

componentModal.addEventListener('click', (e) => {
    if (e.target === componentModal) closeModal();
});
