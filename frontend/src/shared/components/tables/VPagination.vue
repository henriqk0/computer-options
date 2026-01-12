<template>
  <div
    class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 rounded-lg border border-gray-200 dark:bg-neutral-800 dark:border-neutral-700"
  >
    <div class="text-sm text-gray-700 order-2 sm:order-1 dark:text-neutral-300">
      Mostrando
      <span class="font-medium">{{ start }}-{{ end }} de {{ pagination.total }}</span>
      {{ entityPaginated }}
    </div>

    <div class="flex items-center space-x-2 order-1 sm:order-2">
      <button
        @click="$emit('changePage', 1)"
        :disabled="pagination.current_page === 1"
        class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        @click="$emit('changePage', pagination.current_page - 1)"
        :disabled="!pagination.prev_page_url"
        class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Desktop page numbers -->
      <div class="hidden sm:flex items-center space-x-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="$emit('changePage', page)"
          class="px-3 py-1 text-sm rounded-md"
          :class="
            page === pagination.current_page
              ? 'bg-blue-600 text-white font-semibold'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700'
          "
        >
          {{ page }}
        </button>
      </div>

      <!-- Mobile page indicator -->
      <span class="sm:hidden text-sm font-medium text-gray-700 dark:text-neutral-300">
        Página {{ pagination.current_page }} de {{ pagination.last_page }}
      </span>

      <button
        @click="$emit('changePage', pagination.current_page + 1)"
        :disabled="!pagination.next_page_url"
        class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <button
        @click="$emit('changePage', pagination.last_page)"
        :disabled="pagination.current_page === pagination.last_page"
        class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface PaginationData {
  current_page: number
  last_page: number
  next_page_url: string | null
  prev_page_url: string | null
  total: number
}

const props = defineProps<{
  pagination: PaginationData
  entityPaginated: string
}>()

defineEmits<{
  changePage: [page: number]
}>()

const start = computed(() => (props.pagination.current_page - 1) * 8 + 1)
const end = computed(() => Math.min(props.pagination.total, props.pagination.current_page * 8))

const visiblePages = computed(() => {
  const maxVisible = 5
  let startPage = Math.max(1, props.pagination.current_page - Math.floor(maxVisible / 2))
  const endPage = Math.min(props.pagination.last_page, startPage + maxVisible - 1)

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }

  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})
</script>
