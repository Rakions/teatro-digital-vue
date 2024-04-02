<script setup lang="ts">
import TheHeader from '../components/layout/PageHeader.vue';
import TheFooter from '../components/layout/PageFooter.vue';
import CategoriasSelector from '../components/Index/CategoriaSelector.vue';
import CanvasComp from '@/components/Index/CanvasComp.vue';

</script>

<template>
  <main>
    <TheHeader />
    <main class="mainPage">
      <div class="mainPage_mainImage">
        <CanvasComp />
      </div>
      <CategoriasSelector />
    </main>
    <TheFooter />
  </main>
</template>
