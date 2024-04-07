<script setup lang="ts">
import { useFuncionesStore } from '@/stores/funcionesStore';
import type { CreateFuncion, Funcion } from '@/utils/interfaces';
import { ref } from 'vue';

const props = defineProps({
    funcionProp: Array as () => Funcion[],
})
const dialog = ref(false)
const dialogCrear = ref(false)
const funcionesStore = useFuncionesStore();
const funcionInfoModificar = ref({
    funcionID: 0,
    obraID: 0,
    salaID: 0,
    fechaHora: '',
    precio: 0,
})

async function modificarFuncion(funcion: Funcion) {
    funcionInfoModificar.value = { ...funcion };
    dialog.value = true;
}

function abrirCrearFuncion() {
    funcionInfoModificar.value = { funcionID: 0, obraID: 0, salaID: 0, fechaHora: '', precio: 0 };
    dialogCrear.value = true
}

async function guardarFuncion() {
    await funcionesStore.updateFunciones(funcionInfoModificar.value)
    dialog.value = false;
}

async function crearFuncion() {
    if (!funcionInfoModificar.value.fechaHora || funcionInfoModificar.value.precio === null) {
        alert('Por favor, complete la fecha, hora y precio de la función.');
        return;
    }

    const params: CreateFuncion = {
        obraID: funcionInfoModificar.value.obraID,
        salaID: funcionInfoModificar.value.salaID,
        fechaHora: funcionInfoModificar.value.fechaHora,
        precio: funcionInfoModificar.value.precio
    }
    try {
        await funcionesStore.createFuncion(params);
        funcionInfoModificar.value = { funcionID: 0, obraID: 0, salaID: 0, fechaHora: '', precio: 0 };
        dialogCrear.value = false;
    } catch (error) {
        dialogCrear.value = false;
    }

}

</script>

<template>
    <button @click="abrirCrearFuncion" class="crear_funcion">Crear Función</button>
    <v-dialog v-model="dialogCrear" persistent max-width="600px">
        <v-card>
            <v-card-title>
                Crear Nueva Función
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogCrear = false">
                    X
                </v-btn>
            </v-card-title>
            <v-card-text class="texto_tarjeta">
                <label for="obraID">
                    <span>Obra ID: </span>
                    <input type="number" name="obraID" v-model="funcionInfoModificar.obraID">
                </label>
                <label for="salaID">
                    <span>Sala ID: </span>
                    <input type="number" name="salaID" v-model="funcionInfoModificar.salaID">
                </label>
                <label for="fechaHora">
                    <span>Fecha y Hora: </span>
                    <input type="datetime-local" name="fechaHora" v-model="funcionInfoModificar.fechaHora">
                </label>
                <label for="precio">
                    <span>Precio: </span>
                    <input type="number" name="precio" v-model="funcionInfoModificar.precio">
                </label>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="dialogCrear = false">Cerrar</v-btn>
                <v-btn color="blue darken-1" @click="crearFuncion">Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">Función ID</th>
                <th class="text-left">Obra ID</th>
                <th class="text-left">Sala ID</th>
                <th class="text-left">Fecha y Hora</th>
                <th class="text-left">Precio</th>
                <th class="text-left">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="funcion in funcionProp" :key="funcion.funcionID">
                <td>{{ funcion.funcionID }}</td>
                <td>{{ funcion.obraID }}</td>
                <td>{{ funcion.salaID }}</td>
                <td>{{ funcion.fechaHora }}</td>
                <td>{{ funcion.precio }}</td>
                <td>
                    <button @click="modificarFuncion(funcion)">Modificar</button>
                </td>
            </tr>
        </tbody>
    </v-table>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                Modificar Función
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false">
                    X
                </v-btn>
            </v-card-title>
            <v-card-text class="texto_tarjeta">
                <label for="obraID">
                    <span>Obra ID: </span>
                    <input type="number" name="obraID" v-model="funcionInfoModificar.obraID">
                </label>
                <label for="salaID">
                    <span>Sala ID: </span>
                    <input type="number" name="salaID" v-model="funcionInfoModificar.salaID">
                </label>
                <label for="fechaHora">
                    <span>Fecha y Hora: </span>
                    <input type="datetime-local" name="fechaHora" v-model="funcionInfoModificar.fechaHora">
                </label>
                <label for="precio">
                    <span>Precio: </span>
                    <input type="number" name="precio" v-model="funcionInfoModificar.precio">
                </label>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="dialog = false">Cerrar</v-btn>
                <v-btn color="blue darken-1" @click="guardarFuncion">Guardar</v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>