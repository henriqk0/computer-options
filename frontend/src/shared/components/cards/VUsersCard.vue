<template>
  <div
    class="bg-white rounded-lg border border-gray-200 p-5 dark:bg-neutral-800 dark:border-neutral-700"
  >
    <div class="grid grid-cols-11 gap-1">
      <div class="col-span-8 flex items-center space-x-3">
        <div
          class="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center"
          :class="getColorClass(index)"
        >
          <span class="text-white font-medium text-lg">{{ getInitials(user.name) }}</span>
        </div>
        <div>
          <h3
            class="text-base font-semibold text-gray-900 dark:text-neutral-100 min-w-0 break-words"
          >
            {{ user.name }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-neutral-500 min-w-0 break-all">
            {{ user.email }}
          </p>
        </div>
      </div>

      <div class="col-span-2 self-center">
        <span
          class="rounded-full px-1.5 py-1 text-white capitalize"
          :class="getRoleColor(user.role)"
          >{{ user.role }}</span
        >
      </div>
      <div class="col-span-1 place-self-center cursor-pointer dark:text-white" @click="toggle">
        <svg class="w-10 h-10 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>

        <div
          v-show="openUserManagerOptions"
          class="absolute justify-center rounded-md shadow-lg bg-white text-gray-700 dark:text-white dark:bg-neutral-800"
        >
          <div class="flex flex-col items-center">
            <button
              @click="$emit('edit', user)"
              class="text-blue-600 hover:text-blue-900 transition"
              title="Editar"
            >
              <svg
                class="w-10 h-10 p-1 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            <button
              @click="$emit('delete', user.id)"
              class="text-red-600 hover:text-red-900 transition"
              title="Excluir"
            >
              <svg
                class="w-10 h-10 p-1 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getColorClass, getInitials, getRoleColor } from '@/modules/samples/utils/helpers'
import type { UserWithRole } from '@/modules/samples/models/UserWithRole'
import { ref } from 'vue'

defineProps<{
  user: UserWithRole
  index: number
}>()

const openUserManagerOptions = ref(false)
function toggle() {
  openUserManagerOptions.value = !openUserManagerOptions.value
}

defineEmits<{
  edit: [user: UserWithRole]
  delete: [id: number]
}>()
</script>
