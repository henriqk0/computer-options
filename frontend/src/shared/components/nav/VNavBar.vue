<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink to="/" class="text-2xl font-bold text-blue-600">TechComponent</RouterLink>

        <!-- Desktop -->
        <div class="hidden md:flex items-center space-x-4">
          <VComponentsMenu />

          <VReviewsBtn v-if="isLogged" />

          <div class="relative">
            <svg
              class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
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
            <input
              v-model="search"
              @keydown.enter="onSearch"
              type="text"
              placeholder="Buscar por nome..."
              class="comp-searcher w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <VAccountMenu
            @open-login="openLoginModal"
            @open-register="openRegisterModal"
            @handle-logout="handleLogout"
          />
        </div>

        <!-- Mobile buttons -->
        <div class="md:hidden flex items-center space-x-2">
          <button @click="openSearchModal" class="p-2 rounded-md text-gray-700 hover:bg-gray-100">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
          <button @click="toggleMobileMenu" class="p-2 rounded-md text-gray-700 hover:bg-gray-100">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- mobile menu (simple) -->
    <div v-show="mobileOpen" class="md:hidden border-t border-gray-200">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <button
          v-if="isLogged"
          class="w-full text-left px-3 py-2 text-gray-700"
          @click="$router.push({ path: 'my-reviews' })"
        >
          Minhas Reviews
        </button>

        <button
          class="mobile-dropdown-btn w-full flex items-center justify-between px-3 py-2 text-gray-700"
          @click="mobileComponentsOpen = !mobileComponentsOpen"
        >
          <span>Componentes</span>
          <svg
            class="w-4 h-4 transform transition-transform"
            :class="{ 'rotate-180': mobileComponentsOpen }"
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
        </button>

        <div v-show="mobileComponentsOpen" class="pl-4 mt-1 space-y-1 text-sm text-gray-600">
          <RouterLink to="/components" class="block px-3 py-2">Listar Componentes</RouterLink>
        </div>

        <div class="pt-4 border-t border-gray-200 text-gray-700">
          <div v-if="!isLogged" class="space-y-1">
            <button
              @click="openLoginModal"
              class="flex items-center space-x-3 px-3 py-3 w-full rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium cursor-pointer active:bg-blue-100 active:text-blue-800"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                ></path>
              </svg>
              <span>Login</span>
            </button>
            <button
              @click="openRegisterModal"
              class="flex items-center space-x-3 px-3 w-full py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
              <span>Cadastrar</span>
            </button>
          </div>

          <div v-else>
            <button
              @click="handleLogout"
              class="flex items-center space-x-3 px-3 py-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <VSearchModal v-if="searchModalOpen" @close="searchModalOpen = false" />
    <VLoginModal
      v-if="loginModalOpen"
      @close="loginModalOpen = false"
      @switch-to-register="openRegisterModal"
    />
    <VRegisterModal
      v-if="registerModalOpen"
      @close="registerModalOpen = false"
      @switch-to-login="openLoginModal"
    />
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuth } from '@/modules/samples/composables/useAuth'

import VComponentsMenu from './VComponentsMenu.vue'
import VAccountMenu from './VAccountMenu.vue'
import VSearchModal from '../modals/VSearchModal.vue'
import VLoginModal from '../modals/VLoginModal.vue'
import VRegisterModal from '../modals/VRegisterModal.vue'
import VReviewsBtn from './VReviewsBtn.vue'
import { useRouter } from 'vue-router'
import { showError, showSuccess } from '@/modules/samples/utils/alerts'

const auth = useAuth()
const router = useRouter()

const isLogged = computed(() => auth.isAuthenticatedValue.value)

const search = ref('')
const mobileOpen = ref(false)
const mobileComponentsOpen = ref(false)

const searchModalOpen = ref(false)
const loginModalOpen = ref(false)
const registerModalOpen = ref(false)

// actions
function openSearchModal() {
  searchModalOpen.value = true
}

function openLoginModal() {
  loginModalOpen.value = true
  registerModalOpen.value = false
}

function openRegisterModal() {
  registerModalOpen.value = true
  loginModalOpen.value = false
}

function toggleMobileMenu() {
  mobileOpen.value = !mobileOpen.value
}

function onSearch() {
  if (!search.value) return
  router.push(`/search-components-by-name/${search.value}`)
}

async function handleLogout() {
  try {
    await auth.logout()
    router.push('/')
    showSuccess('Logout realizado com sucesso!')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    showError(err?.response?.data?.message || 'Erro ao fazer logout')
  }
}
</script>
