<template>
  <div class="bg-white rounded-lg shadow p-5">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0 h-12 w-12 bg-blue-600 rounded flex items-center justify-center">
          <span class="text-white font-medium text-lg">
            <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </span>
        </div>
        <div>
          <h3 class="text-base font-semibold text-gray-900">{{ component.nameComponent }}</h3>
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
          ></path>
        </svg>
        <a
          :href="component.urlPrice"
          target="_blank"
          class="text-blue-600 hover:text-blue-800 truncate"
          >Visitar site da oferta</a
        >
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
          ></path>
        </svg>
        <span class="text-gray-700">Data da oferta: {{ formatDate(component.datePrice) }}</span>
      </div>
    </div>

    <div class="flex space-x-3 pt-4 border-t border-gray-200">
      <button
        @click="$emit('show', component.anycomponent_id)"
        class="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium details-btn"
      >
        <span>Ver detalhes</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SimpleComponent } from '@/modules/samples/models/SimpleComponent'
import { useFormatter } from '@/modules/samples/composables/useFormatters'

const { formatPrice, formatDate } = useFormatter()

defineProps<{
  component: SimpleComponent
}>()

defineEmits<{
  show: [id: number]
}>()
</script>
