<script setup lang="ts">
import { useObrasStore } from '@/stores/obrasStore';
import type { Obra } from '@/utils/interfaces';
import { ref } from 'vue';

const props = defineProps({
    obraProp: Array as () => Obra[],
    obraCorta: Array as () => Obra[]
})
const idModificar = ref(0)
const dialog = ref(false)
const dialogCrear = ref(false)
const obrasStore = useObrasStore();
const obraInfoModificar = ref({
    obraID: 0,
    titulo: '',
    descripcion: '',
    categoriaID: 0,
    imagen: '',
})

async function modificarObra(obra: Obra) {
    const obraCompleta = props.obraProp?.find(o => o.obraID === obra.obraID);
    obraInfoModificar.value.obraID = obra.obraID;
    obraInfoModificar.value.titulo = obra.titulo;
    obraInfoModificar.value.descripcion = obraCompleta ? obraCompleta.descripcion : obra.descripcion;
    obraInfoModificar.value.categoriaID = obra.categoriaID;
    obraInfoModificar.value.imagen = obra.imagen;
    dialog.value = true;
}

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

function abrirCrearObra() {
    dialogCrear.value = true
}

function guardarObra() {
    obrasStore.modificarObras(obraInfoModificar.value)
    dialog.value = false;
}

function crearObra() {
    if (!obraInfoModificar.value.titulo || !obraInfoModificar.value.descripcion) {
        alert('Por favor, complete el título y la descripción de la obra.');
        return;
    }

    obrasStore.crearObra(obraInfoModificar.value);
    obraInfoModificar.value = { obraID: 0, titulo: '', descripcion: '', categoriaID: 0, imagen: '' };
    dialogCrear.value = false;
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
            <v-card-text class="texto_tarjeta">
                <label for="titulo">
                    <span>Titulo: </span>
                    <input type="text" name="titulo" v-model="obraInfoModificar.titulo">
                </label>
                <label for="descripcion">
                    <span>Descripcion: </span>
                    <textarea name="descripcion" v-model="obraInfoModificar.descripcion"></textarea>
                </label>
                <label for="categoria">
                    <span>Categoria: </span>
                    <input type="number" name="categoria" v-model="obraInfoModificar.categoriaID">
                </label>
                <label for="imagen">
                    <span>Imagen: </span>
                    <input type="text" name="imagen" v-model="obraInfoModificar.imagen">
                </label>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="dialogCrear = false">Cerrar</v-btn>
                <v-btn color="blue darken-1" @click="crearObra">Guardar</v-btn>
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
            <tr v-for="item in obraCorta" :key="item.obraID">
                <td>{{ item.obraID }}</td>
                <td>{{ item.titulo }}</td>
                <td>{{ item.descripcion }}</td>
                <td>{{ numeroACategoria(item.categoriaID!) }}</td>
                <td><img class="table_imagen" :src="item.imagen" /></td>
                <td>
                    <button @click="modificarObra(item)">Modificar</button>
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
            <v-card-text class="texto_tarjeta">
                <label for="titulo">
                    <span>Titulo: </span>
                    <input type="text" name="titulo" v-model="obraInfoModificar.titulo">
                </label>
                <label for="descripcion">
                    <span>Descripcion: </span>
                    <textarea name="descripcion" v-model="obraInfoModificar.descripcion"></textarea>
                </label>
                <label for="categoria">
                    <span>Categoria: </span>
                    <input type="number" name="categoria" v-model="obraInfoModificar.categoriaID">
                </label>
                <label for="imagen">
                    <span>Imagen: </span>
                    <input type="text" name="imagen" v-model="obraInfoModificar.imagen">
                </label>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="dialog = false">Cerrar</v-btn>
                <v-btn color="blue darken-1" @click="guardarObra">Guardar</v-btn>
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

.texto_tarjeta {
    display: flex;
    flex-direction: column;
    gap: 1rem
}

label {
    display: flex;
    gap: 1rem;
}

input,
textarea {
    border: 1px solid rgb(194, 194, 194);
    padding: 0.2rem 0.3rem;
    border-radius: 5px;
}

textarea {
    resize: none;
    height: 100px;
    width: 100%;
}
</style>