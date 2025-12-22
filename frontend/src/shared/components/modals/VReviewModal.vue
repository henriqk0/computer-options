<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 bg-white z-50">
        <div class="h-full flex flex-col">
          <!-- header -->
          <div class="border-b border-gray-200">
            <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
              <button @click="closeModal" class="text-gray-600 hover:text-gray-900 transition">
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
                <span class="text-sm text-gray-500">{{ characterCount }} caracteres</span>
                <button
                  type="submit"
                  form="reviewForm"
                  :disabled="isSaving"
                  class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isSaving ? 'Salvando...' : 'Atualizar' }}
                </button>
                <button
                  @click="handleDelete"
                  :disabled="isSaving"
                  class="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>

          <!-- content area -->
          <div class="flex-1 overflow-y-auto">
            <div class="max-w-4xl mx-auto px-6 py-12">
              <form id="reviewForm" @submit.prevent="handleSubmit" class="space-y-8">
                <!-- title input -->
                <div>
                  <input
                    v-model="formData.title"
                    type="text"
                    required
                    maxlength="150"
                    class="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-300 border-none focus:outline-none focus:ring-0 p-0"
                    placeholder="Título da sua avaliação"
                    autocomplete="off"
                  />
                </div>

                <!-- rating section -->
                <div class="flex items-center space-x-4 py-6 border-t border-b border-gray-200">
                  <span class="text-lg text-gray-700 font-medium">Sua nota:</span>
                  <div class="flex items-center space-x-3">
                    <VStarRating v-model="formData.rating" />
                    <span class="text-2xl font-bold" :class="ratingColorClass">
                      {{ formData.rating }}/10
                    </span>
                  </div>
                </div>

                <!-- content textarea -->
                <div>
                  <textarea
                    v-model="formData.content"
                    required
                    rows="15"
                    class="w-full text-xl text-gray-800 placeholder-gray-400 border-none focus:outline-none focus:ring-0 p-0 resize-none leading-relaxed"
                    placeholder="Conte sua experiência e conhecimento do componente..."
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
import { ref, watch, computed } from 'vue'
import VStarRating from '../inputs/VStarRating.vue'
import type { MyReview } from '@/modules/samples/models/MyReview'

const props = defineProps<{
  show: boolean
  review: MyReview | null
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  save: [formData: { title: string; content: string; rating: number; user_id: number }]
  delete: []
}>()

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
  if (formData.value.rating === 0) return 'text-gray-400'
  if (formData.value.rating <= 3) return 'text-red-500'
  if (formData.value.rating <= 6) return 'text-yellow-500'
  return 'text-green-500'
})

watch(
  () => props.review,
  (newReview) => {
    if (newReview) {
      formData.value = {
        title: newReview.title,
        content: newReview.content,
        rating: newReview.rating,
      }
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

function resetForm() {
  if (props.review) {
    formData.value = {
      title: props.review.title,
      content: props.review.content,
      rating: props.review.rating,
    }
  }
}

function closeModal() {
  if (isSaving.value) return
  emit('update:show', false)
  resetForm()
}

function handleSubmit() {
  const title = formData.value.title.trim()
  const content = formData.value.content.trim()
  const rating = formData.value.rating

  // validations
  if (!title) {
    alert('Adicione um título.')
    return
  }
  if (content.length < 50) {
    alert('Mínimo de 50 caracteres.')
    return
  }
  if (rating === 0) {
    alert('Selecione uma nota.')
    return
  }

  const authUser = localStorage.getItem('auth_user')
  if (!authUser) {
    alert('Usuário não autenticado.')
    return
  }

  const userId = JSON.parse(authUser).id

  isSaving.value = true
  emit('save', {
    title,
    content,
    rating,
    user_id: userId,
  })

  // reset saving state after emit (parent will handle closing)
  setTimeout(() => {
    isSaving.value = false
  }, 100)
}

function handleDelete() {
  emit('delete')
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
