/* =====================================================================
    GLOBAL IMPORTS & INITIAL CONFIGURATIONS
===================================================================== */

import { formatDate, formatPrice, formatExtensiveLongDate, formatNumber } from "./utils/formatters";
import { hideLoading, showLoading } from "./utils/loading";
import { showError, showSuccess } from "./utils/alerts";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/* --- csrf token config --- */
const csrfToken = document.querySelector('meta[name="csrf-token"]');
if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content;
}

/* --- url info --- */
const url = window.location.href;
const lastPart = url.substring(url.lastIndexOf('/') + 1);

/* --- global states --- */
let detailedComponent = {};
let reviews = [];
let averangeScore = 0;
let totalReviews = 0;
let withAllFlag = 0;


/* =====================================================================
    MAIN CONTROLLER FUNCTION
===================================================================== */

async function fetchDetailedComps(componentId, includeAllReviews = false) {
    showLoading();

    try {
        const detailRes = await axios.get(`/showAnyComponent/${componentId}`);

        detailedComponent = detailRes.data.data;
        averangeScore = detailRes.data.avgRating;
        totalReviews = detailRes.data.total;

        const compId = detailedComponent.anycomponent_id;

        const reviewsRes = includeAllReviews
            ? await axios.get(`/listAllReview/${compId}`)
            : await axios.get(`/listBestReview/${compId}`);

        reviews = reviewsRes.data;
        withAllFlag = includeAllReviews ? 1 : 0;
        console.log(reviews)

        renderDetailed();
    } catch (error) {
        showError('Erro ao buscar informações: ' + (error.response?.data?.message || error.message));
    } finally {
        hideLoading();
    }
}

fetchDetailedComps(lastPart);


/* =====================================================================
    UI RENDERING - DETAILED COMPONENT INFORMATION
===================================================================== */

async function renderDetailed() {
    const container = document.getElementById('showView');

    container.innerHTML = renderMainTemplate();

    setupButtons();
    renderReviews();

    renderReviewFeatures();
}


/* =====================================================================
    TEMPLATE BUILDERS
===================================================================== */

/* --- main template --- */
function renderMainTemplate() {
    return `
        ${renderBackButton()}
        ${renderComponentCard()}
        ${renderReviewSection()}
    `;
}

/* --- back button --- */
function renderBackButton() {
    return `
        <div class="mb-6">
            <a onclick="returnPrevScreen()" class="inline-flex items-center text-blue-600 hover:text-blue-800 transition">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </a>
        </div>
    `;
}

/* --- component card --- */
function renderComponentCard() {
    const dp = detailedComponent;

    return `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div class="md:flex">

                ${renderComponentImage(dp.nameComponent)}

                <div class="p-8 flex-1">
                    ${renderComponentHeader(dp)}
                    ${renderComponentDescription(dp)}
                    ${renderRatingSummary()}
                    ${renderBuyButton(dp)}
                </div>
            </div>
        </div>
    `;
}

/* --- image block --- */
function renderComponentImage(name) {
    return `
        <div class="md:flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 md:w-64 flex items-center justify-center p-8">
            <div class="text-white">
                <svg class="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
                </svg>
                <h3 class="text-center text-lg font-semibold mt-4">${name}</h3>
            </div>
        </div>
    `;
}

/* --- header block --- */
function renderComponentHeader(dp) {
    return `
        <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">${dp.nameComponent}</h1>
                <p class="text-lg text-gray-600">${fetchCategoryLabel(dp.categoryLevel, dp.nameComponent)}</p>
            </div>

            <div class="mt-4 md:mt-0 text-right">
                <div class="text-3xl font-bold text-green-600">${formatPrice(dp.bestPrice)}</div>
                <p class="text-sm text-gray-500 mt-1">Atualizado em ${formatDate(dp.datePrice)}</p>
            </div>
        </div>
    `;
}

/* --- description block --- */
function renderComponentDescription(dp) {
    return `
        <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
            <span class="text-gray-700 text-sm">${dp.about}</span>
        </div>
    `;
}

