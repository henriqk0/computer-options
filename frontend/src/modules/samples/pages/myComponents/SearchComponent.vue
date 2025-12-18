<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-3 flex space-x-3">
      <h1 v-if="titleSearch" class="text-1xl font-bold text-gray-900">{{ titleSearch }}</h1>
      <p v-if="searchedLabel" class="text-gray-600">{{ searchedLabel }}</p>
    </div>

    <div v-if="loading">
      <VBlueLoading />
    </div>

    <template v-else>
      <div id="cardView" class="space-y-4">
        <VSearchedComponents
          v-for="component in searchedComponents"
          :key="component.anycomponent_id"
          :component="component"
          @show="openDetailedComponent"
        />

        <button
          v-if="searchedLabel && withAllQuery"
          @click="displayAllSearched"
          class="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium"
        >
          <span>Exibir outros componentes encontrados</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { showError } from '@/modules/samples/utils/alerts'
import { useApi } from '@/modules/samples/composables/useApi'
import { useRoute } from 'vue-router'
import VBlueLoading from '@/shared/components/utils/VBlueLoading.vue'
import type { SimpleComponent } from '@/modules/samples/models/SimpleComponent'
import VSearchedComponents from '@/shared/components/cards/VSearchedComponents.vue'
import router from '@/app/router'

const { get } = useApi()

const loading = ref(true)
const searchedComponents = ref<SimpleComponent[]>([])
const moreThan0 = ref(false)
const lastPart = ref('')
const withAllQuery = ref(true)
const titleSearch = ref('')
const searchedLabel = ref('')

const route = useRoute()

function pickLastPart() {
  const computedLastPart = computed(() => {
    const segments = route.path.split('/')
    return segments[segments.length - 1]
  })
  return computedLastPart.value
}

watch(
  () => route.path,
  () => {
    lastPart.value = pickLastPart()!

    fetchSearchedComps(lastPart.value)
  },
  { immediate: true }, // works like onMounted
)

async function fetchSearchedComps(toSearch: string, withAll: boolean = false) {
  try {
    const responseSearch = withAll // btn call to display all
      ? await get<SimpleComponent[]>(`/searchAnyComponent/${toSearch}`, {
          params: { all: true },
        }) // then, get only 10 first
      : await get<SimpleComponent[]>(`/searchAnyComponent/${toSearch}`)

    searchedComponents.value = responseSearch.data

    if (searchedComponents.value.length > 0) {
      moreThan0.value = true

      titleSearch.value = 'Você procurou por:'
      searchedLabel.value = toSearch
    } else {
      titleSearch.value = 'Nenhum componente encontrado'
      searchedLabel.value = ''
    }

    console.log(searchedComponents.value.length)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    showError('Erro ao carregar componentes: ' + (error.response?.data?.message || error.message))
  } finally {
    loading.value = false
  }
}

function openDetailedComponent(id: number) {
  router.push(`/show-component/${id}`)
}

async function displayAllSearched() {
  withAllQuery.value = false
  fetchSearchedComps(lastPart.value, true)
}
</script>
