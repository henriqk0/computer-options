import { formatDate, formatPrice, formatExtensiveLongDate } from "./utils/formatters";
import { hideLoading, showLoading } from "./utils/loading";
import { showError, showSuccess } from "./utils/alerts";


axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const csrfToken = document.querySelector('meta[name="csrf-token"]');
if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content;
}

const url = window.location.href;
const lastPart = url.substring(url.lastIndexOf('/') + 1);

let detailedComponent = {};
let reviews = {};
let averangeScore = 0;
let totalReviews = 0;
let withAllFlag;


async function fetchDetailedComps(index, withAll=false) {
    showLoading();
    try {
        const responseDetail = await axios.get(`/showAnyComponent/${index}`);

        detailedComponent = responseDetail.data.data;
        averangeScore = responseDetail.data.avgRating;
        totalReviews = responseDetail.data.total;

        const compId = detailedComponent.anycomponent_id;

        const responseReviews = !withAll
            ?
            await axios.get(`/listBestReview/${compId}`)
            :
            await axios.get(`/listAllReview/${compId}`);

        withAllFlag = !withAll ? 0 : 1;
        reviews = responseReviews.data;

        // const responseAllReviews = await axios.get(`/listAllReview/${compId}`);

        renderDetailed();

    } catch (error) {
        showError('Erro ao buscar informações: ' + (error.response?.data?.message || error.message));
    } finally {
        hideLoading();
    }
}

