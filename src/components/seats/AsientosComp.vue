<script setup lang="ts">
import type { Asiento } from '@/utils/interfaces';
import { ref, onMounted } from 'vue';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    asientosFiltrados: {
        type: Array as () => Asiento[],
        default: () => []
    }
});
const emits = defineEmits(['update:asientos'])
const asientosSeleccionados = ref<number[]>([])

interface Seat {
    color: string;
    original: string;
    reservado: boolean;
    id: number;
}

const grid = ref<Seat[][]>([]);
const selectedSeatIds = ref(new Set<number>());

const initializeGrid = () => {
    grid.value = Array.from({ length: 10 }, (_, rowIndex) =>
        Array.from({ length: 10 }, (_, columnIndex) => {
            const seatId = rowIndex * 10 + columnIndex + 1;
            const isReserved = props.asientosFiltrados.some(asiento => asiento.asiento === seatId);
            return {
                color: isReserved ? 'red' : '#cda881',
                original: '#cda881',
                reservado: isReserved,
                id: seatId
            };
        })
    );
};

const toggleColor = (rowIndex: number, columnIndex: number) => {
    const seat = grid.value[rowIndex][columnIndex];

    if (!seat.reservado) {
        seat.color = seat.color === 'green' ? seat.original : 'green';
        grid.value[rowIndex][columnIndex] = { ...seat };

        if (seat.color === 'green') {
            selectedSeatIds.value.add(seat.id);
        } else {
            selectedSeatIds.value.delete(seat.id);
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
        row.forEach((seat, columnIndex) => {
            if (!seat.reservado) {
                seat.color = seat.original;
            }
            grid.value[rowIndex][columnIndex] = { ...seat };
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
                <svg v-for="(seat, columnIndex) in row" :key="'seat-' + rowIndex + '-' + columnIndex" class="grid-item"
                    width="50" height="70" viewBox="0 0 160 120" @click="toggleColor(rowIndex, columnIndex)">
                    <rect x="10" y="10" width="120" height="90" rx="15" ry="15" :fill="seat.color" stroke="black"
                        stroke-width="2" />
                    <rect x="10" y="120" width="20" height="40" rx="0" ry="0" :fill="seat.color" stroke="black"
                        stroke-width="2" />
                    <rect x="110" y="120" width="20" height="40" rx="0" ry="0" :fill="seat.color" stroke="black"
                        stroke-width="2" />
                    <rect x="10" y="65" width="120" height="70" rx="0" ry="0" :fill="seat.color" stroke="black"
                        stroke-width="2" />
                    <rect x="10" y="115" width="120" height="20" rx="0" ry="0" :fill="seat.color" stroke="black"
                        stroke-width="2" />
                    <rect x="0" y="65" width="20" height="60" rx="0" ry="0" :fill="seat.color" stroke="black"
                        stroke-width="2" />
                    <rect x="120" y="65" width="20" height="60" rx="0" ry="0" :fill="seat.color" stroke="black"
                        stroke-width="2" />
                </svg>
            </div>
        </div>
        <button class="boton_reservar" @click="agregarReservasLista">
            Reservar
        </button>
    </div>
</template>

<style scoped>
.asientos_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    flex-direction: column;
}
</style>
