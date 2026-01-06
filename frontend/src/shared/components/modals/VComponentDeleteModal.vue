<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 dark:bg-neutral-700/78"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 dark:bg-neutral-900">
          <h3 class="text-xl font-bold text-gray-900 mb-4 dark:text-neutral-100">
            Confirmar Exclusão
          </h3>
          <p class="text-gray-600 mb-6 dark:text-neutral-300/77">
            Tem certeza que deseja excluir este componente? Esta ação não pode ser desfeita.
          </p>
          <div class="flex space-x-3">
            <button
              @click="handleConfirm"
              class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
            >
              Excluir
            </button>
            <button
              @click="closeModal"
              class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  confirm: []
}>()

function closeModal() {
  emit('update:show', false)
}

function handleConfirm() {
  emit('confirm')
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
