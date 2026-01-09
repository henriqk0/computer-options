<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 dark:bg-neutral-700/78"
        @click.self="closeModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto dark:bg-neutral-900"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-neutral-100">
                {{ props.user?.name }}
              </h2>
              <button
                @click="closeModal"
                class="text-gray-400 transition hover:text-gray-600 dark:text-neutral-300 dark:hover:text-neutral-100"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
                >Papel atual</label
              >
              <p
                class="disable capitalize w-full px-4 py-2 border text-gray-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-neutral-600 dark:bg-neutral-800/35 dark:border-neutral-700 mb-4"
              >
                {{ user?.role }}
              </p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
                  >Atualizar Papel *</label
                >
                <select
                  v-model="formData.role"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                >
                  <option value="">Selecione...</option>
                  <option value="user">User</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div class="flex space-x-3 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  @click="closeModal"
                  class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { UserWithRole } from '@/modules/samples/models/UserWithRole'
import { ref } from 'vue'

const props = defineProps<{
  show: boolean
  user: UserWithRole | null
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save: [formData: any]
}>()

const formData = ref({
  role: '',
})

function resetForm() {
  formData.value = {
    role: '',
  }
}

function closeModal() {
  emit('update:show', false)
  resetForm()
}

function handleSubmit() {
  emit('save', {
    ...formData.value,
  })
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
