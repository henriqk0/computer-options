<template>
  <div class="max-w-[728px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ titleHeader }}</h2>

      <p class="text-gray-500">{{ titleParagraph }}</p>
    </div>
    <div v-if="loading && reviews.length === 0">
      <VBlueLoading />
    </div>

    <div class="space-y-4">
      <VMyReviewsCard
        v-for="review in reviews"
        :key="review.id"
        :review="review"
        @click="openReviewModal(review)"
      />
    </div>

    <!-- sentinel for infinite scroll -->
    <div ref="sentinelRef" class="h-4"></div>

    <!-- loading more indicator -->
    <div v-if="loading && reviews.length > 0" class="flex justify-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  </div>

  <VReviewModal
    v-model:show="showReviewModal"
    :review="editingReview"
    @save="handleSave"
    @delete="handleDelete"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useApi } from '@/modules/samples/composables/useApi'
import { useIntersectionObserver } from '@/modules/samples/composables/useIntersectionObserver'
import { showError, showSuccess } from '@/modules/samples/utils/alerts'
import VBlueLoading from '@/shared/components/utils/VBlueLoading.vue'
import VMyReviewsCard from '@/shared/components/cards/VMyReviewsCard.vue'
import VReviewModal from '@/shared/components/modals/VReviewModal.vue'
import type { ReviewsIntersecObserver } from '@/modules/samples/models/ReviewsIntersecOverserver'
import type { MyReview } from '@/modules/samples/models/MyReview'

import type { ApiResponse as ApiResponseWithMsg } from '@/modules/samples/models/ApiResponseWithMsg'

const { get, put, del } = useApi()

// state
const reviews = ref<MyReview[]>([])
const nextPageUrl = ref<string | null>('/listMyReview')
const loading = ref(false)
const showReviewModal = ref(false)
const editingReview = ref<MyReview | null>(null)
const sentinelRef = ref<HTMLElement | null>(null)

// computed
const titleHeader = computed(() => {
  if (reviews.value.length === 0 && !loading.value) {
    return 'Você ainda não escreveu uma Review'
  }
  return 'Minhas Reviews'
})

const titleParagraph = computed(() => {
  if (reviews.value.length === 0 && !loading.value) {
    return 'Busque por algum componente para o avaliar'
  }
  return 'Gerencie as reviews dos componentes que você analisou'
})

// methods
async function loadMore() {
  if (!nextPageUrl.value || loading.value) return

  loading.value = true

  try {
    const response = await get<ReviewsIntersecObserver>(nextPageUrl.value)

    reviews.value.push(...response.data.data)
    nextPageUrl.value = response.data.next_page_url
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    showError('Erro ao carregar reviews: ' + (error.response?.data?.message || error.message))
  } finally {
    loading.value = false
  }
}

function openReviewModal(review: MyReview) {
  editingReview.value = review
  showReviewModal.value = true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSave(formData: any) {
  if (!editingReview.value) return

  try {
    const response = await put<ApiResponseWithMsg>('/updateReview', {
      ...formData,
      review_id: editingReview.value.id,
      anycomponent_id: editingReview.value.anycomponent_id,
    })

    showSuccess(response.data.message)
    showReviewModal.value = false

    // reload reviews
    await reloadReviews()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data?.errors) {
      const errors = Object.values(error.response.data.errors).flat()
      showError(errors.join(', '))
    } else {
      showError('Erro ao salvar review: ' + (error.response?.data?.message || error.message))
    }
  }
}

async function handleDelete() {
  if (!editingReview.value) return

  if (!confirm('Tem certeza que deseja deletar esta review?')) return

  try {
    const response = await del<ApiResponseWithMsg>(`/deleteReview/${editingReview.value.id}`)
    showSuccess(response.data.message)
    showReviewModal.value = false

    // reload reviews
    await reloadReviews()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    showError('Erro ao deletar review: ' + (error.response?.data?.message || error.message))
  }
}

async function reloadReviews() {
  reviews.value = []
  nextPageUrl.value = '/listMyReview'
  await loadMore()
}

// setup intersection observer for infinite scroll
useIntersectionObserver(sentinelRef, loadMore, {
  rootMargin: '160px',
})
</script>
