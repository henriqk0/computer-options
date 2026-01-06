<template>
  <div class="relative">
    <button @click="toggle" class="flex items-center space-x-2 rounded-md text-blue-600">
      <svg
        class="w-10 h-10 py-2 text-white bg-blue-600 px-2 rounded-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
      </svg>

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
      class="dropdown-menu absolute right-0 mt-2 w-49 rounded-md shadow-lg bg-white dark:bg-neutral-800"
    >
      <div v-if="!isLogged" class="pt-1">
        <button
          @click="(emit('open-login'), (openMenu = false))"
          class="block w-full text-left text-sm font-medium text-blue-600 px-4 py-3 hover:bg-gray-100 dark:hover:bg-neutral-900 transition duration-150 active:bg-neutral-100 dark:active:bg-neutral-900 cursor-pointer"
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
            <span class="text-gray-700 dark:text-white">Login</span>
          </div>
        </button>
        <button
          @click="(emit('open-register'), (openMenu = false))"
          class="block w-full text-left text-sm font-medium text-blue-600 px-4 py-3 hover:bg-gray-100 transition duration-150 active:bg-gray-100 cursor-pointer dark:hover:bg-neutral-900 dark:active:bg-neutral-900"
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
            <span
              class="text-gray-700 dark:text-white dark:hover:bg-neutral-900 dark:active:bg-neutral-900"
              >Cadastrar</span
            >
          </div>
        </button>
      </div>
      <div v-else class="pt-1">
        <button
          class="block w-full text-left px-4 py-3 text-blue-600 text-sm hover:bg-gray-100 font-medium cursor-pointer dark:hover:bg-neutral-900 dark:active:bg-neutral-900"
          @click="emit('handle-logout')"
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
            <span
              class="text-gray-700 dark:text-white dark:hover:bg-neutral-900 dark:active:bg-neutral-900"
              >Logout</span
            >
          </div>
        </button>
      </div>

      <button
        @click="themeSwitch"
        class="block w-full text-left px-4 py-3 text-blue-600 text-sm hover:bg-gray-100 font-medium cursor-pointer dark:hover:bg-neutral-900 dark:active:bg-neutral-900"
      >
        <div class="flex items-center space-x-2">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          <span class="text-gray-700 dark:text-white">Temas</span>

          <svg
            class="w-4 h-4 transform transition-transform"
            :class="{ 'rotate-180': openThemes }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </button>

      <div v-show="openThemes" class="pb-1">
        <button
          :class="theme === 'light' && 'bg-gray-50'"
          @click="theme = 'light'"
          class="block w-full text-left px-4 py-3 text-blue-600 text-sm font-normal hover:bg-gray-100 cursor-pointer dark:hover:bg-neutral-900 dark:active:bg-neutral-950"
        >
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-white">Tema claro</span>

            <svg
              v-show="theme === 'light'"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="green"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
        </button>

        <button
          class="block w-full text-left px-4 py-3 text-blue-600 text-sm font-normal hover:bg-gray-100 cursor-pointer dark:hover:bg-neutral-900 dark:active:bg-neutral-950"
          :class="{ 'bg-neutral-950': theme === 'dark' }"
          @click="theme = 'dark'"
        >
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-white">Tema escuro</span>

            <svg
              v-show="theme === 'dark'"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="green"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
        </button>

        <button
          class="block w-full text-left px-4 py-3 text-blue-600 text-sm font-normal hover:bg-gray-100 cursor-pointer dark:hover:bg-neutral-900 dark:active:bg-neutral-950"
          :class="{ 'bg-neutral-950': isDark && theme === 'auto' }"
          @click="theme = 'auto'"
        >
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-white">Tema automático</span>

            <svg
              v-show="theme === 'auto'"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="green"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuth } from '@/modules/samples/composables/useAuth'
import { useTheme } from '@/modules/samples/composables/useTheme'

const emit = defineEmits<{
  (e: 'open-login'): void
  (e: 'open-register'): void
  (e: 'handle-logout'): void
}>()

const auth = useAuth()

const { theme } = useTheme()

const isLogged = computed(() => auth.isAuthenticatedValue.value)

const openMenu = ref(false)

const openThemes = ref(false)

function toggle() {
  openMenu.value = !openMenu.value
}

function themeSwitch() {
  openThemes.value = !openThemes.value
}

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
</script>
