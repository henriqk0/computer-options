<template>
  <div class="fixed inset-0 bg-white z-50">
    <div class="h-full flex flex-col">
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">Buscar</h2>
        <button @click="$emit('close')" class="text-gray-700 p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div class="p-4">
        <div class="relative">
          <input
            v-model="search"
            @keydown.enter="onSearch"
            autofocus
            type="text"
            placeholder="Buscar..."
            class="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg"
          />
          <svg
            class="absolute left-4 top-3.5 w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        <p class="text-gray-500 text-center mt-8">Procure pelo nome do componente para buscar...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const search = ref('')

function onSearch() {
  if (!search.value) return
  window.location.href = `/search-components-by-name/${encodeURIComponent(search.value)}`
}
</script>