/* --- rating summary --- */
function renderRatingSummary() {
    return `
        <div class="flex items-center mb-6 pb-6 border-b border-gray-200">
            <div class="flex items-center">
                <svg class="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="text-3xl font-bold text-gray-900 ml-2">${formatNumber(averangeScore)}</span>
                <span class="text-gray-600 text-sm ml-3">/10 baseado em <strong>${totalReviews} avaliações</strong></span>
            </div>
        </div>
    `;
}

/* --- buy button --- */
function renderBuyButton(dp) {
    return `
        <a href="${dp.urlPrice}" target="_blank"
            class="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
            </svg>
            Comprar pelo melhor preço
        </a>
    `;
}

/* --- reviews section wrapper --- */
function renderReviewSection() {
    return `
        <div id="review-section" class="bg-white rounded-lg shadow-lg p-6 md:p-8">
            ${renderReviewHeader()}
        </div>
    `;
}

/* --- review header --- */
function renderReviewHeader() {
    return `
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900 min-w-[150px]">Avaliações</h2>

            <div class="grid gap-4 grid-cols-1 md:[&:has(*:nth-child(2))]:grid-cols-2">
                <button id="btnAddReview" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition only-auth">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Escrever avaliação
                </button>

                <button id="btnDisplayAllReviews" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                    </svg> Ver todas avaliações
                </button>
            </div>
        </div>
    `;
}


/* =====================================================================
    SETUP BUTTONS & EVENT HANDLERS
===================================================================== */

function setupButtons() {
    const btnDisplayAll = document.getElementById('btnDisplayAllReviews');

    if (withAllFlag) {
        btnDisplayAll.remove();
    } else {
        btnDisplayAll.addEventListener('click', () => fetchDetailedComps(lastPart, true));
    }

    window.returnPrevScreen = () => {
        if (document.referrer !== "") window.history.back();
        else window.location.href = "/";
    };
}


/* =====================================================================
    RENDER REVIEWS
===================================================================== */

function renderReviews() {
    const container = document.getElementById('review-section');

    if (reviews.length === 0) {
        container.insertAdjacentHTML('beforeend', `
            <div class="space-y-6 flex flex-col items-center text-gray-400">
                Ainda não foram escritas avaliações deste componente.
            </div>
        `);
        return;
    }

    const html = reviews.map(renderReviewItem).join('');
    container.insertAdjacentHTML('beforeend', html);

    removeReviewButtonIfUserAlreadyReviewed();

    setupExpandReview();
    setupLikeSystem();
}

/* --- single review item --- */
function renderReviewItem(review) {
    return `
        <div class="border border-gray-200 rounded-lg p-5 mb-4 hover:shadow-md transition space-y-4">

            ${renderReviewHeaderItem(review)}

            <h3 class="font-semibold text-gray-900">${review.title}</h3>

            <p class="review-text text-sm text-gray-700"
               data-full-text="${review.content}">
               ${review.content.substring(0, 35)}...
            </p>

            <button class="expand-btn text-blue-600 hover:text-blue-800 font-medium mt-1">Ver mais</button>

            ${renderLikeButton(review)}
        </div>
    `;
}

function renderReviewHeaderItem(review) {
    return `
        <div class="flex items-start justify-between">
            <div class="flex items-center">
                <div class="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-gray-100" ...></svg>
                </div>

                <div class="ml-3">
                    <h4 class="font-semibold text-gray-900">${review.user.name}</h4>
                    <p class="text-xs text-gray-500">${formatExtensiveLongDate(review.updated_at)}</p>
                </div>
            </div>

            <div class="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                <svg class="w-4 h-4 text-yellow-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="text-sm font-bold text-yellow-900">${review.rating}</span>
            </div>
        </div>
    `;
}

function renderLikeButton(review) {
    const authUser = JSON.parse(localStorage.getItem('auth_user'));
    const userLike = review.likes.find(l => l.user_id === authUser?.id);

    const alreadyLiked = Boolean(userLike);

    return `
        <button class="like-btn only-auth flex items-center transition ${alreadyLiked ? "liked text-blue-600" : "text-gray-600"}"
                data-review-id="${review.id}"
                data-like-id="${userLike ? userLike.id : ''}">
            <svg class="w-5 h-5 mr-1 ${alreadyLiked ? "fill-blue-600" : ""}" fill="none" viewbox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
            </svg>
            <span class="like-count">${review.likes_count}</span>
        </button>
    `;
}


