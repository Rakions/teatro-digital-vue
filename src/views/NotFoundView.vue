<script setup lang="ts">
import TheHeader from '../components/layout/PageHeader.vue'
import TheFooter from '../components/layout/PageFooter.vue'
</script>

<template>
  <main>
    <TheHeader />
    <main class="mainPage">

      <main>
        <section class="not_found">
          <h2>PÁGINA NO ENCONTRADA</h2>
          <div class="not_found_below">
            <span>Todavía estamos trabajando en esta parte, disculpen las molestias.</span>
            <a href="/">Volver</a>
          </div>
        </section>
      </main>

      <div class="mainPage_functionsList"></div>
    </main>
    <TheFooter />
  </main>
</template>
