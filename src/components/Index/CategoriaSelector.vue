<script setup lang="ts">
import { computed } from 'vue';
import { useObrasStore } from '../../stores/obrasStore';

const obrasStore = useObrasStore();

const obras: any = computed(() => obrasStore.obras);

async function getObrasCategoria(categoria: number) {
    await obrasStore.fetchObrasCategoria(categoria);
}

async function getAllObras() {
    await obrasStore.fetchAllObras()
}

getAllObras();

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
    <div class="mainPage_functionsList">
        <a :href="`/asientos?obraID=${obra.obraID}`" v-for="obra in obras" :key="obra.obraID" class="obra-item">
            <div class="function">
                <img src="#" alt="">
                <div>
                    <h2>{{ obra.titulo }}</h2>
                    <p>Director: {{ obra.director }}</p>
                </div>
                <input type="hidden" id="obra.obraID" value="{{ obra.obraID }}">
            </div>
        </a>
    </div>
</template>