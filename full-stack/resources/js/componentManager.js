import { formatDate, formatPrice } from "./utils/formatters";
import { hideLoading, showLoading } from "./utils/loading";
import { showError, showSuccess } from "./utils/alerts";


axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const csrfToken = document.querySelector('meta[name="csrf-token"]');
if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content;
}

// state and dom elements
let components = [];
let pagination = {};
let editingComponentId = null;
let deletingComponentId = null;

const tableBody = document.getElementById('tableBody');
const cardView = document.getElementById('cardView');
const componentModal = document.getElementById('componentModal');
const deleteModal = document.getElementById('deleteModal');
const componentForm = document.getElementById('componentForm');
const modalTitle = document.getElementById('modalTitle');

// particular getters
function getInitials(name) {
    const words = name.split(' ');
    if (words.length >= 2) {
        return words[0][0] + words[1][0];
    }
    return name.substring(0, 2);
}

function getColorClass(index) {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-pink-500', 'bg-yellow-500', 'bg-indigo-500'];
    return colors[index % colors.length];
}

// functions to consume API
async function loadComponents(page = 1, perPage = 8) {
    showLoading();
    try {
        const response = await axios.get('/listAnyComponent', {
            params: { page, per_page: perPage }
        });

        components = response.data.data;
        pagination = {
            current_page: response.data.current_page,
            last_page: response.data.last_page,
            next_page_url: response.data.next_page_url,
            prev_page_url: response.data.prev_page_url,
            total: response.data.total,
        }
        renderComponents();
    } catch (error) {
        showError('Erro ao carregar componentes: ' + (error.response?.data?.message || error.message));
    } finally {
        hideLoading();
    }
}

async function createComponent(formData) {
    try {
        const response = await axios.post('/createAnyComponent', formData);
        showSuccess(response.data.message);
        closeModal();
        loadComponents();
    } catch (error) {
        if (error.response?.data?.errors) {
            const errors = Object.values(error.response.data.errors).flat();
            showError(errors.join(', '));
        } else {
            showError('Erro ao criar componente: ' + (error.response?.data?.message || error.message));
        }
    }
}

async function updateComponent(formData) {
    try {
        const response = await axios.put('/updateAnyComponent', formData);
        showSuccess(response.data.message);
        closeModal();
        loadComponents();
    } catch (error) {
        if (error.response?.data?.errors) {
            const errors = Object.values(error.response.data.errors).flat();
            showError(errors.join(', '));
        } else {
            showError('Erro ao atualizar componente: ' + (error.response?.data?.message || error.message));
        }
    }
}

async function deleteComponent(id) {
    try {
        const response = await axios.delete(`/deleteAnyComponent/${id}`);
        showSuccess(response.data.message);
        closeDeleteModal();
        loadComponents();
    } catch (error) {
        showError('Erro ao deletar componente: ' + (error.response?.data?.message || error.message));
    }
}

