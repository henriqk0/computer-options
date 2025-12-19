<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
    <div class="md:flex">
      <!-- Component Image/Icon -->
      <div
        class="md:flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 md:w-64 flex items-center justify-center p-8"
      >
        <div class="text-white">
          <svg class="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <h3 class="text-center text-lg font-semibold mt-4">{{ component.nameComponent }}</h3>
        </div>
      </div>

      <!-- Component Details -->
      <div class="p-8 flex-1">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ component.nameComponent }}</h1>
            <p class="text-lg text-gray-600">{{ categoryLabel }}</p>
          </div>

          <div class="mt-4 md:mt-0 text-right">
            <div class="text-3xl font-bold text-green-600">
              {{ formatPrice(component.bestPrice) }}
            </div>
            <p class="text-sm text-gray-500 mt-1">
              Atualizado em {{ formatDate(component.datePrice) }}
            </p>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
          <span class="text-gray-700 text-sm">{{ component.about }}</span>
        </div>

        <!-- Rating Summary -->
        <div class="flex items-center mb-6 pb-6 border-b border-gray-200">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            <span class="text-3xl font-bold text-gray-900 ml-2">{{
              formatNumber(averageScore)
            }}</span>
            <span class="text-gray-600 text-sm ml-3">
              /10 baseado em <strong>{{ totalReviews }} avaliações</strong>
            </span>
          </div>
        </div>

        <!-- Buy Button -->
        <a
          :href="component.urlPrice"
          target="_blank"
          class="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          Comprar pelo melhor preço
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormatter } from '@/modules/samples/composables/useFormatters'
import { getCategoryLabel } from '@/modules/samples/utils/categoryDetector'
import type { SimpleComponentDetail } from '@/modules/samples/models/SimpleComponentDetail'

const { formatDate, formatPrice, formatNumber } = useFormatter()

const props = defineProps<{
  component: SimpleComponentDetail
  averageScore: number
  totalReviews: number
}>()

const categoryLabel = computed(() =>
  getCategoryLabel(props.component.categoryLevel, props.component.nameComponent),
)
</script>
