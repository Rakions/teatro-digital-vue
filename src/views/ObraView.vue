<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import TheHeader from '../components/layout/PageHeader.vue';
import FunctionInfo from '@/components/seats/FunctionInfo.vue';
import FunctionList from '@/components/seats/FunctionList.vue';
import AsientosComp from '@/components/seats/AsientosComp.vue';
import { useRoute } from 'vue-router';
import { useObrasStore } from '@/stores/obrasStore';
import type { Asiento, Funcion } from '@/utils/interfaces';
import router from '@/router';
import ConfirmSeats from '@/components/seats/ConfirmSeats.vue';
import { useAsientosStore } from '@/stores/asientosStore';

const asientosStore = useAsientosStore();
const obrasStore = useObrasStore();
const route = useRoute();
const obraId = Number(route.params.obraId);
const obra: any = computed(() => obrasStore.obras)
const horas = computed(() => obrasStore.funciones as Funcion[]);
const funcionId = ref(0);
const asientos = ref<Asiento[]>([])
const asientosFiltrados = ref<Asiento[]>([])
const asientosBool = ref(false);
const funcionesBool = ref(true);
const confirmarAsientos = ref(false)
const idsAsientos = ref<Number[]>([])
const precio = ref(0)
var asientoFetch: any = [];

async function getObra() {
  await obrasStore.fetchObrasById(obraId)
  asientos.value = obra.value.reservas;
}
getObra();
async function loadFunciones(id: number) {
  await obrasStore.fetchFunciones(id);
}
loadFunciones(obraId);

const updateFuncionId = (newFuncionId: number) => {
  funcionId.value = newFuncionId;
}

const purchaseSeatsEvent = (asientos: number[]) => {
  idsAsientos.value = asientos;
  purchaseSeats(asientos);
}

async function purchaseSeats(asientos: number[]) {
  asientoFetch = [];
  asientos.forEach((asiento) => {
    asientoFetch.push({ "funcionID": funcionId.value, "userID": 1, "asiento": asiento })
  })
  if (asientoFetch.length > 0) {
    obtenerPrecio(funcionId.value)
    asientosBool.value = false;
    confirmarAsientos.value = true;
  } else if (confirmarAsientos.value == true) {
    console.error("Ningún asiento seleccionado")
  }
}

async function procederPago() {
  await asientosStore.reservar(asientoFetch)
  router.replace('/')
}

function obtenerPrecio(id: number) {
  const funcion: any = horas.value.find(funcion => funcion.funcionID === id)
  precio.value = funcion.precio * idsAsientos.value.length;
}

watch(funcionId, (newVal) => {
  funcionesBool.value = false;
  asientosBool.value = true;
  asientosFiltrados.value = asientos.value.filter(asiento => asiento.funcionID == newVal)
})
</script>

<template>
  <TheHeader />
  <div class="seats">
    <a href="/" class="seats_goBack"><i class="fa-solid fa-arrow-left"></i> Volver</a>
    <FunctionInfo class="functionInfo" :titulo="obra.titulo" :descripcion="obra.descripcion" />
    <FunctionList v-if="funcionesBool" :horas="horas" @update:funcion-id="updateFuncionId" />
    <AsientosComp v-if="asientosBool" :asientosFiltrados="asientosFiltrados" @update:asientos="purchaseSeatsEvent" />
    <ConfirmSeats v-if="confirmarAsientos" :asientos="idsAsientos" :precio="precio" @pagar="procederPago" />
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
