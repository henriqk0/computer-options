<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="loading" class="flex justify-center items-center py-12">
      <VBlueLoading />
    </div>

    <template v-else-if="component">
      <div class="mb-6">
        <a
          @click="handleBack"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 transition cursor-pointer"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar
        </a>
      </div>

      <VComponentDetailCard
        :component="component"
        :average-score="averageScore"
        :total-reviews="totalReviews"
      />

      <VReviewsSection
        :reviews="reviews"
        :show-load-all="!showAllReviews"
        :is-authenticated="isAuthenticated"
        :user-has-reviewed="userHasReviewed"
        @add-review="openAddReviewModal"
        @load-all="loadAllReviews"
        @toggle-like="handleToggleLike"
      />
    </template>

    <VAddReviewModal
      v-if="component"
      v-model:show="showAddReviewModal"
      :component-id="component.anycomponent_id"
      @save="handleSaveReview"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/modules/samples/composables/useApi'
import { useAuth } from '@/modules/samples/composables/useAuth'
import { showError, showSuccess } from '@/modules/samples/utils/alerts'
import VBlueLoading from '@/shared/components/utils/VBlueLoading.vue'
import VComponentDetailCard from '@/shared/components/cards/VComponentDetailCard.vue'
import VReviewsSection from '@/shared/components/sections/VReviewsSection.vue'
import VAddReviewModal from '@/shared/components/modals/VAddReviewModal.vue'
import type { SimpleComponentDetail as ComponentDetail } from '@/modules/samples/models/SimpleComponentDetail'
import type { Review } from '@/modules/samples/models/Review'
import type { Like } from '@/modules/samples/models/Like'
import type { ApiResponse as ApiResponseWithMsg } from '@/modules/samples/models/ApiResponseWithMsg'

const route = useRoute()
const router = useRouter()
const { get, post, del } = useApi()

const auth = useAuth()
const isAuthenticated = computed(() => auth.isAuthenticatedValue.value)
const userId = computed(() => auth.user.value?.id)

// state
const component = ref<ComponentDetail | null>(null)
const reviews = ref<Review[]>([])
const averageScore = ref(0)
const totalReviews = ref(0)
const showAllReviews = ref(false)
const loading = ref(true)
const showAddReviewModal = ref(false)

// computed
const componentId = computed(() => route.params.id as string)

const userHasReviewed = computed(() => {
  if (!userId.value) return false
  return reviews.value.some((r) => r.user.id === userId.value)
})

// methods
async function fetchComponentDetails(includeAllReviews = false) {
  loading.value = true

  try {
    // fetch component details
    const detailRes = await get<{
      data: ComponentDetail
      avgRating: number
      total: number
    }>(`/showAnyComponent/${componentId.value}`)

    component.value = detailRes.data.data
    averageScore.value = detailRes.data.avgRating
    totalReviews.value = detailRes.data.total

    // fetch reviews
    const reviewsEndpoint = includeAllReviews
      ? `/listAllReview/${component.value.anycomponent_id}`
      : `/listBestReview/${component.value.anycomponent_id}`

    const reviewsRes = await get<Review[]>(reviewsEndpoint)
    reviews.value = reviewsRes.data

    showAllReviews.value = includeAllReviews
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    showError('Erro ao buscar informações: ' + (error.response?.data?.message || error.message))
  } finally {
    loading.value = false
  }
}

function loadAllReviews() {
  fetchComponentDetails(true)
}

function openAddReviewModal() {
  showAddReviewModal.value = true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSaveReview(formData: any) {
  try {
    await post<ApiResponseWithMsg>('/createReview', formData)
    showSuccess('Avaliação criada com sucesso!')
    showAddReviewModal.value = false
    await fetchComponentDetails(showAllReviews.value)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    showError(error.response?.data?.message || 'Erro ao salvar avaliação.')
  }
}

async function handleToggleLike(reviewId: number, likeId: number | null) {
  if (!userId.value) {
    showError('É necessário estar logado.')
    return
  }

  try {
    if (likeId) {
      // unlike
      await del(`/unlike/${likeId}`)

      // update local state
      const review = reviews.value.find((r) => r.id === reviewId)
      if (review) {
        review.likes_count--
        review.likes = review.likes.filter((l: Like) => l.id !== likeId)
      }
    } else {
      // like
      const response = await post<{ id: number }>('/like', {
        user_id: userId.value,
        review_id: reviewId,
      })

      // update local state
      const review = reviews.value.find((r) => r.id === reviewId)
      if (review) {
        review.likes_count++
        review.likes.push({
          id: response.data.id,
          user_id: userId.value,
          review_id: reviewId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    showError(error.response?.data?.message || 'Erro ao processar like.')
    // Revert on error if needed
    await fetchComponentDetails(showAllReviews.value)
  }
}

function handleBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

onMounted(() => {
  fetchComponentDetails()
})
</script>
