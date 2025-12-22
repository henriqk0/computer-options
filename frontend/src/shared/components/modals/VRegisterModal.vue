<template>
  <div class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Cadastro</h2>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Seu nome completo"
          />
        </div>

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
            minlength="8"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
          <p class="mt-1 text-xs text-gray-500">Mínimo de 8 caracteres</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha *</label>
          <input
            v-model="passwordConfirmation"
            type="password"
            minlength="8"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-start">
          <input
            type="checkbox"
            v-model="accepted"
            required
            class="mr-2 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label class="text-sm text-gray-600">
            Eu concordo com os
            <RouterLink to="/" class="text-blue-600 hover:text-blue-700 active:text-blue-800"
              >termos de uso</RouterLink
            >
            e
            <RouterLink to="/" class="text-blue-600 hover:text-blue-700 active:text-blue-800">
              política de privacidade
            </RouterLink>
          </label>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium active:bg-blue-800"
        >
          Criar Conta
        </button>

        <p class="text-center text-sm text-gray-600">
          Já tem uma conta?
          <button
            type="button"
            @click="switchToLogin"
            class="text-blue-600 hover:text-blue-700 font-medium active:text-blue-800"
          >
            Faça login
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
  (e: 'switch-to-login'): void
}>()

const auth = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const accepted = ref(false)

async function submit() {
  if (password.value !== passwordConfirmation.value) {
    showError('As senhas não coincidem.')
    return
  }

  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })

    showSuccess('Cadastro realizado com sucesso!')
    emit('close')
  } catch (err: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = (err as any)?.response?.data?.message || 'Erro ao criar conta'
    showError(message)
  }
}

function switchToLogin() {
  emit('switch-to-login')
}
</script>
