<script setup lang="ts">
import TheHeader from '../components/layout/PageHeader.vue'
import TheFooter from '../components/layout/PageFooter.vue'
import Menu from "../components/Dashboard/MenuDashboard.vue";
</script>

<template>
  <!-- <main>
    <TheHeader />
    <main class="mainPage">
      <div class="mainPage_mainImage">
        <img src="../assets/images/mainPage_mainImage.jpg" alt="" />
      </div>

      <div class="mainPage_categorySelector">
        <button onclick="getObrasCategoria('familiar')">
          <p>FAMILIAR</p>
        </button>
        <button onclick="getObrasCategoria('comedia')">
          <p>COMEDIA</p>
        </button>
        <button onclick="getObrasCategoria('musical')">
          <p>MUSICAL</p>
        </button>
      </div>

      <div class="mainPage_functionsList"></div>
    </main>
    <TheFooter />
  </main> -->
  <Menu />
</template>
