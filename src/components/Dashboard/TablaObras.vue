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
    <v-btn @click="abrirCrearObra" class="crear_obra">Crear Obra</v-btn>
    <v-dialog v-model="dialogCrear" persistent max-width="600px">
        <v-card>
            <v-card-title class="titulo_tarjeta">
                Crear Nueva Obra
                <v-btn icon @click="dialogCrear = false">
                    X
                </v-btn>
            </v-card-title>
            <v-card-text class="texto_tarjeta">
                <label for="titulo">
                    <span>Titulo: </span>
                    <v-text-field v-model="obraInfoModificar.titulo" name="titulo" label="Titulo"></v-text-field>
                </label>
                <label for="descripcion">
                    <span>Descripcion: </span>
                    <textarea v-model="obraInfoModificar.descripcion" name="descripcion" label="Descripcion" multi-line
                        rows="3" />
                </label>
                <label for="categoria">
                    <span>Categoria: </span>
                    <v-text-field v-model="obraInfoModificar.categoriaID" name="categoria" label="Categoria"
                        type="number"></v-text-field>
                </label>
                <label for="imagen">
                    <span>Imagen: </span>
                    <v-text-field v-model="obraInfoModificar.imagen" name="imagen" label="Imagen"></v-text-field>
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
            <v-card-title class="titulo_tarjeta">
                Modificar Obra
                <v-btn icon @click="dialog = false">
                    X
                </v-btn>
            </v-card-title>
            <v-card-text class="texto_tarjeta">
                <label for="titulo">
                    <span>Titulo: </span>
                    <v-text-field v-model="obraInfoModificar.titulo" name="titulo" label="Titulo"></v-text-field>
                </label>
                <label for="descripcion">
                    <span>Descripcion: </span>
                    <textarea v-model="obraInfoModificar.descripcion" name="descripcion" label="Descripcion" multi-line
                        rows="3" />
                </label>
                <label for="categoria">
                    <span>Categoria: </span>
                    <v-text-field v-model="obraInfoModificar.categoriaID" name="categoria" label="Categoria"
                        type="number"></v-text-field>
                </label>
                <label for="imagen">
                    <span>Imagen: </span>
                    <v-text-field v-model="obraInfoModificar.imagen" name="imagen" label="Imagen"></v-text-field>
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

.titulo_tarjeta {
    display: flex;
    width: 100%;
    justify-content: space-between;
}
</style>