/* =====================================================================
    REVIEW BUTTON RULE
===================================================================== */

function removeReviewButtonIfUserAlreadyReviewed() {
    if (!localStorage.getItem('auth_user')) return;

    const userId = JSON.parse(localStorage.getItem('auth_user')).id;
    const hasReviewed = reviews.some(r => r.user.id === userId);

    if (hasReviewed) {
        const btn = document.getElementById('btnAddReview');
        if (btn) btn.remove();
    }
}


/* =====================================================================
    EXPAND REVIEW TEXT
===================================================================== */

function setupExpandReview() {
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener('click', function () {
            const textElem = this.previousElementSibling;
            const fullText = textElem.dataset.fullText;

            const isExpanded = textElem.innerHTML === fullText.replace(/\n/g, "<br>");

            if (isExpanded) {
                textElem.textContent = `${fullText.substring(0, 35)}...`;
                this.textContent = "Ver mais";
            } else {
                textElem.innerHTML = fullText.replace(/\n/g, "<br>");
                this.textContent = "Ver menos";
            }
        });
    });
}


/* =====================================================================
    LIKE / UNLIKE — FIXED VERSION
===================================================================== */

function setupLikeSystem() {
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', async function () {

            const reviewId = parseInt(this.dataset.reviewId);
            const likeId = this.dataset.likeId ? parseInt(this.dataset.likeId) : null;
            const userId   = JSON.parse(localStorage.getItem('auth_user'))?.id;
            const likeCountElem = this.querySelector('.like-count');

            if (!userId) return showError("É necessário estar logado.");

            const review = {
                id: reviewId,
                userId: userId,
                likeId: likeId,
                liked: !!this.dataset.likeId
            };

            /* --- local UI update --- */
            likeCountElem.textContent =
                parseInt(likeCountElem.textContent) + (review.liked ? -1 : +1);

            this.classList.toggle('liked');
            this.classList.toggle('text-blue-600');
            this.classList.toggle('text-gray-600');
            this.querySelector('svg').classList.toggle('fill-blue-600');

            /* --- server request --- */
            if (review.liked) {
                await unlikeReview(review);

                review.likeId = null;
                this.dataset.likeId = "";
            } else {
                const likeResponse = await likeReview(review);

                review.likeId = likeResponse.data.id;
                this.dataset.likeId = review.likeId;
            }
        });
    });
}


/* --- POST like --- */
async function likeReview(review) {
    try {
        const response = await axios.post('/like', {
            user_id: review.userId,
            review_id: review.id
        });

        review.likeId = response.data.id;
        review.liked = true;

        console.log(response.data);
        return response.data; // <= necessário para setupLikeSystem
    } catch (err) {
        console.error("Erro ao dar like:", err);
    }
}


/* --- DELETE like --- */
async function unlikeReview(review) {
    try {
        await axios.delete(`/unlike/${review.likeId}`);
        review.likeId = null;
        review.liked = false;
    } catch (err) {
        console.error("Erro ao remover like:", err);
    }
}


/* =====================================================================
    CATEGORY DETECTOR
===================================================================== */

function fetchCategoryLabel(label, name) {
    const GPU = ['RTX', 'RX', 'ARC', 'GTX', 'QUADRO'];
    const CPU = ['RYZEN', 'I3', 'I5', 'I7', 'I9'];
    const PERIPHERAL = ['MOUSE', 'TECLADO', 'HEADSET', 'HEADPHONE', 'MONITOR', 'FONE', 'FONE DE OUVIDO', 'CAIXA DE SOM', 'MICROFONE', 'MOUSEPAD'];

    const upper = name.toUpperCase();

    let category = "Hardware";
    if (GPU.some(k => upper.includes(k))) category = "Placa Gráfica";
    else if (CPU.some(k => upper.includes(k))) category = "Processador";
    else if (PERIPHERAL.some(k => upper.includes(k))) category = "Periférico";

    switch (label) {
        case "high-end": category += " High End"; break;
        case "mid-end": category += " Mid End"; break;
        case "low-end": category += " Low End"; break;
    }
    return category;
}


