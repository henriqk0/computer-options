<template>
  <div
    class="border border-gray-200 rounded-lg p-5 hover:shadow-md transition space-y-4 dark:border-neutral-700"
  >
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center">
        <div class="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <div class="ml-3">
          <h4 class="font-semibold text-gray-900 dark:text-neutral-100">{{ review.user.name }}</h4>
          <p class="text-xs text-gray-500 dark:text-neutral-500">
            {{ formatExtensiveLongDate(review.updated_at) }}
          </p>
        </div>
      </div>

      <div class="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
        <svg class="w-4 h-4 text-yellow-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
        <span class="text-sm font-bold text-yellow-900">{{ review.rating }}</span>
      </div>
    </div>

    <!-- Title -->
    <h3 class="font-semibold text-gray-900 dark:text-neutral-100">{{ review.title }}</h3>

    <!-- Content -->
    <p class="text-sm text-gray-700 whitespace-pre-line dark:text-neutral-300">
      {{ isExpanded ? review.content : truncatedContent }}
    </p>

    <!-- Expand Button -->
    <button
      v-if="review.content.length > 35"
      @click="toggleExpand"
      class="text-blue-600 hover:text-blue-800 font-medium mt-1"
    >
      {{ isExpanded ? 'Ver menos' : 'Ver mais' }}
    </button>

    <!-- Like Button -->
    <button
      v-if="isAuthenticated"
      @click="handleToggleLike"
      class="flex items-center transition"
      :class="isLiked ? 'text-blue-600' : 'text-gray-600'"
    >
      <svg
        class="w-5 h-5 mr-1"
        :class="isLiked ? 'fill-blue-600' : ''"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        ></path>
      </svg>
      <span>{{ review.likes_count }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFormatter } from '@/modules/samples/composables/useFormatters'
import { useAuth } from '@/modules/samples/composables/useAuth'
import type { Review } from '@/modules/samples/models/Review'

const { formatExtensiveLongDate } = useFormatter()

const props = defineProps<{
  review: Review
  isAuthenticated: boolean
}>()

const emit = defineEmits<{
  toggleLike: [likeId: number | null]
}>()

const auth = useAuth()
const userId = computed(() => auth.user.value?.id)

const isExpanded = ref(false)

const truncatedContent = computed(() => {
  return props.review.content.substring(0, 35) + '...'
})

const userLike = computed(() => {
  if (!userId.value) return null
  return props.review.likes.find((l) => l.user_id === userId.value)
})

const isLiked = computed(() => Boolean(userLike.value))

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

function handleToggleLike() {
  emit('toggleLike', userLike.value?.id || null)
}
</script>
