<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">
                {{ isEditing ? 'Editar Componente' : 'Adicionar Componente' }}
              </h2>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
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
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Nome do Componente *</label
                >
                <input
                  v-model="formData.nameComponent"
                  type="text"
                  required
                  maxlength="50"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                <select
                  v-model="formData.categoryLevel"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="high-end">High End</option>
                  <option value="mid-end">Mid Range</option>
                  <option value="low-end">Budget</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Melhor Preço (R$) *</label
                >
                <input
                  v-model.number="formData.bestPrice"
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  max="99999999.99"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >URL do Melhor Preço</label
                >
                <input
                  v-model="formData.urlPrice"
                  type="url"
                  maxlength="170"
                  placeholder="https://..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Data do Melhor Preço *</label
                >
                <input
                  v-model="formData.datePrice"
                  type="date"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Descrição do Componente *</label
                >
                <textarea
                  v-model="formData.about"
                  maxlength="600"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px] placeholder-gray-400"
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
                  class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
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
</style>
