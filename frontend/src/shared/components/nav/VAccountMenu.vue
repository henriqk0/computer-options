<template>
  <div class="relative">
    <button
      @click="toggle"
      class="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-150"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
      </svg>
      <span>Conta</span>

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
      class="dropdown-menu absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white"
    >
      <div v-if="!auth.isAuthenticatedValue" class="py-1">
        <button
          @click="(emit('open-login'), (openMenu = false))"
          class="block w-full text-left text-sm text-gray-700 px-4 py-3 hover:bg-gray-100 hover:text-gray-900 transition duration-150 active:bg-gray-100 active:text-gray-900 cursor-pointer"
        >
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              ></path>
            </svg>
            <span>Login</span>
          </div>
        </button>
        <button
          @click="(emit('open-register'), (openMenu = false))"
          class="block w-full text-left text-sm text-gray-600 px-4 py-3 hover:bg-gray-100 hover:text-gray-900 transition duration-150 active:bg-gray-100 active:text-gray-900 cursor-pointer"
        >
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
            <span>Cadastrar</span>
          </div>
        </button>
      </div>
      <div v-else class="py-1">
        <button
          class="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 font-medium cursor-pointer"
          @click="handleLogout"
        >
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            <span>Logout</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/modules/samples/composables/useAuth'

const emit = defineEmits<{
  (e: 'open-login'): void
  (e: 'open-register'): void
}>()

const auth = useAuth()
const openMenu = ref(false)

function toggle() {
  openMenu.value = !openMenu.value
}

function handleLogout() {
  auth.logout()
  openMenu.value = false
}
</script>
