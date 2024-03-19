<script setup lang="ts">
import { useObrasStore } from '@/stores/obrasStore';
import { computed, watch } from 'vue';

const obrasStore = useObrasStore();
const props = defineProps({ id: Number })
const horas = computed(() => obrasStore.funciones)

async function getHoras() {
    await obrasStore.fetchFunciones(props.id)
}

watch(() => props.id, async (newId) => {
    if (newId) {
        await obrasStore.fetchFunciones(newId);
    }
}, { immediate: true });

if (props.id != null) {
    getHoras();
}

</script>

<template>
    <div class="function_list">
        <ul>
            <li>
                {{ horas.fechaHora }}
            </li>
        </ul>
    </div>
</template>