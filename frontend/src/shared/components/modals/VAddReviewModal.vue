<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 bg-white z-50 dark:bg-neutral-800">
        <div class="h-full flex flex-col">
          <!-- Header -->
          <div class="border-b border-gray-200 dark:border-neutral-700">
            <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
              <button
                @click="handleClose"
                class="text-gray-600 hover:text-gray-900 transition dark:text-neutral-300 dark:hover:text-neutral-100"
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
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-500 dark:text-neutral-400/85"
                  >{{ characterCount }} caracteres</span
                >
                <button
                  type="submit"
                  form="reviewForm"
                  :disabled="isSaving"
                  class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isSaving ? 'Publicando...' : 'Publicar' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Content Area -->
          <div class="flex-1 overflow-y-auto">
            <div class="max-w-4xl mx-auto px-6 py-12">
              <form id="reviewForm" @submit.prevent="handleSubmit" class="space-y-8">
                <!-- Title Input -->
                <div>
                  <input
                    v-model="formData.title"
                    type="text"
                    required
                    maxlength="150"
                    class="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-300 border-none focus:outline-none focus:ring-0 p-0 dark:text-neutral-100 dark:placeholder-neutral-600/50"
                    placeholder="Título da sua avaliação"
                    autocomplete="off"
                  />
                </div>

                <!-- Rating Section -->
                <div
                  class="flex items-center space-x-4 py-6 border-t border-b border-gray-200 dark:border-neutral-700"
                >
                  <span class="text-lg text-gray-700 font-medium dark:text-neutral-300"
                    >Sua nota:</span
                  >
                  <div class="flex items-center space-x-3">
                    <VStarRating v-model="formData.rating" :hoverable="true" />
                    <span class="text-2xl font-bold" :class="ratingColorClass">
                      {{ formData.rating }}/10
                    </span>
                  </div>
                </div>

                <!-- Content Textarea -->
                <div>
                  <textarea
                    v-model="formData.content"
                    required
                    rows="15"
                    class="w-full text-xl text-gray-800 placeholder-gray-400 border-none focus:outline-none focus:ring-0 p-0 resize-none leading-relaxed dark:text-neutral-200 dark:placeholder-neutral-500/55"
                    placeholder="Conte sua experiência e conhecimento sobre o componente..."
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import VStarRating from '../inputs/VStarRating.vue'
import { useAuth } from '@/modules/samples/composables/useAuth'

const props = defineProps<{
  show: boolean
  componentId: number
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  save: [
    formData: {
      title: string
      content: string
      rating: number
      anycomponent_id: number
      user_id: number
    },
  ]
}>()

const auth = useAuth()
const userId = computed(() => auth.user.value?.id)

const isSaving = ref(false)

const formData = ref({
  title: '',
  content: '',
  rating: 0,
})

const characterCount = computed(() => {
  return formData.value.title.length + formData.value.content.length
})

const ratingColorClass = computed(() => {
  if (formData.value.rating === 0) return 'text-gray-400 dark:text-neutral-500/83'
  if (formData.value.rating <= 3) return 'text-red-500'
  if (formData.value.rating <= 6) return 'text-yellow-500'
  return 'text-green-500'
})

watch(
  () => props.show,
  (newShow) => {
    if (!newShow) {
      resetForm()
    }
  },
)

function resetForm() {
  formData.value = {
    title: '',
    content: '',
    rating: 0,
  }
}

function handleClose() {
  if (formData.value.title || formData.value.content || formData.value.rating > 0) {
    if (confirm('Descartar avaliação?')) {
      emit('update:show', false)
    }
  } else {
    emit('update:show', false)
  }
}

function handleSubmit() {
  const title = formData.value.title.trim()
  const content = formData.value.content.trim()
  const rating = formData.value.rating

  if (!title) {
    alert('Por favor, adicione um título.')
    return
  }
  if (content.length < 50) {
    alert('Sua avaliação deve ter pelo menos 50 caracteres.')
    return
  }
  if (rating === 0) {
    alert('Selecione uma nota.')
    return
  }

  if (!userId.value) {
    alert('Usuário não autenticado.')
    return
  }

  isSaving.value = true
  emit('save', {
    title,
    content,
    rating,
    anycomponent_id: props.componentId,
    user_id: userId.value,
  })

  // Reset saving state
  setTimeout(() => {
    isSaving.value = false
  }, 100)
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
