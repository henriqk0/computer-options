import { formatDate, formatExtensiveShortDate } from "./utils/formatters";
import { hideLoading, showLoading } from "./utils/loading";
import { showError, showSuccess } from "./utils/alerts";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const csrfToken = document.querySelector('meta[name="csrf-token"]');
if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content;
}

let nextPageUrl = '/listMyReview';
let loading = false;
let reviews = [];
let editingReviewId = null;
let deletingReviewId = null;

async function loadMore() {
    if (!nextPageUrl || loading) return;

    loading = true;
    document.getElementById("loading").classList.remove("hidden");

    try {
        const res = await axios.get(nextPageUrl);

        nextPageUrl = res.data.next_page_url;
        reviews = res.data.data;

        console.log(reviews);

        renderReviews();
    } catch (err) {
        showError('Erro ao carregar mais reviews: ' + (err.response?.data?.message || err.message));
    } finally {
        loading = false;
        document.getElementById("loading").classList.add("hidden");
    }
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadMore();
        }
    });
}, {
    rootMargin: '160px',    // to call before sentinel places in viewport
});

observer.observe(document.getElementById('sentinel'));

document.addEventListener("DOMContentLoaded", loadMore);

function renderReviews() {
    const card = document.getElementById('cardView');
    const titleHeader = document.getElementById('titlePageLabel');
    const titleParagraph = document.getElementById('titleParagraph');

    if (reviews.length == 0) {
        titleHeader.innerHTML = `Você ainda não escreveu uma Review`;
        titleParagraph.innerHTML = `Busque por algum componente para o avaliar`;
        return
    }

    titleHeader.innerHTML = `Minhas Reviews`;
    titleParagraph.innerHTML = `Gerencie as reviews dos componentes que você analisou`;

    card.innerHTML = reviews.map(review => `
        <div class="bg-white rounded-lg shadow p-5">
            <div>
                <div class="">
                    <h1 class="text-[20px] font-bold">
                        ${review.title}
                    </h1>
                    <h3 class="text-gray-600">
                        ${review.content.substring(0, 35)}...
                    </h3>
                </div>
                <div class="">
                    <span class="text-gray-500">
                        ${formatExtensiveShortDate(review.updated_at)}
                    </span>
                    <span class="text-gray-700">
                        ${review.rating}
                    </span>
                </div>
            </div>

            <div>
                ${review.anycomponent.nameComponent}
            </div>
        </div>
    `).join('')
}


loadMore();
