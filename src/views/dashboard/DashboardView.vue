<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import Menu from '@/components/Dashboard/MenuDashboard.vue'
import { useObrasStore } from '@/stores/obrasStore'
import type { Obra } from '@/interfaces/Obra';
import TablaObras from '@/components/Dashboard/TablaObras.vue';

const obrasStore = useObrasStore()
const dialog = ref(false)
const dialogCrear = ref(false)
const idModificar = ref(0)

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

function abrirCrearObra() {
  dialogCrear.value = true
}

function modificarObra(obraID: number) {
  idModificar.value = obraID;
  console.log('Modificar obra con ID:', obraID)
  dialog.value = true
}
</script>

<template>
  <div class="main_dashboard">
    <Menu />

    <div class="table_wrapper">
      <button @click="abrirCrearObra">Crear Obra</button>

      <v-dialog v-model="dialogCrear" persistent max-width="600px">
        <v-card>
          <v-card-title>
            Crear Nueva Obra
            <v-spacer></v-spacer>
            <v-btn icon @click="dialogCrear = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            Aquí el contenido del formulario para crear una nueva obra.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialogCrear = false">Cerrar</v-btn>
            <v-btn color="blue darken-1">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <TablaObras />

      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            Modificar Obra
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              X
            </v-btn>
          </v-card-title>
          <v-card-text>
            Aquí el contenido del formulario o los detalles para modificar la obra.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialog = false">Cerrar</v-btn>
            <!-- <v-btn color="blue darken-1" @click="guardarCambios">Guardar</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
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

.table {
  border-radius: 5px;
  background: none;
  background-color: var(--color-fondo-componentes);
}

.table_imagen {
  width: 100px;
  height: 100px;
}

@media (min-width: 768px) {
  .main_dashboard {
    flex-direction: row;
  }
}
</style>
