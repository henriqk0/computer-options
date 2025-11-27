/* =====================================================================
    GLOBAL IMPORTS & INITIAL CONFIGURATIONS
===================================================================== */

import { formatExtensiveShortDate } from "./utils/formatters";
import { hideLoading, showLoading } from "./utils/loading";
import { showError, showSuccess } from "./utils/alerts";

// TODO: adicionar classe like (1 por usuario por review. Somente reviews poderão ter likes).
// Comentários das reviews podem ser adicionadas, mas ñ são prioridade (ainda falta listar os componentes melhor relevantes,
// de acordo com a quantidade, também (9.4 com 100 likes provavelmente aparecerá,
// mas 10 com apenas 1, nao), na página inicial)

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const csrfToken = document.querySelector('meta[name="csrf-token"]');
if (csrfToken) {
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken.content;
}

/* --- GLOBAL STATE --- */
let nextPageUrl = "/listMyReview";
let loading = false;
let reviews = [];

/* --- DOM Elements --- */
const modalDiv = document.getElementById("manipulateModal");
const cardContainer = document.getElementById("cardView");
const titleHeader = document.getElementById("titlePageLabel");
const titleParagraph = document.getElementById("titleParagraph");

/* =====================================================================
    FETCH REVIEWS
===================================================================== */
async function loadMore() {
    if (!nextPageUrl || loading) return;

    loading = true;
    showLoading();

    try {
        const { data } = await axios.get(nextPageUrl);
        nextPageUrl = data.next_page_url;
        reviews.push(...data.data);

        renderReviews();
    } catch (err) {
        showError("Erro ao carregar reviews: " + (err.response?.data?.message || err.message));
    } finally {
        hideLoading();
        loading = false;
    }
}

