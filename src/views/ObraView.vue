<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import TheHeader from '../components/layout/PageHeader.vue';
import FunctionInfo from '@/components/seats/FunctionInfo.vue';
import FunctionList from '@/components/seats/FunctionList.vue';
import AsientosComp from '@/components/seats/AsientosComp.vue';
import { useRoute } from 'vue-router';
import { useObrasStore } from '@/stores/obrasStore';
import type { Asiento } from '@/utils/interfaces';
import { useAsientosStore } from '@/stores/asientosStore';
import router from '@/router';

const asientosStore = useAsientosStore();
const obrasStore = useObrasStore();
const route = useRoute();
const obraId = Number(route.params.obraId);
const obra: any = computed(() => obrasStore.obras)
const funcionId = ref(0);
const asientos = ref<Asiento[]>([])
const asientosFiltrados = ref<Asiento[]>([])
const asientosBool = ref(false);

async function getObra() {
  await obrasStore.fetchObrasById(obraId)
  asientos.value = obra.value.reservas;
}
getObra();

const updateFuncionId = (newFuncionId: number) => {
  funcionId.value = newFuncionId;
}

const purchaseSeatsEvent = (asientos: number[]) => {
  purchaseSeats(asientos);
}

async function purchaseSeats(asientos: number[]) {
  var asientoFetch: any = [];
  asientos.forEach((asiento) => {
    asientoFetch.push({ "funcionID": funcionId.value, "userID": 1, "asiento": asiento })
  })

  if (asientoFetch.length > 0) {
    await asientosStore.reservar(asientoFetch)
  } else {
    console.error("Ningún asiento seleccionado")
  }
}

watch(funcionId, (newVal) => {
  asientosBool.value = true;
  asientosFiltrados.value = asientos.value.filter(asiento => asiento.funcionID == newVal)
})
</script>

<template>
  <TheHeader />
  <div class="seats">
    <a href="/" class="seats_goBack"><i class="fa-solid fa-arrow-left"></i> Volver</a>
    <FunctionInfo class="functionInfo" :titulo="obra.titulo" :descripcion="obra.descripcion" />
    <FunctionList v-if="!asientosBool" :id="obraId" @update:funcion-id="updateFuncionId" />
    <AsientosComp v-else :asientosFiltrados="asientosFiltrados" @update:asientos="purchaseSeatsEvent" />
  </div>
</template>


<style scoped>
.seats {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 2rem;
  gap: 2rem;
  padding-inline: 4rem;
}

.seats .seats_goBack {
  display: none;
  position: absolute;
  top: -30px;
  left: 0;
  margin-left: 2rem;
  color: black;
  font-weight: 700;
}

@media (min-width: 768px) {
  .function {
    width: 336px;
  }

  .functionInfo {
    max-width: 700px;
  }

  .seats {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .seats .seats_goBack {
    display: block;
    margin-left: 5rem;
  }
}
</style>
