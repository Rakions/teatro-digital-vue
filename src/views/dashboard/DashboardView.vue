<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import Menu from '@/components/Dashboard/MenuDashboard.vue'
import { useObrasStore } from '@/stores/obrasStore'
import type { Obra } from '@/utils/interfaces';
import TablaObras from '@/components/Dashboard/TablaObras.vue';
const obrasStore = useObrasStore()

onMounted(() => {
  obrasStore.fetchAllObras().then(() => {
    obras.value = obrasStore.obras
  })
})

const obras = ref<Obra[]>([])

const obrasConDescripcionCorta = computed(() => {
  return obras.value.map((obra) => ({
    ...obra,
    descripcion:
      obra.descripcion!.length > 150
        ? obra.descripcion!.substring(0, 150) + '...'
        : obra.descripcion
  }))
})


</script>

<template>
  <div class="main_dashboard">
    <Menu />
    <div class="table_wrapper">
      <TablaObras :obraProp="obras" :obraCorta="obrasConDescripcionCorta" />
    </div>
  </div>
</template>

<style scoped>
.main_dashboard {
  display: flex;
  flex-direction: column-reverse;
  height: 100dvh;
  /* scrollbar-color: red;
    scrollbar-width: thin;
    scrollbar-gutter: stable; */
}

.table_wrapper {
  width: 100%;
  height: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .main_dashboard {
    flex-direction: row;
  }
}
</style>
