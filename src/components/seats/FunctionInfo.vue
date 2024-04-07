<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    titulo: String,
    descripcion: String
})
</script>

<template>

    <div class="seats_functionInfo">
        <div class="function">
            <img src="#" alt="" />
            <div class="function_title_desc">
                <h2>{{ props.titulo }}</h2>
                <p>{{ props.descripcion }}</p>
            </div>
            <input type="hidden" id="id_obra" value="${obra[0].id}" />
        </div>
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