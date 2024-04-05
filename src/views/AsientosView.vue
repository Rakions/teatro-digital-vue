<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AsientosComp from '../components/seats/AsientosComp.vue';

const reservas = [
    {
        "reservaID": 19,
        "funcionID": 3,
        "userID": 64,
        "asiento": 47
    },
    {
        "reservaID": 41,
        "funcionID": 3,
        "userID": 50,
        "asiento": 46
    }
]

const funcionID = ref(null);

onMounted(() => {
    const storedFuncionID = localStorage.getItem('funcion');
    if (storedFuncionID) {
        funcionID.value = Number(storedFuncionID);
    }
});
</script>

<template>
    <AsientosComp :reservas="reservas" :funcion-i-d="funcionID" />
</template>
