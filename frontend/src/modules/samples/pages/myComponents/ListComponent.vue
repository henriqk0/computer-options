<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-neutral-100">
        Componentes cadastrados
      </h1>
      <p class="text-gray-600 mt-2 dark:text-neutral-400">
        Gerencie os diferentes componentes disponíveis
      </p>
      <button
        v-if="isAuthorized"
        @click="openAddModal"
        class="flex items-center mt-4 space-x-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-150"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        <span>Adicionar Componente</span>
      </button>
    </div>

    <div v-if="loading">
      <VBlueLoading />
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Table View (Desktop/Tablet) -->
      <div
        class="hidden md:block rounded-lg border border-gray-200 overflow-hidden dark:bg-neutral-800 dark:border-neutral-700"
      >
        <VTableComponents
          :components="components"
          :is-authenticated="isAuthorized"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>

      <!-- Card View (Mobile) -->
      <div class="md:hidden space-y-4">
        <VTabularCardComponent
          v-for="(component, index) in components"
          :key="component.anycomponent_id"
          :component="component"
          :index="index"
          :is-authenticated="isAuthorized"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>

      <!-- Pagination -->
      <VPagination
        v-if="pagination.total > 0"
        :pagination="pagination"
        :entity-paginated="entityLabel"
        @change-page="loadComponents"
      />
    </template>

    <!-- Modals -->
    <VComponentFormModal
      v-model:show="showComponentModal"
      :component="editingComponent"
      @save="handleSave"
    />

    <VComponentDeleteModal v-model:show="showDeleteModal" @confirm="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useApi } from '@/modules/samples/composables/useApi'
import { useAuth } from '@/modules/samples/composables/useAuth'
import { showError, showSuccess } from '@/modules/samples/utils/alerts'
import VTableComponents from '@/shared/components/tables/VTableComponents.vue'
import VTabularCardComponent from '@/shared/components/cards/VTabularCardComponent.vue'
import VPagination from '@/shared/components/tables/VPagination.vue'
import VComponentDeleteModal from '@/shared/components/modals/VGenericDeleteModal.vue'
import VComponentFormModal from '@/shared/components/modals/VComponentFormModal.vue'
import VBlueLoading from '@/shared/components/utils/VBlueLoading.vue'
import type { SimpleComponent } from '@/modules/samples/models/SimpleComponent'
import type { SimpleComponentPaginated } from '@/modules/samples/models/SimpleComponentPaginated'
import type { ApiResponse as ApiResponseWithMsg } from '@/modules/samples/models/ApiResponseWithMsg'

const { get, post, put, del } = useApi()

const auth = useAuth()
const isAuthorized = auth.requiresEditor

const components = ref<SimpleComponent[]>([])
const entityLabel = ref('componentes')
const pagination = ref({
  current_page: 1,
  last_page: 1,
  next_page_url: '',
  prev_page_url: '',
  total: 0,
})

const loading = ref(true)

const showComponentModal = ref(false)
const showDeleteModal = ref(false)
const editingComponent = ref<SimpleComponent | null>(null)
const deletingComponentId = ref<number | null>(null)

async function loadComponents(page = 1, perPage = 8) {
  try {
    const response = await get<SimpleComponentPaginated>('/listAnyComponent', {
      params: { page, per_page: perPage },
    })

    const paginated = response.data

    components.value = paginated.data

    pagination.value = {
      current_page: paginated.current_page,
      last_page: paginated.last_page,
      next_page_url: paginated.next_page_url,
      prev_page_url: paginated.prev_page_url,
      total: paginated.total,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    showError('Erro ao carregar componentes: ' + (error.response?.data?.message || error.message))
  } finally {
    loading.value = false
  }
}

function openAddModal() {
  editingComponent.value = null
  showComponentModal.value = true
}

function openEditModal(component: SimpleComponent) {
  editingComponent.value = component
  showComponentModal.value = true
}

function openDeleteModal(id: number) {
  deletingComponentId.value = id
  showDeleteModal.value = true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSave(formData: any) {
  try {
    if (editingComponent.value) {
      const response = await put<ApiResponseWithMsg>('/updateAnyComponent', {
        ...formData,
        anycomponent_id: editingComponent.value.anycomponent_id,
      })
      showSuccess(response.data.message)
    } else {
      const response = await post<ApiResponseWithMsg>('/createAnyComponent', formData)
      showSuccess(response.data.message)
    }

    showComponentModal.value = false
    await loadComponents(pagination.value.current_page)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data?.errors) {
      const errors = Object.values(error.response.data.errors).flat()
      showError(errors.join(', '))
    } else {
      showError('Erro ao salvar componente: ' + (error.response?.data?.message || error.message))
    }
  }
}

async function handleDelete() {
  if (!deletingComponentId.value) return

  try {
    const response = await del<ApiResponseWithMsg>(
      `/deleteAnyComponent/${deletingComponentId.value}`,
    )
    showSuccess(response.data.message)
    showDeleteModal.value = false
    await loadComponents(pagination.value.current_page)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    showError('Erro ao deletar componente: ' + (error.response?.data?.message || error.message))
  }
}

onMounted(() => {
  loadComponents()
})
</script>
