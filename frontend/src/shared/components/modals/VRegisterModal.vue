<template>
  <div
    class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 dark:bg-neutral-700/78"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 dark:bg-neutral-900">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold dark:text-neutral-100">Cadastro</h2>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 active:text-gray-700 dark:text-neutral-300 dark:hover:text-neutral-100"
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
          <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
            >Nome *</label
          >
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-neutral-100 dark:placeholder-neutral-500 dark:border-neutral-700"
            placeholder="Seu nome completo"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
            >Email *</label
          >
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-neutral-100 dark:placeholder-neutral-500 dark:border-neutral-700"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
            >Senha *</label
          >
          <input
            v-model="password"
            type="password"
            minlength="8"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-neutral-100 dark:placeholder-neutral-500 dark:border-neutral-700"
            placeholder="••••••••"
          />
          <p class="mt-1 text-xs text-gray-500 dark:text-neutral-400/78">Mínimo de 8 caracteres</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
            >Confirmar Senha *</label
          >
          <input
            v-model="passwordConfirmation"
            type="password"
            minlength="8"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-neutral-100 dark:placeholder-neutral-500 dark:border-neutral-700"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-start">
          <label class="inline-flex items-center cursor-pointer select-none">
            <input type="checkbox" v-model="accepted" class="sr-only" />

            <span
              :class="[
                'h-4 w-4 rounded border flex items-center justify-center transition-colors duration-150',
                {
                  'bg-white border-gray-300 dark:border-neutral-700 dark:bg-neutral-900': !accepted,
                  'bg-blue-600 border-blue-600 dark:bg-blue-600 dark:border-blue-600': accepted,
                },
              ]"
            >
              <span
                class="text-white text-xs font-black transition-opacity duration-150"
                :style="{ opacity: accepted ? 1 : 0 }"
              >
                ✓
              </span>
            </span>

            <span class="text-sm text-gray-600 ml-2 dark:text-neutral-400">
              Eu concordo com os
              <RouterLink to="/" class="text-blue-600 hover:text-blue-700 active:text-blue-800"
                >termos de uso</RouterLink
              >
              e
              <RouterLink to="/" class="text-blue-600 hover:text-blue-700 active:text-blue-800">
                política de privacidade
              </RouterLink>
            </span>
          </label>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium active:bg-blue-800"
        >
          Criar Conta
        </button>

        <p class="text-center text-sm text-gray-600 dark:text-neutral-400">
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

const accepted = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

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
