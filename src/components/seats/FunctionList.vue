<script setup lang="ts">
import { useObrasStore } from '@/stores/obrasStore';
import type { Funcion } from '@/utils/interfaces';
import { computed } from 'vue';
import { formatDateTime } from '@/utils/utils';
import { defineEmits } from 'vue';

const obrasStore = useObrasStore();
const props = defineProps({
    horas: Array as () => Funcion[]
});
const emits = defineEmits(['update:funcionId']);

function emitFuncionId(newFuncionId: number) {
    emits('update:funcionId', newFuncionId);
}

</script>

<template>
    <div class="function_list">
        <ul>
            <li v-for="hora in horas" :key="hora.funcionID">
                <span>{{ formatDateTime(hora.fechaHora) }}</span>
                <button type="button" @click="emitFuncionId(hora.funcionID)" style="color: white;">
                    Reservar
                </button>
            </li>
        </ul>
    </div>
</template>


<style scoped>
.function_list {
    width: 100%;
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

@media(min-width:768px) {
    .function_list {
        width: 70%;
    }
}
</style>