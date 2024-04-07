<script setup lang="ts">
import type { Obra } from '@/utils/interfaces';
import { ref } from 'vue';
const props = defineProps({
    obra: Array as () => Obra[]
})
const idModificar = ref(0)
const dialog = ref(false)
const dialogCrear = ref(false)

function numeroACategoria(index: Number) {
    switch (index) {
        case 0:
            return 'Familiar'
        case 1:
            return 'Comedia'
        case 2:
            return 'Musical'
    }
}

function modificarObra(obraID: number) {
    idModificar.value = obraID;
    console.log('Modificar obra con ID:', obraID)
    dialog.value = true
}

function abrirCrearObra() {
    dialogCrear.value = true
}
</script>

<template>
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
    <v-table>
        <thead>
            <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Titulo</th>
                <th class="text-left">Descripción</th>
                <th class="text-left">Categoría</th>
                <th class="text-left">Imagen</th>
                <th class="text-left">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in obra" :key="item.obraID">
                <td>{{ item.obraID }}</td>
                <td>{{ item.titulo }}</td>
                <td>{{ item.descripcion }}</td>
                <td>{{ numeroACategoria(item.categoriaID!) }}</td>
                <td><img class="table_imagen" :src="item.imagen" /></td>
                <td>
                    <button @click="modificarObra(item.obraID!)">Modificar</button>
                </td>
            </tr>
        </tbody>
    </v-table>
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
</template>

<style scoped>
.table {
    border-radius: 5px;
    background: none;
    background-color: var(--color-fondo-componentes);
}

.table_imagen {
    width: 100px;
    height: 100px;
}
</style>