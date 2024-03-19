<script setup lang="ts">
import { computed } from 'vue';
import TheHeader from '../components/layout/PageHeader.vue';
import FunctionInfo from '@/components/seats/FunctionInfo.vue';
import FunctionList from '@/components/seats/FunctionList.vue';


</script>

<template>
  <TheHeader />
  <div class="seats">
    <a href="/" class="seats_goBack"><i class="fa-solid fa-arrow-left"></i> Volver</a>
    <FunctionInfo class="functionInfo" />
    <FunctionList :id="1" />
  </div>
</template>


<style scoped>
.seats {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 2rem;
  gap: 2rem;
  padding-inline: 4rem;
}

.seats .seats_goBack {
  display: none;
  position: absolute;
  top: -30px;
  left: 0;
  margin-left: 2rem;
  color: black;
  font-weight: 700;
}

@media (min-width: 768px) {
  .function {
    width: 336px;
  }

  .functionInfo {
    max-width: 600px;
  }

  .seats {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .seats .seats_goBack {
    display: block;
    margin-left: 5rem;
  }
}
</style>
