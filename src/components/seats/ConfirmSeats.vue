<script setup lang="ts">
const props = defineProps({
    asientos: Array as () => Number[],
    precio: Number
})
const emit = defineEmits(['pagar'])
</script>

<template>
    <div class="confirmacion_wrapper">
        <div class="confirmacion">
            <p>Has seleccionado los asientos</p>
            <ul>
                <li v-for="(asiento, index) in $props.asientos" :key="index">{{ asiento }}</li>
            </ul>
            <p>Por un total de {{ $props.precio }}€</p>
            <div class="botones_wrapper">
                <v-btn @click="emit('pagar')">
                    Proceder al pago
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped>
.confirmacion_wrapper {
    width: 70%;
    margin-top: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.confirmacion {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--color-fondo-componentes);
    border-radius: 10px;
    padding: 3rem 5rem;
    text-align: center;
}

.confirmacion_wrapper ul {
    display: flex;
    gap: 1rem;
}

.botones_wrapper {
    display: flex;
    gap: 1rem;
}
</style>