async function renderDetailed() {
    const show = document.getElementById('showView');
    show.innerHTML = `
        <!-- Back Button -->
        <div class="mb-6">
            <a onclick="returnPrevScreen()" class="inline-flex items-center text-blue-600 hover:text-blue-800 transition">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Voltar
            </a>
        </div>

        <!-- Component Info Card -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div class="md:flex">
                <!-- Component Image/Icon -->
                <div class="md:flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 md:w-64 flex items-center justify-center p-8">
                    <div class="text-white">
                        <svg class="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
                        </svg>
                        <h3 class="text-center text-lg font-semibold mt-4">${detailedComponent.nameComponent}</h3>
                    </div>
                </div>

                <!-- Component Details -->
                <div class="p-8 flex-1">
                    <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900 mb-2">${detailedComponent.nameComponent}</h1>
                            <p class="text-lg text-gray-600">${fetchCategoryLabel(detailedComponent.categoryLevel, detailedComponent.nameComponent)}</p>
                        </div>
                        <div class="mt-4 md:mt-0 text-right">
                            <div class="text-3xl font-bold text-green-600">${formatPrice(detailedComponent.bestPrice)}</div>
                            <p class="text-sm text-gray-500 mt-1">Atualizado em ${formatDate(detailedComponent.datePrice)}</p>
                        </div>
                    </div>

                    <!-- Specifications -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Especificações</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="flex items-center text-sm">
                                <svg class="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                                </svg>
                                <span class="text-gray-700"><strong>Memória:</strong> 24GB GDDR6X</span>
                            </div>
                            <div class="flex items-center text-sm">
                                <svg class="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                                <span class="text-gray-700"><strong>TDP:</strong> 450W</span>
                            </div>
                            <div class="flex items-center text-sm">
                                <svg class="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                </svg>
                                <span class="text-gray-700"><strong>Arquitetura:</strong> Ada Lovelace</span>
                            </div>
                            <div class="flex items-center text-sm">
                                <svg class="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                                </svg>
                                <span class="text-gray-700"><strong>Interface:</strong> PCIe 4.0 x16</span>
                            </div>
                        </div>
                    </div>

                    <!-- Rating Summary -->
                    <div class="flex items-center mb-6 pb-6 border-b border-gray-200">
                        <div class="flex items-center">
                            <div class="flex items-center mr-3">
                                <svg class="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <span class="text-3xl font-bold text-gray-900 ml-2">${averangeScore}</span>
                            </div>
                            <span class="text-gray-600 text-sm">/10 baseado em <strong>${totalReviews} avaliações</strong></span>
                        </div>
                    </div>

                    <!-- Purchase Button -->
                    <a href="${detailedComponent.urlPrice}" target="_blank" class="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Comprar pelo melhor preço
                    </a>
                </div>
            </div>
        </div>

        <!-- Reviews Section -->
        <div id="review-section"class="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-900 min-w-[150px]">Avaliações</h2>

                <div class="grid gap-4 grid-cols-1 md:[&:has(*:nth-child(2))]:grid-cols-2">
                    <button id="btnAddReview" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition only-auth">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Escrever avaliação
                    </button>

                    <button id="btnDisplayAllReviews" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                        </svg>
                        Ver todas avaliações
                    </button>
                </div>
            </div>
        </div>
    `
    const displayAllbtn = document.getElementById('btnDisplayAllReviews');
    displayAllbtn.addEventListener('click', () => {
        fetchDetailedComps(lastPart, true)
    });

    if (withAllFlag) { displayAllbtn.remove() }

    const lastDiv = document.getElementById('review-section');
    if (reviews.length === 0) {
        lastDiv.insertAdjacentHTML('beforeend', `
            <div class="space-y-6 flex flex-col items-center text-gray-400">
                Ainda não foram escritas avaliações deste componente.
            </div>
        ` )
    }
    else {
        const reviewsStr = reviews.map((review) => `
            <div class="space-y-6">
                <div class="border border-gray-200 rounded-lg p-5 hover:shadow-md transition mb-4">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-100 mr-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
                                </svg>
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
                    <h3 class="font-semibold text-gray-900 mb-2">${review.title}</h3>
                    <div class="text-gray-700 text-sm review-content">
                        <p class="review-text" data-full-text="${review.content}">
                            ${review.content.substring(0, 35)}...
                        </p>
                        <button class="expand-btn text-blue-600 hover:text-blue-800 font-medium mt-1">
                            Ver mais
                        </button>
                    </div>

                    <div class="flex items-center mt-4 pt-4 border-t border-gray-100">
                        <button class="like-btn flex items-center text-gray-600 hover:text-blue-600 transition only-auth">
                            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                            </svg>
                            <span class="like-count">0</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        lastDiv.insertAdjacentHTML('beforeend', reviewsStr);
    }

    window.returnPrevScreen =  function() {
        if (document.referrer !== "") {
            window.history.back();
        } else {
            window.location.href = "/";
        }
    }

    renderReview();
}

fetchDetailedComps(lastPart);

function fetchCategoryLabel(label, name) {
    const GPU = ['RTX', 'RX', 'ARC', 'GTX', 'QUADRO'];
    const CPU = ['RYZEN', 'I3', 'I5', 'I7', 'I9'];
    const PERIPHERAL = ['Mouse' ,'Teclado', 'Headset', 'Headphone', 'Monitor', 'Caixa de Som', 'Microfone Mousepad'];

    let lastLabel = "";
    const upper = name.toUpperCase();

    if (GPU.some(keyword => upper.includes(keyword))) {
        lastLabel += 'Placa Gráfica';
    }
    else if (CPU.some(keyword => upper.includes(keyword))) {
        lastLabel += 'Processador';
    }
    else if (PERIPHERAL.some(keyword => upper.includes(keyword))) {
        lastLabel += 'Periférico';
    }
    else {
        lastLabel += 'Hardware';
    }

    switch (label) {
        case "high-end": lastLabel += " High End"; break;
        case "mid-end": lastLabel += " Mid End"; break;
        case "low-end": lastLabel += " Low End"; break;
    }
    return lastLabel;
}

async function renderReview() {
    // open/close review modal
    const addReviewModal = document.getElementById('addReviewModal');
    const btnAddReview = document.getElementById('btnAddReview');
    const btnCloseReviewModal = document.getElementById('btnCloseReviewModal');
    const reviewForm = document.getElementById('reviewForm');
    const reviewTitle = document.getElementById('reviewTitle');
    const reviewContent = document.getElementById('reviewContent');
    const characterCount = document.getElementById('characterCount');
    const ratingDisplay = document.getElementById('ratingDisplay');
    const reviewRating = document.getElementById('reviewRating');

    if (!localStorage.getItem('auth_token')) {
        const cannotDisplay = document.querySelectorAll('.only-auth');
        cannotDisplay.forEach(htmlElem => htmlElem.remove());
    }

    if (btnAddReview) {
        btnAddReview.addEventListener('click', () => {
            addReviewModal.classList.remove('hidden');
            reviewTitle.focus();
        });

        if (btnCloseReviewModal) {
            btnCloseReviewModal.addEventListener('click', () => {
                if (confirm('Descartar avaliação? Suas alterações não serão salvas.')) {
                    closeModal()
                    updateCharacterCount();
                    updateStarRating(0);
                }
            });
        }

        // character counter
        function updateCharacterCount() {
            const titleLength = reviewTitle.value.length;
            const contentLength = reviewContent.value.length;
            const totalLength = titleLength + contentLength;
            characterCount.textContent = `${totalLength} caracteres`;
        }

        if (reviewTitle) reviewTitle.addEventListener('input', updateCharacterCount);
        if (reviewContent) reviewContent.addEventListener('input', updateCharacterCount);

        // star rating system
        const starButtons = document.querySelectorAll('.star-btn');

        function updateStarRating(rating) {
            reviewRating.value = rating;
            ratingDisplay.textContent = `${rating}/10`;

            if (rating === 0) {
                ratingDisplay.classList.add('text-gray-400');
                ratingDisplay.classList.remove('text-yellow-600');
            } else {
                ratingDisplay.classList.remove('text-gray-400');
                ratingDisplay.classList.add('text-yellow-600');
            }

            starButtons.forEach((btn, index) => {
                const star = btn.querySelector('svg');
                if (index < rating) {
                    star.classList.remove('text-gray-300');
                    star.classList.add('text-yellow-400');
                } else {
                    star.classList.add('text-gray-300');
                    star.classList.remove('text-yellow-400');
                }
            });
        }

        starButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const rating = parseInt(btn.getAttribute('data-rating'));
                updateStarRating(rating);
            });

            btn.addEventListener('mouseenter', () => {
                const rating = parseInt(btn.getAttribute('data-rating'));
                starButtons.forEach((b, index) => {
                    const star = b.querySelector('svg');
                    if (index < rating) {
                        star.classList.add('text-yellow-400');
                        star.classList.remove('text-gray-300');
                    }
                });
            });
        });

        document.querySelector('.flex.space-x-1').addEventListener('mouseleave', () => {
            const currentRating = parseInt(reviewRating.value);
            updateStarRating(currentRating);
        });

        if (reviewForm) {
            // form submission
            reviewForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const title = reviewTitle.value.trim();
                const content = reviewContent.value.trim();
                const rating = parseInt(reviewRating.value);

                if (!title) {
                    alert('Por favor, adicione um título à sua avaliação.');
                    reviewTitle.focus();
                    return;
                }

                if (content.length < 50) {
                    alert('Sua avaliação deve ter pelo menos 50 caracteres.');
                    reviewContent.focus();
                    return;
                }

                if (rating === 0) {
                    alert('Por favor, selecione uma nota de 1 a 10.');
                    return;
                }

                const idUser = JSON.parse(localStorage.getItem('auth_user')).id;

                const formData = {
                    title: title,
                    content: content,
                    rating: rating,
                    anycomponent_id: detailedComponent.anycomponent_id,
                    user_id: idUser
                }
                await createReview(formData);

                addReviewModal.classList.add('hidden');
                reviewForm.reset();
                updateCharacterCount();
                updateStarRating(0);
            });
        }
    }

    // expand/collapse review text
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener('click', function() {
            const reviewText = this.previousElementSibling;
            const fullText = reviewText.getAttribute('data-full-text');
            const isExpanded = reviewText.textContent === fullText;

            if (isExpanded) {
                reviewText.textContent = fullText.substring(0, 30) + '...';
                this.textContent = 'Ver mais';
            } else {
                reviewText.textContent = fullText;
                this.textContent = 'Ver menos';
            }
        });
    });

    // like button functionality
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', function() {
            const likeCount = this.querySelector('.like-count');
            const currentCount = parseInt(likeCount.textContent);
            const isLiked = this.classList.contains('liked');

            if (isLiked) {
                likeCount.textContent = currentCount - 1;
                this.classList.remove('liked', 'text-blue-600');
                this.classList.add('text-gray-600');
                this.querySelector('svg').classList.remove('fill-blue-600');
            } else {
                likeCount.textContent = currentCount + 1;
                this.classList.add('liked', 'text-blue-600');
                this.classList.remove('text-gray-600');
                this.querySelector('svg').classList.add('fill-blue-600');
            }
        });
    });

    function closeModal() {
        addReviewModal.classList.add('hidden');
        reviewForm.reset();
    }


    async function createReview(formData) {
        try {
            const response = await axios.post('/createReview', formData);
            showSuccess(response.data.message);
            closeModal();
            fetchDetailedComps(lastPart);
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                showError(errors.join(', '));
            } else {
                showError('Erro ao salvar review: ' + (error.response?.data?.message || error.message));
            }
        }
    }
}
