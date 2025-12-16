<template>
  <div class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Login</h2>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 active:text-gray-700"
        >
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

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span class="ml-2 text-sm text-gray-600">Lembrar-me</span>
          </label>
          <RouterLink to="/" class="text-sm text-blue-600 hover:text-blue-800"
            >Esqueceu a senha?</RouterLink
          >
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium active:text-blue-800"
        >
          Entrar
        </button>

        <p class="text-center text-sm text-gray-600">
          Não tem uma conta?
          <button
            type="button"
            @click="switchToRegister"
            class="text-blue-600 hover:text-blue-700 font-medium active:text-blue-800"
          >
            Cadastre-se
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/modules/samples/composables/useAuth'
import { showError, showSuccess } from '@/modules/samples/utils/alerts'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'switch-to-register'): void
}>()

const { login } = useAuth()

const email = ref('')
const password = ref('')

async function submit() {
  try {
    await login({ email: email.value, password: password.value })
    showSuccess('Login realizado com sucesso!')
    emit('close')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    showError(err?.response?.data?.message || 'Erro ao fazer login')
  }
}

function switchToRegister() {
  emit('switch-to-register')
}
</script>