/* =====================================================================
    REVIEW CREATION SYSTEM
===================================================================== */

async function renderReviewFeatures() {
    /* --- hide elements if not authenticated --- */
    if (!localStorage.getItem('auth_token')) {
        document.querySelectorAll('.only-auth').forEach(el => el.remove());
        return;
    }

    const modal = document.getElementById('addReviewModal');
    const form = document.getElementById('reviewForm');
    const titleElem = document.getElementById('reviewTitle');
    const contentElem = document.getElementById('reviewContent');
    const countElem = document.getElementById('characterCount');
    const ratingDisplay = document.getElementById('ratingDisplay');
    const ratingInput = document.getElementById('reviewRating');
    const btnAddReview = document.getElementById('btnAddReview');
    const btnCloseReview = document.getElementById('btnCloseReviewModal');

    /* --- modal open --- */
    btnAddReview?.addEventListener('click', () => {
        modal.classList.remove('hidden');
        titleElem.focus();
    });

    /* --- modal close --- */
    if (!withAllFlag) btnCloseReview?.addEventListener('click', handleClose);

    /* --- char counter --- */
    const updateCharacterCount = () => {
        countElem.textContent = `${titleElem.value.length + contentElem.value.length} caracteres`;
    };
    titleElem.addEventListener('input', updateCharacterCount);
    contentElem.addEventListener('input', updateCharacterCount);

    /* --- star system --- */
    setupStarRating(ratingInput, ratingDisplay);

    /* --- submit review --- */
    form?.addEventListener('submit', async e => {
        e.preventDefault();

        const title = titleElem.value.trim();
        const content = contentElem.value.trim();
        const rating = parseInt(ratingInput.value);

        if (!title) return alert("Por favor, adicione um título.");
        if (content.length < 50) return alert("Sua avaliação deve ter pelo menos 50 caracteres.");
        if (rating === 0) return alert("Selecione uma nota.");

        const userId = JSON.parse(localStorage.getItem('auth_user')).id;

        try {
            await axios.post('/createReview', {
                title,
                content,
                rating,
                anycomponent_id: detailedComponent.anycomponent_id,
                user_id: userId,
            });

            showSuccess("Avaliação criada com sucesso!");
            closeModal();
            fetchDetailedComps(lastPart);

        } catch (err) {
            showError(err.response?.data?.message || "Erro ao salvar avaliação.");
        }
    });

    /* --- close modal fn --- */
    function closeModal() {
        modal.classList.add('hidden');
        form.reset();
        updateCharacterCount();
        updateStarRating(0, ratingInput, ratingDisplay);
    }
    function handleClose() {
        if (confirm("Descartar avaliação?")) {
            closeModal();
        }
    }
}


/* =====================================================================
    STAR RATING
===================================================================== */

function setupStarRating(ratingInput, ratingDisplay) {
    const buttons = document.querySelectorAll('.star-btn');
    const updateStars = rating => updateStarRating(rating, ratingInput, ratingDisplay);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            updateStars(parseInt(btn.dataset.rating));
        });

        btn.addEventListener('mouseenter', () => {
            const rating = parseInt(btn.dataset.rating);
            highlightStars(buttons, rating);
        });
    });

    document.querySelector('.flex.space-x-1')?.addEventListener('mouseleave', () => {
        updateStars(parseInt(ratingInput.value));
    });
}

function updateStarRating(rating, ratingInput, ratingDisplay) {
    ratingInput.value = rating;
    ratingDisplay.textContent = `${rating}/10`;

    const buttons = document.querySelectorAll('.star-btn');

    buttons.forEach((btn, index) => {
        const star = btn.querySelector('svg');
        if (index < rating) {
            star.classList.add('text-yellow-400');
            star.classList.remove('text-gray-300');
        } else {
            star.classList.add('text-gray-300');
            star.classList.remove('text-yellow-400');
        }
    });
}

function highlightStars(buttons, rating) {
    buttons.forEach((btn, index) => {
        const star = btn.querySelector('svg');
        if (index < rating) {
            star.classList.add('text-yellow-400');
            star.classList.remove('text-gray-300');
        }
    });
}
