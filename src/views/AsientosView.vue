<script setup lang="ts">
import { computed } from 'vue';
import TheHeader from '../components/layout/PageHeader.vue';
import Asientos from "../components/seats/AllSeats.vue"
import FunctionInfo from '@/components/seats/FunctionInfo.vue';


</script>

<template>
  <TheHeader />
  <div class="seats">
    <router-link to="/" class="seats_goBack"><i class="fa-solid fa-arrow-left"></i> Volver</router-link>
    <FunctionInfo />
    <Asientos />
  </div>
</template>


<style scoped>
.seats {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 2rem;
}

.seats .seats_goBack {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 2rem;
  color: black;
  font-weight: 700;
}





@media (min-width: 768px) {
  .function {
    width: 336px;
  }

  .seats {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }

  .seats .seats_goBack {
    display: block;
    margin-left: 5rem;
  }
}
</style>
