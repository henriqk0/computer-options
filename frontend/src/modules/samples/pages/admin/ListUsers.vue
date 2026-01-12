<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-neutral-100">Usuários cadastrados</h1>
      <p class="text-gray-600 mt-2 dark:text-neutral-400">
        Gerencie os usuários registrados no sistema
      </p>
    </div>

    <div v-if="loading">
      <VBlueLoading />
    </div>

    <!-- Content -->
    <template v-else>
      <div class="space-y-4">
        <VUsersCard
          v-for="(user, index) in users"
          :key="user.id"
          :user="user"
          :index="index"
          @delete="openDeleteModal"
          @edit="openEditModal"
        />
      </div>

      <!-- Pagination -->
      <VPagination
        v-if="pagination.total > 0"
        :pagination="pagination"
        :entity-paginated="entityLabel"
        @change-page="loadUsers"
      />
    </template>

    <VChangeRoleModal v-model:show="showRoleModal" :user="editingUserRole" @save="handleSave" />

    <VUserDeleteModal v-model:show="showDeleteModal" @confirm="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useApi } from '@/modules/samples/composables/useApi'
import { showError, showSuccess } from '@/modules/samples/utils/alerts'
import VUsersCard from '@/shared/components/cards/VUsersCard.vue'
import VPagination from '@/shared/components/tables/VPagination.vue'
import VUserDeleteModal from '@/shared/components/modals/VGenericDeleteModal.vue'
import VChangeRoleModal from '@/shared/components/modals/VChangeRoleModal.vue'
import VBlueLoading from '@/shared/components/utils/VBlueLoading.vue'
import type { ApiResponse as ApiResponseWithMsg } from '@/modules/samples/models/ApiResponseWithMsg'

import type { UserWithRole } from '@/modules/samples/models/UserWithRole'
import type { UsersPaginated } from '@/modules/samples/models/UsersPaginated'

const entityLabel = ref('usuários')

const { get, post, patch, del } = useApi()

const users = ref<UserWithRole[]>([])
const pagination = ref({
  current_page: 1,
  last_page: 1,
  next_page_url: '',
  prev_page_url: '',
  total: 0,
})

const loading = ref(true)

const showRoleModal = ref(false)
const showDeleteModal = ref(false)
const editingUserRole = ref<UserWithRole | null>(null)
const deletingUserId = ref<number | null>(null)

async function loadUsers(page = 1, perPage = 8) {
  try {
    const response = await get<UsersPaginated>('/listUsers', {
      params: { page, per_page: perPage },
    })

    const paginated = response.data

    users.value = paginated.data

    pagination.value = {
      current_page: paginated.current_page,
      last_page: paginated.last_page,
      next_page_url: paginated.next_page_url,
      prev_page_url: paginated.prev_page_url,
      total: paginated.total,
    }

    console.log(users)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    showError('Erro ao carregar usuários: ' + (error.response?.data?.message || error.message))
  } finally {
    loading.value = false
  }
}

function openEditModal(user: UserWithRole) {
  editingUserRole.value = user
  showRoleModal.value = true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSave(formData: any) {
  try {
    if (editingUserRole.value) {
      const response = await patch<ApiResponseWithMsg>(`/patchRole/${editingUserRole.value.id}`, {
        ...formData,
        id: editingUserRole.value.id,
      })
      showSuccess(response.data.message)
    } else {
      const response = await post<ApiResponseWithMsg>('/createAnyComponent', formData)
      showSuccess(response.data.message)
    }

    showRoleModal.value = false
    await loadUsers(pagination.value.current_page)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data?.errors) {
      const errors = Object.values(error.response.data.errors).flat()
      showError(errors.join(', '))
    } else {
      showError('Erro ao salvar usuário: ' + (error.response?.data?.message || error.message))
    }
  }
}

function openDeleteModal(id: number) {
  deletingUserId.value = id
  showDeleteModal.value = true
}

async function handleDelete() {
  if (!deletingUserId.value) return

  try {
    const response = await del<ApiResponseWithMsg>(`/deleteUser/${deletingUserId.value}`)
    showSuccess(response.data.message)
    showDeleteModal.value = false
    await loadUsers(pagination.value.current_page)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    showError('Erro ao deletar componente: ' + (error.response?.data?.message || error.message))
  }
}

onMounted(() => {
  loadUsers()
})
</script>
