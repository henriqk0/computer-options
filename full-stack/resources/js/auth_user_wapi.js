import { showSuccess, showError  } from "./utils/alerts";


(function() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    function openLoginModal() {
        loginModal.classList.remove('hidden');
        registerModal.classList.add('hidden');
    }

    function openRegisterModal() {
        registerModal.classList.remove('hidden');
        loginModal.classList.add('hidden');
    }

    function closeLoginModal() {
        loginModal.classList.add('hidden');
        loginForm.reset();
    }

    function closeRegisterModal() {
        registerModal.classList.add('hidden');
        registerForm.reset();
    }


    async function handleLogin(e) {
        e.preventDefault();

        const formData = {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value
        };

        try {
            const response = await axios.post('/login', formData);
            closeLoginModal();

            if (response.data.token) {
                showSuccess(response.data.message || 'Login realizado com sucesso!');
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem('auth_user', JSON.stringify(response.data.user));
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                showError(errors.join(', '));
            } else {
                showError(error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.');
            }
        }
    }

    async function handleRegister(e) {
        e.preventDefault();

        const password = document.getElementById('registerPassword').value;
        const passwordConfirmation = document.getElementById('registerPasswordConfirmation').value;

        if (password !== passwordConfirmation) {
            showError('As senhas não coincidem.');
            return;
        }

        const formData = {
            name: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value,
            password: password,
            password_confirmation: passwordConfirmation
        };

        try {
            const response = await axios.post('/register', formData);

            if (response.data.token) {
                showSuccess(response.data.message || 'Cadastro realizado com sucesso!');
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem('auth_user', JSON.stringify(response.data.user));
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }

            closeRegisterModal();

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                showError(errors.join(', '));
            } else {
                showError(error.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
            }
        }
    }

    async function handleLogout(trueLogout = true) {
        try {
            await axios.post('/logout');

            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            delete axios.defaults.headers.common['Authorization'];

            // not send msg if axios intercept calls this function
            if (trueLogout) showSuccess('Logout realizado com sucesso!');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            showError('Erro ao fazer logout.');
        }
    }

    // ========================
    // Axios Interceptor
    // ========================
    axios.interceptors.response.use(
        response => response,

        async error => {
            const originalRequest = error.config;

            // if request was already retried, stop here
            if (originalRequest._retry) {
                return Promise.reject(error);
            }

            // if unauthorized, attempt refresh
            if (error.response?.status === 401) {
                originalRequest._retry = true;

                try {
                    const oldToken = localStorage.getItem('auth_token');
                    if (!oldToken) throw new Error('Missing token');

                    // call refresh endpoint with the expired token
                    const refreshResponse = await axios.post(
                        '/refresh',
                        {},
                        { headers: { Authorization: `Bearer ${oldToken}` } }
                    );

                    const newToken = refreshResponse.data.token;

                    // save new token
                    localStorage.setItem('auth_token', newToken);

                    // update global axios Authorization header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

                    // update the original request Authorization header
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                    // retry the oddriginal request with new token
                    return axios(originalRequest);

                } catch (refreshError) {
                    // refresh failed, then logout
                    handleLogout(false);
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    document.querySelectorAll('.comp-searcher').forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' ) {
                const toSearchValue = e.target.value;
                const url = route(`searchComponent`, { toSearch: toSearchValue });
                window.location.href = url;
            }
        });
    });

    document.getElementById('btnCloseLogin').addEventListener('click', closeLoginModal);
    document.getElementById('btnCloseRegister').addEventListener('click', closeRegisterModal);

    document.getElementById('switchToRegister').addEventListener('click', openRegisterModal);
    document.getElementById('switchToLogin').addEventListener('click', openLoginModal);

    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);

    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) closeLoginModal();
    });

    registerModal.addEventListener('click', (e) => {
        if (e.target === registerModal) closeRegisterModal();
    });

    window.openLoginModal = openLoginModal;
    window.openRegisterModal = openRegisterModal;
    window.handleLogout = handleLogout;

    // to remove unnused buttons to user controll
    const token = localStorage.getItem('auth_token');
    const guestMenu = document.getElementById('guestMenu');
    const guestMenuMobile = document.getElementById('guestMenuMobile');
    const authMenu = document.getElementById('authMenu');
    const authMenuMobile = document.getElementById('authMenuMobile');
    const reviewsLink = document.getElementById('reviewsLink');
    const reviewsLinkMobile = document.getElementById('reviewsLinkMobile');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        if(guestMenu) guestMenu.remove();
        if(guestMenuMobile) guestMenuMobile.remove();
    }
    else {
        if(authMenu) authMenu.remove();
        if(authMenuMobile) authMenuMobile.remove();
        if(reviewsLink) reviewsLink.remove();
        if(reviewsLinkMobile) reviewsLinkMobile.remove();
    }

    const user = JSON.parse(localStorage.getItem('auth_user'));
    if (user) {
        console.log(user);
    }
})();
