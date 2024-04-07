<script setup lang="ts">
import type { Asiento } from '@/utils/interfaces';
import { ref, onMounted } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
    asientosFiltrados: {
        type: Array as () => Asiento[],
        default: () => []
    }
});
const emits = defineEmits(['update:asientos'])
const asientosSeleccionados = ref<number[]>([])



interface Circle {
    color: string;
    original: string;
    reservado: boolean;
}

const grid = ref<Circle[][]>([]);
const selectedSeatIds = ref(new Set<number>());

const initializeGrid = () => {
    grid.value = Array.from({ length: 10 }, (_, rowIndex) =>
        Array.from({ length: 10 }, (_, columnIndex) => {
            const seatId = rowIndex * 10 + columnIndex + 1;
            const isReserved = props.asientosFiltrados.some(asiento => asiento.asiento === seatId);
            return {
                color: isReserved ? 'red' : '#cda881',
                original: '#cda881',
                reservado: isReserved
            };
        })
    );
};

const toggleColor = (rowIndex: number, columnIndex: number) => {
    const circle = grid.value[rowIndex][columnIndex];
    const seatId = rowIndex * grid.value[0].length + columnIndex + 1;

    if (!circle.reservado) {
        circle.color = circle.color === 'green' ? circle.original : 'green';
        grid.value[rowIndex][columnIndex] = { ...circle };

        if (circle.color === 'green') {
            selectedSeatIds.value.add(seatId);
        } else {
            selectedSeatIds.value.delete(seatId);
        }
    }
};

onMounted(initializeGrid);

function agregarReservasLista() {
    const asientosReservadosIds = Array.from(selectedSeatIds.value);

    asientosSeleccionados.value = asientosReservadosIds;

    emitReservarAsientos(asientosReservadosIds);

    selectedSeatIds.value.clear();
    grid.value.forEach((row, rowIndex) => {
        row.forEach((circle, columnIndex) => {
            if (!circle.reservado) {
                circle.color = circle.original;
            }
            grid.value[rowIndex][columnIndex] = { ...circle };
        });
    });
}

function emitReservarAsientos(asientos: number[]) {
    emits('update:asientos', asientos)
}

</script>

<template>
    <div class="asientos_wrapper">
        <div class="grid-container">
            <svg width="300" height="30">
                <rect width="300" height="30" fill="black" />
                <text x="150" y="20" fill="white" font-size="14" text-anchor="middle">ESCENARIO</text>
            </svg>
            <div v-for="(row, rowIndex) in grid" :key="'row-' + rowIndex" class="grid-row">
                <svg v-for="(circle, columnIndex) in row" :key="'circle-' + rowIndex + '-' + columnIndex"
                    class="grid-item" width="50" height="50" @click="toggleColor(rowIndex, columnIndex)">
                    <circle :id="'' + (rowIndex * grid[0].length + columnIndex + 1)" cx="25" cy="25" r="20"
                        :fill="circle.color" class="circulo" />
                </svg>
            </div>
        </div>
        <v-btn class="boton_reservar" @click="agregarReservasLista">
            Reservar
        </v-btn>
    </div>
</template>

<style scoped>
.asientos_wrapper {
    display: flex;
    flex-direction: column;
    width: 70%;
    align-items: center;
    justify-content: center;
}

.boton_reservar {
    width: 50%;
}

.grid-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Center the grid container */
}

.grid-row {
    display: flex;
}

.grid-item {
    margin: 5px;
    cursor: pointer;
}
</style>