/* =====================================================================
    RENDER REVIEWS
===================================================================== */
function renderReviews() {
    if (reviews.length === 0) {
        titleHeader.textContent = "Você ainda não escreveu uma Review";
        titleParagraph.textContent = "Busque por algum componente para o avaliar";
        return;
    }

    titleHeader.textContent = "Minhas Reviews";
    titleParagraph.textContent = "Gerencie as reviews dos componentes que você analisou";

    cardContainer.innerHTML = reviews
        .map(
            (review) => `
            <div class="bg-white rounded-lg shadow p-5 grid grid-cols-4 gap-2 cursor-pointer"
                data-review-id="${review.id}">

                <div class="col-span-3">
                    <h1 class="text-[20px] font-bold">${review.title}</h1>
                    <h3 class="text-gray-600 py-1">${review.content.substring(0, 35)}...</h3>
                    <span class="text-gray-500 py-1">
                        ${formatExtensiveShortDate(review.updated_at)}
                    </span>
                </div>

                <div class="flex justify-center items-center bg-gradient-to-br from-blue-400 to-yellow-100 h-[88px]">
                    <div class="flex">
                        <div class="bg-blue-100 px-1 py-1 rounded-l-lg">
                            <span class="text-sm font-bold text-blue-900">
                                ${review.anycomponent.nameComponent}
                            </span>
                        </div>

                        <div class="flex items-center bg-yellow-100 px-1 py-1 rounded-r-lg">
                            <svg class="w-4 h-4 text-yellow-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span class="text-sm font-bold text-yellow-900">${review.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
        )
        .join("");

    attachCardListeners();
}

/* =====================================================================
    CLICK HANDLING
===================================================================== */
function attachCardListeners() {
    document.querySelectorAll("[data-review-id]").forEach((div) => {
        div.onclick = () => openReviewModal(Number(div.dataset.reviewId));
    });
}

/* =====================================================================
    MODAL HANDLING
===================================================================== */
function openReviewModal(id) {
    const review = reviews.find((r) => r.id === id);
    if (!review) return;

    /* DOM Inputs */
    const reviewTitle = document.getElementById("reviewTitle");
    const ratingDisplay = document.getElementById("ratingDisplay");
    const reviewRating = document.getElementById("reviewRating");
    const reviewContent = document.getElementById("reviewContent");
    const characterCount = document.getElementById("characterCount");
    const form = document.getElementById("reviewForm");
    const deleteBtn = document.getElementById("deleteBtn");

    /* Fill modal */
    reviewTitle.value = review.title;
    reviewContent.value = review.content;
    reviewRating.value = review.rating;
    ratingDisplay.innerText = `${review.rating}/10`;

    setupStarRating(reviewRating, ratingDisplay);
    setupCharacterCounter(reviewTitle, reviewContent, characterCount);
    setupModalForm(form, review);
    deleteBtn.onclick = () => deleteReview(review.id);

    modalDiv.classList.remove("hidden");
}

/* =====================================================================
    CHARACTER COUNTER
===================================================================== */
function setupCharacterCounter(titleInput, contentInput, counterEl) {
    const updateCount = () => {
        const total = titleInput.value.length + contentInput.value.length;
        counterEl.textContent = `${total} caracteres`;
    };

    titleInput.oninput = updateCount;
    contentInput.oninput = updateCount;
    updateCount();
}

/* =====================================================================
    STAR RATING
===================================================================== */
function setupStarRating(hiddenRatingInput, ratingDisplay) {
    const starButtons = document.querySelectorAll(".star-btn");

    function applyRating(r) {
        hiddenRatingInput.value = r;
        ratingDisplay.textContent = `${r}/10`;

        starButtons.forEach((btn, index) => {
            const star = btn.querySelector("svg");
            star.classList.toggle("text-yellow-400", index < r);
            star.classList.toggle("text-gray-300", index >= r);
        });
    }

    starButtons.forEach((btn) => {
        const rating = Number(btn.dataset.rating);

        btn.onclick = () => applyRating(rating);
    });

    applyRating(Number(hiddenRatingInput.value));
}

/* =====================================================================
    FORM SUBMIT (UPDATE)
===================================================================== */
function setupModalForm(form, review) {
    form.onsubmit = async (e) => {
        e.preventDefault();

        const title = reviewTitle.value.trim();
        const content = reviewContent.value.trim();
        const rating = Number(reviewRating.value);
        const userId = JSON.parse(localStorage.getItem("auth_user")).id;

        if (!title) return alert("Adicione um título.");
        if (content.length < 50) return alert("Mínimo de 50 caracteres.");
        if (rating === 0) return alert("Selecione uma nota.");

        const payload = {
            title,
            content,
            rating,
            anycomponent_id: review.anycomponent_id,
            user_id: userId,
        };
        payload.review_id = review.id

        await updateReview(payload);
    };
}

/* =====================================================================
    UPDATE REVIEW
===================================================================== */
async function updateReview(payload) {
    try {
        const response = await axios.put("/updateReview", payload);
        showSuccess(response.data.message);

        closeModal();
        reloadReviews();
    } catch (err) {
        showError(err.response?.data?.message || err.message);
    }
}

/* =====================================================================
    DELETE REVIEW
===================================================================== */
async function deleteReview(id) {
    if (!confirm("Tem certeza que deseja deletar esta review?")) return;

    try {
        const response = await axios.delete(`/deleteReview/${id}`);
        showSuccess(response.data.message);

        closeModal();
        reloadReviews();
    } catch (err) {
        showError(err.response?.data?.message || err.message);
    }
}

/* =====================================================================
    UTIL
===================================================================== */
function closeModal() {
    modalDiv.classList.add("hidden");
    const form = document.getElementById("reviewForm");
    if (form) form.reset();
}

function reloadReviews() {
    reviews = [];
    nextPageUrl = "/listMyReview";
    cardContainer.innerHTML = "";
    loadMore();
}

/* =====================================================================
    INTERSECTION OBSERVER
===================================================================== */
const observer = new IntersectionObserver(
    (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadMore();
    },
    { rootMargin: "160px" }
);

observer.observe(document.getElementById("sentinel"));

/* =====================================================================
    LOAD INITIAL
===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    loadMore();

    const btnClose = document.getElementById("btnCloseReviewModal");
    if (btnClose) {
        btnClose.onclick = closeModal;
    }
});
