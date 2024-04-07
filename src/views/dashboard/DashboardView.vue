<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Menu from '@/components/Dashboard/MenuDashboard.vue'
import { useObrasStore } from '@/stores/obrasStore'
import type { Funcion, Obra, UsuarioFetchDashboard } from '@/utils/interfaces';
import TablaObras from '@/components/Dashboard/TablaObras.vue';
import { useUserStore } from '@/stores/userStore';
import TablaUsuarios from '@/components/Dashboard/TablaUsuarios.vue';
import TablaFunciones from '@/components/Dashboard/TablaFunciones.vue';
import { useFuncionesStore } from '@/stores/funcionesStore';
const obrasStore = useObrasStore();
const userStore = useUserStore();
const funcionesStore = useFuncionesStore()
const usuariosMostrar = ref(false);
const obrasMostrar = ref(true)
const funcionMostrar = ref(false)

onMounted(async () => {
  await obrasStore.fetchAllObras().then(() => {
    obras.value = obrasStore.obras
  })
  await userStore.fetchAllUsers().then(() => {
    usuarios.value = userStore.usuarios
  })
  await funcionesStore.getAllFunciones().then(() => {
    funciones.value = funcionesStore.funciones;
  })
})

function handleMostrarTabla(tabla: any) {
  usuariosMostrar.value = tabla === 'usuarios';
  obrasMostrar.value = tabla === 'obras';
  funcionMostrar.value = tabla === 'funciones'
}

const obras = ref<Obra[]>([])
const usuarios = ref<UsuarioFetchDashboard[]>([]);
const funciones = ref<Funcion[]>([])

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
    <Menu @mostrarTabla="handleMostrarTabla" />
    <div class="table_wrapper">
      <TablaObras v-if="obrasMostrar" :obraProp="obras" :obraCorta="obrasConDescripcionCorta" />
      <TablaUsuarios v-if="usuariosMostrar" :usuariosProp="usuarios" />
      <TablaFunciones v-if="funcionMostrar" :funcionProp="funciones" />
    </div>
  </div>
</template>

<style scoped>
.main_dashboard {
  display: flex;
  flex-direction: column-reverse;
  height: 100dvh;
}

.table_wrapper {
  width: 100%;
  padding: 1rem;
  overflow-y: scroll;
  height: 100vh;
  scrollbar-width: none;
}

@media (min-width: 768px) {
  .main_dashboard {
    flex-direction: row;
  }
}
</style>
