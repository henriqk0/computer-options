<script setup lang="ts">
import { useApi } from '@/modules/samples/composables/useApi'
import type { FeaturedComponent } from '@/modules/samples/models/FeaturedComponent'
import VFeaturedComponents from '@/shared/components/cards/VFeaturedComponents.vue'
import VBlueLoading from '@/shared/components/utils/VBlueLoading.vue'
import { onMounted, ref } from 'vue'
import { showError } from '@/modules/samples/utils/alerts'

const { get } = useApi()

const datas = ref<FeaturedComponent[]>([])
const loading = ref(true)
const moreThan0 = ref(false)

onMounted(async () => {
  try {
    const res = await get<FeaturedComponent[]>('displayFeatured')
    datas.value = res.data
    if (datas.value.length > 0) {
      moreThan0.value = true
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)

    // catches error msg
    if (error.response) {
      // error returned by API (status 4xx or 5xx)
      showError(error.response.data.message || 'Erro no servidor')
    } else if (error.request) {
      // none server response
      showError('Servidor não respondeu')
    } else {
      // unknow error
      showError(error.message || 'Erro desconhecido')
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-4">Bem Vindo!</h1>
    <p class="text-gray-600">
      Não erre na escolha! Pesquise aqui a respeito do Componente (Periférico ou Hardware) em que
      tenha interesse para conhecê-lo melhor e ser capaz de tomar a melhor decisão.
    </p>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
    <div v-if="loading">
      <VBlueLoading />
    </div>

    <div v-if="!loading">
      <h1 v-if="moreThan0" class="text-2xl font-bold text-gray-900 mb-4" id="best-comp-label">
        Componentes melhor avaliados
      </h1>

      <div id="cardView" class="space-y-4" bis_skin_checked="1">
        <div v-for="(value, index) in datas" :key="index">
          <VFeaturedComponents
            :id="value.anycomponent_id"
            :nameComp="value.nameComponent"
            :scoreComp="value.related_reviews_avg_rating"
            :bestPrice="value.bestPrice"
            :datePrice="value.datePrice"
            :reviewsCount="value.related_reviews_count"
          />
        </div>
      </div>
    </div>
  </div>
</template>
