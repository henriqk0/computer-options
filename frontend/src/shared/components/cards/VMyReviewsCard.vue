<template>
  <div
    class="border-b border-gray-200 p-5 px-0 grid grid-cols-4 gap-2 cursor-pointer dark:border-neutral-700"
    :data-review-id="review.id"
    @click="$emit('click')"
  >
    <div class="col-span-3">
      <h1 class="text-[20px] font-bold dark:text-neutral-100">{{ review.title }}</h1>
      <h3 class="text-gray-600 dark:text-neutral-300 py-1">{{ truncatedContent }}</h3>
      <span class="text-gray-500 dark:text-neutral-400 py-1">{{
        formatExtensiveShortDate(review.updated_at)
      }}</span>
    </div>

    <div
      class="flex justify-center items-center bg-gradient-to-br from-blue-400 to-yellow-100 h-[88px]"
    >
      <div class="flex">
        <div class="bg-blue-100 px-1 py-1 rounded-l-lg">
          <span class="text-sm font-bold text-blue-900">{{
            review.anycomponent.nameComponent
          }}</span>
        </div>

        <div class="flex items-center bg-yellow-100 px-1 py-1 rounded-r-lg">
          <svg class="w-4 h-4 text-yellow-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <span class="text-sm font-bold text-yellow-900">{{ review.rating }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormatter } from '@/modules/samples/composables/useFormatters'
import type { MyReview } from '@/modules/samples/models/MyReview'
import { computed } from 'vue'

const { formatExtensiveShortDate } = useFormatter()

const props = defineProps<{
  review: MyReview
}>()

defineEmits<{
  click: []
}>()

const truncatedContent = computed(() => {
  return props.review.content.substring(0, 35) + '...'
})
</script>
