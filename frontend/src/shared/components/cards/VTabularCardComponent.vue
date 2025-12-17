<template>
  <div class="bg-white rounded-lg shadow p-5">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div
          class="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center"
          :class="getColorClass(index)"
        >
          <span class="text-white font-medium text-lg">{{
            getInitials(component.nameComponent)
          }}</span>
        </div>
        <div>
          <h3 class="text-base font-semibold text-gray-900">{{ component.nameComponent }}</h3>
          <p class="text-sm text-gray-500">{{ component.categoryLevel }}</p>
        </div>
      </div>
      <span
        class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
      >
        {{ formatPrice(component.bestPrice as unknown as number) }}
      </span>
    </div>

    <div class="space-y-2 mb-4">
      <div v-if="component.urlPrice" class="flex items-center text-sm">
        <svg
          class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.172-1.172m1.828-1.828l3-3a4 4 0 00-5.656-5.656l-1.172 1.172"
          />
        </svg>
        <a
          :href="component.urlPrice"
          target="_blank"
          class="text-blue-600 hover:text-blue-800 truncate"
        >
          Visitar site da oferta
        </a>
      </div>
      <div class="flex items-center text-sm">
        <svg
          class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span class="text-gray-700">Data da oferta: {{ formatDate(component.datePrice) }}</span>
      </div>
    </div>

    <div v-if="isAuthenticated" class="flex space-x-3 pt-4 border-t border-gray-200">
      <button
        @click="$emit('edit', component)"
        class="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <span>Editar</span>
      </button>
      <button
        @click="$emit('delete', component.anycomponent_id)"
        class="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition font-medium"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span>Deletar</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SimpleComponent } from '@/modules/samples/models/SimpleComponent'
import { useFormatter } from '@/modules/samples/composables/useFormatters'
import { getColorClass, getInitials } from '@/modules/samples/utils/helpers'

const { formatPrice, formatDate } = useFormatter()

defineProps<{
  component: SimpleComponent
  index: number
  isAuthenticated: boolean
}>()

defineEmits<{
  edit: [component: SimpleComponent]
  delete: [id: number]
}>()
</script>
