<script setup lang="ts">
import { useObrasStore } from '../../stores/obrasStore';

const obrasStore = useObrasStore();

function getObrasCategoria(categoria: number) {
    obrasStore.fetchObras(categoria);
}
</script>

<template>
    <div class="mainPage_categorySelector">
        <button @click="getObrasCategoria(0)">
            <p>FAMILIAR</p>
        </button>
        <button @click="getObrasCategoria(1)">
            <p>COMEDIA</p>
        </button>
        <button @click="getObrasCategoria(2)">
            <p>MUSICAL</p>
        </button>
    </div>
    <div class="mainPage_functionsList"></div>
</template>