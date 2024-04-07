<script setup lang="ts">
const props = defineProps({
    obraID: Number,
    titulo: String,
    descripcion: String,
    categoriaID: Number,
    imagen: String
})

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
</script>

<template>
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
            <tr v-for="item in obrasConDescripcionCorta" :key="item.obraID">
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
</template>