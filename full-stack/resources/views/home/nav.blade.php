<!-- Navbar -->
<nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
                <a class="text-2xl font-bold text-blue-600" href="{{ route('home') }}">TechComponent</a>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-4">
                <!-- Products Dropdown -->
                <div class="relative dropdown">
                    <button
                        class="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150">
                        <span>Componentes</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg>
                    </button>
                    <div
                        class="dropdown-menu absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
                        <div class="py-1">
                            <a href="{{ route('listComponent') }}"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Listar
                                Componentes</a>
                        </div>
                    </div>
                </div>

                <!-- Search Input (Desktop) -->
                <div class="relative">
                    <input type="text" placeholder="Buscar por nome..."
                        class="comp-searcher w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                <!-- Account Dropdown -->
                <div class="relative dropdown" id="accountDropdown">
                    <button
                        class="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-150">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span>Conta</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg>
                    </button>

                    <div
                        class="dropdown-menu absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
                        <div class="py-1" id="guestMenu">
                            <a onclick="openLoginModal()"
                                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 font-medium border-b border-gray-200 cursor-pointer">
                                <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                                        </path>
                                    </svg>
                                    <span>Login</span>
                                </div>
                            </a>
                            <a onclick="openRegisterModal()"
                                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 font-medium cursor-pointer">
                                <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z">
                                        </path>
                                    </svg>
                                    <span>Cadastrar</span>
                                </div>
                            </a>
                        </div>

                        <div class="py-1" id="authMenu">
                            <a onclick="handleLogout()"
                                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 font-medium cursor-pointer border-t border-gray-200">
                                <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                        </path>
                                    </svg>
                                    <span>Logout</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu Button -->
            <div class="md:hidden flex items-center space-x-2">
                <!-- Search Button (Mobile) -->
                <button id="searchBtn" class="p-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>

                <!-- Hamburger Menu -->
                <button id="menuBtn" class="p-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobileMenu" class="hidden md:hidden border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
            <!-- Products Mobile Dropdown -->
            <div>
                <button
                    class="mobile-dropdown-btn w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <span>Componentes</span>
                    <svg class="w-4 h-4 transform transition-transform" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="mobile-dropdown-content hidden pl-4 space-y-1 mt-1">
                    <a href="{{ route('listComponent') }}"
                        class="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100">Listar
                        Componentes</a>
                </div>
            </div>

            <!-- Account Mobile Section -->
            <div class="pt-4 border-t border-gray-200">
                <div class="space-y-1" id="guestMenuMobile">
                    <a onclick="openLoginModal()"
                        class="flex items-center space-x-3 px-3 py-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium cursor-pointer">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                            </path>
                        </svg>
                        <span>Login</span>
                    </a>
                    <a onclick="openRegisterModal()"
                        class="flex items-center space-x-3 px-3 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium cursor-pointer">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z">
                            </path>
                        </svg>
                        <span>Cadastrar</span>
                    </a>
                </div>

                <div class="space-y-1" id="authMenuMobile">
                    <a onclick="handleLogout()"
                        class="flex items-center space-x-3 px-3 py-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium cursor-pointer">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                            </path>
                        </svg>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</nav>

<!-- Search Modal (Mobile) -->
<div id="searchModal" class="hidden fixed inset-0 bg-white z-50">
    <div class="h-full flex flex-col">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Search</h2>
            <button id="closeSearchModal" class="p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>
        </div>

        <!-- Search Input -->
        <div class="p-4">
            <div class="relative">
                <input type="text" placeholder="Search..." autofocus
                    class="comp-searcher w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <svg class="absolute left-4 top-3.5 w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
        </div>

        <!-- Search Results/Content Area -->
        <div class="flex-1 overflow-y-auto p-4">
            <p class="text-gray-500 text-center mt-8">Start typing to search...</p>
        </div>
    </div>
</div>

<!-- Login Modal -->
<div id="loginModal" class="hidden fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
        <div class="p-6">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Login</h2>
                <button id="btnCloseLogin" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            <form id="loginForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" id="loginEmail" name="email" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="seu@email.com">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
                    <input type="password" id="loginPassword" name="password" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••">
                </div>

                <div class="flex items-center justify-between">
                    <label class="flex items-center">
                        <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                        <span class="ml-2 text-sm text-gray-600">Lembrar-me</span>
                    </label>
                    <a href="#" class="text-sm text-blue-600 hover:text-blue-800">Esqueceu a senha?</a>
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                    Entrar
                </button>

                <p class="text-center text-sm text-gray-600">
                    Não tem uma conta?
                    <button type="button" id="switchToRegister" class="text-blue-600 hover:text-blue-800 font-medium">
                        Cadastre-se
                    </button>
                </p>
            </form>
        </div>
    </div>
</div>

<!-- Register Modal -->
<div id="registerModal" class="hidden fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
        <div class="p-6">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Cadastro</h2>
                <button id="btnCloseRegister" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            <form id="registerForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                    <input type="text" id="registerName" name="name" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Seu nome completo">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" id="registerEmail" name="email" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="seu@email.com">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
                    <input type="password" id="registerPassword" name="password" required minlength="8"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••">
                    <p class="mt-1 text-xs text-gray-500">Mínimo de 8 caracteres</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha *</label>
                    <input type="password" id="registerPasswordConfirmation" name="password_confirmation" required
                        minlength="8"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••">
                </div>

                <div class="flex items-start">
                    <input type="checkbox" id="termsCheckbox" required
                        class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <label for="termsCheckbox" class="ml-2 text-sm text-gray-600">
                        Eu concordo com os <a href="#" class="text-blue-600 hover:text-blue-800">termos de uso</a> e
                        <a href="#" class="text-blue-600 hover:text-blue-800">política de privacidade</a>
                    </label>
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                    Criar Conta
                </button>

                <p class="text-center text-sm text-gray-600">
                    Já tem uma conta?
                    <button type="button" id="switchToLogin" class="text-blue-600 hover:text-blue-800 font-medium">
                        Faça login
                    </button>
                </p>
            </form>
        </div>
    </div>
</div>