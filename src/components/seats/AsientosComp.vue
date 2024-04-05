<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
    reservas: Array,
    funcionID: Number
});

interface Circle {
    color: string;
    original: string;
    reservado: boolean;
}

const grid = ref<Circle[][]>([]);
const selectedSeatIds = ref(new Set<number>());

const initializeGrid = () => {
    grid.value = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ({ color: '#cda881', original: '#cda881', reservado: false }))
    );

    props.reservas.forEach(reserva => {
        if (reserva.funcionID === props.funcionID) {
            const asientoIndex = reserva.asiento - 1;
            const rowIndex = Math.floor(asientoIndex / 10);
            const columnIndex = asientoIndex % 10;
            grid.value[rowIndex][columnIndex].reservado = true;
            grid.value[rowIndex][columnIndex].color = 'red';
        }
    });
};

const toggleColor = (rowIndex: number, columnIndex: number) => {
    const circle = grid.value[rowIndex][columnIndex];
    const seatId = rowIndex * grid.value[0].length + columnIndex + 1;

    if (!circle.reservado) {
        circle.color = circle.color === 'green' ? circle.original : 'green';
        grid.value[rowIndex][columnIndex] = { ...circle };

        if (circle.color === 'green') {
            selectedSeatIds.value.add(seatId);
            console.log(selectedSeatIds.value);

        } else {
            selectedSeatIds.value.delete(seatId);
        }
    }
};

onMounted(() => {
    initializeGrid();
});
</script>



<template>
    <div class="grid-container">
        <svg width="300" height="30">
            <rect width="300" height="30" fill="black" />
            <text x="150" y="20" fill="white" font-size="14" text-anchor="middle">ESCENARIO</text>
        </svg>
        <div v-for="(row, rowIndex) in grid" :key="'row-' + rowIndex" class="grid-row">
            <svg v-for="(circle, columnIndex) in row" :key="'circle-' + rowIndex + '-' + columnIndex" class="grid-item"
                width="50" height="50" @click="toggleColor(rowIndex, columnIndex)">
                <circle :id="'' + (rowIndex * grid[0].length + columnIndex + 1)" cx="25" cy="25" r="20"
                    :fill="circle.color" />
            </svg>
        </div>
    </div>
</template>

<style scoped>
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