// render front-end multi-elements display mode
function renderPagination() {
    const paginationDiv = document.getElementById('pagination');
    const paginationInfo = document.getElementById('paginationInfo');
    const pageNumbers = document.getElementById('pageNumbers');
    const currentPageMobile = document.getElementById('currentPageMobile');
    const lastPageMobile = document.getElementById('lastPageMobile');
    const btnFist = document.getElementById('btnFirstPage');
    const btnPrev = document.getElementById('btnPrevPage');
    const btnNext = document.getElementById('btnNextPage');
    const btnLast = document.getElementById('btnLastPage');

    if (!pagination.total || pagination.total === 0) {
        paginationDiv.classList.add('hidden');
        return
    }

    paginationDiv.classList.remove('hidden');

    // calculating items exposed
    const start = (pagination.current_page - 1) * 8 + 1;
    const end = Math.min(pagination.total, pagination.current_page * 8);

    paginationInfo.textContent = `Mostrando ${start}-${end} de ${pagination.total}`;
    currentPageMobile.textContent = pagination.current_page;
    lastPageMobile.textContent = pagination.last_page;

    btnFist.disabled = pagination.current_page === 1;
    btnPrev.disabled = pagination.prev_page_url === null;
    btnNext.disabled = pagination.next_page_url === null;
    btnLast.disabled = pagination.current_page === pagination.last_page;

    const maxVisible = 5;
    let startPage = Math.max(1, pagination.current_page - Math.floor(maxVisible / 2));
    let endPage = Math.min(pagination.last_page, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    pageNumbers.innerHTML = '';
    for(let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = `px-3 py-1 text-sm rounded-md ${i === pagination.current_page ? 'bg.blue-600 text-white font-semibold' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`;
        btn.addEventListener('click', () => loadComponents(i));
        pageNumbers.appendChild(btn)
    }
}

function renderComponents() {
    renderTable();
    renderCards();
    renderPagination();

    if (!localStorage.getItem('auth_token')) {
        const cannotDisplayBtns = document.querySelectorAll('.only-auth');
        cannotDisplayBtns.forEach(btn => btn.remove());
        document.getElementById('btnAddComponent').remove();
    }
}

function renderTable() {
    if (components.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                    Nenhum componente cadastrado
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = components.map((comp, index) => `
        <tr class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 ${getColorClass(index)} rounded-full flex items-center justify-center">
                        <span class="text-white font-medium">${getInitials(comp.nameComponent)}</span>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${comp.nameComponent}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-gray-900">${comp.categoryLevel}</div>
            </td>
            <td class="px-6 py-4 hidden lg:table-cell">
                ${comp.urlPrice ? `<a href="${comp.urlPrice}" target="_blank" class="text-sm text-blue-600 hover:text-blue-800 truncate block max-w-xs" title="${comp.urlPrice}">Ver link</a>` : '<span class="text-sm text-gray-400">-</span>'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                <div class="text-sm text-gray-900">${formatDate(comp.datePrice)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    ${formatPrice(comp.bestPrice)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-3">
                    <button onclick="openEditModal(${comp.anycomponent_id})" class="text-blue-600 hover:text-blue-900 transition only-auth" title="Editar">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <button onclick="openDeleteModal(${comp.anycomponent_id})" class="text-red-600 hover:text-red-900 transition only-auth" title="Deletar">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderCards() {
    if (components.length === 0) {
        cardView.innerHTML = `
            <div class="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                Nenhum componente cadastrado
            </div>
        `;
        return;
    }

    cardView.innerHTML = components.map((comp, index) => `
        <div class="bg-white rounded-lg shadow p-5">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 ${getColorClass(index)} rounded-full flex items-center justify-center">
                        <span class="text-white font-medium text-lg">${getInitials(comp.nameComponent)}</span>
                    </div>
                    <div>
                        <h3 class="text-base font-semibold text-gray-900">${comp.nameComponent}</h3>
                        <p class="text-sm text-gray-500">${comp.categoryLevel}</p>
                    </div>
                </div>
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    ${formatPrice(comp.bestPrice)}
                </span>
            </div>

            <div class="space-y-2 mb-4">
                ${comp.urlPrice ? `
                <div class="flex items-center text-sm">
                    <svg class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.172-1.172m1.828-1.828l3-3a4 4 0 00-5.656-5.656l-1.172 1.172"></path>
                    </svg>
                    <a href="${comp.urlPrice}" target="_blank" class="text-blue-600 hover:text-blue-800 truncate">Visitar site da oferta</a>
                </div>
                ` : ''}
                <div class="flex items-center text-sm">
                    <svg class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span class="text-gray-700">Data da oferta: ${formatDate(comp.datePrice)}</span>
                </div>
            </div>

            <div class="flex space-x-3 pt-4 border-t border-gray-200">
                <button onclick="openEditModal(${comp.anycomponent_id})" class="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium only-auth">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    <span>Editar</span>
                </button>
                <button onclick="openDeleteModal(${comp.anycomponent_id})" class="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition font-medium only-auth">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    <span>Deletar</span>
                </button>
            </div>
        </div>
    `).join('');
}

// Modal Functions
function openAddModal() {
    editingComponentId = null;
    modalTitle.textContent = 'Adicionar Componente';
    componentForm.reset();
    document.getElementById('componentId').value = '';
    componentModal.classList.remove('hidden');
}

function openEditModal(id) {
    const component = components.find(c => c.anycomponent_id === id);
    if (!component) return;

    editingComponentId = id;
    modalTitle.textContent = 'Editar Componente';

    document.getElementById('componentId').value = component.anycomponent_id;
    document.getElementById('nameComponent').value = component.nameComponent;
    document.getElementById('categoryLevel').value = component.categoryLevel;
    document.getElementById('bestPrice').value = component.bestPrice;
    document.getElementById('urlPrice').value = component.urlPrice || '';
    document.getElementById('datePrice').value = component.datePrice;

    componentModal.classList.remove('hidden');
}

function closeModal() {
    componentModal.classList.add('hidden');
    componentForm.reset();
    editingComponentId = null;
}

function openDeleteModal(id) {
    deletingComponentId = id;
    deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
    deleteModal.classList.add('hidden');
    deletingComponentId = null;
}

// event Listeners
document.getElementById('btnAddComponent').addEventListener('click', openAddModal);
document.getElementById('btnCloseModal').addEventListener('click', closeModal);
document.getElementById('btnCancelModal').addEventListener('click', closeModal);

document.getElementById('btnCancelDelete').addEventListener('click', closeDeleteModal);
document.getElementById('btnConfirmDelete').addEventListener('click', () => {
    if (deletingComponentId) {
        deleteComponent(deletingComponentId);
    }
});
deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) closeDeleteModal();
});

document.getElementById('btnFirstPage').addEventListener('click', () => loadComponents(1));
document.getElementById('btnPrevPage').addEventListener('click', () => {
    if (pagination.prev_page_url) loadComponents(pagination.current_page - 1);
});
document.getElementById('btnNextPage').addEventListener('click', () => {
    if (pagination.next_page_url) loadComponents(pagination.current_page + 1);
});
document.getElementById('btnLastPage').addEventListener('click', () => loadComponents(pagination.last_page));


componentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        nameComponent: document.getElementById('nameComponent').value,
        categoryLevel: document.getElementById('categoryLevel').value,
        bestPrice: parseFloat(document.getElementById('bestPrice').value),
        urlPrice: document.getElementById('urlPrice').value || null,
        datePrice: document.getElementById('datePrice').value
    };

    if (editingComponentId) {
        formData.anycomponent_id = editingComponentId;
        await updateComponent(formData);
    } else {
        await createComponent(formData);
    }
});

componentModal.addEventListener('click', (e) => {
    if (e.target === componentModal) closeModal();
});

// make functions global for onclick handlers
window.openEditModal = openEditModal;
window.openDeleteModal = openDeleteModal;

// initial load
loadComponents();
