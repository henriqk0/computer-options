<!DOCTYPE html>
<html lang="en">

<head>
    @include('home.head')
</head>

<body>
    @include('home.nav')

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Componentes cadastrados</h1>
            <p class="text-gray-600 mt-2">Gerencie os diferentes componentes disponíveis</p>
            <button id="btnAddComponent"
                class="flex items-center mt-4 space-x-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-150">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                <span>Adicionar Componente</span>
            </button>
        </div>

        <!-- Loading Spinner -->
        <div id="loading" class="hidden flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- Error Message -->
        <div id="errorMessage" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <span id="errorText"></span>
        </div>

        <!-- Success Message -->
        <div id="successMessage"
            class="hidden bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <span id="successText"></span>
        </div>

        <!-- Table View (Tablet and Desktop) -->
        <div id="tableView" class="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nome</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Categoria</th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                URL Melhor Preço</th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                Data Melhor Preço</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Melhor Preço</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody" class="bg-white divide-y divide-gray-200">
                        <!-- Rows will be inserted here -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Card View (Mobile) -->
        <div id="cardView" class="md:hidden space-y-4">
            <!-- Cards will be inserted here -->
        </div>
    </div>

    <!-- Modal for Add/Edit Component -->
    <div id="componentModal" class="hidden fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 id="modalTitle" class="text-2xl font-bold text-gray-900">Adicionar Componente</h2>
                    <button id="btnCloseModal" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form id="componentForm" class="space-y-4">
                    <input type="hidden" id="componentId" name="anycomponent_id">

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nome do Componente *</label>
                        <input type="text" id="nameComponent" name="nameComponent" required maxlength="50"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                        <select id="categoryLevel" name="categoryLevel" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">Selecione...</option>
                            <option value="high-end">High End</option>
                            <option value="mid-end">Mid Range</option>
                            <option value="low-end">Budget</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Melhor Preço (R$) *</label>
                        <input type="number" id="bestPrice" name="bestPrice" required step="0.01" min="0"
                            max="99999999.99"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">URL do Melhor Preço</label>
                        <input type="url" id="urlPrice" name="urlPrice" maxlength="170" placeholder="https://..."
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Data do Melhor Preço *</label>
                        <input type="date" id="datePrice" name="datePrice" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>

                    <div class="flex space-x-3 pt-4">
                        <button type="submit"
                            class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                            Salvar
                        </button>
                        <button type="button" id="btnCancelModal"
                            class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div id="deleteModal" class="hidden fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Confirmar Exclusão</h3>
            <p class="text-gray-600 mb-6">Tem certeza que deseja excluir este componente? Esta ação não pode ser
                desfeita.</p>
            <div class="flex space-x-3">
                <button id="btnConfirmDelete"
                    class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium">
                    Excluir
                </button>
                <button id="btnCancelDelete"
                    class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium">
                    Cancelar
                </button>
            </div>
        </div>
    </div>


    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/componentManager.js'])

    @include('home.footerjs')

</body>

</html>