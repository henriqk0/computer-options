<template>
  <div class="relative dropdown">
    <button
      @click="toggle"
      class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150 active:bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:hover:bg-neutral-900 dark:active:bg-neutral-950 dark:text-white"
    >
      <span class="mr-1">Componentes</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>

    <div
      v-show="openMenu"
      class="dropdown-menu absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white text-gray-700 dark:text-white dark:bg-neutral-800"
    >
      <div class="py-1">
        <RouterLink
          to="/components"
          class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-900 dark:active:bg-neutral-950"
          >Listar Componentes</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const openMenu = ref(false)
function toggle() {
  openMenu.value = !openMenu.value
}
</script>
