<script setup lang="ts">
import { useObrasStore } from '@/stores/obrasStore';
import type { Funcion } from '@/utils/interfaces';
import { computed, watch } from 'vue';

const obrasStore = useObrasStore();
const props = defineProps<{ id: number }>();
const horas = computed(() => obrasStore.funciones as Funcion[]);

watch(() => props.id, async (newId) => {
    if (newId !== undefined && newId !== null) {
        await obrasStore.fetchFunciones();
    }
}, { immediate: true });
</script>

<template>
    <div class="function_list">
        <ul>
            <li v-for="hora in horas" :key="hora.funcionID">
                <span>{{ hora.fechaHora }}</span>
                <button type="button">
                    Reservar
                </button>
            </li>
        </ul>
    </div>
</template>


<style scoped>
.function_list {
    width: 70%;
}

.function_list ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.function_list li {
    border-radius: 10px;
    background-color: var(--color-fondo-componentes);
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 1rem;
}

.function_list button {
    padding: .5rem .7rem;
    border: none;
    background-color: var(--color-principal);
    border-radius: 5px;
    cursor: pointer;
}
</style>