<script setup lang="ts">
import { useFormatter } from '@/modules/samples/composables/useFormatters'

interface DisplayedFeaturedComp {
  id: number
  nameComp: string
  scoreComp: string
  bestPrice: string
  datePrice: string
  reviewsCount: number
}

defineProps<DisplayedFeaturedComp>()

const { formatPrice, formatDate, formatNumber } = useFormatter()
</script>

<template>
  <RouterLink :to="`/show-component/${id}`">
    <div
      class="bg-white rounded-lg border border-gray-200 p-5 hover:bg-gray-50 transition-colors duration-300 cursor-pointer active:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700"
      :data-comp-id="id"
      bis_skin_checked="1"
    >
      <div class="flex items-start justify-between mb-4" bis_skin_checked="1">
        <div class="flex items-center space-x-3" bis_skin_checked="1">
          <div
            class="flex-shrink-0 h-12 w-12 bg-blue-600 rounded flex items-center justify-center"
            bis_skin_checked="1"
          >
            <span class="text-white font-medium text-lg">
              <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                ></path>
              </svg>
            </span>
          </div>
          <div bis_skin_checked="1">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">{{ nameComp }}</h3>
          </div>
        </div>

        <div class="flex items-center flex-col" bis_skin_checked="1">
          <div class="flex" bis_skin_checked="1">
            <span
              class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-l-full bg-blue-100 text-blue-800"
            >
              SCORE
            </span>
            <span
              class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-r-full bg-yellow-100 text-yellow-800"
            >
              {{ formatNumber(scoreComp as unknown as number) }} / 10
            </span>
          </div>
          <span
            class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full dark:text-white"
          >
            {{ reviewsCount }} usuários
          </span>
        </div>
      </div>

      <div class="space-y-2 mb-4" bis_skin_checked="1">
        <div class="flex items-center text-sm" bis_skin_checked="1">
          <svg
            class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 dark:text-neutral-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            ></path>
          </svg>
          <span
            class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
          >
            {{ formatPrice(bestPrice as unknown as number) }}
          </span>
        </div>

        <div class="flex items-center text-sm" bis_skin_checked="1">
          <svg
            class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 dark:text-neutral-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <span class="text-gray-700 dark:text-neutral-400"
            >Data do preço: {{ formatDate(datePrice) }}</span
          >
        </div>
      </div>
    </div>
  </RouterLink>
</template>
