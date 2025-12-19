<template>
  <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900 min-w-[150px]">Avaliações</h2>

      <div class="grid gap-4 grid-cols-1 md:[&:has(*:nth-child(2))]:grid-cols-2">
        <button
          v-if="isAuthenticated && !userHasReviewed"
          @click="$emit('addReview')"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Escrever avaliação
        </button>

        <button
          v-if="showLoadAll"
          @click="$emit('loadAll')"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          Ver todas avaliações
        </button>
      </div>
    </div>

    <div v-if="reviews.length === 0" class="space-y-6 flex flex-col items-center text-gray-400">
      Ainda não foram escritas avaliações deste componente.
    </div>

    <div v-else class="space-y-4">
      <VReviewItem
        v-for="review in reviews"
        :key="review.id"
        :review="review"
        :is-authenticated="isAuthenticated"
        @toggle-like="$emit('toggleLike', review.id, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import VReviewItem from '@/shared/components/cards/VReviewItem.vue'
import type { Review } from '@/modules/samples/models/Review'

defineProps<{
  reviews: Review[]
  showLoadAll: boolean
  isAuthenticated: boolean
  userHasReviewed: boolean
}>()

defineEmits<{
  addReview: []
  loadAll: []
  toggleLike: [reviewId: number, likeId: number | null]
}>()
</script>
