<script setup lang="ts">
import { ref } from 'vue';


var obraId = null;

if (localStorage.getItem('funcion')) {
    obraId = localStorage.getItem('funcion')
    localStorage.removeItem('funcion')
}

if (!obraId) {

}

interface Circle {
    color: string;
    original: string;
}

const grid = ref<Circle[][]>(Array.from({ length: 12 }, () =>
    Array.from({ length: 12 }, () => ({ color: 'blue', original: 'blue' }))
));

const toggleColor = (rowIndex: number, columnIndex: number) => {
    const circle = grid.value[rowIndex][columnIndex];
    circle.color = circle.color === 'red' ? circle.original : 'red';
    grid.value[rowIndex][columnIndex] = { ...circle };
};
</script>

<template>
    <div class="grid-container">
        <svg width="300" height="30">
            <rect width="300" height="30" fill="black" />
            <text x="150" y="20" fill="white" font-size="14" text-anchor="middle">Escenario</text>
        </svg>
        <div v-for="(row, rowIndex) in grid" :key="'row-' + rowIndex" class="grid-row">
            <svg v-for="(circle, columnIndex) in row" :key="'circle-' + rowIndex + '-' + columnIndex" class="grid-item"
                width="50" height="50" @click="toggleColor(rowIndex, columnIndex)">
                <circle cx="25" cy="25" r="20" :fill="circle.color" />
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