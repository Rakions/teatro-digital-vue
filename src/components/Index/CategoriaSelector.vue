<script setup lang="ts">
import { computed } from 'vue';
import { useObrasStore } from '../../stores/obrasStore';

const obrasStore = useObrasStore();

const obras: any = computed(() => obrasStore.obras);
const cargaExitosa = computed(() => obrasStore.cargaExitosa);
const loading = computed(() => obrasStore.isLoading)

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
    <div v-if="loading" class="loader loader--style2" title="1">
        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;"
            xml:space="preserve">
            <path fill="#000"
                d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25"
                    to="360 25 25" dur="0.6s" repeatCount="indefinite" />
            </path>
        </svg>
    </div>
    <span v-if="!cargaExitosa" class="error_message">No se han podido cargar las obras</span>
    <div class="mainPage_functionsList">
        <a :href="`/obra?obraID=${obra.obraID}`" v-for="obra in obras" :key="obra.obraID" class="obra-item">
            <div class="function">
                <img src="#" alt="">
                <div>
                    <h3>{{ obra.titulo }}</h3>
                    <p>Director: {{ obra.director }}</p>
                </div>
                <input type="hidden" id="obra.obraID" value="{{ obra.obraID }}">
            </div>
        </a>
    </div>
</template>

<style scoped>
.error_message {
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 1rem;
    justify-content: center;
}

.loader {
    margin: 0 0 2em;
    height: 100px;
    width: 20%;
    text-align: center;
    padding: 1em;
    margin: 0 auto 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: top;
}
</style>