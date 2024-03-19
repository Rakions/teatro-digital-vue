<script setup lang="ts">
import { computed } from 'vue';
import { useObrasStore } from '../../stores/obrasStore';

const obrasStore = useObrasStore();
const urlParams = new URLSearchParams(window.location.search);
const obraID = urlParams.getAll('obraID')[0];
const obra: any = computed(() => obrasStore.obras)

async function getObra() {
    await obrasStore.fetchObrasById(obraID);
}

getObra()
</script>

<template>

    <div class="seats_functionInfo">
        <div class="function">
            <img src="#" alt="" />
            <div>
                <h2>{{ obra.titulo }}</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum, possimus?</p>
            </div>
            <input type="hidden" id="id_obra" value="${obra[0].id}" />
        </div>
        <FunctionList :id="obra.obraID" />
    </div>

</template>

<style scoped>
.seats .seats_info {
    gap: 2rem;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.seats .seats_info .seats_functionInfo {
    max-width: 336px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.seats .function {
    max-width: 336px;
    min-width: 250px;
    width: 100%;
}

.seats .function img {
    width: 100%;
    height: 309px;
    object-fit: cover;
    border-radius: 15px;
}


@media (min-width: 768px) {
    .function {
        width: 336px;
    }

}
</style>