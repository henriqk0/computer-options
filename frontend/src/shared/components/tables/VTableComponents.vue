<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Nome
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Categoria
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
          >
            URL Melhor Preço
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
          >
            Data Melhor Preço
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Melhor Preço
          </th>
          <th
            v-if="isAuthenticated"
            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Ações
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-if="components.length === 0">
          <td :colspan="isAuthenticated ? 6 : 5" class="px-6 py-12 text-center text-gray-500">
            Nenhum componente cadastrado
          </td>
        </tr>
        <tr
          v-for="(component, index) in components"
          :key="component.anycomponent_id"
          class="hover:bg-gray-50 transition"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div
                class="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center"
                :class="getColorClass(index)"
              >
                <span class="text-white font-medium">{{
                  getInitials(component.nameComponent)
                }}</span>
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">{{ component.nameComponent }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="text-sm text-gray-900">{{ component.categoryLevel }}</div>
          </td>
          <td class="px-6 py-4 hidden lg:table-cell">
            <a
              v-if="component.urlPrice"
              :href="component.urlPrice"
              target="_blank"
              class="text-sm text-blue-600 hover:text-blue-800 truncate block max-w-xs"
              :title="component.urlPrice"
            >
              Ver link
            </a>
            <span v-else class="text-sm text-gray-400">-</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
            <div class="text-sm text-gray-900">{{ formatDate(component.datePrice) }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
            >
              {{ formatPrice(component.bestPrice as unknown as number) }}
            </span>
          </td>
          <td
            v-if="isAuthenticated"
            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
          >
            <div class="flex justify-end space-x-3">
              <button
                @click="$emit('edit', component)"
                class="text-blue-600 hover:text-blue-900 transition"
                title="Editar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                @click="$emit('delete', component.anycomponent_id)"
                class="text-red-600 hover:text-red-900 transition"
                title="Deletar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { SimpleComponent } from '@/modules/samples/models/SimpleComponent'
import { useFormatter } from '@/modules/samples/composables/useFormatters'
import { getColorClass, getInitials } from '@/modules/samples/utils/helpers'

const { formatPrice, formatDate } = useFormatter()

defineProps<{
  components: SimpleComponent[]
  isAuthenticated: boolean
}>()

defineEmits<{
  edit: [component: SimpleComponent]
  delete: [id: number]
}>()
</script>
