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
                {{ isEditing ? 'Editar Componente' : 'Adicionar Componente' }}
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

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
                  >Nome do Componente *</label
                >
                <input
                  v-model="formData.nameComponent"
                  type="text"
                  required
                  maxlength="50"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-neutral-100 dark:border-neutral-700"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
                  >Categoria *</label
                >
                <select
                  v-model="formData.categoryLevel"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-neutral-100 dark:border-neutral-700"
                >
                  <option value="">Selecione...</option>
                  <option value="high-end">High End</option>
                  <option value="mid-end">Mid Range</option>
                  <option value="low-end">Budget</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
                  >Melhor Preço (R$) *</label
                >
                <input
                  v-model.number="formData.bestPrice"
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  max="99999999.99"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-neutral-100 dark:border-neutral-700"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
                  >URL do Melhor Preço</label
                >
                <input
                  v-model="formData.urlPrice"
                  type="url"
                  maxlength="170"
                  placeholder="https://..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-neutral-100 dark:placeholder-neutral-500 dark:border-neutral-700"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
                  >Data do Melhor Preço *</label
                >
                <div class="relative w-full">
                  <input
                    ref="dateInput"
                    v-model="formData.datePrice"
                    type="date"
                    required
                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-neutral-100 dark:border-neutral-700"
                  />

                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-blue-500"
                    @click="openDatePicker"
                    tabindex="-1"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300/92"
                  >Descrição do Componente *</label
                >
                <textarea
                  v-model="formData.about"
                  maxlength="600"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px] placeholder-gray-400 dark:text-neutral-100 dark:placeholder-neutral-500 dark:border-neutral-700"
                  placeholder="Descreva o componente (máx. 600 caracteres)..."
                />
                <p class="text-right text-xs text-gray-500 mt-1">
                  {{ formData.about.length }} / 600
                </p>
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
import type { SimpleComponent } from '@/modules/samples/models/SimpleComponent'
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  show: boolean
  component: SimpleComponent | null
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save: [formData: any]
}>()

const dateInput = ref<HTMLInputElement | null>(null)

const openDatePicker = () => {
  const input = dateInput.value
  if (!input) return

  if (input.showPicker) {
    input.showPicker()
  } else {
    input.focus()
  }
}

const isEditing = computed(() => !!props.component)

const formData = ref({
  nameComponent: '',
  categoryLevel: '',
  bestPrice: 0,
  urlPrice: '',
  datePrice: '',
  about: '',
})

watch(
  () => props.component,
  (newComponent) => {
    if (newComponent) {
      formData.value = {
        nameComponent: newComponent.nameComponent,
        categoryLevel: newComponent.categoryLevel,
        bestPrice: newComponent.bestPrice as unknown as number,
        urlPrice: newComponent.urlPrice || '',
        datePrice: newComponent.datePrice,
        about: newComponent.about || '',
      }
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

function resetForm() {
  if (!isEditing.value) {
    formData.value = {
      nameComponent: '',
      categoryLevel: '',
      bestPrice: 0,
      urlPrice: '',
      datePrice: '',
      about: '',
    }
  } else {
    formData.value = {
      nameComponent: props.component!.nameComponent,
      categoryLevel: props.component!.categoryLevel,
      bestPrice: props.component!.bestPrice as unknown as number,
      urlPrice: props.component!.urlPrice,
      datePrice: props.component!.datePrice,
      about: props.component!.about || '',
    }
  }
}

function closeModal() {
  emit('update:show', false)
  resetForm()
}

function handleSubmit() {
  emit('save', {
    ...formData.value,
    urlPrice: formData.value.urlPrice || null,
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

input[type='date']::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 0;
}
</style>
