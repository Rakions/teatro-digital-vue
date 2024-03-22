<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    color: String,
    rowIndex: Number,
    columnIndex: Number
});
const emits = defineEmits(['click']);

function handleClick() {
    emits('click', props.rowIndex, props.columnIndex);
}
</script>

<style scoped>
.grid-item {
    margin: 5px;
    cursor: pointer;
}
</style>

<template>
    <svg class="grid-item" width="50" height="50" @click="handleClick">
        <circle cx="25" cy="25" r="20" :fill="color" />
    </svg>
</template>
